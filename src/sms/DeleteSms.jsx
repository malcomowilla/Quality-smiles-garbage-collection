import { AnimatePresence, motion } from "framer-motion";
import { FiAlertCircle } from "react-icons/fi";
import { useState, useEffect } from "react";
import {useApplicationSettings} from '../settings/ApplicationSettings'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { ImSpinner9 } from "react-icons/im";
import Lottie from 'react-lottie';
import LoadingAnimation from '../animation/loading_animation.json'
import Backdrop from '@mui/material/Backdrop';



const DeleteSms = ({id, deleteLocation, isOpenDelete, setisOpenDelete, loading, deleteMessage, openLoad}) => {
     const { locationForm, setLocationForm} = useApplicationSettings()



const handleDeleteMessage = () =>{

    deleteMessage(id)
}



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

{loading &&    <Backdrop open={openLoad} sx={{ color:'#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
  
  <Lottie className='relative z-50' options={defaultOptions} height={400} width={400} />
    
     </Backdrop>
  }
    <AnimatePresence>
    {isOpenDelete && (
     <motion.div
     initial={{ opacity: 0 }}
     animate={{ opacity: 1 }}
     exit={{ opacity: 0 }}
     className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll 
     cursor-pointer"
   >
     <motion.div
       initial={{ scale: 0, rotate: "12.5deg" }}
       animate={{ scale: 1, rotate: "0deg" }}
       exit={{ scale: 0, rotate: "0deg" }}
       className="bg-gradient-to-br from-red-600 to-rose-600 text-white p-6 rounded-lg w-full
        max-w-lg shadow-xl cursor-default relative overflow-hidden"
     >
                     <FiAlertCircle className="text-white/10 rotate-12 text-[250px] absolute z-0 -top-24 -left-24" />

       <div className="relative z-10">
       <div className="bg-white w-16 h-16 mb-2 rounded-full text-3xl text-rose-600 grid place-items-center mx-auto">
             <FiAlertCircle />
           </div>
         <h3 className="text-3xl font-bold  text-center   playwrite-de-grund mb-2">
           Delete Message
         </h3>
        


<div className="mb-5">
Are You Sure You Want To Delete This Message?

</div>




<div className="flex gap-8">



<button onClick={()=> setisOpenDelete(false)} className="px-6 py-2 font-medium bg-black rounded-md text-white w-fit 
transition-all shadow-[3px_3px_0px_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]">
  
      Cancel
      </button>

           <button  disabled={loading} onClick={handleDeleteMessage}   className="px-6 py-2 font-medium text-red-700 bg-white rounded-md 
            w-fit transition-all shadow-[3px_3px_0px_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]">
               {loading && <ImSpinner9 className={`${loading && 'animate-spin'}`}/> }
        Delete
      </button>





           {/* <button
           disabled={loading}
             onClick={handleDeleteMessage}
             className="btn btn-active "
           >
                             {loading && <ImSpinner9 className={`${loading && 'animate-spin'}`}/> }

               Delete
           </button>


           <button
             onClick={()=> setisOpenDelete(false)}
             className="btn btn-active "
           >
               Cancel
           </button> */}
         </div>

     
       </div>
     </motion.div>
   </motion.div>
    )}
  </AnimatePresence>
  </>
   
  );
};





export default DeleteSms;