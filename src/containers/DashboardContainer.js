import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import DashboardCalendar from '../components/DashboardCalendar';
import AssignmentContainer from './AssignmentContainer';
import AssignmentSearchForm from '../components/AssignmentSearchForm';
import MainNavBar from '../components/MainNavBar';
import NavBar from '../components/NavBar';
import { eventDelete, eventCancelDelete, eventDeleteWarning, updateEventDetails, editSelectedEvent, deselectEvent, selectEvent, seeToDos, descChange, deselectForToDo, calendarClick, titleChange, selectSlot, submitToDo, startChange, endChange } from '../actions/students'; ///KEEP
import ToDoForm from '../components/ToDoForm';
import './DashboardContainer.css';
import CourseContainer from './CourseContainer';
import EventDetailsWindow from '../components/EventDetailsWindow';
import EventDetailsForm from '../components/EventDetailsForm';


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
    console.log("title change")
    this.props.onTitleChange(event.target.value);
  };

  handleCloseForm = (event) => {
    this.props.onDeselectForToDo();
  };

  handleDescChange = (event) => {
    console.log("desc change", event.target.value)
    this.props.onDescChange(event.target.value)
  };

  handleSelectEvent = (event) => {
    this.props.onSelectEvent(event)
    console.log("selected event", event)
    this.windowListener = document.querySelector('.rbc-month-view').addEventListener("click", (event) => {
      this.handleCloseEventWindow();
    });
  }

  handleCloseEventWindow = () => {
    this.props.onDeselectEvent();
    this.windowListener = null;
  };

  handleEventDeleteWarning = () => {
    this.props.onEventDeleteWarning();
  };

  handleEventDelete = () => {
    this.props.onEventDelete(this.props.eventSelected.data.id);
  };

  handleEventCancelDelete = () => {
    this.props.onEventCancelDelete();
  };

  handleEventDetailsUpdate = (event) => {
    event.preventDefault();
    const eventSelected = this.props.eventSelected.data;
    const updatedEventTime = `${this.props.selectedSlot.startTime}:${this.props.selectedSlot.endTime}`;
    this.props.onDeselectEvent();
    this.windowListener = null;
    this.props.onUpdateEventDetails(eventSelected.startDate.toLocaleDateString(), updatedEventTime, eventSelected.id, this.props.selectedSlot.title, this.props.selectedSlot.description, eventSelected.eventType);
  };

  handleShowEventForm = () => {
    this.props.onEditSelectedEvent();
  };

  //MAKE SURE YOU CANT SELECT EVENT WHEN ADDING TO DO

  render() {
    const calProps = {slotSelected: this.slotSelected, setStartTime: this.setStartTime, setEndTime: this.setEndTime }
    let MainNavChildren;
     if (this.props.student.id) {
       MainNavChildren = (
         <AssignmentSearchForm courses={this.props.studentCourses} assignments={this.props.studentAssignments}/>
       );
     }


    return (
      <div className="home-wrapper">
        <MainNavBar children={MainNavChildren}/>
          {this.props.slotSelected && (this.props.selectedForToDo !== 0)
            ?
              <div className="to-do-form-assignment-container" >
                <ToDoForm calendarClick={this.props.calendarClick} handleSubmit={this.handleSubmit} selectedSlot={this.props.selectedSlot} handleTitleChange={this.handleTitleChange} handleStartChange={this.handleStartChange} handleEndChange={this.handleEndChange} handleCloseForm={this.handleCloseForm} handleDescChange={this.handleDescChange}/>
              </div>
            : null
          }
          {!!this.props.eventSelected.data
            ?
              <div>
                {this.props.eventSelected.edit
                  ?
                    <EventDetailsForm toDelete={this.props.eventSelected.toDelete} handleEventDeleteWarning={this.handleEventDeleteWarning} handleEventDelete={this.handleEventDelete} handleEventCancelDelete={this.handleEventCancelDelete} handleTitleChange={this.handleTitleChange} handleStartChange={this.handleStartChange} handleEndChange={this.handleEndChange} handleDescChange={this.handleDescChange} selectedSlot={this.props.selectedSlot} calendarClick={this.props.calendarClick} eventInfo={this.props.eventSelected.data} handleCloseEventWindow={this.handleCloseEventWindow} handleEventDetailsUpdate={this.handleEventDetailsUpdate}/>
                  :
                    <EventDetailsWindow calendarClick={this.props.calendarClick} eventInfo={this.props.eventSelected.data} handleShowEventForm={this.handleShowEventForm} handleCloseEventWindow={this.handleCloseEventWindow}/>
                }
              </div>
            : null
          }
          <div className="content-wrapper">
            <NavBar {...this.props} activeTab="dashboard" />
            <div className="content-container">
        {this.props.student.id ? <AssignmentContainer /> : <Redirect to="/"/>}
        {this.props.addConflict ? <Redirect to="/course-directory"/> : null}
        {this.props.student.id
          ?
            <div className="dashboard-calendar-wrapper main-content">
              <DashboardCalendar handleSelectEvent={this.handleSelectEvent} selectedAssignment={this.props.selectedAssignment}completedFilter={this.props.completedFilter} courseFilter={this.props.courseFilter} defaultDate={this.props.defaultDate} onCalendarClick={this.props.onCalendarClick} calendar={this.props.calendar} {...calProps}/>
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
    eventSelected: state.eventSelected
  }
};

function mapDispatchToProps(dispatch) {
  return {
    onSelectSlot: (slotInfo) => {
      dispatch(selectSlot(slotInfo));
    },
    onSubmitToDo: (date, time, studentAssignmentId, title, description) => {
      dispatch(submitToDo(date, time, studentAssignmentId, title, description));
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
    },
    onSelectEvent: (event) => {
      dispatch(selectEvent(event));
    },
    onDeselectEvent: () => {
      dispatch(deselectEvent());
    },
    onEditSelectedEvent: () => {
      dispatch(editSelectedEvent());
    },
    onUpdateEventDetails: (date, time, id, title, description, eventType) => {
      dispatch(updateEventDetails(date, time, id, title, description, eventType));
    },
    onEventDelete: (id) => {
      dispatch(eventDelete(id));
    },
    onEventCancelDelete: () => {
      dispatch(eventCancelDelete());
    },
    onEventDeleteWarning: () => {
      dispatch(eventDeleteWarning());
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);
