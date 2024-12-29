import { AnimatePresence, motion } from "framer-motion";
import { FiAlertCircle } from "react-icons/fi";
import { useState, useEffect, useCallback } from "react";
import { useApplicationSettings } from '../settings/ApplicationSettings'
import { ImSpinner9 } from "react-icons/im";
import { useDebounce } from 'use-debounce';

// iOS-like animation variants
const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.2, ease: [0.4, 0, 1, 1] }
  }
};

const modalVariants = {
  hidden: { 
    y: '100%',
    opacity: 0,
    scale: 0.98
  },
  visible: { 
    y: 0,
    opacity: 1,
    scale: 1,
    transition: { 
      type: "spring",
      damping: 30,
      stiffness: 300,
      duration: 0.3
    }
  },
  exit: { 
    y: 20,
    opacity: 0,
    scale: 0.98,
    transition: { 
      duration: 0.2,
      ease: [0.4, 0, 1, 1]
    }
  }
};

const dropdownVariants = {
  hidden: { 
    opacity: 0,
    y: -10,
    scale: 0.95,
    transformOrigin: "top"
  },
  visible: { 
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      damping: 25,
      stiffness: 300
    }
  },
  exit: { 
    opacity: 0,
    y: -10,
    scale: 0.95,
    transition: { 
      duration: 0.2
    }
  }
};

