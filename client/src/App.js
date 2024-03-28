import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import "./App.css";
import Main from "./components/Main";
import Signup from "./components/Signup";
import Login from "./components/Login";
import AboutUs from "./components/AboutUs";
import Profile from "./components/Profile";
import PasswordReset from "./components/PasswordReset";
import EmailVerify from "./components/EmailVerify";
import StartPage from "./components/StartPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Routes for pages without navbar */}
        <Route path="/" element={<StartPage />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/password-reset/:id/:token" element={<PasswordReset />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/users/:id/verify/:token" element={<EmailVerify />} />

        {/* Routes for pages with navbar */}
        <Route
          path="/home"
          element={
            <Navbar>
              {/* Nested routes for pages with navbar */}
              <Routes>
                <Route path="/home" element={<Main />} />
                <Route path="/AboutUs" element={<AboutUs />} />
                <Route path="/Profile" element={<Profile />} />
              </Routes>
            </Navbar>
          }
        />
      </Routes>
      {/* Footer */}
      <footer className="footer">
        <p className='text'>SmartShop</p>
      </footer>
    </BrowserRouter>
  );
}
export default App;
