import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import {Link} from  'react-router-dom'
import ContactUsModal from './ContactUsModal'

export const HomeHeader = () => {

  return (
    <div className="bg-neutral-100 p-2 flex justify-center w-screen fix">
<div className='flex gap-x-5'>
        <img src="/images/logo/logo-small.png" className="h-12 w-12  rounded-full" alt="Flowbite Logo" />

              <p className='text-black kalam-light text-4xl text-wrap'><span className='text-black kalam-light2 text-4xl'>
                Quality</span> Smiles</p>
                
           
    </div>
      <SlideTabs />

    </div>
  );
};

const SlideTabs = () => {
        const [isOpen, setIsOpen] = useState(false);

  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  return (
    <ul
      onMouseLeave={() => {
        setPosition((pv) => ({
          ...pv,
          opacity: 0,
        }));
      }}
      className="relative mx-auto flex w-fit max-sm:flex-wrap rounded-full border-2 border-black font-extrabold bg-white 
      p-1 py-4"
    >
      <Tab setPosition={setPosition}>Home</Tab>
      <Tab setPosition={setPosition}><Link to='/services'>Our Services</Link></Tab>
      <Tab setPosition={setPosition}>Docs</Tab>
      <Tab setPosition={setPosition} ><Link  onClick={()=>setIsOpen(true)} >Contact Us</Link></Tab>

      <Cursor position={position} />
      <ContactUsModal isOpen={isOpen}  setIsOpen={setIsOpen}/>

    </ul>
  );
};

const Tab = ({ children, setPosition }) => {
  const ref = useRef(null);

  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (!ref?.current) return;

        const { width } = ref.current.getBoundingClientRect();

        setPosition({
          left: ref.current.offsetLeft,
          width,
          opacity: 1,
        });
      }}
      className="relative z-10 block cursor-pointer px-3 py-1.5 text-xs uppercase text-white mix-blend-difference 
      md:px-5 md:py-3 md:text-base"
    >
      {children}
    </li>
  );
};

const Cursor = ({ position }) => {
  return (
    <motion.li
      animate={{
        ...position,
      }}
      className="absolute z-0 h-7 rounded-full bg-black md:h-12"
    />
  );
};