import { AnimatePresence, motion } from "framer-motion";
import { FiMessageSquare, FiX, FiSend } from "react-icons/fi";
import { useState, useEffect } from "react";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import * as React from 'react';

const SmsForm = ({ isOpen, setIsOpen, message, setMessage }) => {

  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;

  const handleChange = (e) => {
    const { name, id, value } = e.target
    setMessage((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  function sleep(duration) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, duration);
    });
  }

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      await sleep(1e3); // For demo purposes.

      if (active) {
        setOptions([...topFilms]);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  const topFilms = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
    { title: "Schindler's List", year: 1993 },
    {
      title: 'Star Wars: Episode V - The Empire Strikes Back',
      year: 1980,
    },
    { title: 'Forrest Gump', year: 1994 },
    { title: 'Inception', year: 2010 },
    {
      title: 'The Lord of the Rings: The Two Towers',
      year: 2002,
    },
    { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
    { title: 'Goodfellas', year: 1990 },
    { title: 'The Matrix', year: 1999 },
    { title: 'Seven Samurai', year: 1954 },
    {
      title: 'Star Wars: Episode IV - A New Hope',
      year: 1977,
    },
  ];

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", duration: 0.3, bounce: 0.4 }
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.2 }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/30 backdrop-blur-[2px] z-50 flex items-center justify-center p-4"
        >
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={e => e.stopPropagation()}
            className="bg-white w-full max-w-[500px] rounded-2xl shadow-lg overflow-hidden"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="bg-blue-50 p-2 rounded-lg">
                  <FiMessageSquare className="text-xl text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">New Message</h3>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <FiX className="text-xl text-gray-500" />
              </motion.button>
            </div>

            <form className="p-6">
              <div className="space-y-5">
                <Autocomplete

                  id="asynchronous-demo"
                  sx={{
                    '& label.Mui-focused': { color: 'black' },
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '10px',
                      backgroundColor: '#f8fafc',
                      '&.Mui-focused': {
                        backgroundColor: '#fff',
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'green',
                          borderWidth: '2px',
                        }
                      }
                    },
                    '& .MuiAutocomplete-input': {
                      padding: '10px 4px !important'
                    }
                  }}
                  open={open}
                  onOpen={() => setOpen(true)}
                  onClose={() => setOpen(false)}
                  isOptionEqualToValue={(option, value) => option.title === value.title}
                  getOptionLabel={(option) => option.title}
                  options={options}
                  loading={loading}
                  renderInput={(params) => (
                    <TextField
                    className='myTextField'
                      {...params}
                      label="Select Recipient"
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <React.Fragment>
                            {loading ? <CircularProgress color="inherit" size={20} /> : null}
                            {params.InputProps.endAdornment}
                          </React.Fragment>
                        ),
                      }}
                    />
                  )}
                />

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <textarea
                    rows={5}
                    placeholder="Type your message here..."
                    name="message"
                    value={message.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 text-gray-700 bg-gray-50 rounded-xl border border-gray-200
                    focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-blue-100 
                    transition-all duration-200 resize-none outline-none"
                  />
                </motion.div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={(e) => {
                    e.preventDefault();
                    setIsOpen(false);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-gray-100 text-gray-700 font-medium 
                  hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="px-5 py-2.5 rounded-xl
                   bg-green-600 text-white font-medium 
                  hover:bg-blue-700 transition-colors 
                  flex items-center gap-2"
                >
                  <FiSend className="text-lg" />
                  Send Message
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SmsForm;