import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './Pages/Home/App';
import './index.css';
import Login from './Pages/Login';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Texts from './Pages/Texts/texts';
import Settings from './Pages/Settings/setting';

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
        <Route path='/Texts' Component={Texts}/>
        <Route path='/Settings' Component={Settings}/>
        <Route path='*' element={<Navigate to= "/"/>}/>
      </Routes>
      </BrowserRouter>
    </React.StrictMode>
);