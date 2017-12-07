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

    return (
      <div id="event-details-window">
        <style>{windowCss}</style>
        <div className="event-details-window-wrapper" id="event-details-window">
          <h4 id="event-details-window">{eventInfo.title}</h4>
          <p id="event-details-window">Start Time: {`${eventInfo.startDate}`.slice(0,21)}</p>
          <p id="event-details-window">End Time: {`${eventInfo.endDate}`.slice(0,21)}</p>
          <p id="event-details-window">{eventInfo.description}</p>
          <p  id="event-details-window"onClick={this.props.handleCloseEventWindow}>X</p>
          {editable ? <button  id="event-details-window"onClick={this.props.handleShowEventForm}>Edit</button> : null}
        </div>
      </div>
    )
  }
}

export default EventDetailsWindow;
