import React, { Component } from 'react';

class EventDetailsForm extends Component {

  componentDidMount() {
    //event listener for clicking on window?
  };


  render() {
    const eventInfo = this.props.eventInfo;
    const windowCss = `
    .event-details-form-wrapper {
      position: absolute;
      height: 200px;
      width: 200px;
      left: ${this.props.calendarClick.x}px;
      top: ${this.props.calendarClick.y}px;
      z-index: 100;
      background: red;
    }
    `
    //set selectedSlot values to equal that of event and default to those values which get changed
    return (
      <div>
        <style>{windowCss}</style>
        <div className="event-details-form-wrapper">
          <form onSubmit={this.props.handleEventDetailsUpdate}>
            Title:
            <input type="text" value={eventInfo.title} onChange={this.props.handleTitleChange}/>
            <br/>
            Start Time:
            <input type="time" value={eventInfo.startTime} onChange={this.props.handleStartChange}/>
            <br/>
            End Time:
            <input type="time" value={eventInfo.endTime} onChange={this.props.handleEndChange}/>
            Description:
            <input type="textbox" value={eventInfo.description} onChange={this.props.handleDescChange}/>
            <br/>
            <input type="submit" value="Create To Do!"/>
            <p onClick={this.props.handleCloseEventWindow}>X</p>
          </form>
        </div>
      </div>
    )
  }
}

export default EventDetailsForm;
