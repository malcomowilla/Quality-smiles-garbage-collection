const nestedArray = [1, 2, [3, 4], 5, 6];
const flattenedArray = nestedArray.flatMap(num => num);
console.log(flattenedArray);










<div className="flex justify-center items-center min-h-screen bg-white">
<div className="max-w-[720px] mx-auto">
  <div className="block mb-4 mx-auto border-b border-slate-300 pb-2 max-w-[360px]">
    {/* <TypingAnimation text={`Welcome to Aitechs System Admin Portal`} /> */}
    <p style={{ fontSize: '24px', fontWeight: 'bold', color: 'black', textAlign: 'center', margin: '20px 0' }}>
Welcome to Aitechs System Admin Portal
</p>
  </div>
  <div className="relative flex flex-col text-gray-700 bg-white shadow-md w-96 rounded-xl bg-clip-border">
    <div className="relative grid mx-4 mb-4 -mt-6 overflow-hidden text-white shadow-lg h-28 place-items-center rounded-xl bg-gradient-to-tr from-gray-900 to-gray-800 bg-clip-border shadow-gray-900/20">
      <h3 className="block font-sans text-3xl antialiased font-semibold 
      leading-snug tracking-normal text-white">
        Login
      </h3>
    </div>
    
    <div className="flex flex-col gap-4 p-6">
      {step === 1 ? (
        <>
         
         <div className="relative z-0 w-full mb-5">
<input
placeholder='Enter Email Adress'
  type="email"
  name="email"
  value={email}
              onChange={(e) => setEmail(e.target.value)}
  className="pt-3 pb-2 block w-full px-0 mt-0  text-black  bg-transparent
   border-0 border-b-2 
  appearance-none focus:outline-none focus:ring-0 focus:border-black
   border-gray-200"
/>
</div>
          <div className="p-6 pt-0">
            <button
              className="block w-full select-none rounded-lg bg-gradient-to-tr from-gray-900 to-gray-800 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
              onClick={handleLoginEmail}
            >
              Send Verification Email
            </button>
          </div>
        </>
      ) : step === 2 ? (
        <>

<div className="relative z-0 w-full mb-5">
<div className="flex items-center">
<Lock className="absolute left-3 top-2.5 text-gray-400" /> {/* Icon positioned inside the input */}
<input
  type="password" // Ensure the input type is password
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  placeholder="Enter your password"
  className="pt-3 pb-2 block w-full px-10 mt-0 bg-transparent border-0 border-b-2 
  appearance-none focus:outline-none focus:ring-0 focus:border-black
   border-gray-200"
/>
</div>
</div>
          <div className="p-6 pt-0">
            <button
              className="block w-full select-none rounded-lg bg-gradient-to-tr from-gray-900 to-gray-800 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
              onClick={handleLoginPassword}
            >
              Login
            </button>
          </div>
        </>
      ) : (

        <>
       


       
<div className="relative z-0 w-full mb-5">
<div className="flex items-center">
<GoPasskeyFill className="absolute left-3 top-2.5 text-gray-400" /> {/* Icon positioned inside the input */}
<input
   value={email}
   required
   onChange={(e) => setPasskey(e.target.value)}
   placeholder="Enter your passkey"
  className="pt-3 pb-2 block w-full px-10 mt-0 bg-transparent border-0 border-b-2 
  appearance-none focus:outline-none focus:ring-0 focus:border-black
   border-gray-200"
/>
</div>
</div>
        <div className="p-6 pt-0">
          <button
            className="block w-full select-none rounded-lg bg-gradient-to-tr from-gray-900 to-gray-800 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
            onClick={authenticateWebAuthn}
          >
            Login with Passkey
          </button>
        </div>

        </>
      )}
    </div>
  </div>
</div>
<ToastContainer position='top-center' autoClose={3000} hideProgressBar={false} closeOnClick draggable pauseOnHover />
</div>