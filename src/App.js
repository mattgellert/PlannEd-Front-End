import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import DirectoryContainer from './containers/DirectoryContainer';
import DashboardContainer from './containers/DashboardContainer';
import SignInForm from './components/SignInForm';
import SignUpForm from './components/SignUpForm';
import Home from './components/Home';
import CourseContainer from './containers/CourseContainer';

class App extends Component {

  render() {
    return (
      <div className="app-wrapper">
        <Route exact path="/" component={Home} />
        <Route exact path="/sign-in" render={props => <SignInForm {...props}/>} />
        <Route exact path="/sign-up" render={props => <SignUpForm {...props}/>} />
        <Route exact path="/dashboard" render={props => <DashboardContainer {...props}/>} />
        <Route exact path="/course-directory" render={props => <DirectoryContainer {...props}/>} />
        <Route exact path="/my-courses" render={props => <CourseContainer {...props}/>} />
      </div>
    );
  };
};

export default App;
