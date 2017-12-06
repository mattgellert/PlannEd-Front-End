import React, { Component } from 'react';
import { signInUser, enterEmail } from '../actions/students';
import { connect } from 'react-redux';
import NavBar from './NavBar';

class SignUpForm extends Component {

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
        <NavBar {...this.props} activeTab="signin" />
        <form onSubmit={this.handleSubmit}>
          Email: <input onChange={this.handleEmailChange} type="text" value={this.props.student.email}/>
          <input type="submit" value="sign in"/>
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
    onSignIn: (email) => {
      dispatch(signInUser(email));
    },
    onEnterEmail: (email) => {
      dispatch(enterEmail(email));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);
