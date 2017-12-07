import React, { Component } from 'react';
import ClockIcon from './svgs/ClockIcon.js';
import CalendarIcon from './svgs/CalendarIcon.js';
import CalendarAddIcon from './svgs/CalendarAddIcon.js';

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
    this.props.onHideAssignmentDetails();
    this.props.onSeeToDos(this.props.seeToDoFor);
    this.props.onDeselectSubAssignment(this.props.assignment.studentAssignmentId);
  };

  handleAddToDo = () => {
    this.props.seeToDoFor !== this.props.assignment.studentAssignmentId ? this.props.onSeeToDos(this.props.assignment.studentAssignmentId) : null;
    this.props.selectedAssignment.showDetails === this.props.assignment.studentAssignmentId ? this.props.onSeeToDos(this.props.assignment.studentAssignmentId) : this.props.onShowAssignmentDetails(this.props.assignment.studentAssignmentId);
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
    this.props.onSeeToDos(this.props.seeToDoFor);
    this.props.onHideAssignmentDetails();
  };

  getToDoItems = () => {
    const assigmentToShowToDo = this.props.assignment;
    const today = new Date();
    return this.props.toDoItems.filter(todo => todo.studentAssignmentId === assigmentToShowToDo.studentAssignmentId).map(todo => {
      return (
        <div className="assignment-to-do">
          <h4>{todo.title}</h4>
          <p>{todo.startDate} - {todo.endDate} {today > todo.endDate ? "(Past)" : "(Upcoming)"}</p>
          <p>{todo.description}</p>
        </div>
      )
    });
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

    let showDetails = false;
    let toDoItems = [];
    if (this.props.selectedAssignment.showDetails === assignment.studentAssignmentId ) {
      showDetails = true
      toDoItems = this.getToDoItems();
    }

    return (
      <div>
        <p className="title-label-secondary sub">
          <input
            onChange={assignment.hasSubAssignments ? this.handleParentComplete : this.handleComplete}
            className="checkbox"
            type="checkbox"
            checked={!!assignment.completed}
          />
          {`SUB: ${assignment.title}`}
          <CalendarAddIcon className={this.props.selectedForToDo === assignment.studentAssignmentId ? 'calendar-add-icon clicked' : 'calendar-add-icon'} onClick={this.handleAddToDo} />
        </p>
        {showDetails &&
            <div>
              <div className="details-drawer">
                <p className="description">{assignment.description}</p>
                <div className="due">
                  <CalendarIcon />
                  <span className="due-date">{dueDate.toLocaleString().split(',')[0]}</span>
                  <ClockIcon />
                  <span className="due-time">{dueDate.toLocaleString([], {hour: '2-digit', minute:'2-digit'})}</span>
                </div>
                {toDoItems}
              </div>
            </div>
        }
        <div className="buttons-wrapper">
          {this.props.selectedAssignment.showDetails === assignment.studentAssignmentId
              ?
                <button className="details-button" onClick={this.handleHideAssignmentDetails}>Hide Details</button>
              :
                <button className="details-button" onClick={this.handleShowAssignmentDetails}>Show Details</button>
            }
        </div>
        <div className="buttons-wrapper">
          {assignment.hasSubAssignments ?
              <div className="sub-button">
                {show
                  ?
                    <div>
                      <button className="details-button sub" onClick={this.handleDeselectSubAssignment}>Hide Sub-Assignments</button>
                    </div>
                  :
                    <div>
                      <button className="details-button" onClick={this.handleSubAssignments}>See Sub</button>
                    </div>
                }
              </div>
              : null
          }
        </div>
      </div>
    );

    // return (
    //   <div className="sub-assignment-card">
    //     <h3>{assignment.subject} {assignment.catalogNbr} HW</h3>
    //     <p>{assignment.courseTitle}</p>
    //     <p>{assignment.title}</p>
    //     <p>Due: {dueDate.toLocaleString()}</p>
    //     {this.props.selectedAssignment.showDetails === assignment.studentAssignmentId
    //       ?
    //         <div>
    //           <button onClick={this.handleHideAssignmentDetails}>Hide Details</button>
    //           <p>{assignment.description}</p>
    //           {toDoItems}
    //         </div>
    //       :
    //         <button onClick={this.handleShowAssignmentDetails}>Show Details</button>
    //     }
    //     <button onClick={this.handleAddToDo}>{this.props.selectedForToDo === assignment.studentAssignmentId ? "Choose A Date >" : "+ To Do"}</button>
    //     {assignment.hasSubAssignments
    //       ?
    //         <div>
    //           <button onClick={this.handleParentComplete}>{assignment.completed ? "Completed!" : "Complete Sub-Assignments"}</button>
    //           {show
    //             ?
    //               <button onClick={this.handleDeselectSubAssignment}>Hide Sub-Assignments</button>
    //             :
    //               <button onClick={this.handleSubAssignments}>See Sub-Assignments</button>
    //           }
    //         </div>
    //       :
    //         <div>
    //           <button onClick={this.handleComplete}>{assignment.completed ? "Completed!" : "Complete"}</button>
    //         </div>
    //     }
    //   </div>
    // );
  };
};
