
<section    className=" h-screen relative z-50   grid 
xl:grid-cols-1 max-sm:grid-cols-1 max-md:grid-cols-1 md:grid-cols-1
bg-small-screens2  ">

<div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 ">
       <div className='mb-9'>
       <a  className="flex items-center mb-6    text-2xl font-semibold text-gray-900 dark:text-white">
     <img className="w-20 h-20 mr-2   rounded-full" src="/images/logo/logo-small.png" alt="logo"/>
    <p className='text-black playwrite-de-grund  text-4xl '>Quality Smiles </p>    
 </a>
       </div>

 <h2 className="text-2xl  leading-tight tracking-tight text-wrap playwrite-de-grund   font-bold mb-4 text-gray-900    ">
   Continue With Your One Time Password

   </h2>
 
 <div className="  rounded-lg shadow    md:mt-0 sm:max-w-[40rem] xl:p-0  ">

     <div className="p-6 space-y-4 md:space-y-6 sm:p-8  rounded-lg">
      
       
         <form className="space-y-4 md:space-y-6 " onSubmit={handleVerifyOtp}>
         
            




             


             <div className='flex flex-col relative'>
             <div className='absolute self-end bottom-0 p-2 text-white'  onClick={()=> setIsSeenPassword(!isSeenPassWord)}>
           <ion-icon  name={isSeenPassWord ? "eye-outline" : "eye-off-outline"}></ion-icon>
               </div>
                 <label htmlFor="password" className="block mb-2   playwrite-de-grund text-lg
                  text-black">Your OTP</label>
                 <motion.input  style={{width: passwordWidth}}     transition={{duration:5, ease: "easeOut",
}}   onChange={(e)=>{
setOtp(e.target.value)
passwordValue.set(e.target.value)
}} value={otp} type={isSeenPassWord  ? 'password' : 'text'} name="otp" id="otp"className=" border  focus:border-2
                   text-white  handlee-regular   transition-all duration-1000 sm:text-lg rounded-lg 
                   focus:ring-green-400 bg-transparent
                    border-black
                    block  p-2.5  focus:border-green-700
                     "/>
             </div>
             
             <div className="flex items-start">
                 <div className="flex items-center h-5">
                   <motion.input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border
                    border-gray-300
                    rounded
                    bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700
                     dark:border-gray-600 dark:focus
                    :ring-primar
                    y-600 dark:ring-offset-gray-800"/>
                 </div>
               
             </div>

             <div className='flex justify-center'>
             <button type='submit' className="btn btn-outline btn-success ">Login
           
           <img src="/images/logo/iconsreload2.png"  className={`w-5 h-5 ${isloading ? 'animate-spin' : 'hidden'}`}  alt="reload" />
           </button>  
             </div>

             <div className='cursor-pointer' onClick={handleGoBack}>
             <RiArrowGoBackFill  className='text-black text-xl'/> <p className='text-black'>
Go Back
</p>
             </div>

          
         </form>
     </div>
 </div>
</div>

</section>



otpSent 

























