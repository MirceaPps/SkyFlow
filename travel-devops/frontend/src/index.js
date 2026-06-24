import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Admin from './Admin';

const root = ReactDOM.createRoot(document.getElementById('root'));

// Routing simplu fara react-router: /admin → Admin, altceva → App
const isAdmin = window.location.pathname.startsWith('/admin');

root.render(
  <React.StrictMode>
    {isAdmin ? <Admin /> : <App />}
  </React.StrictMode>
);
