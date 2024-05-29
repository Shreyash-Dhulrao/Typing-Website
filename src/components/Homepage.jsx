import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import fastfiners from './styling material/Link images/10fastfingers.png'
import keybr from './styling material/Link images/keybr.png'
import typeracer from './styling material/Link images/typeracer.png'
import typingacademy from './styling material/Link images/Typing academy.png'
import typing from './styling material/Link images/Typing.com.png'
import typingclub from './styling material/Link images/Typingclub.png'
import html2canvas from 'html2canvas';
import typingzone from './styling material/Link images/typingzone.png'
import rapidtyping from './styling material/Link images/Rapidtyping.png'
import axios from 'axios';

const LeftAdComponent = (props) => {
    const [currentLinkIndex, setCurrentLinkIndex] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => {
            setCurrentLinkIndex(currentIndex => currentIndex + 1);
        }, 1500);

        // Clear timeout on unmount
        return () => clearTimeout(timer);
    }, [currentLinkIndex]);

    const links = [
        { url: 'https://www.typing.academy/', imgSrc: typingacademy, alt: 'typingacademy' },
        { url: 'https://www.typing.com/', imgSrc: typing, alt: 'typing' },
        { url: 'https://www.typingclub.com/', imgSrc: typingclub, alt: 'typingclub' },
        { url: 'https://rapidtyping.com/', imgSrc: rapidtyping, alt: 'rapidtyping' }
    ];

    return (
        <div className={`left-ad pt-20 flex p-2 flex-col gap-y-20 fixed inset-y-0 left-0 w-1/4 bg-${props.bgCol}`}>
            {/* Map over links and display based on current index */}
            {links.slice(0, currentLinkIndex + 1).map((link, index) => (
                <Link key={index} to={link.url} target='_blank'>
                    <img src={link.imgSrc} alt={link.alt} />
                </Link>
            ))}
        </div>
    );
};

