import { motion } from 'framer-motion';
import { useState } from 'react';
import { useApplicationSettings } from '../settings/ApplicationSettings';
import { FaUser, FaIdCard, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { BiLogOut } from "react-icons/bi";

const ServiceProviderProfile = ({ onClose }) => {
  console.log('Profile component mounted');
  
  const { providerData, handleLogout } = useApplicationSettings();
  const [loading, setLoading] = useState(false);

  const profileFields = [
    { icon: <FaIdCard />, label: "Provider ID", value: providerData?.provider_code },
    { icon: <FaUser />, label: "Name", value: providerData?.name },
    { icon: <FaPhone />, label: "Phone", value: providerData?.phone },
    { icon: <FaEnvelope />, label: "Email", value: providerData?.email },
    { icon: <FaMapMarkerAlt />, label: "Area", value: providerData?.location
    }
  ];

  return (
    <motion.div
      key="profile-modal"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center
       justify-center p-4"
    >
      <motion.div 
        key="profile-content"
        className="bg-white rounded-2xl shadow-xl max-w-md w-full overflow-hidden"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
      >
        {/* Profile Header */}
        <div className="relative bg-gradient-to-r from-green-600 to-teal-600
         p-6 pb-24">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white"
          >
            ×
          </button>
          <div className="text-white">
            <h2 className="text-2xl font-bold playwrite-de-grund">Service Provider Profile</h2>
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
              src={providerData?.profile_image || "/images/default-avatar.png"} 
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>

        {/* Profile Details */}
        <div className="p-6 space-y-4">
          {profileFields.map((field, index) => (
            <motion.div
              key={`${field.label}-${index}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <span className="text-green-600 text-xl">{field.icon}</span>
              <div>
                <p className="text-sm text-gray-500">{field.label}</p>
                <p className="font-medium text-gray-900">{field.value || 'Not provided'}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Actions */}
        <div className="p-6 pt-0">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-red-500 text-white rounded-xl py-3 flex items-center justify-center gap-2 hover:bg-red-600 transition-colors"
            onClick={handleLogout}
          >
            <BiLogOut />
            Logout
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ServiceProviderProfile; 