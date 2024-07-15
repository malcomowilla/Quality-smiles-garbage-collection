



import React from 'react';
import animationData from '../animation/wifi_online.json'
import Lottie from 'react-lottie';

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
  }
};

const OnlineMessage = () => (

  <div style={{
    position: 'fixed',
    top: 0,
    width: '100%',
    backgroundColor: 'white',
    color: 'black',
    textAlign: 'center',
    padding: '5px',
    zIndex: 1000
  }}>
    <Lottie  animationData={animationData} options={defaultOptions}
        height={50}
        width={50}/>
    Back Like We Never Left!!.
    
  </div>
);

export default OnlineMessage;




































