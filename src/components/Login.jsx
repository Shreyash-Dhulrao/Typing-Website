import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Login from './styling material/Login.png';
import Signup from './styling material/Icons/signup.png';
import { FiMail, FiLock } from 'react-icons/fi'; // Import icons from react-icons library

const LoginPage = (props) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true); // State to track whether login or signup form should be displayed

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
            <div className="flex ">
              <FiMail className={`h-6 w-6 mr-2 text-${props.text} opacity-80`} />
              <label className="block mb-2" htmlFor="email">
                Email
              </label>
            </div>
            <input
              className={`shadow appearance-none rounded w-full py-2 px-3 text-${props.text} bg-${props.bgCol}  leading-tight focus:outline-none focus:shadow-outline ${
                errors.email ? 'border-red-500' : ''
              }`}
              id="email"
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {!errors.email && <p className="invisible">Error message placeholder</p>}
            {errors.email && <p className="text-red-500 text-xs pt-2">{errors.email}</p>}
          </div>
          {/* Password Input */}
          <div className="mb-6">
            <div className="flex ">
              <FiLock className={`h-6 w-6 mr-2 text-${props.text} opacity-80`} />
              <label className="block mb-2" htmlFor="password">
                Password
              </label>
            </div>
            <input
              className={`shadow appearance-none rounded w-full py-2 px-3 text-${props.text} bg-${props.bgCol} leading-tight focus:outline-none focus:shadow-outline ${
                errors.password ? 'border-red-500' : ''
              }`}
              id="password"
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            {!errors.password && <p className="invisible">Error message placeholder</p>}
            {errors.password && <p className="text-red-500 text-xs pt-2">{errors.password}</p>}
          </div>
          <div className="flex items-center justify-between">
            <button
              className={`px-4 py-2 bg-${props.btns} text-white rounded-md focus:outline-none`}
              type="submit"
              disabled={loading}
            >
              {loading ? 'Signing in...' : isLogin ? 'Sign In' : 'Sign Up'}
            </button>
            <p>
              Don't have an account? <Link to='/Signup' className={`px-2 text-${props.btns} hover:text-${props.font}  `}  >Register</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
