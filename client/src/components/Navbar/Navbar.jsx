

import React, { useState } from 'react';
import { FaBars, FaCommentAlt, FaShoppingCart, FaInfoCircle, FaTicketAlt, FaHome, FaLock, FaUser } from "react-icons/fa";
import { NavLink, useNavigate } from 'react-router-dom';

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);
  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('email');
    navigate('/Login');
  };

  const menuItem = [
    {
      path: "/",
      name: "Home",
      icon: <FaHome />
    },
    {
      path: "/Shopes",
      name: "Shopes",
      icon: <FaShoppingCart />
    },
    {
      path: "/coupons",
      name: "coupons",
      icon: <FaTicketAlt />
    },
    {
      path: "/AboutUs",
      name: "About Us",
      icon: <FaInfoCircle />
    },
    {
      path: "/comment",
      name: "Comment",
      icon: <FaCommentAlt />
    },
  ];

  // Add the profile button to the menu when logged in
  if (isLoggedIn) {
    menuItem.push({
      path: "/Profile",
      name: "Profile",
      icon: <FaUser />
    });
  }

  return (
    <div className="container">
      <div style={{ width: isOpen ? "400px" : "50px" }} className="sidebar">
        <div className="top_section">
          <h1 style={{ display: isOpen ? "block" : "none" }} className="logo">Smartshopping</h1>
          <div style={{ marginLeft: isOpen ? "50px" : "0px" }} className="bars">
            <FaBars onClick={toggle} />
          </div>
        </div>
        {menuItem.map((item, index) => (
          <NavLink to={item.path} key={index} className="link" activeClassName="active-link">
            <div className="icon">{item.icon}</div>
            <div style={{ display: isOpen ? "block" : "none" }} className="link_text">{item.name}</div>
          </NavLink>
        ))}
        {isLoggedIn ? (
          <div className="link" onClick={handleLogout}>
            <div className="icon"><FaLock /></div>
            <div style={{ display: isOpen ? "block" : "none" }} className="link_text">Logout</div>
          </div>
        ) : (
          <NavLink to="/Login" className="link" activeClassName="active-link">
            <div className="icon"><FaUser /></div>
            <div style={{ display: isOpen ? "block" : "none" }} className="link_text">Login</div>
          </NavLink>
        )}
      </div>
      <main>{children}</main>
    </div>
      )};

export default Sidebar;
