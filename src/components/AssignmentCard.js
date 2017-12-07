import React, { Component } from 'react';
import { connect } from 'react-redux';
import SubAssignmentCard from './SubAssignmentCard';
import { seeToDos, hideAssignmentDetails, deselectForToDo, selectForToDo, completeParent, fetchSubAssignments, completeAssignment, completeSubAssignment, showAssignmentDetails, deselectAssignment, deselectSubAssignment } from '../actions/students';
import cuid from 'cuid';
import ClockIcon from './svgs/ClockIcon.js';
import CalendarIcon from './svgs/CalendarIcon.js';
import CalendarAddIcon from './svgs/CalendarAddIcon.js';
// import PriorityIcon from './svgs/PriorityIcon.js';


class AssignmentCard extends Component {

  handleParentComplete = () => {
    this.props.onCompleteParent(this.props.assignment.studentAssignmentId);
  };

  handleComplete = () => {
    this.props.onCompleteAssignment(this.props.assignment.studentAssignmentId);
  };

  handleShowAssignmentDetails = () => {
    this.props.seeToDoFor !== this.props.assignment.studentAssignmentId ? this.props.onDeselectForToDo() : null;
    this.props.onSeeToDos(this.props.assignment.studentAssignmentId);
    // this.props.selectedAssignment.showDetails !== this.props.assignment.studentAssignmentId ? this.props.onSeeToDos(this.props.assignment.studentAssignmentId) : null;
    this.props.onShowAssignmentDetails(this.props.assignment.studentAssignmentId);
  };


  handleHideAssignmentDetails = () => {
    this.props.onDeselectForToDo()
    this.props.onSeeToDos(null);
    this.props.onHideAssignmentDetails();
  };

  handleSelectSubAssignments = () => {
    this.props.onFetchSubAssignments(this.props.assignment.studentAssignmentId, true)
  };

  handleDeselectAssignment = () => {
    this.props.onHideAssignmentDetails();
    this.props.onSeeToDos(null);
    this.props.onDeselectAssignment();
  };


  showSubAssignments = () => {
    const arr = this.props.selectedAssignment.subAssignments.map((subAss, idx) => {
      return <SubAssignmentCard key={cuid()} toDoItems={this.props.toDoItems} seeToDoFor={this.props.seeToDoFor} onSeeToDos={this.props.onSeeToDos}onShowAssignmentDetails={this.props.onShowAssignmentDetails} onHideAssignmentDetails={this.props.onHideAssignmentDetails} onDeselectForToDo={this.props.onDeselectForToDo} selectedForToDo={this.props.selectedForToDo} assignment={subAss.assignment} onCompleteParent={this.props.onCompleteParent} onCompleteSubAssignment={this.props.onCompleteSubAssignment} onFetchSubAssignments={this.props.onFetchSubAssignments} onDeselectSubAssignment={this.props.onDeselectSubAssignment} onSelectForToDo={this.props.onSelectForToDo} selectedAssignment={this.props.selectedAssignment} studentAssignments={this.props.studentAssignments}/>
    });
    return arr;
  };

  handleAddToDo = () => {
    this.props.seeToDoFor !== this.props.assignment.studentAssignmentId ? this.props.onSeeToDos(this.props.assignment.studentAssignmentId) : this.props.onSeeToDos(null);
    this.props.selectedAssignment.showDetails === this.props.assignment.studentAssignmentId ? this.props.onSeeToDos(this.props.assignment.studentAssignmentId) : this.props.onShowAssignmentDetails(this.props.assignment.studentAssignmentId);
    this.props.onDeselectForToDo()
    this.props.selectedForToDo !== this.props.assignment.studentAssignmentId ? this.props.onSelectForToDo(this.props.assignment.studentAssignmentId) : null;
  };

