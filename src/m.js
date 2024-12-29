// "Version": "2012-10-17",
// "Statement": [
//     {
//         "Sid": "Statement1",
//         "Principal": "*",
//         "Effect": "Allow",
//         "Action": [
//             "s3:ListBucket",
//             "s3:GetObject",
//             "s3:PutObject",
//             "s3:DeleteObject",
//             "s3:PutObjectAcl",
//             "s3:PutBucketPolicy"
//         ],
//         "Resource": [
//             "arn:aws:s3:::quality-smiles-bucket",
//             "arn:aws:s3:::quality-smiles-bucket/*"
//         ]
//     }
// ]


// // quality-smiles-policy

















import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ApplicationSettings from './settings/ApplicationSettings'
import { BrowserRouter as Router } from 'react-router-dom';
import { NotificationProvider } from './context/NotificationContext';
import { PaperProvider } from 'react-native-paper'





const theme = createTheme({
  palette: {
  }
})
ReactDOM.createRoot(document.getElementById('root')).render(

      <ThemeProvider theme={theme}>
        <Router>
        <NotificationProvider>

      <ApplicationSettings>
    <App />
    </ApplicationSettings>
    </NotificationProvider>
    </Router>
    </ThemeProvider >
    
    
    
)

















// uploader = S3Uploader.new
// file = File.open('path/to/your/image.png') # Replace with your image file
// bucket = 'your-bucket-name'
// key = 'uploads/image.png' # Path where you want to store the image in the




<ThemeProvider theme={theme}>
<AnimatePresence>
  <Suspense fallback={<div>Loading...</div>}>
    <RouterProvider router={router} />
    <TourGuide />
  </Suspense>
</AnimatePresence>
</ThemeProvider>