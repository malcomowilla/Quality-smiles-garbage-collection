import React from 'react';
import animationData from '../animation/wifi_offline.json'
import Lottie from 'react-lottie';

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
  }
};

const OfflineMessage = () => (

  <div style={{
    position: 'fixed',
    top: 0,
    width: '100%',
    backgroundColor: 'green',
    color: 'white',
    height: '100%',
    textAlign: 'center',
    padding: '5px',
    
    zIndex: 1000
  }}>
    <Lottie   animationData={animationData} options={defaultOptions}
        height={530}
        width={350}/>

        <p className='playwrite-de-grund text-2xl'>You are currently offline. Please Check Your Internet Connection.</p>

    
  </div>
);

export default OfflineMessage;
