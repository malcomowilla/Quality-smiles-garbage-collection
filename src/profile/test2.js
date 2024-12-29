import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useApplicationSettings } from '../settings/ApplicationSettings';
import Lottie from 'react-lottie';
import LoadingAnimation from '../animation/loading_animation.json';
import Backdrop from '@mui/material/Backdrop';
import UpdateAdminAlert from '../Alert/UpdateAdminAlert';
import UpdateAdminAlertError from '../Alert/UpdateAdminAlertError';
import Avatar from '@mui/material/Avatar';

const EditProfile = ({ isOpenEditProfile, setisOpenEditProfile }) => {
  const {
    imagePreview,
    setImagePreview,
    updateFormData,
    setUpdateFormData,
    user_name
  } = useApplicationSettings();

  const [imageFile, setImageFile] = useState(null);
  const { email, phone_number } = updateFormData;
  const [openLoad, setOpenLoad] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openUpdateAdminAlert, setOpenUpdateAdminAlert] = useState(false);
  const [openUpdateAdminAlertError, setOpenUpdateAdminAlertError] = useState(false);

  const handleCloseUpdateAdminAlertError = () => {
    setOpenUpdateAdminAlertError(false);
  };

  const handleCloseUpdateAdminAlert = () => {
    setOpenUpdateAdminAlert(false);
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    setOpenLoad(true);

    try {
      const formData = new FormData();
      formData.append('email', updateFormData.email);
      formData.append('user_name', updateFormData.user_name);
      formData.append('phone_number', updateFormData.phone_number);
      formData.append('password', updateFormData.password);
      imageFile && formData.append('profile_image', imageFile);

      const response = await fetch(`/api/update_admin/${updateFormData.id}`, {
        method: 'PATCH',
        body: formData
      });

      const newData = await response.json();

      const email = newData.email;
      const phone_number = newData.phone_number;
      const user_name = newData.user_name;

      if (response.ok) {
        setUpdateFormData((prev) => ({ ...prev, email, phone_number, user_name }));
        setImagePreview(newData.profile_image);
        setOpenUpdateAdminAlert(true);
      } else {
        setOpenUpdateAdminAlertError(true);
      }
      setLoading(false);
    } catch (error) {
      setOpenUpdateAdminAlertError(true);
      setLoading(false);
    }
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: LoadingAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <>
      <UpdateAdminAlert openUpdateAdminAlert={openUpdateAdminAlert} handleCloseUpdateAdminAlert={handleCloseUpdateAdminAlert} />
      <UpdateAdminAlertError openUpdateAdminAlertError={openUpdateAdminAlertError} handleCloseUpdateAdminAlertError={handleCloseUpdateAdminAlertError} />
      
      {loading && (
        <Backdrop open={openLoad} sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <Lottie options={defaultOptions} height={400} width={400} />
        </Backdrop>
      )}

      <AnimatePresence>
        {isOpenEditProfile && (
          <form onSubmit={handleUpdateProfile}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 overflow-y-auto"
            >
              <section className="py-40 bg-gray-100 bg-opacity-50 h-screen">
                <div className="mx-auto container max-w-2xl md:w-3/4 shadow-md">
                  <div className="bg-gray-100 p-4 border-t-2 bg-opacity-5 border-emerald-400 rounded-t">
                    <div className="max-w-sm mx-auto md:w-full md:mx-0">
                      <div className="inline-flex items-center space-x-4">
                        <Avatar
                          src={imagePreview || "/path/to/default/avatar.jpg"}
                          alt={user_name}
                          className="w-10 h-10 object-cover rounded-full"
                        />
                        <h1 className="text-gray-600">{user_name}</h1>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white space-y-6">
                    {/* Email Section */}
                    <div className="md:inline-flex space-y-4 md:space-y-0 w-full p-4 text-gray-500 items-center">
                      <h2 className="md:w-1/3 max-w-sm mx-auto">Account</h2>
                      <div className="md:w-2/3 max-w-sm mx-auto">
                        <label className="text-sm text-gray-400">Email</label>
                        <div className="w-full inline-flex border">
                          <div className="pt-2 w-1/12 bg-gray-100">
                            <svg
                              fill="none"
                              className="w-6 text-gray-400 mx-auto"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                              />
                            </svg>
                          </div>
                          <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => setUpdateFormData({ ...updateFormData, email: e.target.value })}
                            className="w-11/12 focus:outline-none focus:text-gray-600 p-2"
                            placeholder="email@example.com"
                          />
                        </div>
                      </div>
                    </div>

                    <hr />

                    {/* Personal Info Section */}
                    <div className="md:inline-flex space-y-4 md:space-y-0 w-full p-4 text-gray-500 items-center">
                      <h2 className="md:w-1/3 mx-auto max-w-sm">Personal info</h2>
                      <div className="md:w-2/3 mx-auto max-w-sm space-y-5">
                        <div>
                          <label className="text-sm text-gray-400">Full name</label>
                          <div className="w-full inline-flex border">
                            <div className="w-1/12 pt-2 bg-gray-100">
                              <svg
                                fill="none"
                                className="w-6 text-gray-400 mx-auto"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                />
                              </svg>
                            </div>
                            <input
                              type="text"
                              name="user_name"
                              value={user_name}
                              onChange={(e) => setUpdateFormData({ ...updateFormData, user_name: e.target.value })}
                              className="w-11/12 focus:outline-none focus:text-gray-600 p-2"
                              placeholder="Your full name"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="text-sm text-gray-400">Phone number</label>
                          <div className="w-full inline-flex border">
                            <div className="pt-2 w-1/12 bg-gray-100">
                              <svg
                                fill="none"
                                className="w-6 text-gray-400 mx-auto"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                                />
                              </svg>
                            </div>
                            <input
                              type="text"
                              name="phone_number"
                              value={phone_number}
                              onChange={(e) => setUpdateFormData({ ...updateFormData, phone_number: e.target.value })}
                              className="w-11/12 focus:outline-none focus:text-gray-600 p-2"
                              placeholder="Your phone number"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <hr />

                    {/* Password Section */}
                    <div className="md:inline-flex space-y-4 md:space-y-0 w-full p-4 text-gray-500 items-center">
                      <h2 className="md:w-1/3 max-w-sm mx-auto">Password</h2>
                      <div className="md:w-2/3 max-w-sm mx-auto">
                        <label className="text-sm text-gray-400">New Password</label>
                        <div className="w-full inline-flex border">
                          <div className="pt-2 w-1/12 bg-gray-100">
                            <svg
                              fill="none"
                              className="w-6 text-gray-400 mx-auto"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                              />
                            </svg>
                          </div>
                          <input
                            type="password"
                            name="password"
                            onChange={(e) => setUpdateFormData({ ...updateFormData, password: e.target.value })}
                            className="w-11/12 focus:outline-none 
                            focus:text-gray-600 p-2"
                            placeholder="Enter new password"
                          />
                        </div>
                        <p className="text-xs text-gray-400 mt-1">Leave
                           blank if you don't want to change password</p>
                      </div>
                    </div>

                    <hr />

                    {/* Profile Image Section */}
                    <div className="md:inline-flex space-y-4 md:space-y-0 w-full p-4 text-gray-500 items-center">
                      <h2 className="md:w-1/3 max-w-sm mx-auto">Profile Image</h2>
                      <div className="md:w-2/3 max-w-sm mx-auto">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            setImageFile(e.target.files[0]);
                            setImagePreview(URL.createObjectURL(e.target.files[0]));
                          }}
                          className="w-full text-sm text-gray-500
                            file:mr-4 file:py-2 file:px-4
                            file:rounded-full file:border-0
                            file:text-sm file:font-semibold
                            file:bg-emerald-50 file:text-emerald-700
                            hover:file:bg-emerald-100"
                        />
                      </div>
                    </div>

                    <hr />

                    {/* Action Buttons */}
                    <div className="w-full p-4 text-right space-x-4">
                      <button
                        type="button"
                        onClick={() => setisOpenEditProfile(false)}
                        className="inline-flex items-center px-4 py-2 border border-gray-300 
                          rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white 
                          hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 
                          focus:ring-emerald-500"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="inline-flex items-center px-4 py-2 border border-transparent 
                          rounded-md shadow-sm text-sm font-medium text-white bg-emerald-500 
                          hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 
                          focus:ring-emerald-500"
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              </section>
            </motion.div>
          </form>
        )}
      </AnimatePresence>
    </>
  );
};

export default EditProfile;