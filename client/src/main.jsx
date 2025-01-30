import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import "bootstrap/dist/css/bootstrap.min.css";
import { Toaster } from 'react-hot-toast';
import "bootstrap";
import { ThemeProvider } from './ThemeProvider/ThemeContext.jsx';


createRoot(document.getElementById('root')).render(
  
  <ThemeProvider>
    <StrictMode>
   
   <Toaster />
   <App />


    
  </StrictMode>,
  </ThemeProvider>
)
