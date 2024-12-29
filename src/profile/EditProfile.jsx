import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useApplicationSettings } from '../settings/ApplicationSettings';
import Lottie from 'react-lottie';
import LoadingAnimation from '../animation/loading_animation.json';
import Backdrop from '@mui/material/Backdrop';
import UpdateAdminAlert from '../Alert/UpdateAdminAlert';
import UpdateAdminAlertError from '../Alert/UpdateAdminAlertError';
import Avatar from '@mui/material/Avatar';
import { FiKey, FiShield, FiCheck } from 'react-icons/fi';
import { Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Typography, Paper, Snackbar, Alert } from '@mui/material';
import { useLayoutSettings } from '../settings/LayoutSettings';



const EditProfile = () => {
  const {
    imagePreview,
    setImagePreview,
    updateFormData,
    setUpdateFormData,
    currentUserName,
    fetchUpdatedProfile,
    isOpenEditProfile, setisOpenEditProfile
  } = useApplicationSettings();


  const { settings, borderRadiusClasses } = useLayoutSettings();
  const [imageFile, setImageFile] = useState(null);
  const { email, phone_number, user_name } = updateFormData;
  const [openLoad, setOpenLoad] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openUpdateAdminAlert, setOpenUpdateAdminAlert] = useState(false);
  const [openUpdateAdminAlertError, setOpenUpdateAdminAlertError] = useState(false);
  const [hasPasskey, setHasPasskey] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [registrationStatus, setRegistrationStatus] = useState('');
  const [isloading, setisloading] = useState(false);
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(false);
  const [seeError, setSeeError] = useState(false);
  const [registrationError, setRegistrationError] = useState('');
  const [userNameError, setUserNameError] = useState('');
  const navigate = useNavigate();
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
});
  useEffect(() => {
    // Check if user has a passkey registered
    const checkPasskeyStatus = async () => {
      try {
        const response = await fetch('/check_passkey_status', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ user_name: user_name })
        });
        const data = await response.json();
        setHasPasskey(data.passkeyExists);
      } catch (error) {
        console.error('Error checking passkey status:', error);
      }
    };

    checkPasskeyStatus();
  }, [user_name]);



  useEffect(() => {
    fetchUpdatedProfile();
  }, [fetchUpdatedProfile, isOpenEditProfile]);


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

      const response = await fetch('/api/update_admin', {
        method: 'PATCH',
        body: formData
      });

      const data = await response.json();

      if (response.ok) {
        setUpdateFormData(prev => ({
          ...prev,
          email: data.email,
          phone_number: data.phone_number,
          user_name: data.user_name
        }));
        setImagePreview(data.profile_image);
        setOpenUpdateAdminAlert(true);
      } else {
        setOpenUpdateAdminAlertError(true);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setOpenUpdateAdminAlertError(true);
    } finally {
      setLoading(false);
      setOpenLoad(false);
    }
  };

  const handleCloseUpdateAdminAlert = () => {
    setOpenUpdateAdminAlert(false);
  };

  const handleCloseUpdateAdminAlertError = () => {
    setOpenUpdateAdminAlertError(false);
  };

  function arrayBufferToBase64Url(buffer) {
    const bytes = new Uint8Array(buffer);
    let binary = '';
    for (let i = 0; i < bytes.length; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary).replace(/\//g, '_').replace(/\+/g, '-').replace(/=+$/, '');
  }

  async function startPasskeyRegistration(e) {
    setIsRegistering(true);
    setRegistrationStatus('starting');
    
    e.preventDefault();
    setDone(false);
  
    const response = await fetch('/api/webauthn/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({  user_name })
    });
  
    const options = await response.json();
    setRegistrationStatus('authenticating');
    const challenge = options.challenge;

try {
  if (response.ok) {
    setRegistrationStatus('authenticating');
    setTimeout(()=> {
      setIsRegistering(false)
    }, 3000);
    setOpenLoad(false);
    setDone(false);
    setSeeError(false);
    
  } else {
    setOpenLoad(false);
    setSnackbar({
      open: true,
      message: options.error,
      severity: 'error'
    })
   
    setRegistrationStatus('error');
    setSeeError(true);
    setTimeout(() => {
      setIsRegistering(false)
    }, 3000);
    
    
    setDone(false);
    setRegistrationError(options.email);
    setUserNameError(options.user_name)
  }
} catch (error) {
  setTimeout(() => {
    setIsRegistering(false)
  }, 3000);
  setRegistrationStatus('error');
  setSeeError(true);
  setRegistrationError(options.email);
  setUserNameError(options.user_name)
    setOpenLoad(false);
    setDone(false);
}

 





    function base64UrlToBase64(base64Url) {
      return base64Url.replace(/_/g, '/').replace(/-/g, '+');
    }
  
    if (typeof options.user.id === 'string') {
      options.user.id = Uint8Array.from(atob(base64UrlToBase64(options.user.id)), c => c.charCodeAt(0));
    }
  
    if (typeof options.challenge === 'string') {
      options.challenge = Uint8Array.from(atob(base64UrlToBase64(options.challenge)), c => c.charCodeAt(0));
    }

    console.log('options.challenge:',options.challenge )
  
    try {
      const credential = await navigator.credentials.create({ publicKey: options });
  
  
      // Prepare the credential response
      const credentialJson = {
        id: credential.id,
        rp: {
          name: "aitechs",
        },
        // origin: 'http://localhost:5173',
        // origin: 'https://aitechs-sas-garbage-solution.onrender.com',
        rawId: arrayBufferToBase64Url(credential.rawId),
        type: credential.type,
        response: {
          attestationObject: arrayBufferToBase64Url(credential.response.attestationObject),
          clientDataJSON: arrayBufferToBase64Url(credential.response.clientDataJSON)
        },
        challenge: challenge

      };


      
  
      const createResponse = await fetch('/api/webauthn/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ credential: credentialJson, email, user_name})
      });
  
      const createResponseJson = await createResponse.json();
  

      if (createResponse.ok) {
        setOpen(true);
        setSeeError(false);
        setsignupFormData('')
        setOpenLoad(false);
        setisloading(false);
        setHasPasskey(true);
        setTimeout(() => {
          setIsRegistering(false)
        }, 3000);
        setRegistrationStatus('success');
       

        
      } else {
        setisloading(false);
        setSnackbar({
          open: true,
          message: options.error,
          severity: 'error'
        })
        console.log('signup failed');
        setOpen(false);
        // setRegistrationError(options.errors);
        setSeeError(true);
        setOpenLoad(false);
      }
    } catch (err) {
      setisloading(false);
      setOpen(false);
      setSeeError(true);
      setOpenLoad(false);
      console.error('Error during WebAuthn credential creation:', err);
    }
  }








  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: LoadingAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };




  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({
        ...prev,
        open: false
    }));
};

  return (
    <>
     <Snackbar 
                open={snackbar.open} 
                autoHideDuration={6000} 
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert 
                    onClose={handleCloseSnackbar} 
                    severity={snackbar.severity}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>

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
              className="fixed inset-0 z-[999] overflow-y-auto "
            >
              <section className="bg-gray-400 bg-opacity-50 h-[150vh] backdrop-blur-xl" >
                <div className="mx-auto container max-w-2xl md:w-3/4
                 shadow-md">
                  <div className="bg-gray-100 p-4 border-t-2 
                  bg-opacity-5 border-emerald-400 rounded-t">
                    <div className="max-w-sm mx-auto md:w-full  md:mx-0">
                      <div className="inline-flex items-center space-x-4">
                        <Avatar
                          src={imagePreview || "/path/to/default/avatar.jpg"}
                          alt={user_name}
                          className="w-10 h-10 object-cover rounded-full"
                        />
                        <h1 className="text-black text-2xl">{user_name}</h1>
                      </div>
                    </div>
                  </div>

                  <div className={`bg-white space-y-6 ${borderRadiusClasses[settings.borderRadius]}`}>
                    {/* Email Section */}
                    <div className="md:inline-flex space-y-4 md:space-y-0 w-full p-4 text-black items-center">
                      <h2 className="md:w-1/3 max-w-sm mx-auto text-xl">Account</h2>
                      <div className="md:w-2/3 max-w-sm mx-auto">
                        <label className=" text-black text-xl">Email</label>
                        <div className="w-full inline-flex border">
                          <div className="pt-2 w-1/12  bg-gray-100">
                            <svg
                              fill="none"
                              className="w-6 text-black mx-auto"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z"
                              />
                            </svg>
                          </div>
                          <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => setUpdateFormData({ ...updateFormData, email: e.target.value })}
                            className="w-11/12 focus:outline-none focus:text-black p-2 text-xl"
                            placeholder="email@example.com"
                          />
                        </div>
                      </div>
                    </div>

                    <hr />

                    {/* Personal Info Section */}
                    <div className="md:inline-flex space-y-4 md:space-y-0 w-full p-4 text-black items-center">
                      <h2 className="md:w-1/3 mx-auto max-w-sm  text-xl">Personal info</h2>
                      <div className="md:w-2/3 mx-auto max-w-sm space-y-5">
                        <div>
                          <label className="text-xl text-black">Full name</label>
                          <div className="w-full inline-flex border">
                            <div className="w-1/12 pt-2 bg-gray-100">
                              <svg
                                fill="none"
                                className="w-6 text-black mx-auto"
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
                              className="w-11/12 focus:outline-none focus:text-black
                               p-2 text-xl"
                              placeholder="Your full name"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="text-xl text-black">Phone number</label>
                          <div className="w-full inline-flex border">
                            <div className="pt-2 w-1/12 bg-gray-100">
                              <svg
                                fill="none"
                                className="w-6 text-black mx-auto"
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
                              className="w-11/12 focus:outline-none focus:text-black
                               p-2 text-xl"
                              placeholder="Your phone number"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <hr />

                    {/* Password Section */}
                    <div className="md:inline-flex space-y-4 md:space-y-0 w-full p-4
                     text-black items-center">
                      <h2 className="md:w-1/3 max-w-sm mx-auto text-xl">Password</h2>
                      <div className="md:w-2/3 max-w-sm mx-auto">
                        <label className="text-xl text-black">New Password</label>
                        <div className="w-full inline-flex border">
                          <div className="pt-2 w-1/12 bg-gray-100">
                            <svg
                              fill="none"
                              className="w-6 text-black mx-auto"
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
                            className="w-11/12 focus:outline-none focus:text-black p-2
                            text-xl"
                            placeholder="Enter new password"
                          />
                        </div>
                        <p className="text-xl text-black mt-1">Leave blank if you don't want to change password</p>
                      </div>
                    </div>

                    <hr />

                    {/* Passkey Security Section */}
                    <div className="md:inline-flex space-y-4 md:space-y-0 w-full p-4 text-black items-center">
                      <h2 className="md:w-1/3 max-w-sm mx-auto flex items-center">
                        <FiShield className="mr-2 text-xl" /> <p className='text-xl'>Security Key</p> 
                      </h2>
                      <div className="md:w-2/3 max-w-sm mx-auto">
                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-2">
                              <FiKey className={hasPasskey ? "text-emerald-500" : "text-black "} />
                              <span className="font-medium text-black text-2xl">Passkey Status</span>
                            </div>
                            {hasPasskey && (
                              <span className="flex items-center text-emerald-500">
                                <FiCheck className="mr-1" /> Registered
                              </span>
                            )}
                          </div>
                          
                          <p className="text-xl text-black mb-4">
                            {hasPasskey 
                              ? "Your account is secured with a passkey. You can use it to sign in quickly and securely."
                              : "Enhance your account security by registering a passkey for passwordless authentication."}
                          </p>

                          <Tooltip title={
                            hasPasskey 
                              ?    <p className="text-xl">You already have a registered passkey </p> 
                              :  <p className="text-xl"> Register a new passkey for secure access</p>
                          }>
                            <div>
                              <button
                                type="button"
                                onClick={startPasskeyRegistration}
                                disabled={hasPasskey || isRegistering}
                                className={`w-full flex items-center justify-center space-x-2 px-4 py-2 rounded-md 
                                  ${hasPasskey 
                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                                    : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                                  } transition-colors duration-200`}
                              >
                                {isRegistering ? (
                                  <>
                                    <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-emerald-700"></span>
                                    <span>{
                                      registrationStatus === 'starting' ? 'Initializing...' :
                                      registrationStatus === 'authenticating' ? 'Verify on your device...' :
                                      registrationStatus === 'success' ? 'Successfully registered!' :
                                      registrationStatus === 'error' ? 'Registration failed' :
                                      'Processing...'
                                    }</span>
                                  </>
                                ) : (
                                  <>
                                    <FiKey />
                                    <span>{hasPasskey ? 'Passkey Registered' : 'Register Passkey'}</span>
                                  </>
                                )}
                              </button>
                            </div>
                          </Tooltip>
                        </div>
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