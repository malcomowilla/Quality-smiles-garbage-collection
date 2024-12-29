
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