import React from 'react';
import MainNavBar from './MainNavBar';
import NavBar from './NavBar';
import CalendarIcon from './svgs/CalendarIconB';

const Home = props => {
 return(
   <div className="home-wrapper">
     <MainNavBar />
    <div className="content-wrapper">
        <NavBar {...props} activeTab='home' />
        <div className="content-container home">
          <div>
            <div className="home-title">
             <h1>PlannEd<CalendarIcon/></h1>
            </div>
            <div className="home-title sub">
             <h2 className="home-title subA">Because A Goal Without A Plan </h2>
             <h2 className="home-title subB"> Is Just A Wish </h2>
            </div>
          </div>
        </div>
    </div>
   </div>
 );
};

export default Home;
