import React, { Component } from 'react';
import StudyCard from './StudyCard';

class StudyList extends Component {
  render() {
    const studies = this.props.toDoItems.map(study => {
      return <StudyCard key={study.id} study={study} />
    })

    return (
      <div className="study-list-wrapper">
        {studies}
      </div>
    );
  };
};

export default StudyList;
