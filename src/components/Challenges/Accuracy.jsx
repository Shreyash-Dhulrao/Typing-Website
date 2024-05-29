import React, { useState, useEffect, useRef } from 'react';

const getRandomText = () => {
    const words = ["Hey", "buddy", "I", "am", "doing,", "well", "how", "done.", "Please", "help", "code", "typing", "may", "it", "labour", "work", "some", "margin", "profit", "Loss", "easy", "ad", "went", "venom", "query", "not", "exercise", "umbrella", "labrotary", "wise", "sit", "kingdom", "ex", "energy", "commando", "London", "Done", "art", "inspire", "doctor", "in", "reproduction", "in", "precious", "helping", "syringe", "casette", "hair", "english", "hindi", "nostalgic", "parlour.", "damage", "speaker", "advertise", "complain", "strategic", "night", "hammer", "in", "proof", "general", "carriage", "moon", "desire", "edge", "put", "mercy", "interactive"];
    const randomIndex = Math.floor(Math.random() * words.length);
    return words.slice(randomIndex, randomIndex + 10).join(' ');
}

const TypingSpeedTest = (props) => {
    const [randomText, setRandomText] = useState(getRandomText());
    const [userInput, setUserInput] = useState('');
    const [startTime, setStartTime] = useState(null);
    const [typingSpeed, setTypingSpeed] = useState(0);
    const [timeLimit, setTimeLimit] = useState(null);
    const [timerSeconds, setTimerSeconds] = useState(0);
    const [timerVisible, setTimerVisible] = useState(false);
    const [topSpeed, setTopSpeed] = useState(0);
    const [topSpeedsHistory, setTopSpeedsHistory] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [highlightError, setHighlightError] = useState(false);
    const [timeOver, setTimeOver] = useState(false);
    const [tableUpdateTrigger, setTableUpdateTrigger] = useState(false);
    const [timeDuration, setTimeDuration] = useState(0)
    const inputRef = useRef(null);
    const [Disabled, setDisabled] = useState(false)
    const [totalWords, settotalWords] = useState(0)
    const [correctWords, setcorrectWords] = useState(0)
    const [wrongWords, setwrongWords] = useState(0)
    const [accuracy, setAccuracy] = useState(0);

    const generateRandomText = () => {
        setRandomText(getRandomText());
    };


    const handleInputChange = (e) => {
        const typedText = e.target.value;
        setUserInput(typedText);

        if (!startTime) {
            setStartTime(Date.now());
        }

        if (timerVisible && typedText === randomText) {
            const endTime = Date.now();
            const totalTimeInSeconds = (endTime - startTime) / 1000;
            const numberOfWords = randomText.trim().split(' ').length;
            const typingSpeed = Math.round(numberOfWords / (totalTimeInSeconds / 60));
            setTypingSpeed(typingSpeed);
            setUserInput('');
            setStartTime(null);
            if (timerSeconds > 0) {
                generateRandomText();
            }
            if (typingSpeed > topSpeed) {
                setTopSpeed(typingSpeed);
            }
        }
        setTableUpdateTrigger(prevState => !prevState);

        // let correctWord = 0;
        let wrongWord = 0;
        let prevCorrectWord= 0;

        // for (let i = 1; i < typedText.length; i++) {
        //     if (typedText[i] === randomText[i] && typedText[i] === ' ') {
        //         correctWord++;
        //     }
        // }
        let correctWord = typedText.split('').reduce((acc, char, index) => {
            if (char === randomText[index] && char === ' ') {
                acc++;
            }
            return acc;
        }, 0);


        setcorrectWords(correctWord);
        
        setTableUpdateTrigger(prevState => !prevState);
        if (typedText === randomText.slice(0, typedText.length)) {
            setCurrentIndex(typedText.length);
            setHighlightError(false); // Reset error highlighting if typed text matches randomText
        } else if (typedText.includes('\n')) {
            setCurrentIndex(randomText.length); // Stop updating currentIndex if new line character is present
            setHighlightError(false); // Reset error highlighting
        } else {
            setHighlightError(true); // Set error highlighting if typed text doesn't match randomText
            setwrongWords(wrongWord);
        }
        if (typedText === randomText && typedText.length === randomText.length) {
            setCurrentIndex(0);
        }

    };

    const handleRestart = () => {
        generateRandomText();
        setcorrectWords(0);
        setwrongWords(0);
        settotalWords(0);
        setUserInput('');
        setStartTime(null);
        setTypingSpeed(0);
        setTimerSeconds(0);
        clearInterval(timeLimit);
        setTimerVisible(false);
        setCurrentIndex(0)
        setTopSpeed(0);
        inputRef.current.focus();
    };

    const startTimer = (duration) => {
        setTimerSeconds(duration);
        setTimeDuration(duration);
        const timer = setInterval(() => {
            setTimerSeconds(prevSeconds => {
                if (prevSeconds <= 0) {
                    clearInterval(timer);
                    setTimerVisible(false);
                    setTimeOver(true);
                }
                return prevSeconds - 1;
            });
        }, 1000);

        setTimeLimit(timer);
        setTimerVisible(true);
        setDisabled(false)
    };



    const handleTimerFinish = () => {
        const duration = timeDuration;
        const totalTimeInSeconds = duration;
        const numberOfWords = randomText.trim().split(' ').length;
        const typingSpeed = numberOfWords / (totalTimeInSeconds / 60);


        if (typingSpeed > 0) {
            if (typingSpeed > topSpeed) {
                setTopSpeed(topSpeed);
            }
            if (topSpeed !== 0) {
                setTopSpeedsHistory(prevHistory => {
                    const newRecord = { topSpeed: topSpeed, rank: prevHistory.length + 1, timeframe: duration / 60 };
                    return [...prevHistory, newRecord];
                });
            } else if (topSpeed === 0) {
                setTopSpeedsHistory(prevHistory => {
                    const newRecord = { topSpeed: 0, rank: prevHistory.length + 1, timeframe: duration / 60 };
                    return [...prevHistory, newRecord];
                })
            }
        }

        setTableUpdateTrigger(prevState => !prevState);
        setTimeOver(true)
        setDisabled(true);
    };


    useEffect(() => {
        inputRef.current.focus();
        generateRandomText();
    }, []);


    useEffect(() => {
        if (timerVisible) {
            const timer = setTimeout(() => {
                handleTimerFinish();
            }, timerSeconds * 1000);
            return () => clearTimeout(timer);
        }
    }, [timerVisible, timerSeconds]);




    return (
        <div className={`w-1/2 mx-auto h-full min-h-screen pt-20 p-4 bg-${props.bgCol} text-${props.text} funky`}>
            <div className={`text-2xl mb-4 border-2 border-${props.text}  p-3 rounded-lg select-none textbox`}>
                {/* Map through randomText and apply highlighting to each letter */}
                {randomText.split('').map((letter, index) => (
                    <span
                        key={index}
                        className={index < currentIndex ? 'text-indigo-400 border-b-2 border-indigo-400' : ''} // Apply highlight if index is less than current index
                    >
                        {letter}
                    </span>
                ))}
            </div>
            {/* <div className="text-lg mb-4 border-2 p-3 rounded-lg">{randomText}</div> */}
            <input
                ref={inputRef}
                type="text"
                className={`w-full border border-gray-300 rounded-lg px-3 py-2 outline-none bg-${props.col} textbox`}
                value={userInput}
                onChange={handleInputChange}
                placeholder="Start typing here..."
                disabled={Disabled}
            />
            <div className="text-center mt-4">
                {timerVisible && (
                    <p className="font-bold">Time Remaining: {Math.floor(timerSeconds / 60)}:{timerSeconds % 60 < 10 ? `0${timerSeconds % 60}` : timerSeconds % 60}</p>
                )}
                {!timerVisible && (
                    <div>
                        <p className="font-bold">Typing Speed: {typingSpeed} words per minute</p>
                        <button className={`mt-4 px-4 py-2 bg-${props.btns} text-white rounded-md focus:outline-none`} onClick={handleRestart}>Reset</button>
                    </div>
                )}
            </div>
            {!timerVisible && (
                <div className="text-center mt-4">
                    {/* <button className="mr-4 px-4 py-2 bg-blue-500 text-white rounded-md focus:outline-none" onClick={() => startTimer(10)}>10 Sec</button> */}
                    <button className={`mr-4 px-4 py-2 bg-${props.btns} text-white rounded-md focus:outline-none`} onClick={() => startTimer(60)}>1 Min</button>
                    <button className={`mr-4 px-4 py-2 bg-${props.btns} text-white rounded-md focus:outline-none`} onClick={() => startTimer(120)}>2 Min</button>
                    <button className={`px-4 py-2 bg-${props.btns} text-white rounded-md focus:outline-none`} onClick={() => startTimer(300)}>5 Min</button>
                </div>

            )}
            <div className="text-center mb-4">
                <p className="font-bold">Top Speed: {topSpeed} wpm</p>
            </div>
            <div className="mt-8  w-full ">
                <p>Total Words typed : {totalWords}</p>
                <p>Correct Words : {correctWords}</p>
                <p>Wrong words : {wrongWords}</p>
                <p>Accuracy: {accuracy.toFixed(2)}%</p>
            </div>
        </div>
    );
};
export default TypingSpeedTest;
