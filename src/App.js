import './components/style.css'
import './App.css';
import Homepage from './components/Homepage'
import Intermediate from './components/Intermediate'
import Advance from './components/Advance'
import Navbar from './components/Navbar'
import Basics from './components/Basics'
import Challenges from './components/Challenges'
import Speedtyping from './components/Challenges/SpeedTyping'
import Accuracy from './components/Challenges/Accuracy'
import Shopping from './components/Shopping'
import Login from './components/Login'
import Signup from './components/Signup'
import { useState } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import MechKey from './components/MechKey';

function App() {
  const [bgCol, setBgCol] = useState('zinc-200')
  const [bgCol1, setBgCol1] = useState('neutral-100')
  const [bgCol2, setBgCol2] = useState('zinc-300')
  const [col, setCol] = useState('rgb(39 39 42 / var(--tw-bg-opacity))')
  const [text2, setText2] = useState('black')
  const [Buttons, setButtons] = useState('violet-400')
  const [font, setFont] = useState('violet-500')
  const [text, setText] = useState('zinc-800')
  const togglebtn = () =>{
    if(bgCol === 'zinc-200'){
      setBgCol('zinc-800')
      setText('zinc-100')
      setBgCol1('neutral-700')
      setButtons('violet-500')
      setCol("rgb(212 212 216 / var(--tw-text-opacity))")
      setText2("white")
      setBgCol2('zinc-700')
      setFont('violet-400')
    }
    else{
      setBgCol1('neutral-100')
      setButtons('violet-400')
      setBgCol2('zinc-300')
      setBgCol('zinc-200')
      setText('zinc-800')
      setText2('black')
      setFont('violet-500')
      setCol('rgb(39 39 42 / var(--tw-bg-opacity))')
    }
  }
  const router = createBrowserRouter([
    {
      path: '/',
      element: <><Navbar togglebtn={togglebtn} bgCol={bgCol} text={text}  col={col} btns={Buttons} /><Homepage bgCol={bgCol} text={text}  col={bgCol1} ads={bgCol2} btns={Buttons}/></>
    },
    {
      path: '/Basics',
      element: <><Navbar togglebtn={togglebtn} bgCol={bgCol} text={text}  col={col} btns={Buttons} text2={text2}/><Basics bgCol={bgCol} text={text}  col={bgCol1}  btns={Buttons} /></>
    },
    {
      path: '/Intermediate',
      element: <><Navbar togglebtn={togglebtn} bgCol={bgCol} text={text}  col={col} btns={Buttons} text2={text2}/><Intermediate bgCol={bgCol} text={text}  col={bgCol1} btns={Buttons}  /></>
    },
    {
      path: '/Advance',
      element: <><Navbar togglebtn={togglebtn} bgCol={bgCol} text={text}  col={col} btns={Buttons} text2={text2}/><Advance bgCol={bgCol} text={text}  col={bgCol1} btns={Buttons}  /></>
    },
    {
      path: '/Challenges',
      element: <><Navbar togglebtn={togglebtn} bgCol={bgCol} text={text}  col={col} btns={Buttons} text2={text2}/><Challenges bgCol2={bgCol2} bgCol={bgCol} text={text}  col={bgCol1} btns={Buttons}/></>
    },
    {
      path: '/Speedtyping',
      element: <><Navbar togglebtn={togglebtn} bgCol={bgCol} text={text}  col={col} btns={Buttons} text2={text2}/><Speedtyping bgCol2={bgCol2} bgCol={bgCol} text={text}  col={bgCol1} btns={Buttons}/></>
    },
    {
      path: '/Accuracy',
      element: <><Navbar togglebtn={togglebtn} bgCol={bgCol} text={text}  col={col} btns={Buttons} text2={text2}/><Accuracy bgCol2={bgCol2} bgCol={bgCol} text={text}  col={bgCol1} btns={Buttons}/></>
    },
    {
      path: '/Shopping',
      element: <><Navbar togglebtn={togglebtn} bgCol={bgCol} text={text}  col={col} btns={Buttons} text2={text2}/><Shopping bgCol={bgCol} text={text}  col={bgCol1} bgcol2={bgCol2} btns={Buttons} /></>
    
    },
    {
      path: '/MechKey',
      element: <><Navbar togglebtn={togglebtn} bgCol={bgCol} text={text}  col={col} btns={Buttons} text2={text2}/><MechKey bgCol={bgCol} text={text}  col={bgCol1} bgcol2={bgCol2} btns={Buttons} /></>
    
    },
    {
      path: '/Login',
      element: <><Navbar togglebtn={togglebtn} bgCol={bgCol} text={text}  col={col} btns={Buttons} text2={text2}/><Login  bgCol2={bgCol2} bgCol={bgCol} text={text} btns={Buttons} col={bgCol1} font={font}/></>
    
    },
    {
      path: '/Signup',
      element: <><Navbar togglebtn={togglebtn} bgCol={bgCol} text={text}  col={col} btns={Buttons} text2={text2}/><Signup  bgCol2={bgCol2} bgCol={bgCol} text={text} btns={Buttons} col={bgCol1} font={font}/></>
    }
  ])
  
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
