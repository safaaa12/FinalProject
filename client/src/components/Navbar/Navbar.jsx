import React, { useState } from 'react';
import { FaBars, FaCommentAlt, FaShoppingCart, FaInfoCircle, FaTicketAlt, FaHome, FaLock, FaUser } from "react-icons/fa";
import { NavLink, useNavigate } from 'react-router-dom';
import './Sidebar.css'; // הנח ששמת את כל הסגנונות בקובץ CSS בשם Sidebar.css

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(window.innerWidth < 1220 ? false : true);
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
      name: "בית",
      icon: <FaHome />
    },
    {
      path: "/Shopes",
      name: "חנויות",
      icon: <FaShoppingCart />
    },
    {
      path: "/coupons",
      name: "קופונים",
      icon: <FaTicketAlt />
    },
    {
      path: "/AboutUs",
      name: "עלינו",
      icon: <FaInfoCircle />
    },
    {
      path: "/comment",
      name: "הערות",
      icon: <FaCommentAlt />
    },
  ];

  // Add the profile button to the menu when logged in
  if (isLoggedIn) {
    menuItem.push({
      path: "/Profile",
      name: "פרופיל",
      icon: <FaUser />
    });
  }

  return (
    <div className="container">
      <div className="sidebar" style={{ width: isOpen ? "320px" : "50px" }}>
        <div className="top_section">
          <h1 className="logo" style={{ display: isOpen ? "block" : "none" }}>Smartshopping</h1>
          <div className="bars" style={{ marginLeft: isOpen ? "50px" : "0px" }}>
            <FaBars onClick={toggle} />
          </div>
        </div>
        {menuItem.map((item, index) => (
          <NavLink to={item.path} key={index} className="link" activeClassName="active-link">
            <div className="icon">{item.icon}</div>
            <div className="link_text" style={{ display: isOpen ? "block" : "none" }}>{item.name}</div>
          </NavLink>
        ))}
        {isLoggedIn ? (
          <div className="link" onClick={handleLogout}>
            <div className="icon"><FaLock /></div>
            <div className="link_text" style={{ display: isOpen ? "block" : "none" }}>התנתק</div>
          </div>
        ) : (
          <NavLink to="/Login" className="link" activeClassName="active-link">
            <div className="icon"><FaUser /></div>
            <div className="link_text" style={{ display: isOpen ? "block" : "none" }}>התחבר</div>
          </NavLink>
        )}
      </div>
      <main className={`content ${isOpen ? "open" : "closed"}`}>{children}</main>

    </div>
  );
};

export default Sidebar;