<section    className="bg-gray-50 h-screen relative z-50   grid 
       xl:grid-cols-1 max-sm:grid-cols-1 max-md:grid-cols-1 md:grid-cols-1
     bg-small-screens2   ">

    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 ">
              <div className='mb-9'>
              <a  className="flex items-center mb-6    text-2xl font-semibold text-gray-900 dark:text-white">
            <img className="w-20 h-20 mr-2   rounded-full" src="/images/logo/logo-small.png" alt="logo"/>
           <p className='text-black playwrite-de-grund  text-4xl '>Quality Smiles </p>    
        </a>
              </div>
      
        <h2 className=" text-2xl  leading-tight tracking-tight text-wrap playwrite-de-grund   font-bold mb-4 text-gray-900    ">
          Sign-In to your account and start managing your organization

          </h2>
        
        <div className="  rounded-lg shadow    md:mt-0 sm:max-w-[40rem] xl:p-0  ">
      
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8  rounded-lg">
                <h1 className="text-xl font-bold leading-tight  playwrite-de-grund  tracking-tight text-gray-900 md:text-2xl ">
                    Login Into Your Account 
                </h1>
                <div className='flex flex-row '>
          <p className='text-black playwrite-de-grund text-xl'>Don't have an account? <Link to='/signup'><span className='underline'>Sign Up</span></Link> </p>

          </div>
                <form className="space-y-4 md:space-y-6 " onSubmit={handleSignIn }>
                
                    <div className='flex flex-col relative'>
                    <p className='handlee-regular  text-rose-800 
                                               tracking-widest text-xl'> { seeError && registrationError}</p>
                        <label htmlFor="email" className="block mb-2  playwrite-de-grund text-xl 
                         text-gray-900 ">Your email</label>
                           <div className='absolute self-end bottom-0 p-2'>
                      <img src="/images/logo/icons8-gmail-100.png"  className='w-8 h-8' alt="gmail" />

                      </div>

                        <motion.input
                           
                  type="email"
                  onChange={handleFormDataChangeSignin}
                  // onChange={  (e)=> {
                  //   handleFormDataChangeSignin(e)
                  //   emailValue.set(e.target.value)
                  // } }
                style={{width: emailWidth}} transition={{duration:5, ease: "easeOut",
  }}    name="email"  value={email} id="email" 
                        className={` border  focus:border-2 
                          text-black  handlee-regular  transition-all duration-1000 sm:text-lg rounded-lg
                           focus:ring-green-400 bg-transparent
                           border-black 
                           block  p-2.5   focus:border-green-700
                            `}
  
                            />
  
                    </div>




                    <div>
                        <label htmlFor="number" className="block mb-2 playwrite-de-grund text-lg 
                         text-gray-900 ">Your Phone Number</label>
                        {/* <PhoneInput value={phone}
        onChange={setPhone}   type="text" name="email" id="email" className="border  focus:border-2
        text-white rounded-lg focus:ring-green-400 bg-transparent  handlee-regular 
        sm:text-lg border-black
         block w-full p-2.5  focus:border-green-700
                            "
  
                            /> */}


<input value={phone_number}
        onChange={handleChangePhoneNumberSignin}     name="phone_number"  className="border  focus:border-2
        text-white rounded-lg focus:ring-green-400 bg-transparent  handlee-regular 
        sm:text-lg border-black
         block w-full p-2.5  focus:border-green-700
                            "
  
                            />
  
                    </div>


                    <div className='flex flex-col relative'>
                    <div className='absolute self-end bottom-0 p-2 text-white'  onClick={()=> setIsSeenPassword(!isSeenPassWord)}>
                  <ion-icon  name={isSeenPassWord ? "eye-outline" : "eye-off-outline"}></ion-icon>
                      </div>
                        <label htmlFor="password" className="block mb-2   playwrite-de-grund text-lg
                         text-black">Password</label>
                        <motion.input       transition={{duration:5, ease: "easeOut",
  }}
  
  
  
  // onChange={(e)=>{
  //   handleFormDataChangeSignin(e)
  //   passwordValue.set(e.target.value)
  // }} 
  
  onChange={handleFormDataChangeSignin}
  
  
  value={password} type={isSeenPassWord  ? 'password' : 'text'} name="password" id="password"className=" border 
   focus:border-2
                          text-white  handlee-regular   transition-all duration-1000 sm:text-lg rounded-lg 
                          focus:ring-green-400 bg-transparent
                           border-black
                           block  p-2.5  focus:border-green-700
                            "/>
                    </div>
                    
                    <div className="flex items-start">
                        <div className='flex gap-x-10'>
                        <div className="ml-3 text-lg handlee-regular flex gap-x-7">
                         
                          <Link to='/forgot_password'> <p className='text-lg font-bold underline text-black
                          '>Forgot your password?</p></Link>
                        </div>
                        
  
        <div>
          <Link  className='text-black font-extrabold hover:underline' to='/kasspass-key-signin'>login with passkey? </Link>
        </div>
        </div>
                    </div>
  
                    <div className='flex justify-center'>
                    <button type='submit' className="btn btn-outline btn-success ">Login
                  
                  <img src="/images/logo/iconsreload2.png"  className={`w-5 h-5 ${isloading ? 'animate-spin' : 'hidden'}`}  alt="reload" />
                  </button>  
                    </div>
  
                 
                </form>
            </div>
        </div>
    </div>
    
  </section>