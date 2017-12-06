import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';
import { connect } from 'react-redux';
import { signOutUser } from '../actions/students';
import generateKeyFrames from './helpers/generateKeyFrames';
import DashboardIcon from './svgs/DashboardIcon';

let prevTab = '';

const tabPositions = {
  dashboard: 0,
  directory: 70,
  signout: 140,
  home: -100,
  signin: 70,
  signup: 0
};

class NavBar extends Component {

   getActiveTabStyle = () => {
     const { activeTab } = this.props;
     if (prevTab) {
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
          <li className="navlink">
            <NavLink className="link home" to="/" exact>
              <div className="logo">
                <img className="logo-img" src="../cornell.png" alt=""></img>
              </div>
            </NavLink>
          </li>
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
              <li onClick={this.setPrevTab} className={`navlink ${directoryActiveClass}`}><NavLink activeClassName="active" className="link" to="/course-directory" exact>Course Directory</NavLink></li>
              <li className="navlink" onClick={this.handleSignOut}><NavLink className="link sign-out" to="/" exact>Sign Out</NavLink></li>
              <li onClick={this.setPrevTab} className="navlink" ><NavLink className="link my-courses" to="/my-courses" exact>My Courses</NavLink></li>
            </div>
            :
            <div>
              <li onClick={this.setPrevTab} className={`navlink ${signupActiveClass}`}><NavLink activeClassName="active" className="link" to="/sign-up" exact>Sign Up</NavLink></li>
              <li onClick={this.setPrevTab} className={`navlink ${signinActiveClass}`}><NavLink activeClassName="active" className="link sign-in" to="/sign-in" exact>Sign In</NavLink></li>
            </div>
          }
        </ul>
      </div>
    );
  };
};

// {isAssignmentsTab &&
//   <div className="nav-assignments">
//     <AssignmentContainer />
//   </div>
// }

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
