import React, { useState, useEffect } from 'react';
import animationData from '../animation/wifi_online.json';
import Lottie from 'react-lottie';
import { motion, AnimatePresence } from 'framer-motion';
import { IoCheckmarkCircle } from "react-icons/io5";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
  }
};

const OnlineMessage = () => {
  const [isVisible, setIsVisible] = useState(true);

  // Auto-hide after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ 
            type: "spring",
            stiffness: 260,
            damping: 20
          }}
          className="fixed top-0 left-0 right-0 z-[1000] px-4 py-2"
        >
          <motion.div 
            className="mx-auto max-w-md bg-gradient-to-r from-emerald-500/10 to-teal-500/10
              rounded-xl shadow-lg border border-emerald-100 dark:border-emerald-900
              overflow-hidden backdrop-blur-md"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          >
            <div className="p-4">
              {/* Success gradient banner */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r
               from-emerald-500 via-emerald-400 to-teal-500" />

              <div className="flex items-center justify-center gap-4">
                {/* Animation container */}
                <div className="relative w-12 h-12">
                  <motion.div
                    animate={{ 
                      scale: [1, 1.2, 1],
                      rotate: [0, 10, -10, 0]
                    }}
                    transition={{ 
                      duration: 1.5,
                      repeat: 1,
                      ease: "easeInOut"
                    }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <IoCheckmarkCircle className="w-8 h-8 text-emerald-500" />
                  </motion.div>
                </div>

                <div className="flex-1">
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-col gap-1"
                  >
                    <h3 className="text-lg font-semibold
                     dark:text-white text-black">
                      Back Online
                    </h3>
                    <p className="text-sm  dark:text-white text-black">
                      Your internet connection has been restored
                    </p>
                  </motion.div>
                </div>

                {/* Progress bar */}
                <motion.div 
                  className="absolute bottom-0 left-0 h-0.5 bg-emerald-500"
                  initial={{ width: "100%" }}
                  animate={{ width: "0%" }}
                  transition={{ 
                    duration: 3,
                    ease: "linear"
                  }}
                />

                {/* Optional: Close button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsVisible(false)}
                  className="text-gray-400 hover:text-gray-500 dark:text-gray-500 
                    dark:hover:text-gray-400 transition-colors"
                >
                  <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Success confetti effect */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0, 1, 0], scale: [0.8, 1.2, 1.4] }}
            transition={{ 
              duration: 1,
              ease: "easeOut"
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
              w-32 h-32 bg-gradient-to-r from-emerald-500/20 to-teal-500/20
              rounded-full blur-xl pointer-events-none"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OnlineMessage;































