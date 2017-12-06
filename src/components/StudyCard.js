import React, { Component } from 'react';

class StudyCard extends Component {
  render() {
    const study = this.props.study;
    const today = new Date();

    return (
      <div className="study-card-wrapper">
        <h4>{study.title}</h4>
        <p>{study.startDate} - {study.endDate} {today > study.endDate ? "(Past)" : "(Upcoming)"}</p>
        <p>{study.description}</p>
      </div>
    );
  };
};

export default StudyCard;
