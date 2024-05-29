import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import keyB from './styling material/Favicon (2).png'
import { ReactComponent as MySvg } from './styling material/A (1).svg'
import './style.css'

const Navbar = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    console.log("Logging out...");
    setIsLoggedIn(false);
  };
    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className={`bg-${props.bgCol}  shadow-md fixed w-screen p-2  z-10 text-${props.text} border-b-2 border-${props.text}`}>
            <div className={`mx-5 ms-10 flex justify-between items-center bg-${props.bgCol}  `}>
                <div className={` text-${props.text} flex gap-3`}>
                    <Link to="/" className="flex items-center gap-3 ">
                        <MySvg className={`text-${props.text}`} width='100px' />
                    </Link>
                </div>
                <div className="hidden lg:flex lg:items-center lg:space-x-10">
                    <ul className="flex items-center space-x-6">
                        <li><svg
                            width="19"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            onClick={props.togglebtn}
                        >
                            <path
                                d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8V16Z"
                                fill="currentColor"
                            />
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM12 4V8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16V20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4Z"
                                fill="currentColor"
                            />
                        </svg></li>
                        <li >
                            <div className="mx-auto flex relative items-center justify-center bg-gray-200">
                                <div className="group relative cursor-pointer ">

                                    <div className={`flex items-center justify-between space-x-1 bg-${props.bgCol} text-${props.text} font`}>
                                        <p className="menu-hover py-1   lg:mx-4" >
                                            Learnings
                                        </p>

                                    </div>

                                    <div
                                        className={`invisible absolute flex w-fit  flex-col bg-${props.bgCol} py-1 px-4 text-${props.text} group-hover:visible font`}>

                                        <Link className={`my-2 block font-regular  hover:font-semibold text-${props.text} hover:text-${props.text2} md:mx-2 font`} to="/Basics">
                                            Basic
                                        </Link>

                                        <Link className={`my-2  block font-regular  hover:font-semibold  text-${props.text} hover:text-${props.text2} md:mx-2 font`} to="/Intermediate">
                                            Intermediate
                                        </Link>
                                        <Link className={`my-2 block font-regular  hover:font-semibold text-${props.text} hover:text-${props.text2} md:mx-2 font`} to="/Advance">
                                            Advance
                                        </Link>
                                    </div>
                                </div>
                            </div>

                        </li>
                        <li><Link to="/Challenges" className={`text-${props.text} hover:border-b-4  py-5 px-3 border-${props.text} ${props.b} links font`}>Challenges</Link></li>
                        <li><Link to="/Dashboard" className={`text-${props.text} hover:border-b-4  py-5 px-3 border-${props.text} ${props.c} links font`}>Dashboard</Link></li>
                        <li><Link to="/help" className={`text-${props.text} hover:border-b-4  py-5 px-3 border-${props.text} ${props.d} links font`}>Help</Link></li>
                        <li><div >
                            {isLoggedIn ? (
                                <div>
                                    <h2>Profile</h2>
                                    <button onClick={handleLogout}>Logout</button>
                                </div>
                            ) : (
                                <div>
                                    <button className={`bg-${props.btns} text-white py-2  px-4 rounded-lg shadow-md me-3 font`}><Link to='/Login'>Login</Link></button>
                                    <button className={`text-${props.btns} py-2 text-lg font`} ><Link to='/Signup'>Sign Up</Link></button>
                                </div>
                            )}
                        </div></li>
                    </ul>
                </div>
                <div className="lg:hidden flex">
                    <svg
                        width="19"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={props.togglebtn}
                        className='me-5'
                    >
                        <path
                            d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8V16Z"
                            fill="currentColor"
                        />
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM12 4V8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16V20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4Z"
                            fill="currentColor"
                        />
                    </svg>
                    <button
                        className="text-gray-800 focus:outline-none"
                        onClick={toggleNavbar}
                    >
                        <svg
                            className="h-4 w-4 fill-current "
                            xmlns="http://www.w3.org/2000/svg"
                            enableBackground="new 0 0 512 512"
                            viewBox="0 0 512 512" id="plus"
                        >
                            {isOpen ? (
                                <path fill="blue-600" d="M468.3,212.7H305.2v-169c0-24.2-19.6-43.8-43.8-43.8c-24.2,0-43.8,19.6-43.8,43.8v169h-174
	C19.6,212.7,0,232.3,0,256.5c0,24.2,19.6,43.8,43.8,43.8h174v168c0,24.2,19.6,43.8,43.8,43.8c24.2,0,43.8-19.6,43.8-43.8v-168h163.1
	c24.2,0,43.8-19.6,43.8-43.8C512,232.3,492.5,212.7,468.3,212.7z " className={`text-${props.text} origin-center rotate-45 transition linear `}></path>
                            ) : (
                                <path fill="blue-600" d="M468.3,212.7H305.2v-169c0-24.2-19.6-43.8-43.8-43.8c-24.2,0-43.8,19.6-43.8,43.8v169h-174
	C19.6,212.7,0,232.3,0,256.5c0,24.2,19.6,43.8,43.8,43.8h174v168c0,24.2,19.6,43.8,43.8,43.8c24.2,0,43.8-19.6,43.8-43.8v-168h163.1
	c24.2,0,43.8-19.6,43.8-43.8C512,232.3,492.5,212.7,468.3,212.7z " className={`text-${props.text} h-3 transition linear origin-center rotate-90 `}></path>
                            )}
                        </svg>
                    </button>
                </div>
            </div>
            <div className={`${isOpen ? 'block' : 'hidden'} lg:hidden flex h-fill justify-center text-center w-full absolute ps-2/4 bg-${props.bgCol}/75 backdrop-blur-sm `}>
                <ul className="text-gray-800 ">
                    <li className="py-2 px-4 border-b border-gray-200 ">
                        <h2 className={`my-2 block font-regular  font-semibold text-${props.text} hover:text-${props.text2} md:mx-2 font`}>Learnings</h2>

                        <Link className={`my-2 block font-regular  hover:font-semibold text-${props.text} hover:text-${props.text2} md:mx-2 font`} to="/Basics">
                            Basic
                        </Link>

                        <Link className={`my-2  block font-regular  hover:font-semibold  text-${props.text} hover:text-${props.text2} md:mx-2 font`} to="/Intermediate">
                            Intermediate
                        </Link>
                        <Link className={`my-2 block font-regular  hover:font-semibold text-${props.text} hover:text-${props.text2} md:mx-2 font`} to="/Advance">
                            Advance
                        </Link>

                    </li>
                    <li className="py-2 px-4 border-b border-gray-200">
                        <Link to="/" className={`block text-${props.text} links`}>Dashboard</Link>
                    </li>
                    <li className="py-2 px-4 border-b border-gray-200">
                        <Link to="/" className={`block text-${props.text} links`}>Payments / History</Link>
                    </li>
                    <li className="py-2 px-4 border-b border-gray-200">
                        <Link to="/" className={`block text-${props.text} links`}>Help</Link>
                    </li>
                    <li className="py-2 px-4 border-b border-gray-200">
                        <Link to="/profile" className={`block text-${props.text} links`}>Profile</Link>
                    </li>

                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
