import { AnimatePresence, motion } from "framer-motion";
import { FiAlertCircle } from "react-icons/fi";
import { useState, useEffect, useCallback } from "react";
import {useApplicationSettings} from '../settings/ApplicationSettings'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { ImSpinner9 } from "react-icons/im";
import { TbLetterX } from "react-icons/tb";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import TextField from '@mui/material/TextField';
import Lottie from 'react-lottie';
import LoadingAnimation from '../animation/loading_animation.json'
import Backdrop from '@mui/material/Backdrop';
import UpdateAdminAlert from '../Alert/UpdateAdminAlert'
import UpdateAdminAlertError from '../Alert/UpdateAdminAlertError'
import Avatar from '@mui/material/Avatar';





const EditProfile = ({ isOpenEditProfile, setisOpenEditProfile}) => {





  const {id, imagePreview, setImagePreview, updateFormData, setUpdateFormData,
    user_name
  } = useApplicationSettings()
 




const [imageFile, setImageFile] = useState(null)
const { email, phone_number, password} = updateFormData
const [openLoad, setopenLoad] = useState(false)
const [loading, setloading] = useState(false)
const [openUpdateAdminAlert, setopenUpdateAdminAlert] = useState(false)
const [openUpdateAdminAlertError, setopenUpdateAdminAlertError] = useState(false)



const handleCloseUpdateAdminAlertError = ()=> {
  setopenUpdateAdminAlertError(false)
}


const handleCloseUpdateAdminAlert = ()=> {
  setopenUpdateAdminAlert(false)
}



const handleUpdateProfile = async(e)=>{
e.preventDefault()

try {
  setopenLoad(true)
  setloading(true)
  const formData = new FormData();
  formData.append('email', updateFormData.email);
  formData.append('user_name', updateFormData.user_name);
  formData.append('phone_number', updateFormData.phone_number);
  formData.append('password', updateFormData.password);
    imageFile  &&  formData.append('profile_image', imageFile)
  

  const response = await fetch(`/api/update_admin/${id}`, {
    method: 'PATCH',
    
    body: formData
  })

  const newData = await response.json()

  const email = newData.email
  const phone_number  = newData.phone_number
  const user_name = newData.user_name

  if (response.ok) {
    // setUpdateFormData()
    localStorage.setItem('ojijo', JSON.stringify({ id,
      }))
    setUpdateFormData((prev)=> (
      {...prev, email, phone_number, user_name }
    ))
    console.log('newData', newData)
    setopenLoad(false)
    setloading(false)
    setopenUpdateAdminAlert(true)
  } else {
    console.log('error')
    setopenLoad(false)
    setloading(false)
    setopenUpdateAdminAlertError(true)
  }
} catch (error) {
  setopenLoad(false)
  setopenUpdateAdminAlertError(true)
  setloading(false)
  console.log('error=>', error)
}
}





// const onChangeImagePreview = (e)=>{
//   const file = e.target.files[0]
//   console.log('image=>',e.target.files)
//   const reader = new FileReader();
//    reader.onload = () => {
//     setImagePreview(reader.result)
//   };

//    reader.readAsDataURL(file)
// }







const onChangeImagePreview = (e)=> {
  const {name, value} = e.target

if (e.target.files) {
  const file = e.target.files[0]
  setImageFile(file)
  console.log('image=>',e.target.files)
  const reader = new FileReader();
  reader.onload = () => {
    setImagePreview(reader.result)
  };

  reader.readAsDataURL(file)
} else {
  setUpdateFormData((prev) => ({
    ...prev, [name]: value
  }))
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
  




function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}





function stringAvatar(name) {

  const nameParts = name.split(' ').filter(Boolean)


  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: nameParts.length > 1  ? 
`${nameParts[0][0]}${nameParts[1][0]}` 
     : nameParts.length === 1
     ? `${nameParts[0][0]}` 
     : '?',  // Fallback
    
  //   `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  }
}



const fetchUpdatedProfile = useCallback(
      
       
  async() => {
  
    

    const url = "/api/current_user" 
    const response = await fetch(url)
    const newData = await response.json()
    console.log('updated admin', newData)
try {
  const {email, user_name, phone_number, profile_image } = newData.user
  
  if (response.ok) {
    setUpdateFormData({...updateFormData, email, phone_number, user_name, profile_image})
    // setUpdateFormData((prev)=> (
    //   {...prev, email, phone_number, user_name }
    // ))
    setImagePreview(newData.profile_image)
    console.log(`get updated adminn${newData.profile_image_url}`)
  } else {
    console.log('error geting updated admin')
  }
} catch (error) {
  console.log(error)
}

  },
  [],
)

useEffect(() => {
  fetchUpdatedProfile()
  
}, [fetchUpdatedProfile]);



  return (








<>



<UpdateAdminAlert openUpdateAdminAlert={openUpdateAdminAlert} 
 handleCloseUpdateAdminAlert={handleCloseUpdateAdminAlert} />

<UpdateAdminAlertError  openUpdateAdminAlertError={openUpdateAdminAlertError}
 handleCloseUpdateAdminAlertError={handleCloseUpdateAdminAlertError}/>



{loading &&    <Backdrop open={openLoad} sx={{ color:'#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
  
  <Lottie className='relative z-50' options={defaultOptions} height={400} width={400} />
    
     </Backdrop>
  }

    <AnimatePresence>
    {isOpenEditProfile && (
      <form onSubmit={handleUpdateProfile}>
     <motion.div
     initial={{ opacity: 0 }}
     animate={{ opacity: 1 }}
     exit={{ opacity: 0 }}
     className="bg-green-500 bg-opacity-10 backdrop-blur p-8 fixed inset-0 z-[100] grid place-items-center overflow-y-scroll 
     cursor-pointer"
   >

   <TbLetterX className='text-black text-2xl' onClick={() => setisOpenEditProfile(false)}/>

     <motion.div
       initial={{ scale: 0, rotate: "12.5deg" }}
       animate={{ scale: 1, rotate: "0deg" }}
       exit={{ scale: 0, rotate: "0deg" }}
       className="bg-gradient-to-br from-white to-blue-100 text-white p-6 rounded-lg w-full
        max-w-lg shadow-xl cursor-default relative overflow-hidden"
     >

       <div className="relative z-10">
       <div className="cursor-pointer w-16 h-16 mb-2 rounded-full text-3xl text-black ">

           </div>
         <h3 className="text-3xl font-bold  text-center  text-black  playwrite-de-grund mb-2">
           My Profile
         </h3>
        


<div className="mb-5 text-black">
    <p className='p-4 playwrite-de-grund'>Profile Image</p>
<div className="avatar gap-3">

  
{/* border-black border-2  */}

  <div className=" w-24 rounded-full 
   justify-center items-center
  ring-offset-2" style={{display: 'flex', justifyContent: 'center'}}>






{/* 
{imagePreview ? (
  <img src={imagePreview} alt="profile-picture-preview" />
): <>
 <svg className=" w-12 h-12 text-gray-400 mx-auto my-auto mt-2"
   fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
     clipRule="evenodd"></path></svg>
</>
} */}
 <Avatar style={{width: 80, height: 80}}   {...stringAvatar(user_name)} />


  </div>

  <div className="playwrite-de-grund mt-3 hover:bg-green-200 hover:rounded-md h-fit p-2 cursor-pointer">
  <input
    type="file"
    id="upload-photo"
    onChange={onChangeImagePreview}
    accept="image/*"
    className="hidden" 

    name='profile_image'
  />
{/*   
  <label
    htmlFor="upload-photo"
    className="cursor-pointer"
  >
    Upload
  </label> */}
</div>
  
</div>
</div>


<TextField sx={{
  '& label.Mui-focused':{
    color: 'black',
          fontSize: '20px'
  },
  
  padding: '10px',

  width: '100%',

'& .MuiOutlinedInput-root': {
  
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "black",
    borderWidth: '3px'
    },
 '&.Mui-focused fieldset':  {
    borderColor: 'black', // Set border color to transparent when focused

  }
}
}}  label='User Name'  onChange={onChangeImagePreview} name='user_name' 
className='myTextField'
value={updateFormData.user_name} />




<TextField sx={{
  '& label.Mui-focused':{
    color: 'black',
          fontSize: '22px'
  },
  padding: '10px',
  width: '100%',

'& .MuiOutlinedInput-root': {
  
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "black",
    borderWidth: '3px'
    },
 '&.Mui-focused fieldset':  {
    borderColor: 'black', // Set border color to transparent when focused

  }
}
}}  label='Email'  className='myTextField'  onChange={onChangeImagePreview} value={email} name='email'/>


<TextField sx={{
  '& label.Mui-focused':{
    color: 'black',
          fontSize: '19px'
  },
  padding: '10px',

  width: '100%',

'& .MuiOutlinedInput-root': {
  
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "black",
    borderWidth: '3px',
    },
 '&.Mui-focused fieldset':  {
    borderColor: 'black', // Set border color to transparent when focused

  }
}
}}  label='Phone Number'  className='myTextField'  name='phone_number' onChange={onChangeImagePreview} value={phone_number}/>





<TextField sx={{
  '& label.Mui-focused':{
    color: 'black',
          fontSize: '19px'
  },
  padding: '10px',

  width: '100%',

'& .MuiOutlinedInput-root': {
  
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "black",
    borderWidth: '3px',
    },
 '&.Mui-focused fieldset':  {
    borderColor: 'black', // Set border color to transparent when focused

  }
}
}}  label=' New Password' className='myTextField'  name='password' onChange={onChangeImagePreview} />

<div className="flex gap-8 mt-4">
  <button
    disabled={loading}
    type='submit'
    className="relative inline-flex items-center justify-center px-8 py-3 
    overflow-hidden font-medium text-white bg-green-500 transition-all duration-300 
    ease-out rounded-lg shadow-md group hover:ring-2 hover:ring-offset-2 
    hover:ring-green-400 disabled:opacity-70 disabled:cursor-not-allowed"
  >
    <span className="absolute inset-0 flex items-center justify-center w-full h-full 
      text-white duration-300 -translate-x-full bg-green-600 group-hover:translate-x-0">
      <svg 
        className="w-6 h-6" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth="2" 
          d="M14 5l7 7m0 0l-7 7m7-7H3"
        />
      </svg>
    </span>
    <span className="absolute flex items-center justify-center w-full h-full 
      text-white transition-all duration-300 transform group-hover:translate-x-full">
      {loading && <ImSpinner9 className="animate-spin mr-2"/>}
      Save
    </span>
    <span className="relative invisible">Save</span>
  </button>

  <button
    onClick={(e) => {
      e.preventDefault();
      setisOpenEditProfile(false);
    }}
    className="relative inline-flex items-center justify-center px-8 py-3 
    overflow-hidden font-medium text-red-500 border-2 border-red-500 
    transition-all duration-300 ease-out rounded-lg shadow-md group 
    hover:bg-red-50 hover:ring-2 hover:ring-offset-2 hover:ring-red-400"
  >
    <span className="absolute inset-0 flex items-center justify-center w-full h-full 
      text-red-500 duration-300 -translate-y-full group-hover:translate-y-0">
      <svg 
        className="w-6 h-6" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth="2" 
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </span>
    <span className="absolute flex items-center justify-center w-full h-full 
      text-red-500 transition-all duration-300 transform group-hover:translate-y-full">
      Cancel
    </span>
    <span className="relative invisible">Cancel</span>
  </button>
</div>

     
       </div>
     </motion.div>
   </motion.div>
   </form>
    )}
  </AnimatePresence>

  </>
   
  );


};





export default EditProfile;