const RightAdComponent = (props) => {
    const [currentLinkIndex, setCurrentLinkIndex] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => {
            setCurrentLinkIndex(currentIndex => currentIndex + 1);
        }, 1500);

        // Clear timeout on unmount
        return () => clearTimeout(timer);
    }, [currentLinkIndex]);

    const links = [
        { url: 'https://10fastfingers.com/', imgSrc: fastfiners, alt: 'fastfingers' },
        { url: 'https://www.keybr.com/', imgSrc: keybr, alt: 'keybr' },
        { url: 'https://play.typeracer.com/', imgSrc: typeracer, alt: 'typeracer' },
        { url: 'https://www.typingzone.com/', imgSrc: typingzone, alt: 'typingzone' }
    ];

    return (
        <div className={`left-ad pt-20 flex p-2 flex-col gap-y-20 fixed inset-y-0 right-0 w-1/4 bg-${props.bgCol}`}>
            {/* Map over links and display based on current index */}
            {links.slice(0, currentLinkIndex + 1).map((link, index) => (
                <Link key={index} to={link.url} target='_blank'>
                    <img src={link.imgSrc} alt={link.alt} />
                </Link>
            ))}
        </div>
    )
};


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
    const [editIndex, setEditIndex] = useState(null);
    const [rowCount, setRowCount] = useState(0);
    const [timeDuration, setTimeDuration] = useState(0)
    const inputRef = useRef(null);
    const [Disabled, setDisabled] = useState(false)

    const generateRandomText = () => {
        setRandomText(getRandomText());
    };

    const getRowCount = () => {
        const table = document.getElementById("topSpeedsTable");
        if (table) {
            return table.getElementsByTagName("tr").length - 1; // Subtracting 1 to exclude the header row
        }
        return 0;
    };


    const handleEdit = () => {
        // setEditIndex(prevIndex => prevIndex === null ? rowCount-1 : null); // Toggle edit index
        setEditIndex(prevIndex => {
            if (prevIndex === null) {
                const newEditIndex = [];
                for (let i = rowCount; i >= 0; i--) {
                    newEditIndex.push(i);
                    console.log(i)
                }
                return newEditIndex;
            }
            else {
                return null;
            }
        })
    };

    const handleDelete = (index) => {
        setTopSpeedsHistory(prevHistory => {
            // Remove the record at the specified index
            const updatedHistory = [...prevHistory.slice(0, index), ...prevHistory.slice(index + 1)];
            // Reset the ranks after deletion
            const updatedHistoryWithRanks = updatedHistory.map((record, i) => ({ ...record, rank: i + 1 }));
            return updatedHistoryWithRanks;
        });
        setEditIndex(null); // Reset the edit index
    };

    const handleSave = () => {
        setEditIndex(null); // Reset the edit index
    
        // Get the table element
        const table = document.getElementById('topSpeedsTable');
    
        // Use html2canvas to capture the screenshot of the table
        html2canvas(table).then(canvas => {
            // Convert the canvas to a data URL
            const imageData = canvas.toDataURL();
    
            // Create a link element
            const link = document.createElement('a');
            link.href = imageData;
    
            // Set the filename for the image
            link.download = 'table_screenshot.png';
    
            // Trigger a click event to download the image
            link.click();
        });
    };
    

    // Function to cancel editing
    const handleCancel = () => {
        setEditIndex(null); // Reset the edit index
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
        handleSaveToExcel();
    };


    useEffect(() => {
        inputRef.current.focus();
        generateRandomText();
    }, []);

    useEffect(() => {
        setRowCount(getRowCount());
    }, [topSpeedsHistory]);

    useEffect(() => {
        if (timerVisible) {
            const timer = setTimeout(() => {
                handleTimerFinish();
            }, timerSeconds * 1000);
            return () => clearTimeout(timer);
        }
    }, [timerVisible, timerSeconds]);


    useEffect(() => {
        const storedHistory = localStorage.getItem('topSpeedsHistory');
        if (storedHistory) {
            setTopSpeedsHistory(JSON.parse(storedHistory));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('topSpeedsHistory', JSON.stringify(topSpeedsHistory));
    }, [topSpeedsHistory]);
    
    const handleSaveToExcel = async () => {
        try {
          // Assuming topSpeedsHistory is the data you want to append
          const response = await axios.post('/append-to-excel', { newData: topSpeedsHistory });
          console.log(response.data); // Log success message or handle it as needed
        } catch (error) {
          console.error('Error saving to Excel:', error);
        }
      };


      const fetchData = async () => {
        try {
          const response = await axios.get('/top-speeds-history'); // Adjust the endpoint as needed
          setTopSpeedsHistory(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
    
      // Call fetchData function on component mount
      useEffect(() => {
        fetchData();
      }, []);

    return (
        <div className={`w-1/2 mx-auto h-full min-h-screen pt-20 p-4 bg-${props.bgCol} text-${props.text} funky`}>
            <LeftAdComponent bgCol={props.ads}/>
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

                <h2 className="text-xl font-bold mb-2">Top Speeds History</h2>
                {topSpeedsHistory.length > 0 ? (
                    <table className="w-full  border border-gray-300" id='topSpeedsTable'>
                        <thead>
                            <tr>
                                <th className="border border-gray-300 px-4 py-4 w-1/12">Rank</th>
                                <th className="border border-gray-300 px-4 py-4 w-1/4">Top Speed (wpm)</th>
                                <th className="border border-gray-300 px-4 py-4 w-1/6">Time (minutes)</th>
                                <th className="border border-gray-300 px-4 py-4">
                                    <button onClick={handleEdit} className={`mr-4 px-4 py-2 bg-${props.btns} text-white rounded-md`}>
                                        {editIndex === null ? 'Edit' : 'Back'}
                                    </button>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {topSpeedsHistory.map((record, index) => (
                                <tr key={index}>
                                    <td className="border border-gray-300 px-4 py-4">{record.rank}</td>
                                    <td className="border border-gray-300 px-4 py-4">{record.topSpeed}</td>
                                    <td className="border border-gray-300 px-4 py-4">{record.timeframe}</td>
                                    <td className='border border-gray-300 px-4 py-2'>
                                        {editIndex !== null && editIndex[index] && (
                                            < >
                                                <button onClick={() => handleDelete(index)} className=" px-4 py-1 bg-red-500 text-white rounded-md ms-6">Delete</button>
                                                <button onClick={handleSave} className={` px-4 text-underline text-${props.text} rounded-md`}>Save</button>
                                                <button onClick={handleCancel} className={`px-4 text-underline  text-${props.text} rounded-md`}>Cancel</button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="text-center">No top speeds recorded yet.</p>
                )}

            </div>
            <RightAdComponent bgCol={props.ads} />
        </div>
    );
};
export default TypingSpeedTest;
