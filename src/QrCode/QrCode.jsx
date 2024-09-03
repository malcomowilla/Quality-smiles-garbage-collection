import { useState } from 'react';
import QRCode from 'qrcode.react';


const QrCode = () => {
    // const [qrValue, setQrValue] = useState('http://localhost:5173/signin');
  const qrValue= 'http://localhost:5173/choose_role'
    return (
      <div className='flex justify-center flex-col items-center h-screen bg-white'>
        {/* <input type="text" value={qrValue} onChange={(e) => setQrValue(e.target.value)} /> */}
        <QRCode value={qrValue} />
      </div>
    );
  };
  
  export default QrCode