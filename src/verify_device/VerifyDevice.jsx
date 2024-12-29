
// import {useState, useEffect, useCallback} from 'react'
// import {useLocation} from 'react-router-dom'
// import {useApplicationSettings} from '../settings/ApplicationSettings'


// const VerifyDevice = () => {
//     const { search } = useLocation()
//     const token = new URLSearchParams(search).get('verification_token');
//     const deviceFingerprint = new URLSearchParams(search).get('device_fingerprint');


//     const handleVerifyDevice = useCallback(
//     async(abortController) => {
//       try {
//         const response = await fetch('/api/verify_device', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             verification_token: token,
//             device_fingerprint: deviceFingerprint
//           }),
//           signal: abortController.signal // Add the abort signal to the fetch
//         })
//         const newData = await response.json()
//         if (response.ok) {
//           // const use_auto_generated_number_for_service_provider = newData.use_auto_generated_number_for_service_provider
//           // const send_sms_and_email_for_provider = newData.send_sms_and_email_for_provider
//           // const enable_2fa_for_service_provider = newData.enable_2fa_for_service_provider
//           // const send_email_for_provider = newData.send_email_for_provider
//           console.log('verified device', newData)
//         }else{
//           console.log('failed to fetch')
//         }
//       } catch (error) {
//         console.log(error)
//       }
//   }, [])

//   return (
//     <div>VerifyDevice</div>
//   )
// }

// export default VerifyDevice
import toast, { Toaster } from 'react-hot-toast';

import { useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const VerifyDevice = () => {
  const { search } = useLocation();
  const token = new URLSearchParams(search).get('verification_token');
  const userEmail = new URLSearchParams(search).get('user_email');
  const deviceFingerprint = new URLSearchParams(search).get('device_fingerprint');

  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleVerifyDevice = useCallback(async (abortController) => {
    try {
      setLoading(true);
      const response = await fetch('/api/verify_device', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          verification_token: token,
          device_fingerprint: deviceFingerprint,
          user_email: userEmail,
        }),
        signal: abortController.signal,
      });
      const newData = await response.json();
      if (response.ok) {
        console.log('verified device', newData);
        toast.success('device  verification sucesful', {
            duration: 5000,
            position: "top-right",
          
        })
        setStatus('success');
      } else {
        console.log('failed to fetch');
        setStatus('failed');
    toast.error(newData.error, {
        duration: 3000,
        position: "top-right",
        style: {
          background: "linear-gradient(to right, #ff6384, #36a2eb)",
          color: "white",
          fontWeight: "bold",
          borderRadius: "5px",
          padding: "10px",
          boxShadow: "0 2px 10px 0 rgba(0, 0, 0, 0.1)",
        },

    }

    );
      }
    } catch (error) {
      console.log(error);
      setStatus('error');
    } finally {
      setLoading(false);
    }
  }, [token, deviceFingerprint]);

  const handleVerifyClick = () => {
    const abortController = new AbortController();
    handleVerifyDevice(abortController);
  };

  const getStatusMessage = () => {
    switch (status) {
      case 'success':
        return 'Device verified successfully!';
      case 'failed':
        return 'Verification failed. Please try again.';
      case 'error':
        return 'An error occurred. Please check your connection.';
      default:
        return '';
    }
  };

  return (

    <>
    <Toaster />
    <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-r from-blue-100 to-blue-300">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
        className="bg-white p-6 rounded-lg shadow-lg text-center"
      >
        <motion.div
          className="mb-4"
          initial={{ scale: 0.9 }}
          animate={{ scale: loading ? [1, 1.2, 1] : 1 }}
          transition={{ repeat: loading ? Infinity : 0, duration: 1.5, ease: 'easeInOut' }}
        >
          {status === null && !loading && <span className="text-gray-500">🔍</span>}
          {loading && <span className="spinner" />}
          {status === 'success' && <span className="text-green-500">✅</span>}
        </motion.div>
        <h2 className="text-xl font-semibold text-gray-700">{getStatusMessage()}</h2>
        {status === null && !loading && (
          <button
            onClick={handleVerifyClick}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
          >
            Verify Device
          </button>
        )}
      </motion.div>
    </div>

    </>
  );
};

export default VerifyDevice;