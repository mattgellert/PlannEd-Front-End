import React from 'react';
import { NavLink } from 'react-router-dom';

const MainNavBar = ({ children }) => {
 return (
   <div className="main-nav-bar">
     <NavLink className="link home" to="/" exact>
       <div className="logo">
         plannEd
       </div>
     </NavLink>
     {children}
   </div>
 );
};

export default MainNavBar;
