import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import StudyList from '../components/StudyList';
import { fetchAssignments } from '../actions/students';

class StudyContainer extends Component {

  componentDidMount() {
    this.props.onFetchAssignments(this.props.student.id);
  };

  render() {
    return (
      <div className="study-container-wrapper">
        {this.props.student.id
          ?
            <div className="study-container">
              <StudyList toDoItems={this.props.toDoItems} />
            </div>
          :
          <Redirect to="/"/>
        }
      </div>
    );
  };
};

function mapStateToProps(state) {
  return {
    student: state.student,
    toDoItems: state.calendar.toDoItems
  }
};

function mapDispatchToProps(dispatch) {
  return {
    onFetchAssignments: (studentId) => {
      dispatch(fetchAssignments(studentId));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(StudyContainer);
