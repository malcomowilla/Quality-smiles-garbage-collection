



import React, { useState, useEffect } from 'react';



const TypingAnimation = ({ text }) => {
    const [displayedText, setDisplayedText] = useState('');
    const typingSpeed = 100; // Speed in milliseconds
  
    useEffect(() => {
      let index = 0;
      const interval = setInterval(() => {
        if (index < text.length -1) {
          setDisplayedText((prev) => prev + text[index]);
          index++;
        } else {
          clearInterval(interval);
        }
      }, typingSpeed);
  
      return () => clearInterval(interval);
    }, [text]);
  
    return <span className="text-2xl font-bold text-emerald-600">{displayedText}</span>;
  };

  export default TypingAnimation;