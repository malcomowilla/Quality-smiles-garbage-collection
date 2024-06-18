import { AnimatePresence, motion } from "framer-motion";
import { FiAlertCircle } from "react-icons/fi";
import { useState } from "react";

const CustomerRegistrationForm = ({isOpen, setIsOpen}) => {
  return (
    
      <SpringModal isOpen={isOpen} setIsOpen={setIsOpen} />
  );
};

const SpringModal = ({ isOpen, setIsOpen }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll 
          cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0, rotate: "12.5deg" }}
            animate={{ scale: 1, rotate: "0deg" }}
            exit={{ scale: 0, rotate: "0deg" }}
            onClick={(e) => e.stopPropagation()}
            className="bg-gradient-to-br from-green-600 to-teal-600 text-white p-6 rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-hidden"
          >
            <div className="relative z-10">
             
              <h3 className="text-3xl font-bold text-center mb-2">
                Customer Registration
              </h3>
             

<form className="max-w-sm mx-auto">
  <div className="mb-5">
    <label htmlFor="email" className="block  mb-2 text-sm font-medium  dark:text-white">Your email</label>
    <input type="text" id="password"  className="input  focus:input-accent input-bordered input-lg w-full  bg-transparent"required />

  </div>
  <div className="mb-5">
    <label htmlFor="password" className="block mb-2 text-sm font-medium  dark:text-white">Your PhoneNumber</label>
    <input type="text" id="password"  className="input   focus:input-accent input-bordered input-lg w-full  bg-transparent"required />
  </div>

  <div className="mb-5">
    <label htmlFor="password" className="block mb-2 text-sm font-medium  dark:text-white">Your Name</label>
    <input type="text" id="password"  className="input   focus:input-accent input-bordered input-lg w-full  bg-transparent"required />
  </div>



  <div className="mb-5">
    <label htmlFor="password" className="block mb-2 text-sm font-medium dark:text-white">Amount paid</label>
    <input type="text" id="password"  className="input  focus:input-accent   input-bordered input-lg w-full  bg-transparent"required />
  </div>

</form>

              <div className="flex gap-8">
              <button type="submit" className="btn btn-active">Submit</button>

                <button
                  onClick={() => setIsOpen(false)}
                  className="btn btn-outline btn-error "
                >
                    Cancel
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default  CustomerRegistrationForm;