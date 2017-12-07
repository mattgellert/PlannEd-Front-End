import React, { Component } from 'react';
import AssignmentCard from './AssignmentCard';
import cuid from 'cuid';

export default class AssignmentList extends Component {
  render() {
    const assignments = this.props.assignments.map((assignment,idx) => {
      return <AssignmentCard key={cuid()} assignment={assignment}/>
    });

    if (!!assignments && assignments.length) {
      return (
          <div className="assignment-list-container-inner">
            {assignments}
          </div>
      );
    }

    return null;
  };
};
