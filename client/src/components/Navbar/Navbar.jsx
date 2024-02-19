import React, { useState } from 'react';
import {
    FaTh,
    FaBars,
    FaUserAlt,
    FaRegChartBar,
    FaCommentAlt,
    FaShoppingBag,
    FaThList,FaShoppingCart,
    FaInfoCircle,FaTicketAlt,
    FaHome
}from "react-icons/fa";
import { NavLink } from 'react-router-dom';

const Sidebar = ({children}) => {
    const[isOpen ,setIsOpen] = useState(false);
    const toggle = () => setIsOpen (!isOpen);
    const menuItem=[
        {
            path:"/",
            name:"Home",
            icon:<FaHome/>
        }, 
        {
            path:"/Shopes",
            name:"Shopes",
            icon:<FaShoppingCart/>
        },
        {
            path:"/coupons",
            name:"coupons",
            icon:<FaTicketAlt/>
        },
        {
            path:"/AboutUs",
            name:"About Us",
            icon:<FaInfoCircle/>
        },
        {
            path:"/comment",
            name:"Comment",
            icon:<FaCommentAlt/>
        },

        {
            path:"/Login",
            name:"Login",
            icon:<FaUserAlt/>
        },
    ]
    return (
        <div className="container">
           <div style={{width: isOpen ? "400px" : "50px"}} className="sidebar">
               <div className="top_section">
                   <h1 style={{display: isOpen ? "block" : "none"}} className="logo">Smartshopping</h1>
                   <div style={{marginLeft: isOpen ? "50px" : "0px"}} className="bars">
                       <FaBars onClick={toggle}/>
                       
                   </div>
               </div>
               {
                   menuItem.map((item, index)=>(
                   
                       <NavLink to={item.path} key={index} className="link" activeclassName="active-link">
                           <div className="icon">{item.icon}</div>
                           <div style={{display: isOpen ? "block" : "none"}} className="link_text">{item.name}</div>
                       </NavLink>
                   ))
               }
           </div>
           <main>{children}</main>
        </div>
    );
};

export default Sidebar;