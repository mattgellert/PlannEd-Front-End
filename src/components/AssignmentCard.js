import React, { Component } from 'react';
import { connect } from 'react-redux';
import SubAssignmentCard from './SubAssignmentCard';
import { seeToDos, hideAssignmentDetails, deselectForToDo, selectForToDo, completeParent, fetchSubAssignments, completeAssignment, completeSubAssignment, showAssignmentDetails, deselectAssignment, deselectSubAssignment } from '../actions/students';
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
    this.props.onShowAssignmentDetails(this.props.assignment.studentAssignmentId);
  };

  handleHideAssignmentDetails = () => {
    this.props.onDeselectForToDo()
    this.props.onSeeToDos(this.props.seeToDoFor);
    this.props.onHideAssignmentDetails();
  };

  handleSelectSubAssignments = () => {
    this.props.onFetchSubAssignments(this.props.assignment.studentAssignmentId, true)
  };

  handleDeselectAssignment = () => {
    this.props.onHideAssignmentDetails();
    this.props.onSeeToDos(this.props.seeToDoFor);
    this.props.onDeselectAssignment();
  };

  showSubAssignments = () => {
    const arr = this.props.selectedAssignment.subAssignments.map((subAss, idx) => {
      return <SubAssignmentCard key={subAss.studentAssignmentId} toDoItems={this.props.toDoItems} seeToDoFor={this.props.seeToDoFor} onSeeToDos={this.props.onSeeToDos}onShowAssignmentDetails={this.props.onShowAssignmentDetails} onHideAssignmentDetails={this.props.onHideAssignmentDetails} onDeselectForToDo={this.props.onDeselectForToDo} selectedForToDo={this.props.selectedForToDo} assignment={subAss.assignment} onCompleteParent={this.props.onCompleteParent} onCompleteSubAssignment={this.props.onCompleteSubAssignment} onFetchSubAssignments={this.props.onFetchSubAssignments} onDeselectSubAssignment={this.props.onDeselectSubAssignment} onSelectForToDo={this.props.onSelectForToDo} selectedAssignment={this.props.selectedAssignment} studentAssignments={this.props.studentAssignments}/>
    });
    return arr;
  };

  handleAddToDo = () => {
    this.props.seeToDoFor !== this.props.assignment.studentAssignmentId ? this.props.onSeeToDos(this.props.assignment.studentAssignmentId) : this.props.onSeeToDos(null);
    this.props.onDeselectForToDo()
    this.props.selectedForToDo !== this.props.assignment.studentAssignmentId ? this.props.onSelectForToDo(this.props.assignment.studentAssignmentId) : null;
  };

  getToDoItems = () => {
    const assigmentToShowToDo = this.props.assignment;
    const today = new Date();
    return this.props.toDoItems.filter(todo => todo.studentAssignmentId === assigmentToShowToDo.studentAssignmentId).map(todo => {
      return (
        <div className="assignment-to-do">
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
        <h3>{assignment.subject} {assignment.catalogNbr} HW</h3>
        <p>{assignment.courseTitle}</p>
        <p>{assignment.title}</p>
        <p>Due: {dueDate.toLocaleString()}</p>
        {showDetails
          ?
            <div>
              <button onClick={this.handleHideAssignmentDetails}>Hide Details</button>
              <p>{assignment.description}</p>
              {toDoItems}
            </div>
          :
            <button onClick={this.handleShowAssignmentDetails}>Show Details</button>
        }
        <button onClick={this.handleAddToDo}>{this.props.selectedForToDo === assignment.studentAssignmentId ? "Choose A Date >" : "+ To Do"}</button>
        {assignment.hasSubAssignments
          ?
            <div>
              <button onClick={this.handleParentComplete}>{assignment.completed ? "Completed!" : "Complete Sub-Assignments"}</button>
              {(this.props.selectedAssignment.id.length > 0 && this.props.selectedAssignment.id[0][0] === assignment.studentAssignmentId)
                ?
                  <div>
                    <button onClick={this.handleDeselectAssignment}>Hide Sub-Assignments</button>
                    {this.showSubAssignments()}
                  </div>
                :
                  <div>
                    <button onClick={this.handleSelectSubAssignments}>See Sub-Assignments</button>
                  </div>
              }
            </div>
          :
            <button onClick={this.handleComplete}>{assignment.completed ? "Completed!" : "Complete"}</button>
        }
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
