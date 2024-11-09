// import React from 'react';
// import animationData from '../animation/wifi_offline.json'
// import Lottie from 'react-lottie';

// const defaultOptions = {
//   loop: true,
//   autoplay: true,
//   animationData: animationData,
//   rendererSettings: {
//     preserveAspectRatio: "xMidYMid slice"
//   }
// };

// const OfflineMessage = () => (

//   <div style={{
//     position: 'fixed',
//     top: 0,
//     width: '100%',
//     backgroundColor: 'green',
//     color: 'white',
//     // height: '150%',
//     height: '1%',
//     textAlign: 'center',
//     padding: '5px',
    
//     zIndex: 1000
//   }}>
//     <Lottie   animationData={animationData} options={defaultOptions}
//         height={430}
//         width={250}/>

//         <p className='playwrite-de-grund text-2xl text-black dark:text-black'>
//           You are currently offline. 
//           Please Check Your Internet Connection.</p>

    
//   </div>
// );

// export default OfflineMessage;


import React from 'react';
import animationData from '../animation/wifi_offline.json';
import Lottie from 'react-lottie';
import { motion, AnimatePresence } from 'framer-motion';

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
  }
};

const OfflineMessage = () => (
  <AnimatePresence>
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
        className="mx-auto max-w-md bg-white dark:bg-gray-800 
          rounded-xl shadow-2xl border border-red-100 dark:border-red-900
          overflow-hidden backdrop-blur-lg"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      >
        <div className="p-4">
          {/* Red gradient banner */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r
           from-red-500 via-red-400 to-red-500" />

          <div className="flex items-center justify-center gap-4">
            {/* Animation container with custom styling */}
            <div className="relative w-12 h-12">
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [1, 0.8, 1]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute inset-0"
              >
                <Lottie 
                  options={defaultOptions}
                  height={48}
                  width={48}
                />
              </motion.div>
            </div>

            <div className="flex-1">
              <motion.h3 
                className="text-lg font-semibold text-gray-900 dark:text-white mb-1"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                No Internet Connection
              </motion.h3>
              
              <motion.p 
                className="text-sm text-gray-600 dark:text-gray-300"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Please check your network settings and try again
              </motion.p>
            </div>

            {/* Optional: Add a retry button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 
                text-white rounded-lg text-sm font-medium
                shadow-lg shadow-red-500/30
                transition-colors duration-200"
              onClick={() => window.location.reload()}
            >
              Retry
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  </AnimatePresence>
);

export default OfflineMessage;































