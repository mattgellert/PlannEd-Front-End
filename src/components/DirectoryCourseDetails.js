import React, { Component } from 'react';
import cuid from 'cuid';

class DirectoryCourseDetails extends Component {

 handleSelectComponent = () => {
   this.props.onSelectComponent(this.props.ssrComponent, this.props.data, this.props.section)
 };

 render() {
   const instructors = this.props.data.instructors.map((inst, idx) => {
     return <p key={cuid()}>{inst.firstName + " " + inst.lastName + ", " + inst.netid + "@cornell.edu"}</p>
   })
   return(
     <div className="course-select-wrapper">
       <p>Please select required components {this.props.selectedCourse.data ? ": " + this.props.selectedCourse.data.enrollGroups[0].componentsRequired.join(", ") : null }</p>
       <h3>{this.props.ssrComponent + " Section: " + this.props.section}</h3>
         <p>{this.props.data.pattern + ":" + this.props.data.timeStart + "-" + this.props.data.timeEnd}</p>
         <p>{this.props.data.facilityDescrshort}</p>
       <h4>Instructors:</h4>
         {instructors}
       <button className="courses-button" onClick={this.handleSelectComponent}>Add {this.props.ssrComponent} {this.props.section}</button>
     </div>
   )
 }
};

export default DirectoryCourseDetails;
