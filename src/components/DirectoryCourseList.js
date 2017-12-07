import React, { Component } from 'react';
import DirectoryCourseCard from './DirectoryCourseCard';
import cuid from 'cuid';

export default class DirectoryCourseList extends Component {

  handleSeeMyCourses = () => {
    this.props.history.push("/my-courses")
  };

  render() {
    const courses = this.props.courses.map((course, idx) => (
      <DirectoryCourseCard key={cuid()} course={course} history={this.props.history}/>
    ))

    return (
     <div className="directory-container-wrapper sidebar-wrapper">
       <div className="directory-list-container">
          <button onClick={this.handleSeeMyCourses}>My Courses</button>
         {courses}
       </div>
     </div>
   );
  };
};
