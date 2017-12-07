import React, { Component } from 'react';

class EventDetailsWindow extends Component {

  render() {
    const eventInfo = this.props.eventInfo;
    const editable = (eventInfo.eventType === "course to do") || (eventInfo.eventType === "to do")
    const windowCss = `
    .event-details-window-wrapper {
      position: absolute;
      height: 200px;
      width: 200px;
      left: ${this.props.calendarClick.x}px;
      top: ${this.props.calendarClick.y}px;
      z-index: 100;
      background: red;
    }
    `
    console.log("event details window info:", eventInfo)

    return (
      <div>
        <style>{windowCss}</style>
        <div className="event-details-window-wrapper">
          <h4>{eventInfo.title}</h4>
          <p>Start Time: {`${eventInfo.startDate}`.slice(0,21)}</p>
          <p>End Time: {`${eventInfo.endDate}`.slice(0,21)}</p>
          <p>{eventInfo.description}</p>
          <p onClick={this.props.handleCloseEventWindow}>X</p>
          {editable ? <button onClick={this.props.handleShowEventForm}>Edit</button> : null}
        </div>
      </div>
    )
  }
}

export default EventDetailsWindow;
