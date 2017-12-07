import React from 'react';
import MainNavBar from './MainNavBar';
import NavBar from './NavBar';

const Home = props => {
 return(
   <div className="home-wrapper">
     <MainNavBar />
     <NavBar {...props} activeTab='home' />
     <h1>PlannEd</h1>
     <h2>Because A Goal Without A Plan Is Just A Wish </h2>
   </div>
 );
};

export default Home;
