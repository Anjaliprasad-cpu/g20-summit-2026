// // import { StrictMode } from 'react'
// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'
// import index from './index.css'
// import Approute from './Components/Route/Approute.jsx';

// createRoot(document.getElementById('root')).render(
//   <>
//     <Approute />
//   </>,
// )


import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
