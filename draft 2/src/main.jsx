import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import App from './App.jsx';
import './index.css';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDb47nMDzXYiwfnD4MsaEuHrmaAAbE6crA",
  authDomain: "info340-c4218.firebaseapp.com",
  projectId: "info340-c4218",
  storageBucket: "info340-c4218.firebasestorage.app",
  messagingSenderId: "410456476920",
  appId: "1:410456476920:web:6fb2c3541ce1ccbc82bf0d",
  measurementId: "G-E038LEFWN5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);