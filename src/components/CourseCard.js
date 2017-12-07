import React, { Component } from 'react';
import ComponentCard from './ComponentCard';
import { HuePicker } from 'react-color'
import CourseToDo from './CourseToDo';
import cuid from 'cuid';

class CourseCard extends Component {

  handleHideStudentCourseDetails = () => {
    this.props.selectedForToDo === this.props.course.studentCourseId ? this.props.onDeselectForToDo() : null;
    this.props.onSeeToDoFor(null)
    this.props.onHideStudentCourseDetails();
  };

  handleShowStudentCourseDetails = () => {
    this.props.selectedForToDo !== this.props.course.studentCourseId ? this.props.onDeselectForToDo() : null;
    this.props.onShowStudentCourseDetails(this.props.course.studentCourseId);
  };

  showComponents = () => {
    return this.props.course.components.map(comp => {
      return <ComponentCard key={cuid()} comp={comp} selectedStudentCourse={this.props.selectedStudentCourse} onHideStudentCompDetails={this.props.onHideStudentCompDetails} onShowStudentCompDetails={this.props.onShowStudentCompDetails}/>
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

  handleAddToDo = () => {
    this.props.selectedStudentCourse.showDetails !== this.props.course.studentCourseId ? this.props.onHideStudentCourseDetails() : null;
    this.props.onDeselectForToDo()
    this.props.selectedForToDo !== this.props.course.studentCourseId ? this.props.onSelectForToDo(this.props.course.studentCourseId) : null;
    this.props.selectedForToDo === this.props.course.studentCourseId ? this.props.onSeeToDoFor(null) : this.props.onSeeToDoFor(this.props.course.studentCourseId);
    this.props.onShowStudentCourseDetails(this.props.course.studentCourseId);
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
    const showIncomplete = this.props.completedFilter === "Incomplete";
    const toDoItems = this.props.courseEvents.filter(todo => ((todo.studentCourseId === courseToShowToDo.studentCourseId) && (todo.eventType === "course to do") && (todo.completed !== showIncomplete))).map(todo => <CourseToDo key={cuid()} todo={todo} onCompleteCourseToDo={this.props.onCompleteCourseToDo}/>)
    return toDoItems.length > 0 ? toDoItems : <p>Zero {this.props.completedFilter} To Do items!</p>;
  };

  handleSeeToDos = () => {
    this.props.onSeeToDoFor(this.props.course.studentCourseId);
  };

  handleCompletedFilter = () => {
    console.log("filter by completed")
    this.props.onFilterCourseToDoByCompleted();
  };

  handleIncompleteFilter = () => {
    console.log("filter by incomplete")
    this.props.onFilterCourseToDoByIncomplete();
  };

  render() {
    const course = this.props.course;
    const selectedStudentCourse = this.props.selectedStudentCourse;
    const isCourseToRemove = course.studentCourseId === this.props.courseToRemove;
    const courseColor = this.props.selectedCourse.data === course.studentCourseId;
    const seeToDoFor = this.props.seeToDoFor;
    const incompleteFilter = this.props.completedFilter === "Incomplete"; //will this be default? check other page settings
    console.log("course card render")
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
                    <input onClick={this.handleIncompleteFilter} type="radio" id="complete-filter-1" name="complete-course-filter" checked={incompleteFilter ? "checked" : ""} value="Incomplete"/>
                    <label for="complete-filter-1">Incomplete</label>
                    <input onClick={this.handleCompletedFilter} type="radio" id="complete-filter-2" name="complete-course-filter" value="Completed"/>
                    <label for="complete-filter-2">Completed</label>
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
