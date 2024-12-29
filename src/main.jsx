import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ApplicationSettings from './settings/ApplicationSettings'
import { BrowserRouter as Router } from 'react-router-dom';
import { NotificationProvider } from './context/NotificationContext';
import { AppSettings } from './settings/AppSettings';

const theme = createTheme({
  palette: {
  }
})
ReactDOM.createRoot(document.getElementById('root')).render(

      <ThemeProvider theme={theme}>
        <Router>
        <NotificationProvider>
      <ApplicationSettings>
      <AppSettings>

    <App />
    </AppSettings>

    </ApplicationSettings>
    </NotificationProvider>
    </Router>
    </ThemeProvider >
)
