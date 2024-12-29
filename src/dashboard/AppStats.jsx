import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiClock } from 'react-icons/fi';
import { useAppSettings } from '../settings/AppSettings';
const AppStats = ({totalHrs, setTotalHrs}) => {
  const [sessionTime, setSessionTime] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/app/stats');
        const data = await response.json();
        if (data.status === 'success') {
          setSessionTime(data.data);
          setTotalHrs(`${data.data.hours} hours, ${data.data.minutes} minutes, ${data.data.seconds} seconds`);
        }
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
    const interval = setInterval(fetchStats, 1000); // Update every second
    return () => clearInterval(interval);
  }, []);

  if (loading || !sessionTime) {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border border-green-200 shadow-sm"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-500 rounded-full">
            <FiClock className="text-white text-xl" />
          </div>
          <div>
            <p className="text-lg text-black">Work Uptime</p>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-2xl font-bold text-gray-800"
            >
              {String(sessionTime.hours).padStart(2, '0')}:{String(sessionTime.minutes).padStart(2, '0')}:{String(sessionTime.seconds).padStart(2, '0')}
            </motion.p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AppStats;
