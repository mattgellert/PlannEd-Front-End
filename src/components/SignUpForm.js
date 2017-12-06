import React, { Component } from 'react';
import { signUpUser, enterEmail, enterFirstName, enterLastName } from '../actions/students';
import { connect } from 'react-redux';
import NavBar from './NavBar';

class SignUpForm extends Component {

  handleEmailChange = (event) => {
    this.props.onEnterEmail(event.target.value)
  };

  handleFirstNameChange = (event) => {
    this.props.onEnterFirstName(event.target.value)
  };

  handleLastNameChange = (event) => {
    this.props.onEnterLastName(event.target.value)
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onSignUp(this.props.student.email, this.props.student.firstName, this.props.student.lastName);
  };

  componentWillReceiveProps(nextProps) {
    nextProps.student.id ? this.props.history.push("/dashboard") : null
  }

  render() {
    return (
      <div className="signup-container">
        <NavBar {...this.props} activeTab="signup" />
        <form onSubmit={this.handleSubmit}>
          Email: <input onChange={this.handleEmailChange} type="text" value={this.props.student.email}/>
          First Name: <input onChange={this.handleFirstNameChange} type="text" value={this.props.student.firstName}/>
          Last Name: <input onChange={this.handleLastNameChange} type="text" value={this.props.student.lastName}/>
          <input type="submit" value="sign up"/>
        </form>
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
    onSignUp: (email, firstName, lastName) => {
      dispatch(signUpUser(email, firstName, lastName));
    },
    onEnterEmail: (email) => {
      dispatch(enterEmail(email));
    },
    onEnterFirstName: (firstName) => {
      dispatch(enterFirstName(firstName));
    },
    onEnterLastName: (lastName) => {
      dispatch(enterLastName(lastName));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);
