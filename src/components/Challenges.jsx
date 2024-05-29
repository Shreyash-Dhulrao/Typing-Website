import React from 'react';
import './style.css'
import { Link } from 'react-router-dom';
import Marathon from './styling material/Icons/marathon.png'
import Arrow from './styling material/Icons/arrow.png'
import Blind from './styling material/Icons/blind.png'
import Gamepad from './styling material/Icons/gamepad.png'
import WASD from './styling material/Icons/wasd.png'

const TypingChallengeLinksPage = (props) => {
    return (
        <div className={`w-full justify-items-ceneter px-4 py-8 pt-16 text-center bg-${props.bgCol2} text-${props.text} h-screen font`}>
            <header className={`bg-${props.btns} text-white w-full py-4 my-3 rounded-lg`}>
                <h1 className="text-3xl font-bold text-center tracking-wider">Typing Challenges</h1>
            </header>
            <div className="grid grid-cols-1 gap-4">
                {/* Challenge 1: Speed Typing Challenge */}
                <Link to="https://www.speedtypingonline.com/typing-test" target='_blank' className={`bg-${props.bgCol} p-4 rounded-lg block flex justify-center items-center gap-5`}>
                    <h2 className="text-xl font-semibold mb-2">Speed Typing Challenge</h2>
                    <img src={Marathon} width='50px' height="30px"/>
                </Link>

                {/* Challenge 2: Accuracy Improvement */}
                <Link to="https://www.typing.com/student/lesson/335/accuracy-drills" target='_blank' className={`bg-${props.bgCol} p-4 rounded-lg block  flex justify-center items-center gap-5`}>
                    <h2 className="text-xl font-semibold mb-2">Accuracy Improvement</h2>
                    <img src={Arrow} width='50px' height="30px"/>
                </Link>

                {/* Challenge 3: Blind Typing */}
                <Link to={'https://blindtyping.com/'} target='_blank' className={`bg-${props.bgCol} p-4 rounded-lg block  flex justify-center gap-5 items-center`}>
                    <h2 className="text-xl font-semibold mb-2">Blind Typing Challenge</h2>
                    <img src={Blind} width='50px' height="30px"/>
                </Link>

                {/* Challenge 4: Specialized Texts */}
                <Link to="https://10fastfingers.com/text/55461-Special-Characters-and-numbers" target='_blank' className={`bg-${props.bgCol} p-4 rounded-lg block  flex justify-center items-center gap-5`}>
                    <h2 className="text-xl font-semibold mb-2">Specialized Texts Challenge</h2>
                    <img src={WASD} width='50px' height="30px"/>
                </Link>

                {/* Challenge 7: Typing Games and Challenges */}
                <Link to="https://play.typeracer.com/" target='_blank' className={`bg-${props.bgCol} p-4 rounded-lg block  flex justify-center items-center gap-5`}>
                    <h2 className="text-xl font-semibold mb-2">Typing Games and Challenges</h2>
                    <img src={Gamepad} width='50px' height="30px"/>
                </Link>
            </div>
        </div>
    );
};

export default TypingChallengeLinksPage;
