import React from 'react';
import MainNavBar from './MainNavBar';
import NavBar from './NavBar';

const Home = props => {
 return(
   <div className="home-wrapper">
     <MainNavBar />
     <NavBar {...props} activeTab='home' />
   </div>
 );
};

export default Home;
