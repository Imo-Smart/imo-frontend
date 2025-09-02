import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { HelmetProvider } from 'react-helmet-async'
import { UserProvider } from "./context/UserContext";
import { BrowserRouter } from 'react-router-dom';
// import 'leaflet/dist/leaflet.css';

import { App } from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
        <HelmetProvider>
          <UserProvider>
            <App />
          </UserProvider>
        </HelmetProvider>
    </BrowserRouter>
  </StrictMode>,
)
