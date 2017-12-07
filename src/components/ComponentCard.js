import React, { Component } from 'react';

class ComponentCard extends Component {
  // REFACTOR FOR CREATING COMPONETN TO DO
  // handleHideStudentCompDetails = () => {
  //   this.props.onHideStudentCompDetails();
  // };
  //
  // handleShowStudentCompDetails = () => {
  //   this.props.onShowStudentCompDetails(this.props.comp.studentComponentId);
  // };


  render() {
    const comp = this.props.comp;

    return (
      <div className="component-card-wrapper">
        <h3>{comp.component}: {comp.title}</h3>
        <p>{comp.facilityDescr}</p>
        <p>{comp.timeStart} - {comp.timeEnd} ({comp.pattern})</p>
      </div>
    )
  }
}

export default ComponentCard;
