import React from 'react';
import MainNavBar from './MainNavBar';
import NavBar from './NavBar';

const Home = props => {
 return(
   <div className="home-wrapper">
     <MainNavBar />
     <NavBar {...props} activeTab='home' />
     <h1>Welcome to PlannEd!</h1>
     <h3>Guaranteed to make college a breeze!</h3>
   </div>
 );
};

export default Home;
