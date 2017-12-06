import React, { Component } from 'react';
import ComponentCard from './ComponentCard';
import { HuePicker } from 'react-color'

class CourseCard extends Component {

  handleHideStudentCourseDetails = () => {
    this.props.onSeeToDoFor(null)
    this.props.onHideStudentCourseDetails();
  };

  handleShowStudentCourseDetails = () => {
    this.props.onShowStudentCourseDetails(this.props.course.studentCourseId);
  };

  showComponents = () => {

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
  handleAddToDo = () => {
    this.props.onDeselectForToDo()
    this.props.selectedForToDo !== this.props.course.studentCourseId ? this.props.onSelectForToDo(this.props.course.studentCourseId) : null;
  };

  handleChangeCourseColor = () => {
    this.props.onCourseToChangeColor(this.props.course.studentCourseId)
  }

  handleCourseColorChange = (event) => {
    this.props.onSelectCourseColor(event.hex)
  }

  handleSubmitCourseColorChange = () => {
    this.props.onSubmitCourseColorChange(this.props.course.studentCourseId, this.props.selectedCourse.courseColor);
  }

  getToDoItems = () => {
    const courseToShowToDo = this.props.course;
    const today = new Date();
    console.log("get to do items")
    const toDoItems = this.props.courseEvents;

    return toDoItems.filter(todo => ((todo.studentCourseId === courseToShowToDo.studentCourseId) && (todo.eventType === "course to do"))).map(todo => {
      return (
        <div className="course-to-do">
          <h4>{todo.title}</h4>
          <p>{`${(new Date(...todo.startDate)).toString().slice(0,21)}`} - {`${(new Date(...todo.endDate)).toString().slice(0,21)}`} {today > todo.endDate ? "(Past)" : "(Upcoming)"}</p>
          <p>{todo.description}</p>
        </div>
      )
    });
  };

  handleSeeToDos = () => {
    this.props.onSeeToDoFor(this.props.course.studentCourseId);
  };

  render() {
    const course = this.props.course;
    const selectedStudentCourse = this.props.selectedStudentCourse;
    const isCourseToRemove = course.studentCourseId === this.props.courseToRemove;
    const courseColor = this.props.selectedCourse.data === course.studentCourseId;
    const seeToDoFor = this.props.seeToDoFor;
    console.log(this.props.selectedForToDo,course.studentCourseId)
    return(
      <div className="course-card-wrapper">
        <p>Course Color: {course.color}</p>
        <h3>{course.subject} {course.catalogNbr}: {course.title}</h3>
        <p>{course.facilityDescr}</p>
        <p>{course.timeStart} - {course.timeEnd} ({course.pattern})</p>
        <button onClick={this.handleAddToDo}>{this.props.selectedForToDo === course.studentCourseId ? "Choose A Date>" : "+ To Do"}</button>
        <button onClick={this.handleChangeCourseColor}>Change Color</button>
        {!!courseColor
          ?
            <div>
              <p>Pick a color for your course!</p>
              <HuePicker
                color={courseColor}
                onChangeComplete={this.handleCourseColorChange}
              />
              <button onClick={this.handleSubmitCourseColorChange}>Select Color</button>
            </div>
          : null
        }
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
              <button onClick={this.handleSeeToDos}>{seeToDoFor === course.studentCourseId ? "Hide To Do Items" : "See To Do Items"}</button>
              {seeToDoFor === course.studentCourseId
                ?
                  <div>
                    {this.getToDoItems()}
                  </div>
                : null
              }
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
