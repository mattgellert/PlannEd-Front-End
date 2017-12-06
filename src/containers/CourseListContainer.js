import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import DashboardCalendar from '../components/DashboardCalendar';
import AssignmentContainer from './AssignmentContainer';
import AssignmentSearchForm from '../components/AssignmentSearchForm';
import MainNavBar from '../components/MainNavBar';
import NavBar from '../components/NavBar';
import { seeToDos, descChange, deselectForToDo, calendarClick, titleChange, selectSlot, submitCourseToDo, startChange, endChange } from '../actions/students'; ///KEEP
import ToDoForm from '../components/ToDoForm';
import './DashboardContainer.css';
import CourseContainer from './CourseContainer';


class CourseListContainer extends Component {

  slotSelected = (slotInfo) => {
    console.log("slotSelected", slotInfo)
    this.props.onSelectSlot(slotInfo)
  }

  handleSubmit = (event) => {
    event.preventDefault();
    // if submitToDo & showDetails == assignment w/ToDo --> seeToDos
    const selectedSlot = this.props.selectedSlot;
    const toDoTime = `${this.props.selectedSlot.startTime}:${this.props.selectedSlot.endTime}`;
    this.props.selectedAssignment.showDetails === this.props.selectedForToDo ? null : this.props.onSeeToDos(this.props.seeToDoFor);
    this.props.onSubmitCourseToDo(selectedSlot.info.start.toLocaleDateString(), toDoTime, this.props.selectedForToDo, selectedSlot.title, selectedSlot.description);
  };

  handleStartChange = (event) => {
    this.props.onStartChange(event.target.value);
  }

  handleEndChange = (event) => {
    this.props.onEndChange(event.target.value);
  }

  handleTitleChange = (event) => {
    this.props.onTitleChange(event.target.value);
  };

  handleCloseForm = (event) => {
    this.props.onDeselectForToDo();
  };

  handleDescChange = (event) => {
    this.props.onDescChange(event.target.value)
  };

  render() {

    const calProps = {slotSelected: this.slotSelected, setStartTime: this.setStartTime, setEndTime: this.setEndTime }
    let MainNavChildren;
     // if (this.props.student.id) {
     //   MainNavChildren = (
     //     <AssignmentSearchForm courses={this.props.studentCourses} assignments={this.props.studentAssignments}/>
     //   );
     // }


    return (
      <div className="home-wrapper">
        <MainNavBar children={MainNavChildren}/>
          {this.props.slotSelected && (this.props.selectedForToDo !== 0)
            ?
              <div className="to-do-form-assignment-container" >
                <ToDoForm calendarClick={this.props.calendarClick} handleSubmit={this.handleSubmit} selectedSlot={this.props.selectedSlot} handleTitleChange={this.handleTitleChange} handleStartChange={this.handleStartChange} handleEndChange={this.handleEndChange} handleCloseForm={this.handleCloseForm}/>
              </div>
            : null
          }
          <div className="content-wrapper">
            <NavBar {...this.props} activeTab="dashboard" />
            <div className="content-container">
        {this.props.student.id ? <CourseContainer history={this.props.history}/> : <Redirect to="/"/>}
        {this.props.student.id
          ?
            <div className="dashboard-calendar-wrapper main-content">
              <DashboardCalendar selectedStudentCourse={this.props.selectedStudentCourse} selectedAssignment={this.props.selectedAssignment}completedFilter={this.props.completedFilter} defaultDate={this.props.defaultDate} onCalendarClick={this.props.onCalendarClick} calendar={this.props.calendar} {...calProps}/>
            </div>
          :
            <Redirect to="/"/>
        }
      </div>
      </div>
      </div>
    );
  };
};



function mapStateToProps(state) {

  return {
    student: state.student,
    calendar: state.calendar,
    addConflict: state.directory.addConflict,
    slotSelected: state.slotSelected,
    selectedSlot: state.selectedSlot,
    selectedForToDo: state.selectedForToDo,
    calendarClick: state.calendarClick,
    defaultDate: state.calendar.defaultDate,
    courseFilter: state.studentAssignments.courseFilter,
    completedFilter: state.studentAssignments.completedFilter,
    seeToDoFor: state.calendar.seeToDoFor,
    selectedAssignment: state.selectedAssignment,
    studentCourses: state.studentCourses,
    selectedStudentCourse: state.selectedStudentCourse
  }
};

function mapDispatchToProps(dispatch) {
  return {
    onSelectSlot: (slotInfo) => {
      dispatch(selectSlot(slotInfo));
    },
    onSubmitCourseToDo: (date, time, studentCourseId, title, description) => {
      dispatch(submitCourseToDo(date, time, studentCourseId, title, description));
    },
    onStartChange: (startTime) => {
      dispatch(startChange(startTime));
    },
    onEndChange: (endTime) => {
      dispatch(endChange(endTime));
    },
    onTitleChange: (title) => {
      dispatch(titleChange(title));
    },
    onCalendarClick: (xPos, yPos) => {
      dispatch(calendarClick(xPos, yPos));
    },
    onDeselectForToDo: () => {
      dispatch(deselectForToDo());
    },
    onDescChange: (description) => {
      dispatch(descChange(description));
    },
    onSeeToDos: (studentAssignmentId) => {
      dispatch(seeToDos(studentAssignmentId));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(CourseListContainer);
