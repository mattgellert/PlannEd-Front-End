import React, { Component } from 'react';

export default class SubAssignmentCard extends Component {

  handleParentComplete = () => {
    this.props.onCompleteParent(this.props.assignment.studentAssignmentId)
  };

  handleComplete = () => {
    const rootAssignmentIds = this.props.studentAssignments.data.map(ass => ass.studentAssignmentId); //missing StudentAssignment.data
    const subAssignmentIds = this.props.selectedAssignment.subAssignments.map(subAss => subAss.id);
    this.props.onCompleteSubAssignment(this.props.assignment.studentAssignmentId, rootAssignmentIds, subAssignmentIds);
  };

  handleSubAssignments = () => {
    this.props.onFetchSubAssignments(this.props.assignment.studentAssignmentId);
  };

  handleDeselectSubAssignment = () => {
    this.props.onDeselectSubAssignment(this.props.assignment.studentAssignmentId);
  };

  handleAddToDo = () => {
    this.props.seeToDoFor !== this.props.assignment.studentAssignmentId ? this.props.onSeeToDos(this.props.assignment.studentAssignmentId) : null;
    this.props.onDeselectForToDo();
    this.props.selectedForToDo !== this.props.assignment.studentAssignmentId ? this.props.onSelectForToDo(this.props.assignment.studentAssignmentId) : null;
  };

  handleShowAssignmentDetails = () => {
    this.props.seeToDoFor !== this.props.assignment.studentAssignmentId ? this.props.onDeselectForToDo() : null;
    this.props.onSeeToDos(this.props.assignment.studentAssignmentId);
    this.props.onShowAssignmentDetails(this.props.assignment.studentAssignmentId);
  }

  handleHideAssignmentDetails = () => {
    // if showDetails & selectedForToDo, hideDetails --> deselect assignment & deselectForToDo
    this.props.onDeselectForToDo()
    this.props.onSeeToDos(this.props.assignment.studentAssignmentId);
    this.props.onHideAssignmentDetails();
  };


  render() {
    let show = false;
    const assignment = this.props.assignment;
    this.props.selectedAssignment.subAssignments.forEach(subAss => {
      if (subAss.parentId === assignment.studentAssignmentId) {
        show = true;
      };
    });
    const dueDate = new Date(assignment.dueDate);
    const seeToDo = this.props.seeToDoFor === assignment.studentAssignmentId;
    return (
      <div className="sub-assignment-card">
        <h3>{assignment.subject} {assignment.catalogNbr} HW</h3>
        <p>{assignment.courseTitle}</p>
        <p>{assignment.title}</p>
        <p>Due: {dueDate.toLocaleString()}</p>
        {this.props.selectedAssignment.showDetails === assignment.studentAssignmentId
          ?
            <div>
              <button onClick={this.handleHideAssignmentDetails}>Hide Details</button>
              <p>{assignment.description}</p>
            </div>
          :
            <button onClick={this.handleShowAssignmentDetails}>Show Details</button>
        }
        <button onClick={this.handleAddToDo}>{this.props.selectedForToDo === assignment.studentAssignmentId ? "Choose A Date >" : "+ To Do"}</button>
        {assignment.hasSubAssignments
          ?
            <div>
              <button onClick={this.handleParentComplete}>{assignment.completed ? "Completed!" : "Complete Sub-Assignments"}</button>
              {show
                ?
                  <button onClick={this.handleDeselectSubAssignment}>Hide Sub-Assignments</button>
                :
                  <button onClick={this.handleSubAssignments}>See Sub-Assignments</button>
              }
            </div>
          :
            <div>
              <button onClick={this.handleComplete}>{assignment.completed ? "Completed!" : "Complete"}</button>
            </div>
        }
      </div>
    );
  };
};
