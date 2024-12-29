import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiClock } from 'react-icons/fi';

const SessionTimer = () => {
  const [sessionTime, setSessionTime] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSessionTime = async () => {
      try {
        const response = await fetch('/api/app/stats');
        const data = await response.json();
        if (data.status === 'success') {
          setSessionTime(data.data);
        }
      } catch (err) {
        setError(err.message);
      }
    };

    // Initial fetch
    fetchSessionTime();

    // Update every second
    const interval = setInterval(fetchSessionTime, 1000);
    return () => clearInterval(interval);
  }, []);

  if (error) return null;
  if (!sessionTime) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center gap-2 bg-gradient-to-r from-green-50 to-blue-50 p-3 rounded-lg shadow-sm"
    >
      <motion.div
        animate={{ 
          rotate: [0, 360],
        }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <FiClock className="text-green-500 text-xl" />
      </motion.div>
      
      <div className="flex items-baseline gap-1">
        <motion.span 
          key={sessionTime.hours}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-xl font-bold text-gray-700"
        >
          {String(sessionTime.hours).padStart(2, '0')}
        </motion.span>
        <span className="text-xs text-gray-500">h</span>
        
        <motion.span 
          key={sessionTime.minutes}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-xl font-bold text-gray-700"
        >
          {String(sessionTime.minutes).padStart(2, '0')}
        </motion.span>
        <span className="text-xs text-gray-500">m</span>
        
        <motion.span 
          key={sessionTime.seconds}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-xl font-bold text-gray-700"
        >
          {String(sessionTime.seconds).padStart(2, '0')}
        </motion.span>
        <span className="text-xs text-gray-500">s</span>
      </div>
    </motion.div>
  );
};

export default SessionTimer;
