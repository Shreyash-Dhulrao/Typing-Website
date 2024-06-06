import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Login from './styling material/Login.png';
import Signup from './styling material/Icons/signup.png';
import { FaUser, FaLock, FaGoogle, FaEye, FaEyeSlash } from 'react-icons/fa'; // Import icons from react-icons library


const LoginPage = (props) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true); // State to track whether login or signup form should be displayed

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(prevState => !prevState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simple form validation
    let errors = {};
    if (!formData.email) {
      errors.email = 'Email is required';
    }
    if (!formData.password) {
      errors.password = 'Password is required';
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      setLoading(false);
      return;
    }

    // Simulate login logic (replace with actual backend logic)
    setTimeout(() => {
      if (formData.email !== 'test@example.com') {
        setErrors({ email: 'Email is not registered' });
      } else if (formData.password !== 'password') {
        setErrors({ password: 'Incorrect password' });
      } else {
        // Login successful, redirect or do something else
        console.log('Login successful');
      }
      setLoading(false);
    }, 1000);
  };

  const handleFlip = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className={`flex justify-center items-center border-0 bg-${props.bgCol} font `}>
      {/* Login or Signup Form */}
      <div className="flex  h-screen w-3/4  ">
        <div className={`bg-${props.bgCol2} content-center w-1/2 h-4/5 mt-24 rounded-l-xl`}>
          <img src={isLogin ? Login : Signup} alt="img" className={`items-center w-full mt-10`} />
        </div>
        <form
          className={`bg-${props.bgCol2} pb-8 text-${props.text} px-12 content-center w-1/2 h-4/5 mt-24 rounded-r-xl `}
          onSubmit={handleSubmit}
        >
          <h2 className="text-4xl mb-8 text-center funky">{isLogin ? 'Login' : 'Signup'}</h2>
          {/* Email Input */}
          <div className="mb-4">
            <div className="mb-4 relative ">
              <FaUser className="absolute inset-y-0 left-0 pl-3 flex items-center h-3/5 w-7 pt-1 " />
              <input
                className={`mt-1 p-3 pl-10 block w-full  rounded-md shadow-md  outline-none bg-${props.bgCol}`}
                id="email"
                type="email"
                placeholder="Username or Email Id"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              {!errors.email && <p className="invisible">Error message placeholder</p>}
              {errors.email && <p className="text-red-500 text-xs pt-2">{errors.email}</p>}
            </div>
          </div>
          {/* Password Input */}
          <div className="mb-6">
            <div className="mb-4 relative">
              <FaLock className="absolute inset-y-0 left-0 pl-3 flex items-center h-3/5 w-7 pt-1 " />
              <input
                className={`mt-1 p-3 pl-10 block w-full  rounded-md shadow-md  outline-none bg-${props.bgCol}`}
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              <div
                className="absolute inset-y-0 right-0 pr-3 flex items-center h-full cursor-pointer"
                onClick={handleTogglePasswordVisibility}
              >
                {showPassword ? <FaEyeSlash className="relative inset-y-0 bg-blue-800  left-0  h-full w-6 pt-1 " /> : <FaEye className="absolute inset-y-0 left-0 flex items-center h-3/5 w-6 pt-1 " />}
              </div>
              {!errors.password && <p className="invisible">Error message placeholder</p>}
              {errors.password && <p className="text-red-500 text-xs pt-2">{errors.password}</p>}
            </div>

          </div>
          <div className="items-center text-center justify-between">
            <button
              className={`px-4 py-2 mb-4 bg-${props.btns} text-white rounded-md focus:outline-none w-full`}
              type="submit"
              disabled={loading}
            >
              {loading ? 'Signing in...' : isLogin ? 'Sign In' : 'Sign Up'}
            </button>
            <p>
              Don't have an account? <Link to='/Signup' className={`px-2 text-${props.btns} hover:text-${props.font}  `}  >Register</Link>
            </p>
          </div>
          <div className="mt-4 flex justify-center items-center">
            <span className="mr-2 text-sm ">or</span>
            <button type="button" className={`flex justify-center items-center px-4 py-3  rounded-md shadow-sm text-sm  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 bg-${props.bgCol}`}>
              <FaGoogle className={`h-5 w-5 mr-2 text-${props.btns}  `} />
              Sign in with Google
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
