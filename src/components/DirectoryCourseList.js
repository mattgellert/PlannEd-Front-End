import React, { Component } from 'react';
import DirectoryCourseCard from './DirectoryCourseCard';

export default class DirectoryCourseList extends Component {

  render() {
    const courses = this.props.courses.map((course, idx) => (
      <DirectoryCourseCard key={course.crseId} course={course} history={this.props.history}/>
    ))

    return (
     <div className="directory-container-wrapper sidebar-wrapper">
       <div className="directory-list-container">
         {courses}
       </div>
     </div>
   );
  };
};
