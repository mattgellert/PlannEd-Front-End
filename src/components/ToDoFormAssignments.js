import React, { Component } from 'react';

export default class ToDoFormAssignments extends Component {
  render() {
    const formCss = `
    .to-do-form-assignment-wrapper {
      position: absolute;
      height: 200px;
      width: 200px;
      left: ${this.props.calendarClick.x}px;
      top: ${this.props.calendarClick.y - 90}px;
      z-index: 100;
      background: red;
    }
    `
    return (
      <div>
        <style>{formCss}</style>
        <div className="to-do-form-assignment-wrapper">
          <form onSubmit={this.props.handleSubmit}>
            Title:
            <input type="text" value={this.props.selectedSlot.title} onChange={this.props.handleTitleChange}/>
            <br/>
            Start Time:
            <input type="time" value={this.props.selectedSlot.startTime} onChange={this.props.handleStartChange}/>
            <br/>
            End Time:
            <input type="time" value={this.props.selectedSlot.endTime} onChange={this.props.handleEndChange}/>
            <br/>
            <input type="submit" value="Create To Do!"/>
            <p onClick={this.props.handleCloseForm}>X</p>
          </form>
        </div>
      </div>
    )
  }
}
