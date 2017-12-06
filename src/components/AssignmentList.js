import React, { Component } from 'react';
import AssignmentCard from './AssignmentCard';

export default class AssignmentList extends Component {
  render() {

    const assignments = this.props.assignments.map((assignment,idx) => {
      return <AssignmentCard key={assignment.studentAssignmentId} assignment={assignment}/>
    });
    return (
      <div className="assignment-list-container-inner">
        {assignments}
      </div>
    );
  };
};
