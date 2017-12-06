import React, { Component } from 'react';
import { connect } from 'react-redux';
import { submitCourseColor, selectCourseColor, addCourse, selectDirectoryCourse, selectDirectoryCourseComponent } from '../actions/students';
import DirectoryCourseDetails from './DirectoryCourseDetails';
import { HuePicker } from 'react-color'
;
class DirectoryCourseCard extends Component {

  handleAddCourse = (event) => {
    const studentCourse = this.studentCourseCreator();
    const instructors = this.props.selectedCourse[`selected${this.props.selectedCourse.data.enrollGroups[0].componentsRequired[0]}`].instructors; //pull out intstructors
    this.props.onAddCourse(this.props.student, studentCourse, instructors, this.props.selectedCourse.courseColor, this.props.history);
  };

  studentCourseCreator = () => {
    let studentCourse = {
      crseId: this.props.selectedCourse.data.crseId,
      subject: this.props.selectedCourse.data.subject,
      catalogNbr: this.props.selectedCourse.data.catalogNbr,
      title: this.props.selectedCourse.data.titleLong,
      description: this.props.selectedCourse.data.description,
      unitsMinimum: this.props.selectedCourse.data.enrollGroups[0].unitsMinimum,
      unitsMaximum: this.props.selectedCourse.data.enrollGroups[0].unitsMaximum,
      sessionBeginDt: this.props.selectedCourse.data.enrollGroups[0].sessionBeginDt,
      sessionEndDt: this.props.selectedCourse.data.enrollGroups[0].sessionEndDt,
      section: this.props.selectedCourse[`selected${this.props.selectedCourse.data.enrollGroups[0].componentsRequired[0]}`].section,
      timeStart: this.props.selectedCourse[`selected${this.props.selectedCourse.data.enrollGroups[0].componentsRequired[0]}`].timeStart,
      timeEnd: this.props.selectedCourse[`selected${this.props.selectedCourse.data.enrollGroups[0].componentsRequired[0]}`].timeEnd,
      pattern: this.props.selectedCourse[`selected${this.props.selectedCourse.data.enrollGroups[0].componentsRequired[0]}`].pattern,
      facilityDescr: this.props.selectedCourse[`selected${this.props.selectedCourse.data.enrollGroups[0].componentsRequired[0]}`].facilityDescr,
      facilityDescrShort: this.props.selectedCourse[`selected${this.props.selectedCourse.data.enrollGroups[0].componentsRequired[0]}`].facilityDescrshort,
      components: []
    };
    this.props.selectedCourse.data.enrollGroups[0].componentsRequired.slice(1).forEach(component => {
      studentCourse.components.push({
        title: this.props.selectedCourse.data.titleLong,
        component: component,
        section: this.props.selectedCourse[`selected${component}`].section,
        timeStart: this.props.selectedCourse[`selected${component}`].timeStart,
        timeEnd: this.props.selectedCourse[`selected${component}`].timeEnd,
        pattern: this.props.selectedCourse[`selected${component}`].pattern,
        facilityDescr: this.props.selectedCourse[`selected${component}`].facilityDescr,
        facilityDescrShort: this.props.selectedCourse[`selected${component}`].facilityDescrshort,
      })
    });
    return studentCourse;
  };

  handleDetails = (event) => {
    this.props.onSelectCourse(this.props.course);
  };

  requiredComponentsSelected = () => {
    if (!this.props.selectedCourse.data) {
        return false;
    };
    const requiredComponents = this.props.selectedCourse.data.enrollGroups[0].componentsRequired;
    let selected = [];
    requiredComponents.forEach(component => {
      this.props.selectedCourse[`selected${component}`] ? selected.push(true) : selected.push(false);
    });
    return selected.includes(false) ? false : true;
  };

  colorSelected = () => {
    return !!this.props.selectedCourse.colorSelected
  };

  handleCourseColorChange = (event) => {
    this.props.onSelectCourseColor(event.hex)
  }

  handleSubmitCourseColor = () => {
    this.props.onSubmitCourseColor();
  }

  render() {
    let courseDetails = [];
    this.props.course.enrollGroups.forEach(group => {
      group.classSections.forEach(section => {
        section.meetings.forEach((meeting, idx) => {
          courseDetails.push(<DirectoryCourseDetails key={idx} selectedCourse={this.props.selectedCourse} ssrComponent={section.ssrComponent} section={section.section} data={meeting} onSelectComponent={this.props.onSelectComponent} />);
        });
      });
    });

    const courseColor = !!this.props.courseColor ? this.props.courseColor : "#fff"

    console.log("course card color:", this.props.courseColor)
    return (
      <div>
        <h1>{this.props.course.subject} {this.props.course.catalogNbr}: {this.props.course.titleLong}</h1>
        <p>{this.props.course.description}</p>
        {this.props.studentCourseIds.includes(this.props.course.crseId) ? "Enrolled" : <button onClick={this.handleDetails}>See Details</button>}
        {this.props.selectedCourse.data ? this.props.selectedCourse.data.crseId === this.props.course.crseId
          ?
            <div>
              {courseDetails}
              {this.requiredComponentsSelected()
                ?
                  <div>
                    {this.colorSelected()
                      ?
                        <button onClick={this.handleAddCourse}>Add Course</button>
                      :
                        <div>
                          <p>Pick a color for your course!</p>
                          <HuePicker
                            color={courseColor}
                            onChangeComplete={this.handleCourseColorChange}
                          />
                          <button onClick={this.handleSubmitCourseColor}>Select Color</button>
                        </div>
                    }
                  </div>
                :
                  <p>Please select required components {this.props.selectedCourse.data ? ": " + this.props.selectedCourse.data.enrollGroups[0].componentsRequired.join(", ") : null }</p>
              }
            </div>
          : null : null
        }
      </div>
    );
  };
};



function mapStateToProps(state) {
  return {
    student: state.student,
    selectedCourse: state.selectedCourse,
    studentCourseIds: state.studentCourseIds,
    courseColor: state.selectedCourse.courseColor,
    colorSelected: state.selectedCourse.colorSelected
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onAddCourse: (student, studentCourse, instructors, color, history) => {
      dispatch(addCourse(student, studentCourse, instructors, color, history));
    },
    onSelectCourse: (course) => {
      dispatch(selectDirectoryCourse(course));
    },
    onSelectComponent: (type, component, section) => {
      dispatch(selectDirectoryCourseComponent(type, component, section));
    },
    onSelectCourseColor: (color) => {
      dispatch(selectCourseColor(color));
    },
    onSubmitCourseColor: () => {
      dispatch(submitCourseColor());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DirectoryCourseCard);
