import React, { Component } from 'react';
import ComponentCard from './ComponentCard';

class CourseCard extends Component {

  handleHideStudentCourseDetails = () => {
    this.props.onHideStudentCourseDetails();
  };

  handleShowStudentCourseDetails = () => {
    this.props.onShowStudentCourseDetails(this.props.course.studentCourseId);
  };

//INCLUDE COURSE COMPONENT CARDS IF SELECTED
  //
  // handleSelectStudentCourse = () => {
  //   this.props.onSelectStudentCourse(this.props.course.studentCourseId);
  // };
  //
  // handleDeselectStudentCourse = () => {
  //   this.props.onDeselectStudentCourse();
  // };

  showComponents = () => {
    console.log("show course card components")
    return this.props.course.components.map(comp => {
      return <ComponentCard key={comp.studentComponentId} comp={comp} selectedStudentCourse={this.props.selectedStudentCourse} onHideStudentCompDetails={this.props.onHideStudentCompDetails} onShowStudentCompDetails={this.props.onShowStudentCompDetails}/>
    })
  };

  handleShowRemovePrompt = () => {
    this.props.onSelectRemoveCourse(this.props.course.studentCourseId)
  };

  handleHideRemovePrompt = () => {
    this.props.onDeselectRemoveCourse();
  };

  handleRemoveCourse = () => {
    this.props.onRemoveCourse(this.props.course.studentCourseId);
  };

  // get these functions for props
  // handleAddToDo = () => {
  //   this.props.onDeselectForToDo()
  //   this.props.selectedForToDo !== this.props.assignment.studentAssignmentId ? this.props.onSelectForToDo(this.props.assignment.studentAssignmentId) : null;
  // };

  render() {
    const course = this.props.course;
    const selectedStudentCourse = this.props.selectedStudentCourse;
    const isCourseToRemove = course.studentCourseId === this.props.courseToRemove;
console.log("course card to remove?",course, this.props, isCourseToRemove)
    return(
      <div className="course-card-wrapper">
        <h1>{course.subject} {course.catalogNbr}: {course.title}</h1>
        <p>{course.facilityDescr}</p>
        <p>{course.timeStart} - {course.timeEnd} ({course.pattern})</p>
        <p onClick={this.handleAddToDo}>+ To Do</p>
        <button onClick={this.handleShowRemovePrompt}>Remove Course</button>
        {isCourseToRemove
          ?
            <div className="remove-course-modal">
              <div className="remove-course-modal-content">
                <p className="remove-course-modal-text">Are you sure you want to remove this course?</p>
                <button className="remove" onClick={this.handleRemoveCourse}>Remove</button>
                <button className="cancel" onClick={this.handleHideRemovePrompt}>Cancel</button>
              </div>
            </div>
          : null
        }
        {selectedStudentCourse.showDetails === course.studentCourseId
          ?
            <div>
              <button onClick={this.handleHideStudentCourseDetails}>Hide Details</button>
              <p>{course.description}</p>
              {this.showComponents()}
            </div>
          :
            <button onClick={this.handleShowStudentCourseDetails}>Show Details</button>
        }
      </div>
    );
  };
};

export default CourseCard;

//add course-level to-do items?
