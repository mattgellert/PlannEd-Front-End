import React, { Component } from 'react';
import { signInUser, enterEmail } from '../actions/students';
import { connect } from 'react-redux';
import MainNavBar from './MainNavBar';
import NavBar from './NavBar';

class SignInForm extends Component {

 handleEmailChange = (event) => {
   this.props.onEnterEmail(event.target.value)
 };

 handleSubmit = (event) => {
   event.preventDefault();
   this.props.onSignIn(this.props.student.email);
 };

 componentWillReceiveProps(nextProps) {
   nextProps.student.id ? this.props.history.push("/dashboard") : null
 }

 render() {
   return (
     <div className="signin-container">
       <MainNavBar />
       <div className="content-wrapper">
         <NavBar {...this.props} activeTab="signin" />
        <div className="content-container home">
         <div className="home-title">
          <h1>Welcome Back!</h1>
           <form className="signin-form-container" onSubmit={this.handleSubmit}>
             Email: <input className="email" onChange={this.handleEmailChange} type="text" value={this.props.student.email}/>
             Password: <input className="email" type="password" />
             <input className="signin-button" type="submit" value="sign in"/>
           </form>
          </div>
        </div>
       </div>
     </div>
   );
 };
};

function mapStateToProps(state) {
 return {
   student: state.student
 };
};

function mapDispatchToProps(dispatch) {
 return {
   onSignIn: (email) => {
     dispatch(signInUser(email));
   },
   onEnterEmail: (email) => {
     dispatch(enterEmail(email));
   }
 };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignInForm);
// import React, { Component } from 'react';
// import { signInUser, enterEmail } from '../actions/students';
// import { connect } from 'react-redux';
// import MainNavBar from './MainNavBar';
// import NavBar from './NavBar';
//
// class SignInForm extends Component {
//
//  handleEmailChange = (event) => {
//    this.props.onEnterEmail(event.target.value)
//  };
//
//  handleSubmit = (event) => {
//    event.preventDefault();
//    this.props.onSignIn(this.props.student.email);
//  };
//
//  componentWillReceiveProps(nextProps) {
//    nextProps.student.id ? this.props.history.push("/dashboard") : null
//  }
//
//  render() {
//    return (
//      <div className="signin-container">
//        <MainNavBar />
//        <div className="content-wrapper home">
//          <NavBar {...this.props} activeTab="signin" />
//          <h1>Welcome Back to PlannEd!</h1>
//          <form className="signin-form-container" onSubmit={this.handleSubmit}>
//            Email: <input onChange={this.handleEmailChange} type="text" value={this.props.student.email}/>
//            <input type="submit" value="sign in"/>
//          </form>
//        </div>
//      </div>
//    );
//  };
// };
//
// function mapStateToProps(state) {
//  return {
//    student: state.student
//  };
// };
//
// function mapDispatchToProps(dispatch) {
//  return {
//    onSignIn: (email) => {
//      dispatch(signInUser(email));
//    },
//    onEnterEmail: (email) => {
//      dispatch(enterEmail(email));
//    }
//  };
// };
//
// export default connect(mapStateToProps, mapDispatchToProps)(SignInForm);
