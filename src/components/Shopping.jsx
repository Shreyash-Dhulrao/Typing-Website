import React from 'react'
import { Link } from 'react-router-dom';
import Mkey from './styling material/Mkey.jpg'
import BKey from './styling material/BKey.jpg'
import Hcuffs from './styling material/Hcuffs.jpg'

const Shopping = (props) => {
  return (
    <div className={`min-h-screen bg-${props.bgCol}   text-${props.text} flex flex-col py-16 items-center funky`}>
      <header className={`bg-${props.btns} text-white container py-4 my-2 rounded-lg`}>
        <h1 className="text-3xl font-bold text-center tracking-wider">Shopping</h1>
      </header>
      {/* gaming keyboard , budget keyboard, hand grips, */}
      <div className={`container flex justify-around text-center py-14  bg-${props.bgcol2} rounded-lg  `}>
        <div className={`bg-${props.bgCol}  content-center p-3 rounded-xl h-fixed`}>
          <Link to='/MechKey'>
            <h2>Gaming Keyboards</h2>
            <img src={Mkey} alt="Mechanical Keyboard" width='250px' />
          </Link>

        </div>
        <div className={`bg-${props.bgCol} content-center p-3 rounded-xl`}>
          <Link to='/'>
            <h2>Basic Keyboards</h2>
            <img src={BKey} alt="Mechanical Keyboard" width='250px' />
          </Link>
        </div>
        <div className={`bg-${props.bgCol}  content-center p-3 rounded-xl`}>
          <Link to='/'>
            <h2>Wrist Bands</h2>
            <img src={Hcuffs} alt="Mechanical Keyboard" width='250px' />
          </Link>
        </div>

      </div>
    </div>
  )
}

export default Shopping;