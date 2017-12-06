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
    console.log("ComponentCard render", comp)

    return (
      <div className="compenet-card-wrapper">
        <h3>{comp.component}: {comp.title}</h3>
        <p>{comp.facilityDescr}</p>
        <p>{comp.timeStart} - {comp.timeEnd} ({comp.pattern})</p>
      </div>
    )
  }
}

export default ComponentCard;
