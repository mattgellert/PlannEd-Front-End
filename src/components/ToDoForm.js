import React, { Component } from 'react';

export default class ToDoForm extends Component {
  render() {
    const formCss = `
    .to-do-form-assignment-wrapper {
      position: absolute;
      height: 200px;
      width: 200px;
      left: ${this.props.calendarClick.x}px;
      top: ${this.props.calendarClick.y - 200}px;
      z-index: 100;
    }
    `
    return (
      <div className="event-details-window" id="event-details-window">
        <style>{formCss}</style>
        <div className="to-do-form-assignment-wrapper" id="event-details-window">
          <form onSubmit={this.props.handleSubmit} id="event-details-window">
            <label className="event-details-window-label">Title:</label>
            <br/>
            <input id="event-details-window" className="event-form-input" type="text" value={this.props.selectedSlot.title} onChange={this.props.handleTitleChange}/>
            <br/>
            <label className="event-details-window-label">Start:</label>
            <br/>
            <input id="event-details-window" className="event-form-input" type="time" value={this.props.selectedSlot.startTime} onChange={this.props.handleStartChange}/>
            <br/>
            <label className="event-details-window-label">End:</label>
            <br/>
            <input id="event-details-window" className="event-form-input" type="time" value={this.props.selectedSlot.endTime} onChange={this.props.handleEndChange}/>
            <br/>
            <label className="event-details-window-label">Desc:</label>
            <br/>
            <input id="event-details-window" className="event-form-input" type="textbox" value={this.props.selectedSlot.description} onChange={this.props.handleDescChange}/>
            <br/>
            <input className="courses-button event" id="event-details-window" type="submit" value="Create To Do!"/><p className="close-event-details-window" id="event-details-window" onClick={this.props.handleCloseForm}>X</p>

          </form>
        </div>
      </div>
    )
  }
}
