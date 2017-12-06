import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css'
import './DashboardCalendarStyles.css';
import $ from 'jquery';


export default class DashboardCalendar extends Component {
  componentDidMount() {
    let calendarDOMObject = $('.rbc-calendar')
    calendarDOMObject.on("click", (event) => {
      this.props.onCalendarClick(event.originalEvent.screenX, event.originalEvent.screenY)
    });
  };

  getEventColor = (event) => {
    const color = event.color;
    const seeToDoFor = this.props.calendar.seeToDoFor;
    let boxShadow = seeToDoFor === event.studentAssignmentId ? "0px 0px 4px 4px #888888" : null;
    const completedFilter = this.props.completedFilter;

    //get ids of subassignments of seeToDoFor
    // console.log("get event color subassignments", this.props.selectedAssignment.subAssignments)
    // const subAssIds = this.props.selectedAssignment.subAssignments.map(subAss => subAss.id);
    // if (subAssIds.includes(event.studentAssignmentId)) {
    //   boxShadow = "0px 0px 4px 4px #888888";
    // }

    if (this.props.courseFilter === "All Courses" || parseInt(this.props.courseFilter, 10) === event.studentCourseId) {
      if (completedFilter === "Incomplete") {
        return (event.eventType === "due date") && !event.completed ? { style: { backgroundColor: color, border: "2px solid #000000", boxShadow: boxShadow } } : { style: { backgroundColor: color, boxShadow: boxShadow } };
      } else {
        return (event.eventType === "due date") && !!event.completed ? { style: { backgroundColor: color, border: "2px solid #000000", boxShadow: boxShadow } } : { style: { backgroundColor: color, boxShadow: boxShadow } };
      }

    } else {
      if (completedFilter === "Incomplete") {
        return (event.eventType === "due date") && !event.completed ? { style: { backgroundColor: color, border: "2px solid #000000", boxShadow: boxShadow, opacity: 0.5 } } : { style: { backgroundColor: color, boxShadow: boxShadow, opacity: 0.5 } };
      } else {
        return (event.eventType === "due date") && !!event.completed ? { style: { backgroundColor: color, border: "2px solid #000000", boxShadow: boxShadow, opacity: 0.5 } } : { style: { backgroundColor: color, boxShadow: boxShadow, opacity: 0.5 } };
      }

    }
  };

  render() {
    BigCalendar.momentLocalizer(moment);
    const allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k])
    const toDoItems = this.props.calendar.toDoItems.filter(todo => !todo.completed)
    const calEvents = [...this.props.calendar.courses, ...this.props.calendar.dueDates, ...toDoItems].map(date => ({
      title: date.title,
      eventType: date.eventType,
      startDate: new Date(...date.startDate),
      endDate: new Date(...date.endDate),
      color: date.color,
      studentCourseId: date.studentCourseId,
      studentAssignmentId: date.studentAssignmentId,
      completed: date.completed
    }));

    // ["month", "week", "work_week", "day", "agenda"]
    const defaultDate = !!this.props.defaultDate ? this.props.defaultDate : new Date("9/04/2017")
    return (
      <div className="dashboard-calendar">
        <BigCalendar
          selectable
          popup
          eventPropGetter={this.getEventColor}
          events={calEvents}
          startAccessor='startDate'
          endAccessor='endDate'
          step={60}
          onSelectSlot={this.props.slotSelected}
          onSelectEvent={event => alert(event.title)}
          views={allViews}
          defaultDate={defaultDate}
        />
      </div>
    )
  }

}

//
// event format:
// need to add color/label
// {
//   'title': 'All day very long',
//   'allDay': true,
//   'startDate': new Date(2017, 3, 0),
//   'endDate':  new Date(2017, 3, 1)
// }
