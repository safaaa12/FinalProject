import React from 'react';

import MyNav from './components/Navbar/NewNav';

import { BrowserRouter, Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from "./components/Navbar/Navbar";

import Main from "./components/Main";
import Signup from "./components/Signup";
import Login from "./components/Login";
import AboutUs from "./components/AboutUs";
import Profile from "./components/Profile";
import PasswordReset from "./components/PasswordReset";
import EmailVerify from "./components/EmailVerify";
import Coupons from "./components/Coupons";
//import StartPage from "./components/StartPage";



const App = () => {
  return (
    <BrowserRouter>

      <NewNav>
      <Routes>
        <Route path="/" element={<Main />}/>
        <Route path="/Login"  element={<Login />} />
        <Route path="/Signup"  element={<Signup />} />
        <Route path="/password-reset/:id/:token" element={<PasswordReset />} />
        <Route path="/AboutUs"  element={<AboutUs />} />
        <Route path="/Profile"  element={<Profile />} />
        <Route path="/users/:id/verify/:token" element={<EmailVerify/>}/>
        </Routes>
    </NewNav>
    </BrowserRouter>
  );
}
export default App;
