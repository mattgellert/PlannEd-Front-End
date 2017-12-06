import React, { Component } from 'react';
import DirectoryCourseCard from './DirectoryCourseCard';

export default class DirectoryCourseList extends Component {

  render() {
    const courses = this.props.courses.map((course, idx) => (
      <DirectoryCourseCard key={course.crseId} course={course} history={this.props.history}/>
    ))

    return (
      <div>
        {courses}
      </div>
    );
  };
};
