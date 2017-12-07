import React, { Component } from 'react';

class EventDetailsForm extends Component {

  render() {
    const eventInfo = this.props.selectedSlot;
    const startVal = typeof eventInfo.startTime === "string" ? eventInfo.startTime : eventInfo.startTime.toTimeString().slice(0,5);
    const endVal = typeof eventInfo.endTime === "string" ? eventInfo.endTime : eventInfo.endTime.toTimeString().slice(0,5);


    let formattedDate;
    let splitDate;
    let month;
    let day;
    if (typeof eventInfo.date === "object") {
      splitDate = eventInfo.date.toLocaleDateString().split("/")
      month = splitDate[0].length === 1 ? "0" + splitDate[0] : splitDate[0];
      day = splitDate[1].length === 1 ? "0" + splitDate[1] : splitDate[1]
      formattedDate = `${splitDate[2]}-${month}-${day}`;
    }

    const dateVal = typeof eventInfo.date === "string" ? eventInfo.date : formattedDate;

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



    return (
      <div id="event-details-window" >
        <style>{windowCss}</style>
        <div id="event-details-window" className="event-details-form-wrapper">
          <form id="event-details-window" onSubmit={this.props.handleEventDetailsUpdate}>
            Title:
            <input id="event-details-window" type="text" value={eventInfo.title} onChange={this.props.handleTitleChange}/>
            <br/>
            Date:
            <input id="event-details-window" type="date" value={dateVal} onChange={this.props.onDateChange}/>
            <br/>
            Start Time:
            <input id="event-details-window" type="time" value={startVal} onChange={this.props.handleStartChange}/>
            <br/>
            End Time:
            <input id="event-details-window" type="time" value={endVal} onChange={this.props.handleEndChange}/>
            Description:
            <input id="event-details-window" type="textbox" value={eventInfo.description} onChange={this.props.handleDescChange}/>
            <br/>
            <input id="event-details-window" type="submit" value="Update To Do!"/>
            {this.props.toDelete
              ?
                <div id="event-details-window" >
                  <p id="event-details-window" >Are you sure?</p>
                  <button id="event-details-window" onClick={this.props.handleEventCancelDelete}>Cancel</button>
                  <button id="event-details-window" onClick={this.props.handleEventDelete}>Delete</button>
                </div>
              :
                <button id="event-details-window" onClick={this.props.handleEventDeleteWarning}>Delete</button>
            }
            <p id="event-details-window" onClick={this.props.handleCloseEventWindow}>X</p>
          </form>
        </div>
      </div>
    )
  }
}

export default EventDetailsForm;
