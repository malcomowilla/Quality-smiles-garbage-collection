import { useState } from 'react';
import QRCode from 'qrcode.react';


// Scan to log in
// or visit: yoursite.com/login
// Customer support: 1-800-XXX-XXXX

// https://06e5-102-67-153-50.ngrok-free.app
const QrCodeServiceProvider = () => {
    // const [qrValue, setQrValue] = useState('http://localhost:5173/signin');

  // const qrValue= 'http://localhost:5173/choose_role'
  const qrValue= 'https://06e5-102-67-153-50.ngrok-free.app/service_provider_role'
    return (
      <div className='flex justify-center flex-col items-center h-screen bg-white'>
        {/* <input type="text" value={qrValue} onChange={(e) => setQrValue(e.target.value)} /> */}
        <QRCode value={qrValue} />
      </div>
    );
  };
  
  export default QrCodeServiceProvider