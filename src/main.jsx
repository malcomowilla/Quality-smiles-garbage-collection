import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ApplicationSettings from './settings/ApplicationSettings'
import { BrowserRouter as Router } from 'react-router-dom';





const theme = createTheme({
  palette: {
  }
})
ReactDOM.createRoot(document.getElementById('root')).render(

      <ThemeProvider theme={theme}>
        <Router>
      <ApplicationSettings>
    <App />
    </ApplicationSettings>
    </Router>
    </ThemeProvider >
    
    
    
)
