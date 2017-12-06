import React, { Component } from 'react';
import { connect } from 'react-redux';
import SubAssignmentCard from './SubAssignmentCard';
import { hideAssignmentDetails, deselectForToDo, selectForToDo, completeParent, fetchSubAssignments, completeAssignment, completeSubAssignment, showAssignmentDetails, deselectAssignment, deselectSubAssignment } from '../actions/students';
// import PriorityIcon from './svgs/PriorityIcon.js';


class AssignmentCard extends Component {

  handleParentComplete = () => {
    this.props.onCompleteParent(this.props.assignment.studentAssignmentId);
  };

  handleComplete = () => {
    this.props.onCompleteAssignment(this.props.assignment.studentAssignmentId);
  };

  handleShowAssignmentDetails = () => {
    this.props.onShowAssignmentDetails(this.props.assignment.studentAssignmentId);
  };

  handleHideAssignmentDetails = () => {
    this.props.onHideAssignmentDetails();
  };

  handleSelectSubAssignments = () => {
    this.props.onFetchSubAssignments(this.props.assignment.studentAssignmentId, true)
  };

  handleDeselectAssignment = () => {
    this.props.onDeselectAssignment();
  };

  showSubAssignments = () => {
    const arr = this.props.selectedAssignment.subAssignments.map((subAss, idx) => {
      return <SubAssignmentCard key={subAss.studentAssignmentId} onShowAssignmentDetails={this.props.onShowAssignmentDetails} onHideAssignmentDetails={this.props.onHideAssignmentDetails} onDeselectForToDo={this.props.onDeselectForToDo} selectedForToDo={this.props.selectedForToDo} assignment={subAss.assignment} onCompleteParent={this.props.onCompleteParent} onCompleteSubAssignment={this.props.onCompleteSubAssignment} onFetchSubAssignments={this.props.onFetchSubAssignments} onDeselectSubAssignment={this.props.onDeselectSubAssignment} onSelectForToDo={this.props.onSelectForToDo} selectedAssignment={this.props.selectedAssignment} studentAssignments={this.props.studentAssignments}/>
    });
    return arr;
  };

  handleAddToDo = () => {
    this.props.onDeselectForToDo()
    this.props.selectedForToDo !== this.props.assignment.studentAssignmentId ? this.props.onSelectForToDo(this.props.assignment.studentAssignmentId) : null;
  };

  render() {
    const assignment = this.props.assignment;
    const selectedAssignment = this.props.selectedAssignment;
    const dueDate = new Date(assignment.dueDate);

    //click completed > post >
      //response includes completed
      //if (to dos) open modal "delete to do(s)?" w/list
        //yes > post, update to do events
        //no > get, to do events
      //else response includes completed & updated events
    return (
      <div>
        <h3>{assignment.subject} {assignment.catalogNbr} HW</h3>
        <p>{assignment.courseTitle}</p>
        <p>{assignment.title}</p>
        <p>Due: {dueDate.toLocaleString()}</p>
        {selectedAssignment.showDetails === assignment.studentAssignmentId
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
    selectedForToDo: state.selectedForToDo
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
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(AssignmentCard);
