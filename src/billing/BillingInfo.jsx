import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCreditCard, FaMobile, FaCheckCircle, FaTimesCircle, FaClock } from 'react-icons/fa';
import axios from 'axios';
import { useLayoutSettings } from '../settings/LayoutSettings';

const BillingInformation = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('mpesa');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [subscription, setSubscription] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const { settings, borderRadiusClasses } = useLayoutSettings();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.3 }
    }
  };

  const buttonVariants = {
    hover: { 
      scale: 1.02,
      boxShadow: "0px 5px 15px rgba(0,0,0,0.1)"
    },
    tap: { scale: 0.98 },
    initial: { scale: 1 }
  };

  useEffect(() => {
    fetchSubscriptionStatus();
  }, []);

  const fetchSubscriptionStatus = async () => {
    try {
      const response = await axios.get('/api/subscriptions/status');
      setSubscription(response.data);
    } catch (err) {
      setError('Failed to fetch subscription status');
    }
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('/api/payments', {
        payment_method: selectedPaymentMethod,
        phone_number: phoneNumber
      });

      if (response.data.checkout_request_id) {
        // Start polling for payment status
        pollPaymentStatus(response.data.checkout_request_id);
      }

      setPaymentStatus('pending');
    } catch (err) {
      setError(err.response?.data?.error || 'Payment initiation failed');
      setPaymentStatus('failed');
    } finally {
      setLoading(false);
    }
  };

  const pollPaymentStatus = async (checkoutRequestId) => {
    const checkStatus = async () => {
      try {
        const response = await axios.get(`/api/payments/payment_status/${checkoutRequestId}`);
        setPaymentStatus(response.data.status);

        if (response.data.status === 'completed') {
          fetchSubscriptionStatus();
        } else if (response.data.status === 'pending') {
          setTimeout(checkStatus, 5000); // Poll every 5 seconds
        }
      } catch (err) {
        setError('Failed to check payment status');
      }
    };

    checkStatus();
  };

  return (
    <motion.div 
      className="max-w-4xl mx-auto p-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div
        className={`bg-white 
          ${borderRadiusClasses[settings.borderRadius]}
          shadow-lg p-6 overflow-hidden`}
        variants={containerVariants}
      >
        <motion.h2 
          className="text-2xl font-bold mb-6 text-black"
          variants={itemVariants}
        >
          Billing Information
        </motion.h2>

        {/* Subscription Status */}
        <motion.div 
          className="mb-8 p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200"
          variants={itemVariants}
        >
          <h3 className="text-lg font-semibold mb-4 text-black flex items-center">
            <FaCheckCircle className="mr-2 text-green-500" />
            Subscription Status
          </h3>
          {subscription ? (
            <motion.div 
              className={`space-y-3 ${borderRadiusClasses[settings.borderRadius]}`}
              variants={itemVariants}
            >
              <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
                <span className='text-black text-lg'>Plan</span>
                <span className="font-medium text-blue-600">{subscription.plan_name}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
                <span className='text-black text-lg'>Features</span>
                <span className="font-medium text-gray-700">{subscription.features.join(', ')}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
                <span className='text-black text-lg'>Renewal Period</span>
                <span className="font-medium text-gray-700">{subscription.renewal_period}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
                <span className='text-black text-lg'>Status</span>
                <span className={`font-medium flex items-center ${subscription.active ? 'text-green-600' : 'text-red-600'}`}>
                  {subscription.active ? (
                    <>
                      <FaCheckCircle className="mr-1" /> Active
                    </>
                  ) : (
                    <>
                      <FaTimesCircle className="mr-1" /> Inactive
                    </>
                  )}
                </span>
              </div>
              {subscription.next_billing_date && (
                <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
                  <span className='text-black text-lg'>Next Billing</span>
                  <span className="font-medium text-gray-600">
                    {new Date(subscription.next_billing_date).toLocaleDateString()}
                  </span>
                </div>
              )}
              <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
                <span className='text-black text-lg'>Monthly Amount</span>
                <span className="font-bold text-green-600">KES 100,000</span>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              className="flex items-center justify-center h-32"
              animate={{ opacity: [0.5, 1], scale: [0.98, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <p className="text-gray-600">Loading subscription status...</p>
            </motion.div>
          )}
        </motion.div>

        {/* Payment Method Selection */}
        <motion.div className="mb-6" variants={itemVariants}>
          <h3 className="text-lg font-semibold mb-4 text-black">Select Payment Method</h3>
          <div className="flex space-x-4">
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={() => setSelectedPaymentMethod('mpesa')}
              className={`flex-1 flex items-center justify-center
                 px-6 py-4  transition-colors
                  duration-200  ${borderRadiusClasses[settings.borderRadius]} ${
                selectedPaymentMethod === 'mpesa'
                  ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <FaMobile className="mr-2 text-xl" /> M-Pesa
            </motion.button>
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={() => setSelectedPaymentMethod('card')}
              className={`flex-1 flex items-center justify-center px-6 py-4 
                 transition-colors
                  duration-200  ${borderRadiusClasses[settings.borderRadius]} ${
                selectedPaymentMethod === 'card'
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <FaCreditCard className="mr-2 text-xl" /> Card
            </motion.button>
          </div>
        </motion.div>

        {/* Payment Form */}
        <motion.form 
          onSubmit={handlePayment} 
          className="space-y-4"
          variants={itemVariants}
        >
          <AnimatePresence mode="wait">
            {selectedPaymentMethod === 'mpesa' && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="254..."
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-green-500 
                    focus:ring-2 focus:ring-green-200 text-black transition-all duration-200"
                  required
                />
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-red-600 text-sm bg-red-50 p-3 rounded-lg flex items-center"
              >
                <FaTimesCircle className="mr-2" />
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            type="submit"
            disabled={loading}
            className={`w-full py-4 px-6 border border-transparent 
              ${borderRadiusClasses[settings.borderRadius]} shadow-lg 
              text-white bg-gradient-to-r from-green-500 to-green-600 
              focus:outline-none focus:ring-2 focus:ring-offset-2 
              focus:ring-green-500 
              transition-all duration-200 ${loading 
                ? 'opacity-75 cursor-not-allowed' : ''}`}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="mr-2"
                >
                  <FaClock />
                </motion.span>
                Processing...
              </span>
            ) : (
              'Pay Now'
            )}
          </motion.button>
        </motion.form>

        {/* Payment Status */}
        <AnimatePresence>
          {paymentStatus && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`mt-4 p-4 rounded-lg flex items-center justify-center ${
                paymentStatus === 'completed' ? 'bg-green-50 text-green-700' :
                paymentStatus === 'pending' ? 'bg-yellow-50 text-yellow-700' :
                'bg-red-50 text-red-700'
              }`}
            >
              {paymentStatus === 'completed' && (
                <>
                  <FaCheckCircle className="mr-2" />
                  Payment completed successfully!
                </>
              )}
              {paymentStatus === 'pending' && (
                <>
                  <FaClock className="mr-2" />
                  Please check your phone to complete the payment...
                </>
              )}
              {paymentStatus === 'failed' && (
                <>
                  <FaTimesCircle className="mr-2" />
                  Payment failed. Please try again.
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default BillingInformation;