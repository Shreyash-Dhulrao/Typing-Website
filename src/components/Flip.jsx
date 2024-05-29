import React, { useState } from 'react';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import './styles.css'; // Custom styles for flip effect

const AuthPage = (props) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className={`min-h-screen flex items-center justify-center bg-${props.bgCol} transition duration-500`}>
      <div className={`flip-card ${isFlipped ? 'flipped' : ''}`}>
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <LoginPage onFlip={handleFlip} {...props} />
          </div>
          <div className="flip-card-back">
            <SignupPage onFlip={handleFlip} {...props} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
