import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import {Link} from 'react-router-dom'
import MySettings from './MySettings'
import SmsSettings from './SmsSettings'
import EmailSettings from './EmailSettings'
import {useApplicationSettings} from './ApplicationSettings'
import PaymentSettings from './PaymentSettings'

 const GeneralSettings = () => {
    const [tab, setTab] = useState('General')


const {  canManageSmsTemplates,canReadSmsTemplates, user
} = useApplicationSettings()



  return (
    <div className=" py-20">
      <SlideTabs  setTab={setTab} user={user} canManageSmsTemplates={canManageSmsTemplates}
       canReadSmsTemplates={canReadSmsTemplates}/>
      {tab === 'General' &&  <MySettings />}
      {tab === 'Sms' && <SmsSettings />}
      {tab === 'Email' &&  <EmailSettings />}
      {tab === 'Payment' &&  <PaymentSettings />}
    </div>
  );
};

const SlideTabs = ({setTab,   canManageSmsTemplates,canReadSmsTemplates, user
}) => {
  
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
      <Tab setPosition={setPosition}><Link onClick={(e)=> {
        e.preventDefault()
setTab('General')

      }}>General</Link></Tab>



      <Tab setPosition={setPosition}><Link
      onClick={(e)=> {
        e.preventDefault()
setTab('Payment')

      }}
      >Payment</Link></Tab>



      
      <Tab setPosition={setPosition}><Link>Website</Link></Tab>



      <Tab setPosition={setPosition}><Link
      onClick={(e)=> {
        e.preventDefault()
setTab('Email')

      }}
      >Email</Link></Tab>



      <Tab setPosition={setPosition}><Link onClick={(e)=> {
        e.preventDefault()
setTab('Sms')

      }}>{  user === 'super_administrator' || user === 'administrator' ||
       canManageSmsTemplates === true || canReadSmsTemplates ===true ?  'Sms' : null}</Link></Tab>

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

export default GeneralSettings