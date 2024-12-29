// BillingInformation.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaCreditCard, FaMobile } from 'react-icons/fa';
import axios from 'axios';

const BillingInformation = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('mpesa');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [subscription, setSubscription] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(null);

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
    <div className="max-w-4xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-lg p-6"
      >
        <h2 className="text-2xl font-bold mb-6">Billing Information</h2>

        {/* Subscription Status */}
        <div className="mb-8 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Subscription Status</h3>
          {subscription ? (
            <div>
              <p className="mb-2">
                Status: <span className={`font-medium ${subscription.active ? 'text-green-600' : 'text-red-600'}`}>
                  {subscription.active ? 'Active' : 'Inactive'}
                </span>
              </p>
              {subscription.next_billing_date && (
                <p className="text-gray-600">
                  Next billing date: {new Date(subscription.next_billing_date).toLocaleDateString()}
                </p>
              )}
              <p className="text-gray-600">Monthly amount: KES 10,000</p>
            </div>
          ) : (
            <p className="text-gray-600">Loading subscription status...</p>
          )}
        </div>

        {/* Payment Method Selection */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">Select Payment Method</h3>
          <div className="flex space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedPaymentMethod('mpesa')}
              className={`flex items-center px-4 py-2 rounded-lg ${
                selectedPaymentMethod === 'mpesa'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              <FaMobile className="mr-2" /> M-Pesa
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedPaymentMethod('card')}
              className={`flex items-center px-4 py-2 rounded-lg ${
                selectedPaymentMethod === 'card'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              <FaCreditCard className="mr-2" /> Card
            </motion.button>
          </div>
        </div>

        {/* Payment Form */}
        <form onSubmit={handlePayment} className="space-y-4">
          {selectedPaymentMethod === 'mpesa' && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="254..."
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                required
              />
            </div>
          )}

          {error && (
            <div className="text-red-600 text-sm">{error}</div>
          )}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${
              loading ? 'opacity-75 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Processing...' : 'Pay Now'}
          </motion.button>
        </form>

        {/* Payment Status */}
        {paymentStatus && (
          <div className={`mt-4 p-4 rounded-lg ${
            paymentStatus === 'completed' ? 'bg-green-50 text-green-700' :
            paymentStatus === 'pending' ? 'bg-yellow-50 text-yellow-700' :
            'bg-red-50 text-red-700'
          }`}>
            {paymentStatus === 'completed' && 'Payment completed successfully!'}
            {paymentStatus === 'pending' && 'Please check your phone to complete the payment...'}
            {paymentStatus === 'failed' && 'Payment failed. Please try again.'}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default BillingInformation;




import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaCreditCard, FaMobile } from 'react-icons/fa';
import axios from 'axios';

const BillingInformation = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('mpesa');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [subscription, setSubscription] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(null);

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
    <div className="max-w-4xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-lg p-6"
      >
        <h2 className="text-2xl font-bold mb-6 text-black">Billing Information</h2>

        {/* Subscription Status */}
        <div className="mb-8 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-2 text-black">Subscription Status</h3>
          {subscription ? (
            <div>
              <p className="mb-2">
                <span className='text-black text-lg'>Plan: </span><span className="font-medium text-blue-600">{subscription.plan_name}</span>
              </p>
              <p className="mb-2">
                <span className='text-black text-lg'>Features: </span><span className="font-medium text-gray-700">{subscription.features.join(', ')}</span>
              </p>
              <p className="mb-2">
                <span className='text-black text-lg'>Renewal Period: </span><span className="font-medium text-gray-700">{subscription.renewal_period}</span>
              </p>
              <p className="mb-2">
                <span className='text-black text-lg'>Status: </span><span className={`font-medium ${subscription.active ? 'text-green-600' : 'text-red-600'}`}>
                  {subscription.active ? 'Active' : 'Inactive'}
                </span>
              </p>
              {subscription.next_billing_date && (
                <p className="text-gray-600">
                  Next billing date: {new Date(subscription.next_billing_date).toLocaleDateString()}
                </p>
              )}
              <p className="text-gray-600">Monthly amount: KES 100,000</p>
            </div>
          ) : (
            <p className="text-gray-600">Loading subscription status...</p>
          )}
        </div>

        {/* Payment Method Selection */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4 text-black">Select Payment Method</h3>
          <div className="flex space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedPaymentMethod('mpesa')}
              className={`flex items-center px-4 py-2 rounded-lg ${
                selectedPaymentMethod === 'mpesa'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              <FaMobile className="mr-2" /> M-Pesa
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedPaymentMethod('card')}
              className={`flex items-center px-4 py-2 rounded-lg ${
                selectedPaymentMethod === 'card'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              <FaCreditCard className="mr-2" /> Card
            </motion.button>
          </div>
        </div>

        {/* Payment Form */}
        <form onSubmit={handlePayment} className="space-y-4">
          {selectedPaymentMethod === 'mpesa' && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="254..."
                className="mt-1 block w-full rounded-md 
                border-gray-300 shadow-sm focus:border-green-500
                 focus:ring-green-500 text-black"
                required
              />
            </div>
          )}

          {error && (
            <div className="text-red-600 text-sm">{error}</div>
          )}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${
              loading ? 'opacity-75 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Processing...' : 'Pay Now'}
          </motion.button>
        </form>

        {/* Payment Status */}
        {paymentStatus && (
          <div className={`mt-4 p-4 rounded-lg ${
            paymentStatus === 'completed' ? 'bg-green-50 text-green-700' :
            paymentStatus === 'pending' ? 'bg-yellow-50 text-yellow-700' :
            'bg-red-50 text-red-700'
          }`}>
            {paymentStatus === 'completed' && 'Payment completed successfully!'}
            {paymentStatus === 'pending' && 'Please check your phone to complete the payment...'}
            {paymentStatus === 'failed' && 'Payment failed. Please try again.'}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default BillingInformation;