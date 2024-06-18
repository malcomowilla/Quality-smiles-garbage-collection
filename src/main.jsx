import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ApplicationSettings from './settings/ApplicationSettings'


const theme = createTheme({
  palette: {
  }
})
ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
           <ApplicationSettings>

      <ThemeProvider theme={theme}>

    <App />
    </ThemeProvider >
    </ApplicationSettings>

  </React.StrictMode>,
)
