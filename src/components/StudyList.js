import React, { Component } from 'react';
import StudyCard from './StudyCard';
import cuid from 'cuid';

class StudyList extends Component {
  render() {
    const studies = this.props.toDoItems.map(study => {
      return <StudyCard key={cuid()} study={study} />
    })

    return (
      <div className="study-list-wrapper">
        {studies}
      </div>
    );
  };
};

export default StudyList;
