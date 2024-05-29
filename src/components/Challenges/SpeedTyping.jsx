import React, { useState, useEffect, useRef } from 'react';
import html2canvas from 'html2canvas';

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
    const [Codevisible, setCodevisible] = useState(false)
    const [timeDuration, setTimeDuration] = useState(0)
    const inputRef = useRef(null);
    const [Disabled, setDisabled] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    const [typingSpeedInput, setTypingSpeedInput] = useState("");

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
        if (typedText === randomText.slice(0, typedText.length)) {
            setCurrentIndex(typedText.length);
            setHighlightError(false); // Reset error highlighting if typed text matches randomText
        } else if (typedText.includes('\n')) {
            setCurrentIndex(randomText.length); // Stop updating currentIndex if new line character is present
            setHighlightError(false); // Reset error highlighting
        } else {
            setHighlightError(true); // Set error highlighting if typed text doesn't match randomText
        }
        if (typedText === randomText && typedText.length === randomText.length) {
            setCurrentIndex(0);
        }
    };

    const handleRestart = () => {
        generateRandomText();
        setUserInput('');
        setStartTime(null);
        setTypingSpeed(0);
        setTimerSeconds(0);
        clearInterval(timeLimit);
        setTimerVisible(false);
        setCurrentIndex(0);
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
        setDisabled(false);
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
        setTimeOver(true);
        setDisabled(true);
    };

    const changeSpeed = () => {
        setCodevisible(false);
    }
    const handleButtonClick = () => {
        if (typingSpeedInput === '') {
            setShowAlert(true);
        } else {
            setShowAlert(false)
            setCodevisible(true);
        }
    };
    

    useEffect(() => {
        // inputRef.current.focus();
        generateRandomText();
    }, []);

    // useEffect(() => {
    //     setRowCount(getRowCount());
    // }, [topSpeedsHistory]);

    useEffect(() => {
        if (timerVisible) {
            const timer = setTimeout(() => {
                handleTimerFinish();
            }, timerSeconds * 1000);
            return () => clearTimeout(timer);
        }
    }, [timerVisible, timerSeconds]);

    return (
        <div className='pt-16 w-full'>
            {!Codevisible && (
                <div className={` mx-auto h-full min-h-screen pt-20 p-4 bg-${props.bgCol} text-${props.text} funky`}>
                    <input
                        type="number"
                        placeholder="Enter typing speed"
                        value={typingSpeedInput}
                        className={`w-1/2 flex mx-auto border border-gray-300 rounded-lg px-3 py-2 outline-none bg-${props.col} textbox`}
                        onChange={(e) => setTypingSpeedInput(e.target.value)}
                        id='inputspd'
                    />
                    {showAlert && (
                        <div class="flex justify-center mx-auto bg-blue-500 text-white text-sm font-bold px-4 py-3 w-1/2 rounded-lg funky" role="alert" id='alert'>
                            <svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z" />
                            </svg>
                            <p>Enter some valid numbers before starting the typing test.</p>
                        </div>
                    )}
                    <button aria-labelledby="inputspd" onClick={handleButtonClick} className={`px-4 py-2 bg-${props.btns} flex mx-auto text-white rounded-md focus:outline-none`}>Start Typing Test</button>
                </div>
            )}
            {Codevisible && (
                <div className={`w-full mx-auto h-screen p-4 bg-${props.bgCol} text-${props.text} funky`}>
                    <div className={`text-2xl mb-4 border-2 border-${props.text}  p-3 rounded-lg select-none textbox w-1/2 mx-auto`}>
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
                    <input
                        ref={inputRef}
                        type="text"
                        className={`w-1/2 mx-auto flex border border-gray-300 rounded-lg px-3 py-2 outline-none bg-${props.col} textbox`}
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
                            <button className={`mr-4 px-4 py-2 bg-${props.btns} text-white rounded-md focus:outline-none`} onClick={() => startTimer(60)}>1 Min</button>
                            <button className={`mr-4 px-4 py-2 bg-${props.btns} text-white rounded-md focus:outline-none`} onClick={() => startTimer(120)}>2 Min</button>
                            <button className={`px-4 py-2 bg-${props.btns} text-white rounded-md focus:outline-none`} onClick={() => startTimer(300)}>5 Min</button>
                        </div>
                    )}
                    <div className="text-center">
                        <p className="font-bold">Top Speed: {topSpeed} wpm</p>
                    </div>
                    {timeOver && (
                        <div>
                            <div className='flex flex-row justify-center gap-6 my-4'>
                                <p >Your typing speed: {typingSpeedInput} wpm</p>
                                <p >Top speed: {topSpeed} wpm</p>
                            </div>
                            <div className='flex justify-center'>
                                {typingSpeedInput <= topSpeed ? (
                                    <p>Your typing speed is lower than the top speed.</p>
                                ) : (
                                    <p>Your typing speed is higher than the top speed.</p>
                                )}
                            </div>
                            <div className='flex justify-center'>
                                <button onClick={changeSpeed} className={`px-4 py-2 bg-${props.btns} text-white rounded-md focus:outline-none`}>Change Typing Speed</button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default TypingSpeedTest;
