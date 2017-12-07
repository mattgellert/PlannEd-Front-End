import React, { Component } from 'react';
import DirectoryCourseCard from './DirectoryCourseCard';
import cuid from 'cuid';

export default class DirectoryCourseList extends Component {

  render() {
    const courses = this.props.courses.map((course, idx) => (
      <DirectoryCourseCard key={cuid()} course={course} history={this.props.history}/>
    ))

    return (
     <div className="directory-container-wrapper sidebar-wrapper">
       <div className="directory-list-container">
          <div className="courses-button-container">
            <button className="courses-button" onClick={this.props.toggleDirectoryContainer}>
              My Courses
            </button>
          </div>
        {courses}
       </div>
     </div>
   );
  };
};
