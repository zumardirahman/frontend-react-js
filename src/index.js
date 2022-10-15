import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "bulma/css/bulma.css"
import axios from "axios"; //untuk intraksi dengan API
axios.defaults.withCredentials = true //agar tidak perlu melakukan credensial setiap req ke seerver

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


