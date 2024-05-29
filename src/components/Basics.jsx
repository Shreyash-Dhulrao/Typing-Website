import React, { useState, useEffect } from 'react';
import qwerty from './styling material/QWERTY.jpg'
import { Link } from 'react-router-dom';
import './style.css'

const rowsOfKeys1 = [
  ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '='],
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', "'"],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/']
];
const basicWords = [
  ['H', 'E', 'L', 'L', 'O'], ['W', 'O', 'R', 'L', 'D'],
  ['I'], ['A', 'M'], ['T', 'Y', 'P', 'I', 'N', 'G'], ['O', 'N'], ['A', 'L', 'P', 'H', 'A'], ['T', 'Y', 'P', 'E'],
  ['S', 'O', 'O', 'N'], ['I'], ['B', 'E', 'C', "O", 'M', 'E'], ['B', 'E', 'S', 'T'], ['T', 'Y', 'P', 'E', 'R'], ['I', 'N'], ['M', 'Y'], ['F', 'I', 'E', 'L', 'D']
];

function App(props) {
  const [currentRowIndex, setCurrentRowIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [showTypingArea, setShowTypingArea] = useState(false);
  const [rowsOfKeys, setRowsOfKeys] = useState(rowsOfKeys1);
  const [typedText, setTypedText] = useState('');
  const [showNextButton, setShowNextButton] = useState(false);
  const [typingFinished, setTypingFinished] = useState(false);
  const [disableTyping, setDisableTyping] = useState(false);
  const [lastWordTyped, setLastWordTyped] = useState(false); 
  const [nextButtonClicked, setNextButtonClicked] = useState(false); 
  const currentRowKeys = rowsOfKeys[currentRowIndex];
  const currentKey = currentRowKeys[currentCharIndex];

  useEffect(() => {
    if (showTypingArea) {
      setCurrentCharIndex(0);
      setTypedText(''); 
    }
  }, [currentRowIndex, showTypingArea]);

  const handleStartTyping = () => {
    setCurrentRowIndex(0);
    setShowTypingArea(true);
  };

  const handleKeyPress = (event) => {
    if (!showTypingArea || disableTyping) return;


    if (event.key === "Backspace") {
      setTypedText((prevText) => prevText.slice(0, -1));
      return;
    }

    if (event.key === currentKey) {
      if (currentCharIndex === currentRowKeys.length - 1) {
        if (currentRowIndex === rowsOfKeys.length - 1) {
          handleFinishTyping();
          setShowNextButton(true);
          setDisableTyping(true);
          return;
        } else {
          setCurrentRowIndex(currentRowIndex + 1);
          setCurrentCharIndex(0);
          setTypedText('');
          return;
        }
      } else {
        setCurrentCharIndex(currentCharIndex + 1);
      }
      setTypedText(typedText);

    }
  };
  const handleChange = (e) => {
    const input = e.target.value;
    setTypedText(input);
  };

  const handleFinishTyping = () => {
    setShowNextButton(false);
    setDisableTyping(false)
    setCurrentRowIndex(0);
    setCurrentCharIndex(0);
    setTypedText('');
    setTypingFinished(true);
    setRowsOfKeys(basicWords);
    const lastWord = basicWords[basicWords.length - 1];
    const lastWordLastChar = lastWord[lastWord.length - 1];
    if (currentKey === lastWordLastChar) {
      setLastWordTyped(true);
    }
  };



  return (
    <div className={`min-h-screen bg-${props.bgCol} text-${props.text} flex flex-col items-center pt-14 justify-center funky`}>
      <header className={`bg-${props.btns} text-white container py-4 my-3 rounded-lg`}>
                <h1 className="text-3xl font-bold text-center tracking-wider">Welcome to Typing Practice</h1>
            </header>
      <main className="flex-1 container mx-auto px-4 py-8">
        <section className="mb-8">
          <h2 className='text-2xl font-semibold mt-4 tracking-wider'>Introduction</h2>
          <p className="text-lg ">Typing skills are essential in today's digital world, impacting productivity and efficiency in various domains.
            Proficient typing enhances communication, work performance, and overall computer literacy.The QWERTY keyboard layout is the standard for most English-language keyboards, with keys arranged in a specific order.
            This layout is named after the first six letters in the top row of keys and was designed to prevent jamming on early typewriters.
          </p>
          <h2 className='text-2xl font-semibold mt-4 tracking-wider'>Hand Position</h2>
          <p className='text-lg'>Proper hand positioning is crucial for efficient typing, with fingers resting on the home row keys: ASDF for the left hand and JKL; for the right hand.
            The index fingers should be placed on the F and J keys, which typically have tactile markers for easy identification.Touch typing involves typing without looking at the keyboard, using all fingers to minimize movement and increase speed and accuracy.
            Beginners can start with simple exercises, gradually progressing to more complex ones to develop touch typing skills.</p>

          <h2 className="text-2xl font-semibold mt-4 tracking-wider">Practice</h2>
          <p className="text-lg">
            Click the "Start Typing" button below to begin practicing typing. Once you reach the end of the row, press Enter to switch to the next row.
          </p>
          <h2 className="text-2xl font-semibold mt-4 tracking-wider">Hands</h2>
          <p className="text-lg">
            Before start of typing you should keep your hands as mentioned below image
          </p>
          <img src={qwerty} alt="Keyboard" width='350px' className='ms-auto me-auto my-5 outline-none border-white' />
        </section>
        <section className="mb-8">
          {!showTypingArea && (
            <button
              className={`bg-${props.btns} text-white py-2 px-4 rounded-lg shadow-md`}
              onClick={handleStartTyping}
            >
              Start Typing
            </button>
          )}
          {showTypingArea && (
            <div className="flex justify-center mb-4 select-none textbox">
              {rowsOfKeys[currentRowIndex].map((char, index) => (
                <div key={index} className="border border-gray-300 p-2 rounded-md mx-1 bg-white text-black outline-none">
                  <span className={index === currentCharIndex  ? 'text-indigo-400 border-b-2 border-indigo-400' : ''}>
                    {char}
                  </span>
                </div>
              ))}
            </div>
          )}
          {showTypingArea && (
            <textarea
              className="border border-gray-300 p-2 w-full h-40 text-black outline-none textbox"
              placeholder="Start typing here..."
              value={typedText}
              onChange={handleChange}
              onKeyDown={handleKeyPress}
              disabled={disableTyping}
            />
          )}
          {showNextButton && !nextButtonClicked && (
            <button
              className={`bg-${props.btns} text-white py-2 px-4 rounded-lg shadow-md mt-4`}
              onClick={handleFinishTyping}
            >
              Practice Words
            </button>
          )}
          {lastWordTyped && (
            <Link to='/Intermediate' className={`bg-${props.btns} text-white py-2 px-4 rounded-lg shadow-md mt-4 ms-4 `}>Go to next</Link>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
