import React from 'react';
import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import MyNav from './components/Navbar/NewNav';
import Main from "./components/Main";
import Signup from "./components/Signup";
import Login from "./components/Login";
import AboutUs from "./components/AboutUs";
import Profile from "./components/Profile";
import PasswordReset from "./components/PasswordReset";
import EmailVerify from "./components/EmailVerify";

const App = () => {
  return (
    <BrowserRouter>
      <MyNav>
      <Routes>
        <Route path="/" element={<Main />}/>
        <Route path="/Login"  element={<Login />} />
        <Route path="/Signup"  element={<Signup />} />
        <Route path="/password-reset/:id/:token" element={<PasswordReset />} />
        <Route path="/AboutUs"  element={<AboutUs />} />
        <Route path="/Profile"  element={<Profile />} />
        <Route path="/users/:id/verify/:token" element={<EmailVerify/>}/>
        </Routes>
    </MyNav>
    </BrowserRouter>
  );
}
export default App;