  getToDoItems = () => {
    const assigmentToShowToDo = this.props.assignment;
    const today = new Date();
    return this.props.toDoItems.filter(todo => todo.studentAssignmentId === assigmentToShowToDo.studentAssignmentId).map(todo => {
      return (
        <div key={cuid()} className="assignment-to-do">
          <h4>{todo.title}</h4>
          <p>{`${(new Date(...todo.startDate)).toString().slice(0,21)}`} - {`${(new Date(...todo.endDate)).toString().slice(0,21)}`} {today > todo.endDate ? "(Past)" : "(Upcoming)"}</p>
          <p>{todo.description}</p>
        </div>
      )
    });
  };

  render() {
    const assignment = this.props.assignment;
    const selectedAssignment = this.props.selectedAssignment;
    const dueDate = new Date(assignment.dueDate);
    const seeToDo = this.props.seeToDoFor === assignment.studentAssignmentId;
    let showDetails = false;
    let toDoItems = [];

    if (selectedAssignment.showDetails === assignment.studentAssignmentId ) {
      showDetails = true
      toDoItems = this.getToDoItems();
    }

    return (
      <div>
        <p className="title-label-primary">{assignment.subject} {assignment.catalogNbr} HW</p>
        <p className="title-label-secondary">
          <input
            onChange={assignment.hasSubAssignments ? this.handleParentComplete : this.handleComplete}
            className="checkbox"
            type="checkbox"
            checked={!!assignment.completed}
          />
          {assignment.title}
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
            {showDetails ? <button className="details-button" onClick={this.handleHideAssignmentDetails}>Hide Details</button> : <button className="details-button" onClick={this.handleShowAssignmentDetails}>Show Details</button>}
        </div>
        <div className="buttons-wrapper">
          {assignment.hasSubAssignments &&
              <div className="sub-button">
                {(this.props.selectedAssignment.id.length > 0 && this.props.selectedAssignment.id[0][0] === assignment.studentAssignmentId)
                  ?
                    <div>
                      <button className="details-button sub" onClick={this.handleDeselectAssignment}>Hide Sub-Assignments</button>
                      {this.showSubAssignments()}
                    </div>
                  :
                    <div>
                      <button className="details-button" onClick={this.handleSelectSubAssignments}>See Sub</button>
                    </div>
                }
              </div>
          }
        </div>
      </div>
    );
  };
};

function mapStateToProps(state) {
  return {
    student: state.student,
    studentCourses: state.studentCourses,
    studentAssignments: state.studentAssignments,
    selectedAssignment: state.selectedAssignment,
    selectedForToDo: state.selectedForToDo,
    seeToDoFor: state.calendar.seeToDoFor,
    toDoItems: state.calendar.toDoItems
  };
};

function mapDispatchToProps(dispatch) {
  return {
    onCompleteAssignment: (studentAssignmentId) => {
      dispatch(completeAssignment(studentAssignmentId));
    },
    onCompleteSubAssignment: (studentAssignmentId, rootAssignmentIds, subAssignmentIds) => {
      dispatch(completeSubAssignment(studentAssignmentId, rootAssignmentIds, subAssignmentIds));
    },
    onCompleteParent: (studentAssignmentId) => {
      dispatch(completeParent(studentAssignmentId));
    },
    onDeselectAssignment: () => {
      dispatch(deselectAssignment());
    },
    onFetchSubAssignments: (studentAssignmentId) => {
      dispatch(fetchSubAssignments(studentAssignmentId));
    },
    onDeselectSubAssignment: (studentAssignmentId) => {
      dispatch(deselectSubAssignment(studentAssignmentId));
    },
    onSelectForToDo: (studentAssignment) => {
      dispatch(selectForToDo(studentAssignment));
    },
    onDeselectForToDo: () => {
      dispatch(deselectForToDo());
    },
    onShowAssignmentDetails: (studentAssignmentId) => {
      dispatch(showAssignmentDetails(studentAssignmentId));
    },
    onHideAssignmentDetails: () => {
      dispatch(hideAssignmentDetails());
    },
    onSeeToDos: (studentAssignmentId) => {
      dispatch(seeToDos(studentAssignmentId));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(AssignmentCard);
