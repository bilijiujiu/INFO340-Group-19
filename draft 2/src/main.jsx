import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import App from './App.jsx';
import './index.css';

// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC__gUJMb8_glOUrgVVWHTe43rzPpkHkEg",
  authDomain: "info340-group19-dc576.firebaseapp.com",
  projectId: "info340-group19-dc576",
  storageBucket: "info340-group19-dc576.firebasestorage.app",
  messagingSenderId: "783579367550",
  appId: "1:783579367550:web:6df001f856dd5e26e5302f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);