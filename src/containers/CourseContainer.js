import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { filterCourseToDoByIncomplete,filterCourseToDoByCompleted, completeCourseToDo, seeToDos, selectForToDo, deselectForToDo, courseToChangeColor, submitCourseColorChange, selectCourseColor, selectRemoveCourse, deselectRemoveCourse, removeCourse, showStudentCompDetails, hideStudentCompDetails, hideStudentCourseDetails, showStudentCourseDetails, selectStudentCourse, deselectStudentCourse } from '../actions/students';
import CourseList from '../components/CourseList';

class CourseContainer extends Component {

  handleSeeCourseDirectory = () => {
    this.props.history.push("/course-directory")
  };

  render() {
    const props = this.props;

    return(
      <div className="course-container-wrapper sidebar-wrapper">
        {this.props.student.id
          ?
            <div className="course-list-container">
              <button onClick={this.handleSeeCourseDirectory}>Add Course</button>
              <CourseList courses={this.props.studentCourses} {...props}/>
            </div>
          :
          <Redirect to="/"/>
        }
      </div>
    );
  };
};

function mapStateToProps(state) {
  console.log("course container state", state)
  return {
    studentCourses: state.studentCourses,
    selectedStudentCourse: state.selectedStudentCourse,
    student: state.student,
    courseToRemove: state.courseToRemove,
    selectedCourse: state.selectedCourse,
    selectedForToDo: state.selectedForToDo,
    courseEvents: state.calendar.courses,
    seeToDoFor: state.calendar.seeToDoFor,
    completedFilter: state.studentAssignments.completedFilter
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
    },
    onDeselectForToDo: () => {
      dispatch(deselectForToDo());
    },
    onSelectForToDo: (studentCourseId) => {
      dispatch(selectForToDo(studentCourseId));
    },
    onSeeToDoFor: (studentCourseId) => {
      dispatch(seeToDos(studentCourseId));
    },
    onCompleteCourseToDo: (eventId) => {
      dispatch(completeCourseToDo(eventId));
    },
    onFilterCourseToDoByCompleted: () => {
      dispatch(filterCourseToDoByCompleted());
    },
    onFilterCourseToDoByIncomplete: () => {
      dispatch(filterCourseToDoByIncomplete());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CourseContainer)
