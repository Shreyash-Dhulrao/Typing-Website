import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaLock, FaGoogle, FaEye, FaEyeSlash } from 'react-icons/fa'; // Import icons from react-icons library
import { Link } from 'react-router-dom';
import Login from './styling material/Login.png';


const SignupPage = (props) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePasswordVisibility = () => {
        setShowPassword(prevState => !prevState);
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = () => {

    }

    return (
        <div className={`flex justify-center items-center border-0 bg-${props.bgCol} font `}>
            <div className="flex  h-screen w-3/4  ">
                <div className={`bg-${props.bgCol2} content-center w-1/2 h-4/5 mt-24 rounded-l-xl`}>
                    <img src={Login} alt="img" className={`items-center w-full mt-10`} />
                </div>
                <form onSubmit={handleSubmit} className={`bg-${props.bgCol2} pb-8  text-${props.text} px-12 content-center w-1/2 h-4/5 mt-24 rounded-r-xl `}>
                <div>
                    <h2 className="text-center text-3xl  mb-4 mt-12 funky">Create an Account</h2>
                </div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="relative">
                            <FaUser className="absolute inset-y-0 left-0 pl-3 flex items-center h-full w-7 pt-1" />
                            <input id="firstName" name="firstName" type="text" autoComplete="given-name" required className={`mt-1 p-3 pl-10 block w-full  rounded-md shadow-md  outline-none bg-${props.bgCol}`} placeholder="First Name" onChange={handleChange} />
                        </div>
                        <div className="relative">
                            <FaUser className="absolute inset-y-0 left-0 pl-3 flex items-center h-full w-7 pt-1" />
                            <input id="lastName" name="lastName" type="text" autoComplete="family-name" required className={`mt-1 p-3 pl-10 block w-full  rounded-md shadow-md  outline-none bg-${props.bgCol} `} placeholder="Last Name" onChange={handleChange} />
                        </div>
                    </div>
                    <div className="mb-4 relative">
                        <FaUser className="absolute inset-y-0 left-0 pl-3 flex items-center h-full w-7 pt-1" />
                        <input id="username" name="username" type="text" autoComplete="username" required className={`mt-1 p-3 pl-10 block w-full  rounded-md shadow-md  outline-none bg-${props.bgCol}`} placeholder="Username" onChange={handleChange} />
                    </div>
                    <div className="mb-4 relative">
                        <FaEnvelope className="absolute inset-y-0 left-0 pl-3 flex items-center h-full w-7 pt-1" />
                        <input id="email" name="email" type="email" autoComplete="email" required className={`mt-1 p-3 pl-10 block w-full  rounded-md shadow-md  outline-none bg-${props.bgCol} required-`} placeholder="Email address" onChange={handleChange} />
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="mb-4 relative">
                            <FaLock className="absolute inset-y-0 left-0 pl-3 flex items-center h-full w-7 pt-1" />
                            <input id="password" name="password" type="password" autoComplete="new-password" required className={`mt-1 p-3 pl-10 block w-full  rounded-md shadow-md  outline-none bg-${props.bgCol}`} placeholder="Password" onChange={handleChange} />
                        </div>
                        <div className="mb-4 relative">
                            <FaLock className="absolute inset-y-0 left-0 pl-3 flex items-center h-full w-7 pt-1" />
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type={showPassword ? "text" : "password"}
                                autoComplete="new-password"
                                required
                                className={`mt-1 p-3 pl-10 block w-full  rounded-md shadow-md outline-none bg-${props.bgCol}`}
                                placeholder="Confirm Password"
                                onChange={handleChange}
                            />
                            <div
                                className="absolute inset-y-0 right-0 pr-3 flex items-center h-full cursor-pointer"
                                onClick={handleTogglePasswordVisibility}
                            >
                                {showPassword ? <FaEyeSlash className={`h-5 w-5 text-${props.text} inset-y-0 left-0 pl-3 flex items-center h-full w-7 pt-1`} /> : <FaEye className={`h-5 w-5 text-${props.text} inset-y-0 left-0 pl-3 flex items-center h-full w-7 pt-1`} />}
                            </div>
                        </div>

                    </div>
                    <div className="mb-6">
                        <button type="submit" className="w-full py-3 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300">Sign up</button>
                    </div>
                    <p className="text-sm  text-center">Already have an account? <Link to="/login" className={`px-2 text-${props.btns} hover:text-${props.font} `}>Sign in</Link></p>
                <div className="mt-4 flex justify-center items-center">
                    <span className="mr-2 text-sm ">or</span>
                    <button type="button" className={`flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 bg-${props.bgCol}`}>
                        <FaGoogle className={`h-5 w-5 mr-2 text-${props.text}  `} />
                        Sign up with Google
                    </button>
                </div>
                </form>
            </div>
        </div>
    );
};

export default SignupPage;
