import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import DashboardCalendar from '../components/DashboardCalendar';
import AssignmentContainer from './AssignmentContainer';
import NavBar from '../components/NavBar';
import { seeToDos, descChange, deselectForToDo, calendarClick, titleChange, selectSlot, submitToDo, startChange, endChange } from '../actions/students';
import ToDoFormAssignments from '../components/ToDoFormAssignments';
import './DashboardContainer.css';


class DashboardContainer extends Component {

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
    this.props.onSubmitToDo(selectedSlot.info.start.toLocaleDateString(), toDoTime, this.props.selectedForToDo, selectedSlot.title, selectedSlot.description);
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
    return (
      <div className="dashboard-container">

          {this.props.slotSelected && (this.props.selectedForToDo !== 0)
            ?
              <div className="to-do-form-assignment-container" >
                <ToDoFormAssignments calendarClick={this.props.calendarClick} handleSubmit={this.handleSubmit} selectedSlot={this.props.selectedSlot} handleTitleChange={this.handleTitleChange} handleStartChange={this.handleStartChange} handleEndChange={this.handleEndChange} handleCloseForm={this.handleCloseForm}/>
              </div>
            : null
          }
        <NavBar {...this.props} activeTab="dashboard" />
        {this.props.student.id ? <AssignmentContainer /> : <Redirect to="/"/>}
        {this.props.addConflict ? <Redirect to="/course-directory"/> : null}
        {this.props.student.id
          ?
            <div className="dashboard-calendar-wrapper">
              <DashboardCalendar completedFilter={this.props.completedFilter} courseFilter={this.props.courseFilter} defaultDate={this.props.defaultDate} onCalendarClick={this.props.onCalendarClick} calendar={this.props.calendar} {...calProps}/>
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
    selectedAssignment: state.selectedAssignment
  }
};

function mapDispatchToProps(dispatch) {
  return {
    onSelectSlot: (slotInfo) => {
      dispatch(selectSlot(slotInfo));
    },
    onSubmitToDo: (date, time, studentAssignmentId, title) => {
      dispatch(submitToDo(date, time, studentAssignmentId, title));
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

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);
