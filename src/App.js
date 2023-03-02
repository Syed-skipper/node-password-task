import React from "react";
import {BrowserRouter, Routes, Route } from 'react-router-dom'
import ForgetPage from "./Forgetpage";
import Reset from './Resetpage'
function App() {
  return (<>
  
    <BrowserRouter>
       <Routes>
        <Route path="/" element={<ForgetPage/>}/>
        <Route path="/reset" element={<Reset/>}/>
       </Routes>
    </BrowserRouter>
  
  
  
  </>);
}

export default App;