const StoreForm = ({
  isOpen,
  setIsOpen,
  handleAddStore,
  handleCloseRegistrationForm,
  seeStoreNumber,
  loading,
  storeManagerForm,
  setStoreManagerForm,
}) => {
  const { storeForm, setStoreForm } = useApplicationSettings()

  const { store_number, amount_of_bags, location, sub_location } = storeForm

  const [searchInput] = useDebounce(sub_location, 1000)
  const [searchInput2] = useDebounce(location, 1000)

  const [selectedOption, setSelectedOption] = useState('Pick Location?');
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);

  const [inputValue, setInputValue] = useState('');
  const [sublocations, setSubLocation] = useState([]);
  const [locations, setLocation] = useState([]);

  const handleOptionClick = (option) => {
    setStoreForm((prev) => ({ ...prev, sub_location: option }))
    setOpen(false);
    console.log('sublocation chooosed', option)
  };

  const handleOptionClick2 = (option) => {
    setStoreForm((prev) => ({ ...prev, location: option }))
    setOpen2(false);
    console.log('sublocation chooosed', option)
  };

  const getSubLocation = useCallback(
    async () => {
      try {
        const response = await fetch('/api/get_sub_locations')
        const newData = await response.json()
        if (response.ok) {
          setSubLocation(newData.filter((place) => {
            return sub_location.toUpperCase() === '' ? place : place.name.toUpperCase().includes(sub_location);
          }))
        } else {
          console.log('error')
        }
      } catch (error) {
        console.log(error)
      }
    },
    [sub_location],
  )

  useEffect(() => {
    getSubLocation()
  }, [getSubLocation, searchInput]);

  const getLocation = useCallback(
    async () => {
      try {
        const response = await fetch('/api/get_locations')
        const newData = await response.json()
        if (response.ok) {
          setLocation(newData.filter((place) => {
            return location.toUpperCase() === '' ? place : place.location_name.toUpperCase().includes(location);
          }))
        } else {
          console.log('error')
        }
      } catch (error) {
        console.log(error)
      }
    },
    [location],
  )

  useEffect(() => {
    getLocation()
  }, [getLocation, searchInput2]);

  const handleCloseSubLocationForm = (e) => {
    e.preventDefault()
    setIsOpen(false)
  }

  const capitalizePrefix = (prefix) => {
    if (prefix.startsWith('')) {
      return prefix.toUpperCase()
    }
    return prefix
  }

  const handleChange = (e) => {
    setOpen(true);

    const { name, value } = e.target
    const capitalizeForm = capitalizePrefix(value)
    setStoreForm((prevData) => (
      { ...prevData, [name]: capitalizeForm }
    ))
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        >
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="bg-white text-black w-full max-w-lg rounded-t-3xl 
            sm:rounded-3xl shadow-2xl cursor-default relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mt-3 mb-2 sm:hidden" />

            <div className="p-6 relative">
              <FiAlertCircle className="text-gray-100 rotate-12 text-[250px] absolute z-0 -top-24 -left-24" />

              <div className="relative z-10 space-y-6">
                <h3 className="text-2xl font-semibold text-center playwrite-de-grund">
                  Add Store
                </h3>

                <form className="space-y-5" onSubmit={handleAddStore}>
                  <div>
                    <label className="block mb-2 text-sm font-medium playwrite-de-grund text-gray-700">
                      Total Amount Of Bags
                    </label>
                    <input
                      type="number"
                      name="amount_of_bags"
                      value={amount_of_bags}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-2xl border
                       border-gray-200 focus:border-green-500 focus:ring 
                       focus:ring-green-200 transition-all bg-gray-50"
                    />
                  </div>

                  {seeStoreNumber && (
                    <div>
                      <label className="block mb-2 text-sm font-medium playwrite-de-grund text-gray-700">
                        Store Number
                      </label>
                      <input
                        value={store_number}
                        onChange={handleChange}
                        type="text"
                        name="store_number"
                        className="w-full px-4 py-3 rounded-2xl border
                         border-gray-200 focus:border-gree-500 focus:ring 
                         focus:ring-blue-200 transition-all bg-gray-50"
                      />
                    </div>
                  )}

                  <div className="relative">
                    <label className="block mb-2 text-sm font-medium playwrite-de-grund text-gray-700">
                      Pick Sub Location
                    </label>
                    <input
                      type="text"
                      name="sub_location"
                      value={sub_location}
                      onChange={handleChange}
                      onFocus={() => setOpen(true)}
                      className="w-full px-4 py-3 rounded-2xl 
                      border border-gray-200 focus:border-green-500 
                      focus:ring focus:ring-green-200 transition-all bg-gray-50"
                    />
                    <AnimatePresence>
                      {open && sublocations.length > 0 && (
                        <motion.div
                          variants={dropdownVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          className="absolute top-full left-0 w-full bg-white rounded-2xl mt-2 shadow-lg border border-gray-100 overflow-hidden z-20"
                        >
                          {sublocations.map((sublocation, index) => (
                            <motion.div
                              key={index}
                              whileHover={{ backgroundColor: '#f3f4f6' }}
                              whileTap={{ backgroundColor: '#e5e7eb' }}
                              className="px-4 py-3 cursor-pointer transition-colors"
                              onClick={() => handleOptionClick(sublocation.name)}
                            >
                              {sublocation.name}
                            </motion.div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="relative">
                    <label className="block mb-2 text-sm font-medium playwrite-de-grund text-gray-700">
                      Pick Location
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={location}
                      onChange={handleChange}
                      onFocus={() => setOpen2(true)}
                      className="w-full px-4 py-3 rounded-2xl border
                       border-gray-200 focus:border-green-500 focus:ring 
                       focus:ring-green-200 transition-all bg-gray-50"
                    />
                    <AnimatePresence>
                      {open2 && locations.length > 0 && (
                        <motion.div
                          variants={dropdownVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          className="absolute top-full left-0 w-full bg-white rounded-2xl mt-2 shadow-lg border border-gray-100 overflow-hidden z-20"
                        >
                          {locations.map((place, index) => (
                            <motion.div
                              key={index}
                              whileHover={{ backgroundColor: '#f3f4f6' }}
                              whileTap={{ backgroundColor: '#e5e7eb' }}
                              className="px-4 py-3 cursor-pointer transition-colors"
                              onClick={() => handleOptionClick2(place.location_name)}
                            >
                              {place.location_name}
                            </motion.div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <motion.button
                      type="submit"
                      disabled={loading}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 font-medium 
                        bg-secondary text-white rounded-2xl transition-all
                         hover:bg-hover disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading && <ImSpinner9 className="animate-spin" />}
                      Submit
                    </motion.button>

                    <motion.button
                      onClick={handleCloseSubLocationForm}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 px-6 py-3.5 font-medium 
                       text-gray-700 rounded-2xl transition-all
                        hover:bg-red-500 bg-warn_primary"
                    >
                      Cancel
                    </motion.button>
                  </div>
                </form>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StoreForm;