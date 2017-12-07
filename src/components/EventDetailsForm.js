import React, { Component } from 'react';

class EventDetailsForm extends Component {

  render() {
    const eventInfo = this.props.selectedSlot;
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
    console.log("event details form info:", eventInfo)
    debugger
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
            <input type="time" value={eventInfo.startTime.toTimeString().slice(0,5)} onChange={this.props.handleStartChange}/>
            <br/>
            End Time:
            <input type="time" value={eventInfo.endTime.toTimeString().slice(0,5)} onChange={this.props.handleEndChange}/>
            Description:
            <input type="textbox" value={eventInfo.description} onChange={this.props.handleDescChange}/>
            <br/>
            <input type="submit" value="Update To Do!"/>
            {this.props.toDelete
              ?
                <div>
                  <p>Are you sure?</p>
                  <button onClick={this.props.handleEventCancelDelete}>Cancel</button>
                  <button onClick={this.props.handleEventDelete}>Delete</button>
                </div>
              :
                <button onClick={this.props.handleEventDeleteWarning}>Delete</button>
            }
            <p onClick={this.props.handleCloseEventWindow}>X</p>
          </form>
        </div>
      </div>
    )
  }
}

export default EventDetailsForm;
