import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import {Link} from 'react-router-dom'
import MySettings from './MySettings'

export const GeneralSettings = () => {
    const [tab, setTab] = useState('General')

  return (
    <div className=" py-20">
      <SlideTabs />
      {tab === 'General' &&  <MySettings />}
    </div>
  );
};

const SlideTabs = () => {
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
      className="relative mx-auto flex w-fit rounded-full border-2 max-sm:flex-wrap border-black bg-white p-1"
    >
      <Tab setPosition={setPosition}><Link>General</Link></Tab>
      <Tab setPosition={setPosition}><Link>Payment</Link></Tab>
      <Tab setPosition={setPosition}><Link>Website</Link></Tab>
      <Tab setPosition={setPosition}><Link>Email</Link></Tab>

      <Cursor position={position} />
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
      className="relative z-10 block cursor-pointer px-3 py-1.5 text-xs uppercase
       text-white mix-blend-difference md:px-5 md:py-3 md:text-base"
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