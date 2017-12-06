import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { courseToChangeColor, submitCourseColorChange, selectCourseColor, selectRemoveCourse, deselectRemoveCourse, removeCourse, showStudentCompDetails, hideStudentCompDetails, hideStudentCourseDetails, showStudentCourseDetails, selectStudentCourse, deselectStudentCourse } from '../actions/students';
import CourseList from '../components/CourseList';

class CourseContainer extends Component {

  render() {
    console.log("course contianer props", this.props)
    return(
      <div className="course-container-wrapper">
        {this.props.student.id
          ?
            <div className="course-container">
              <CourseList courses={this.props.studentCourses} onSubmitCourseColorChange={this.props.onSubmitCourseColorChange} onCourseToChangeColor={this.props.onCourseToChangeColor} selectedCourse={this.props.selectedCourse} onSelectCourseColor={this.props.onSelectCourseColor} courseToRemove={this.props.courseToRemove} onSelectRemoveCourse={this.props.onSelectRemoveCourse} onDeselectRemoveCourse={this.props.onDeselectRemoveCourse} onRemoveCourse={this.props.onRemoveCourse} selectedStudentCourse={this.props.selectedStudentCourse} onSelectStudentCourse={this.props.onSelectStudentCourse} onDeselectStudentCourse={this.props.onDeselectStudentCourse} onShowStudentCourseDetails={this.props.onShowStudentCourseDetails} onHideStudentCourseDetails={this.props.onHideStudentCourseDetails} onShowStudentCompDetails={this.props.onShowStudentCompDetails} onHideStudentCompDetails={this.props.onHideStudentCompDetails}/>
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
    studentCourses: state.studentCourses,
    selectedStudentCourse: state.selectedStudentCourse,
    student: state.student,
    courseToRemove: state.courseToRemove,
    selectedCourse: state.selectedCourse
  }
};

function mapDispatchToProps(dispatch) {
  return {
    onSelectStudentCourse: (studentCourseId) => {
      dispatch(selectStudentCourse(studentCourseId));
    },
    onDeselectStudentCourse: () => {
      dispatch(deselectStudentCourse());
    },
    onShowStudentCourseDetails: (studentCourseId) => {
      dispatch(showStudentCourseDetails(studentCourseId));
    },
    onHideStudentCourseDetails: () => {
      dispatch(hideStudentCourseDetails());
    },
    onShowStudentCompDetails: (studentCompId) => {
      dispatch(showStudentCompDetails(studentCompId));
    },
    onHideStudentCompDetails: () => {
      dispatch(hideStudentCompDetails());
    },
    onSelectRemoveCourse: (studentCourseId) => {
      dispatch(selectRemoveCourse(studentCourseId))
    },
    onDeselectRemoveCourse: () => {
      dispatch(deselectRemoveCourse());
    },
    onRemoveCourse: (studentCourseId) => {
      dispatch(removeCourse(studentCourseId));
    },
    onSelectCourseColor: (color) => {
      dispatch(selectCourseColor(color));
    },
    onSubmitCourseColorChange: (studentCourseId, color) => {
      dispatch(submitCourseColorChange(studentCourseId, color));
    },
    onCourseToChangeColor: (studentCourseId) => {
        dispatch(courseToChangeColor(studentCourseId));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CourseContainer)
