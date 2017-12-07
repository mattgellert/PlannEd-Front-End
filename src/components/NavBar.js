import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';
import { connect } from 'react-redux';
import { signOutUser } from '../actions/students';
import generateKeyFrames from './helpers/generateKeyFrames';
import DashboardIcon from './svgs/DashboardIcon';
import SigninIcon from './svgs/SigninIcon';
import SignupIcon from './svgs/SignupIcon';
import CoursesIcon from './svgs/CoursesIcon';
import SignoutIcon from './svgs/SignoutIcon';

let prevTab = '';

const tabPositions = {
  dashboard: 0,
  directory: 70,
  signout: 140,
  home: -70,
  signin: 0,
  signup: 70
};

class NavBar extends Component {

   getActiveTabStyle = () => {
     const { activeTab, forcePrevTab } = this.props;
     if (!!forcePrevTab) {
       prevTab = forcePrevTab;
     }
     if (prevTab) {
       console.log("***********: ", prevTab, activeTab)
       generateKeyFrames(tabPositions[prevTab], tabPositions[activeTab]);

       return {
         WebkitAnimation: 'slide-tab 0.3s',
         animation: 'slide-tab 0.3s',
         animationFillMode: 'forwards'
       };
     } else {
       return { top: `${tabPositions[activeTab] + 70}px` };
     }
   }

  handleSignOut = () => {
    this.setPrevTab();
    this.props.onSignOut();
  };

  setPrevTab = () => {
    prevTab = this.props.activeTab;
  };

  render() {
    const { activeTab } = this.props;
    const assignmentsActiveClass = activeTab === 'assignments' ? 'active' : '';
    const dashboardActiveClass = activeTab === 'dashboard' ? 'active' : '';
    const directoryActiveClass = activeTab === 'directory' ? 'active' : '';
    const signinActiveClass = activeTab === 'signin' ? 'active' : '';
    const signupActiveClass = activeTab === 'signup' ? 'active' : '';
    let activeTabStyle = this.getActiveTabStyle();

    return (
     <div className="navbar-wrapper">
       <span style={activeTabStyle} className="active-tab">
         <span className="after-first"></span>
         <span className="after-second"></span>
       </span>
       <ul className="navlinks-wrapper">
         {this.props.studentId
           ?
           <div>
             <li onClick={this.setPrevTab} className={`navlink ${dashboardActiveClass}`}>
               <NavLink activeClassName="active" className="link" to="/dashboard" exact>
                 <div className="icon">
                   <DashboardIcon />
                 </div>
               </NavLink>
             </li>
             <li onClick={this.setPrevTab} className={`navlink ${directoryActiveClass}`}>
              <NavLink activeClassName="active" className="link" to="/my-courses" exact>
                <div className="icon">
                  <CoursesIcon />
                </div>
              </NavLink>
            </li>
             <li onClick={this.setPrevTab} className="navlink">
              <NavLink className="link sign-out" to="/" exact>
                <SignoutIcon />
              </NavLink>
            </li>
           </div>
           :
           <div>
             <li onClick={this.setPrevTab} className={`navlink ${signinActiveClass}`}>
               <NavLink activeClassName="active" className="link sign-in" to="/sign-in" exact>
                 <div className="icon text">
                   <SigninIcon />
                   <div className="text">Sign In</div>
                 </div>
               </NavLink>
             </li>
             <li onClick={this.setPrevTab} className={`navlink ${signupActiveClass}`}>
               <NavLink activeClassName="active" className="link" to="/sign-up" exact>
                 <div className="icon text">
                   <SignupIcon />
                   <div className="text">Sign Up</div>
                 </div>
               </NavLink>
             </li>
           </div>
         }
       </ul>
     </div>
   );
  };
};


function mapStateToProps(state) {
  return {
    studentId: state.student.id,
    studentCourses: state.studentCourses
  };
};

function mapDispatchToProps(dispatch) {
  return {
    onSignOut: () => {
      dispatch(signOutUser());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
