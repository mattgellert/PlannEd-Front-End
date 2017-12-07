import React, { Component } from 'react';

class EventDetailsWindow extends Component {

  render() {
    const eventInfo = this.props.eventInfo;
    const editable = (eventInfo.eventType === "course to do") || (eventInfo.eventType === "to do")
    const windowCss = `
    .event-details-window-wrapper {
      position: absolute;
      height: 250px;
      width: 200px;
      left: ${this.props.calendarClick.x}px;
      top: ${this.props.calendarClick.y - 230}px;
      z-index: 100;
    }
    `

    return (
      <div className="event-details-window" id="event-details-window">
        <style>{windowCss}</style>
        <div className="event-details-window-wrapper" id="event-details-window">
          <p className="event-details-title" id="event-details-window">{eventInfo.title}</p>
          Start:
          <br/>
          <p className="event-details-time" id="event-details-window"> {`${eventInfo.startDate}`.slice(0,21)}</p>
          End:
          <br/>
          <p className="event-details-time" id="event-details-window"> {`${eventInfo.endDate}`.slice(0,21)}</p>
          <p id="event-details-window">{eventInfo.description}</p>
          <p  id="event-details-window"onClick={this.props.handleCloseEventWindow}>X   {editable ? <button className="courses-button event" id="event-details-window"onClick={this.props.handleShowEventForm}>Edit</button> : null}</p>

        </div>
      </div>
    )
  }
}

export default EventDetailsWindow;
