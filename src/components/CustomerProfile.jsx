import { motion } from 'framer-motion';
import { useState } from 'react';
import { useApplicationSettings } from '../settings/ApplicationSettings';
import { FaUser, FaIdCard, FaPhone, FaEnvelope, FaMapMarkerAlt, FaHistory } from 'react-icons/fa';
import { BiLogOut } from "react-icons/bi";
import { MdLocationOn } from "react-icons/md";

const CustomerProfile = ({ onClose }) => {
  const { customerProfileData, handleCustomerLogout } = useApplicationSettings();
  const [activeTab, setActiveTab] = useState('profile');

  const profileFields = [
    { icon: <FaIdCard />, label: "Customer ID", value: customerProfileData?.customer_code },
    { icon: <FaUser />, label: "Name", value: customerProfileData?.name },
    { icon: <FaPhone />, label: "Phone", value: customerProfileData?.phone },
    { icon: <FaEnvelope />, label: "Email", value: customerProfileData?.email },
    { icon: <MdLocationOn />, label: "Location", value: customerProfileData?.location }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div 
        className="bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-hidden"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
      >
        {/* Profile Header */}
        <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 p-6 pb-24">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white text-2xl"
          >
            ×
          </button>
          <div className="text-white">
            <h2 className="text-2xl font-bold playwrite-de-grund">Customer Profile</h2>
            <p className="opacity-80">View your account details</p>
          </div>
        </div>

        {/* Profile Picture */}
        <div className="relative -mt-20 px-6">
          <motion.div 
            className="w-32 h-32 rounded-full border-4 border-white shadow-lg bg-white mx-auto overflow-hidden"
            whileHover={{ scale: 1.05 }}
          >
            <img 
              src={customerProfileData?.profile_image || "/images/default-avatar.png"} 
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </motion.div>
          <h3 className="text-center mt-4 text-xl font-semibold text-gray-800">
            {customerProfileData?.name || 'Customer Name'}
          </h3>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 px-6 mt-4">
          <button
            className={`flex-1 py-3 text-sm font-medium border-b-2 ${
              activeTab === 'profile' 
                ? 'border-blue-600 text-blue-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('profile')}
          >
            Profile Details
          </button>
          <button
            className={`flex-1 py-3 text-sm font-medium border-b-2 ${
              activeTab === 'history' 
                ? 'border-blue-600 text-blue-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('history')}
          >
            Collection History
          </button>
        </div>

        {/* Content */}
        <div className="overflow-auto max-h-[calc(90vh-400px)]">
          {activeTab === 'profile' ? (
            <div className="p-6 space-y-4">
              {profileFields.map((field, index) => (
                <motion.div
                  key={field.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <span className="text-blue-600 text-xl">{field.icon}</span>
                  <div>
                    <p className="text-sm text-gray-500">{field.label}</p>
                    <p className="font-medium text-gray-900">{field.value || 'Not provided'}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="p-6 space-y-4">
              {/* Collection History */}
              {customerProfileData?.collections?.map((collection, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 rounded-lg bg-gray-50 border border-gray-100"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-500">
                      {new Date(collection.date).toLocaleDateString()}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      collection.status === 'completed' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {collection.status}
                    </span>
                  </div>
                  <p className="text-gray-700">{collection.details}</p>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="p-6 border-t border-gray-100">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleCustomerLogout}
            className="w-full bg-red-500 text-white rounded-xl py-3 flex items-center justify-center gap-2 hover:bg-red-600 transition-colors"
          >
            <BiLogOut />
            Logout
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CustomerProfile; 