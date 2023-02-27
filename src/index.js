import { CssBaseline } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <BrowserRouter>
    <CssBaseline />
    <App />
  </BrowserRouter>
  </React.StrictMode>
);

// https://www.freecodecamp.org/news/how-to-create-a-react-app-with-a-node-backend-the-complete-guide/
// https://github.com/trananhtuat/react-sidebar-with-dropdown/blob/main/src/components/common/SidebarItem.tsx
// https://cloud.google.com/firestore/docs/create-database-server-client-library#node.js

//https://www.youtube.com/watch?v=-UobUxpW6WQ

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
