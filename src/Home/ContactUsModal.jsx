import { AnimatePresence, motion } from "framer-motion";
import { FiAlertCircle } from "react-icons/fi";
import { useState } from "react";
import React from "react";
import { twMerge } from "tailwind-merge";
import { FiArrowRight, FiMail, FiMapPin } from "react-icons/fi";
import { SiGithub, SiTiktok, SiTwitter, SiYoutube } from "react-icons/si";







const ContactUsModal = ({isOpen,setIsOpen }) => {
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
          className="bg-slate-900/20 backdrop-blur p-8    fixed inset-0 z-50 grid place-items-center overflow-y-scroll 
          cursor-pointer"
        >
        
            <FiAlertCircle className="text-white/10 rotate-12 text-[250px] absolute z-0 -top-24 -left-24" />
            <div className="r">
            
            

              <div className="min-h-screen bg-green px-4 py-12 text-zinc-50">
                <div className='flex justify-center mb-10'>
                <img src="/images/logo/logo-small.png"  className='rounded-full w-12 h-12' alt="" />

                </div>
      <motion.div
        initial="initial"
        animate="animate"
        transition={{
          staggerChildren: 0.05,
        }}
        className="mx-auto grid max-w-4xl grid-flow-dense grid-cols-12 gap-4"
      >

        <HeaderBlock />
        <SocialsBlock />
        <LocationBlock />
        <EmailListBlock />
      </motion.div>
      <div className="flex gap-2 mt-10">
                <button
                  onClick={() => setIsOpen(false)}
                  className="bg-transparent hover:bg-white/10 transition-colors text-white font-semibold w-full 
                  py-2 rounded"
                >
                  Cancel
                </button>
            
              </div>
    </div>




             
            </div>
          </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ContactUsModal;



const Block = ({ className, ...rest }) => {
    return (
      <motion.div
        variants={{
          initial: {
            scale: 0.5,
            y: 50,
            opacity: 0,
          },
          animate: {
            scale: 1,
            y: 0,
            opacity: 1,
          },
        }}
        transition={{
          type: "spring",
          mass: 3,
          stiffness: 400,
          damping: 50,
        }}
        className={twMerge(
          "col-span-4 rounded-lg border border-zinc-700 bg-zinc-800 p-6",
          className
        )}
        {...rest}
      />
    );
  };
  
  const HeaderBlock = () => (
    <Block className="col-span-12 row-span-2 md:col-span-6">
      <img
        src="https://api.dicebear.com/8.x/lorelei-neutral/svg?seed=John"
        alt="avatar"
        className="mb-4 size-14 rounded-full"
      />
      <h1 className="mb-12 text-4xl font-medium leading-tight">
        <span className="text-zinc-400">
          One Phone Call Away
        </span>
      </h1>
      <a
        href="#"
        className="flex items-center gap-1 text-red-300 hover:underline"
      >
        Contact Us <FiArrowRight />
      </a>
    </Block>
  );
  
  const SocialsBlock = () => (
    <>
      <Block
        whileHover={{
          rotate: "2.5deg",
          scale: 1.1,
        }}
        className="col-span-6  bg-transparent md:col-span-10"
      >
        <a
          href="#"
          className="grid h-full place-content-center    text-3xl text-white"
        >
                   <img src="/images/logo/icons8-phone-48.png " className='w-[60px] h-[60px mt-3' alt="" />

        </a>
      </Block>
      <Block
        whileHover={{
          rotate: "-2.5deg",
          scale: 1.1,
        }}
        className="col-span-6 bg-green-600 md:col-span-3"
      >
        <a
          href="#"
          className="grid h-full place-content-center text-3xl text-white"
        >
          <SiGithub />
        </a>
      </Block>
      <Block
        whileHover={{
          rotate: "-2.5deg",
          scale: 1.1,
        }}
        className="col-span-6 bg-zinc-50 md:col-span-3"
      >
        <a
          href="#"
          className="grid h-full place-content-center text-3xl text-black"
        >
          <SiTiktok />
        </a>
      </Block>
      <Block
        whileHover={{
          rotate: "2.5deg",
          scale: 1.1,
        }}
        className="col-span-6 bg-blue-500 md:col-span-3"
      >
        <a
          href="#"
          className="grid h-full place-content-center text-3xl text-white"
        >
          <SiTwitter />
        </a>
      </Block>



      <Block
        whileHover={{
          rotate: "2.5deg",
          scale: 1.1,
        }}
        className="col-span-6   bg-transparent bg-green-500 md:col-span-3"
      >
        <a
          href="#"
          className="grid h-full place-content-center text-3xl text-white"
        >
                   <img src="/images/logo/icons8-whatsapp-100.png " className='w-20 h-20' alt="" />

        </a>
      </Block>
    </>
  );
  
  const AboutBlock = () => (
    <Block className="col-span-12 text-3xl leading-snug">
      <p>
        My passion is building cool stuff.{" "}
        <span className="text-zinc-400">
          I build primarily with React, Tailwind CSS, and Framer Motion. I love
          this stack so much that I even built a website about it. I've made over
          a hundred videos on the subject across YouTube and TikTok.
        </span>
      </p>
    </Block>
  );
  
  const LocationBlock = () => (
    <Block className="col-span-12 flex flex-col items-center gap-4 md:col-span-3">
      <FiMapPin className="text-3xl" />
      <p className="text-center text-lg text-zinc-400">Quality Smiles</p>
    </Block>
  );
  
  const EmailListBlock = () => (
    <Block className="col-span-12 md:col-span-9">
      <p className="mb-3 text-lg">Email Us</p>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex items-center gap-2"
      >
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full rounded border border-zinc-700 bg-zinc-800 px-3 py-1.5 transition-colors focus:border-red-300 focus:outline-0"
        />
        <button
          type="submit"
          className="flex items-center gap-2 whitespace-nowrap rounded bg-zinc-50 px-3 py-2 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-300"
        >
          <FiMail /> Join Us
        </button>
      </form>
    </Block>
  );
  
  const Logo = () => {
    // Temp logo from https://logoipsum.com/
    return (
      <svg
        width="40"
        height="auto"
        viewBox="0 0 50 39"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="mx-auto mb-12 fill-zinc-50"
      >
        <path
          d="M16.4992 2H37.5808L22.0816 24.9729H1L16.4992 2Z"
          stopColor="#000000"
        ></path>
        <path
          d="M17.4224 27.102L11.4192 36H33.5008L49 13.0271H32.7024L23.2064 27.102H17.4224Z"
          stopColor="#000000"
        ></path>
      </svg>
    );
  };
  
  const Footer = () => {
    return (
      <footer className="mt-12">
        <p className="text-center text-zinc-400">
          Made with ❤️ by{" "}
          <a href="#" className="text-red-300 hover:underline">
            @tomisloading
          </a>
        </p>
      </footer>
    );
  };