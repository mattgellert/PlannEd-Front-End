import React, { Component } from 'react';
import CourseCard from './CourseCard';

class CourseList extends Component {
  render() {
    const selectedStudentCourse = this.props.selectedStudentCourse;
    const onSelectStudentCourse = this.props.onSelectStudentCourse;
    const onDeselectStudentCourse = this.props.onDeselectStudentCourse;
    const onShowStudentCourseDetails = this.props.onShowStudentCourseDetails;
    const onHideStudentCourseDetails = this.props.onHideStudentCourseDetails;
    const onShowStudentCompDetails = this.props.onShowStudentCompDetails;
    const onHideStudentCompDetails = this.props.onHideStudentCompDetails;
    const onSelectCourseColor = this.props.onSelectCourseColor;
    const onSubmitCourseColorChange = this.props.onSubmitCourseColorChange;
    const selectedCourse = this.props.selectedCourse;
    const onCourseToChangeColor = this.props.onCourseToChangeColor;


    const courses = this.props.courses.map(course => {
      return <CourseCard key={course.studentCourseId} onSubmitCourseColorChange={onSubmitCourseColorChange} onSelectCourseColor={this.props.onSelectCourseColor} onCourseToChangeColor={onCourseToChangeColor} course={course} selectedCourse={selectedCourse} courseToRemove={this.props.courseToRemove} onSelectRemoveCourse={this.props.onSelectRemoveCourse} onDeselectRemoveCourse={this.props.onDeselectRemoveCourse} onRemoveCourse={this.props.onRemoveCourse} onShowStudentCompDetails={onShowStudentCompDetails} onHideStudentCompDetails={onHideStudentCompDetails} selectedStudentCourse={selectedStudentCourse} onSelectStudentCourse={onSelectStudentCourse} onDeselectStudentCourse={onDeselectStudentCourse} onShowStudentCourseDetails={onShowStudentCourseDetails} onHideStudentCourseDetails={onHideStudentCourseDetails}/>
    });

    return(
      <div className="course-list-wrapper">
        {courses}
      </div>
    );
  };
};

export default CourseList;
