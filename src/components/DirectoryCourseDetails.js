import React, { Component } from 'react';

class DirectoryCourseDetails extends Component {

  handleSelectComponent = () => {
    this.props.onSelectComponent(this.props.ssrComponent, this.props.data, this.props.section)
  };

  render() {
    const instructors = this.props.data.instructors.map((inst, idx) => {
      return <p key={idx}>{inst.firstName + " " + inst.lastName + ", " + inst.netid + "@cornell.edu"}</p>
    })
    return(
      <div>
        <h3>{this.props.ssrComponent + " Section: " + this.props.section}</h3>
          <p>{this.props.data.pattern + ":" + this.props.data.timeStart + "-" + this.props.data.timeEnd}</p>
          <p>{this.props.data.facilityDescrshort}</p>
        <h4>Instructors:</h4>
          {instructors}
        <button onClick={this.handleSelectComponent}>Add {this.props.ssrComponent} {this.props.section}</button>
      </div>
    )
  }
};

export default DirectoryCourseDetails;
