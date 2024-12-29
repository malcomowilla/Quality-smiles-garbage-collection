import { useState } from 'react';
import QRCode from 'qrcode.react';
import {useApplicationSettings} from '../settings/ApplicationSettings'


// Scan to log in
// or visit: yoursite.com/login
// Customer support: 1-800-XXX-XXXX

// https://06e5-102-67-153-50.ngrok-free.app
const QrCode = () => {
    // const [qrValue, setQrValue] = useState('http://localhost:5173/signin');
    const {companySettings} = useApplicationSettings()
const {company_name,} = companySettings
  // const qrValue= 'http://localhost:5173/choose_role'
  const qrValue= `https://localhost:5173/customer_role`
    return (
      <div className='flex justify-center flex-col items-center h-screen bg-white'>
        {/* <input type="text" value={qrValue} onChange={(e) => setQrValue(e.target.value)} /> */}
        <QRCode value={qrValue} />
      </div>
    );
  };
  
  export default QrCode



// import React, { useEffect, useRef, useState } from "react";
// import jsQR from "jsqr";

// const QrCode = ({ onScan }) => {
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const startCamera = async () => {
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
//         if (videoRef.current) {
//           videoRef.current.srcObject = stream;
//           videoRef.current.play();
//         }
//       } catch (err) {
//         setError("Failed to access the camera");
//         console.error(err);
//       }
//     };

//     startCamera();

//     return () => {
//       if (videoRef.current && videoRef.current.srcObject) {
//         const tracks = videoRef.current.srcObject.getTracks();
//         tracks.forEach((track) => track.stop());
//       }
//     };
//   }, []);

//   useEffect(() => {
//     const scanQRCode = () => {
//       if (!videoRef.current || !canvasRef.current) return;

//       const video = videoRef.current;
//       const canvas = canvasRef.current;
//       const context = canvas.getContext("2d");

//       canvas.width = video.videoWidth;
//       canvas.height = video.videoHeight;

//       context.drawImage(video, 0, 0, canvas.width, canvas.height);
//       const imageData = context.getImageData(0, 0, canvas.width, canvas.height);

//       const qrCode = jsQR(imageData.data, canvas.width, canvas.height);
//       if (qrCode) {
//         onScan(qrCode.data);
//       }
//     };

//     const interval = setInterval(scanQRCode, 500); // Scan every 500ms

//     return () => clearInterval(interval);
//   }, [onScan]);

//   return (
//     <div>
//       {error && <p>{error}</p>}
//       <video ref={videoRef} style={{ width: "100%", height: "auto" }} />
//       <canvas ref={canvasRef} style={{ display: "none" }} />
//     </div>
//   );
// };

// export default QrCode;
