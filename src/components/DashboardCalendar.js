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

    if (!!this.props.courseFilter) {
      if (this.props.courseFilter === "All Courses" || parseInt(this.props.courseFilter, 10) === event.studentCourseId) {
        if (completedFilter === "Incomplete") {
          console.log("incomplete?", ((event.eventType === "due date") && !event.completed))
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
    } else {
      const showCourseDetailsFor = this.props.selectedStudentCourse ? this.props.selectedStudentCourse.showDetails : null;
      const showIncomplete = this.props.completedFilter === "Incomplete"
      if (seeToDoFor === event.studentCourseId && event.eventType === "course to do" && event.completed !== showIncomplete) {
        return { style: { backgroundColor: color, border: "2px solid #000000" } }
      }
      if (showCourseDetailsFor === event.studentCourseId && event.eventType === "course") {
        return { style: { backgroundColor: color, boxShadow: "0px 0px 4px 4px #888888" } }
      } else {
        return { style: { backgroundColor: color } }
      }


    }
  };

  render() {
    BigCalendar.momentLocalizer(moment);
    // const allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k])
    const toDoItems = this.props.calendar.toDoItems.filter(todo => !todo.completed)
    let calEvents = [...this.props.calendar.courses, ...this.props.calendar.dueDates, ...toDoItems].map(date => ({
      id: date.id,
      title: date.title,
      description: date.description,
      eventType: date.eventType,
      startDate: (new Date(...date.startDate)),
      endDate: (new Date(...date.endDate)),
      color: date.color,
      studentCourseId: date.studentCourseId,
      studentAssignmentId: date.studentAssignmentId,
      completed: date.completed
    }));

    !this.props.courseFilter && !!this.props.inDirectory ? calEvents = calEvents.filter(ev => ev.eventType === "course") : null;
    // !!this.props.inMyCourses ? calEvents = calEvents.filter(ev => ev.eventType === "course" ? true : !ev.completed) : null;
    calEvents = calEvents.filter(ev => {
      if (ev.eventType === "course" || ev.eventType === "due date") {
        return true
      } else {
          return !ev.completed
      }
    })

    // !this.props.courseFilter && !this.props.inDirectory ? calEvents = calEvents.filter(ev => (ev.eventType === "course" || ev.eventType === "course to do")) : null;
    if (!this.props.courseFilter && !this.props.inDirectory) {
      calEvents = calEvents.map(ev => {
        if ((ev.eventType !== "course") && (ev.eventType !== "course to do")) {
          return {
            ...ev,
            color: "#bcbfc4"
          }
        } else {
          return ev
        }
      })
    }

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
          onSelectEvent={this.props.handleSelectEvent}
          views={["month", "week", "day"]}
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
