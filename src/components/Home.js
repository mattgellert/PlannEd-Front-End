import React from 'react';
import NavBar from './NavBar';

const Home = props => {
  return(
    <div className="home-wrapper">
      <NavBar {...props} activeTab='home' />
    </div>
  );
};

export default Home;
// <h1>Welcome to PlannEd! Guarunteed to make the college a breeze.</h1>
