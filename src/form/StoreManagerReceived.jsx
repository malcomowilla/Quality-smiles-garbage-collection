import { motion, AnimatePresence } from "framer-motion";
import { useState } from 'react';
import { Button, Label, TextInput } from "flowbite-react";
import { useNavigate } from 'react-router-dom';
import { FaHandPointLeft, FaBoxOpen } from "react-icons/fa";
import { MdInventory } from "react-icons/md";
import { useApplicationSettings } from '../settings/ApplicationSettings';
import StoreManagerReceivedAlert from '../Alert/StoreManagerReceivedAlert';
import StoreManagerReceivedError from '../Alert/StoreManagerReceivedError';

const StoreManagerReceived = () => {
  const navigate = useNavigate();
  const { storeManagerSet, handleChangeStoreSet, companySettings } = useApplicationSettings();
  const {company_name, contact_info, email_info, logo_preview} = companySettings
  const [loading, setloading] = useState(false);
  const [openStoreManagerReceived, setopenStoreManagerReceived] = useState(false);
  const [openStoreManagerError, setopenStoreManagerError] = useState(false);

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    },
    exit: { opacity: 0, y: -20 }
  };

  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 300 }
    }
  };

  const confirmBag = async(e) => {
    e.preventDefault();
    try {
      setloading(true);
      const response = await fetch('/api/confirm_bag_received_from_customer', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(storeManagerSet)
      });
      
      setloading(false);
      if (response.ok) {
        setopenStoreManagerReceived(true);
      } else {
        setopenStoreManagerError(true);
      }
    } catch (error) {
      setloading(false);
      setopenStoreManagerError(true);
    }
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {openStoreManagerReceived && (
          <StoreManagerReceivedAlert 
            openStoreManagerReceived={openStoreManagerReceived} 
            handleCloseStoreManagerReceived={() => setopenStoreManagerReceived(false)}
          />
        )}
        {openStoreManagerError && (
          <StoreManagerReceivedError  
            openStoreManagerError={openStoreManagerError} 
            handleCloseStoreManagerError={() => setopenStoreManagerError(false)}
          />
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gradient-to-b from-gray-50 to-white px-4 py-8
        flex items-center justify-center"
      >
        <motion.section 
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="max-w-2xl mx-auto"
        >
          {/* Logo Section */}
          <motion.div 
            variants={itemVariants}
            className="text-center mb-12"
          >
            <motion.div
              whileHover={{ scale: 1.05, rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="inline-block mb-4"
            >
              <img 
                src={logo_preview}
                className="w-40 h-40 rounded-full shadow-2xl" 
                alt={company_name}
              />
            </motion.div>
            <motion.h1 
              variants={itemVariants}
              className="text-4xl md:text-5xl playwrite-de-grund tracking-wides
              t text-gray-900 font-serif font-light"
            >
              {company_name}
            </motion.h1>
          </motion.div>

          {/* Main Card */}
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-2xl shadow-lg p-6 md:p-8"
          >
            <div className="flex items-center gap-4 mb-8">
              <MdInventory className="text-4xl text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900
               playwrite-de-grund">
                Confirm Received Bags
              </h2>
            </div>

            <form onSubmit={confirmBag} className="space-y-6">
              <motion.div
                variants={itemVariants}
                className="relative"
              >
                <Label 
                  htmlFor="bags-received" 
                  className="text-gray-700 playwrite-de-grund mb-2 block"
                >
                  Number Of Bags Received
                </Label>
                <div className="relative">
                  <FaBoxOpen className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black text-xl" />
                  <TextInput
                    id="bags-received"
                    type="number"
                    name="number_of_bags_received"
                    value={storeManagerSet.number_of_bags_received}
                    onChange={handleChangeStoreSet}
                    className="pl-10"
                    placeholder="Enter number of bags"
                    style={{
                      backgroundColor: 'white',
                      color: 'black',
                      fontSize: '1.5rem'
                    }}
                  />
                </div>
              </motion.div>

              {/* Action Buttons */}
              <div className="space-y-4 pt-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl 
                    py-3 flex items-center justify-center gap-2 shadow-lg transform transition-all duration-200"
                >
                  {loading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                  ) : null}
                  <p className='text-xl'>Confirm Reception</p>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02, x: -5 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate(-1)}
                  type="button"
                  className="w-full flex items-center justify-center gap-2 text-gray-600 hover:text-gray-900 py-3"
                >
                  <FaHandPointLeft  className='text-2xl' />
                  <span className="playwrite-de-grund text-xl">Go Back</span>
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.section>
      </motion.div>
    </>
  );
};

export default StoreManagerReceived;





















