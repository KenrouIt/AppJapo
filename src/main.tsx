import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './Pages/Home/App';
import './index.css';
import Login from './Pages/Login';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
      <BrowserRouter>
      <Routes>
        <Route path='/' Component={Login}/>
        <Route path='/Login' Component={Login}/>
        <Route path='/Home' Component={App}/>
        <Route path='*' element={<Navigate to= "/"/>}/>
      </Routes>
      </BrowserRouter>
    </React.StrictMode>
);