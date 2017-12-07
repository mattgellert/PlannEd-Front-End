import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeAssignmentsDisplay, sortDirection, limitStartChange, limitEndChange, filterByCourse, filterByCompleted, removeCompletedFilter, filterByIncomplete } from '../actions/students';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import './AssignmentSearchForm.css';
import 'react-datepicker/dist/react-datepicker.css';
import cuid from 'cuid';

class AssignmentSearchForm extends Component {

  componentDidMount() {
    this.props.onChangeAssignmentsDisplay();
  };

  handleCourseChange = (event) => {
    this.props.onFilterByCourse(event.target.value);
  };

  handleSortChange = (event) => {
    this.props.onSortBy(event.target.value);
  };

  handleSortDirection = (event) => {
    this.props.onSortDirection(event.target.value);
  };

  handleCompletedFilter = (event) => {
    switch (event.target.value) {
      case "All":
        return this.props.onRemoveCompletedFilter();
      case "Incomplete":
        return this.props.onFilterByIncomplete();
      case "Completed":
        return this.props.onFilterByCompleted();
      default: break;
    };
  };

  handleLimitStartChange = (event) => {
    this.props.onLimitStartChange(event._d)
  };

  handleLimitEndChange = (event) => {
    this.props.onLimitEndChange(event._d)
  };


  render() {
    const courseOptions = this.props.courses.map((course, idx) => {
      return <option key={cuid()} value={course.studentCourseId}>{course.title}</option>
    });
    const aMoment = moment();

    return (
     <div className="assignment-form-container">
       <form className="assignment-form">
         {console.log("completefilter", this.props.incompleteFilter)}
         Course:
         <div className="form-select-container">
           <select onChange={this.handleCourseChange} className="form-select">
             <option value="All Courses">All Courses</option>
             {courseOptions}
           </select>
         </div>
         <div className="assignment-form-date-container">
           <span className="assignment-form-date-label">Dates:</span>
           <DatePicker
             className="assignment-form-date-picker"
             selected={this.props.limitStart ? moment(this.props.limitStart) : aMoment}
             onChange={this.handleLimitStartChange}
           />
           <span className="assignment-form-date-divider">-</span>
           <DatePicker
             className="assignment-form-date-picker"
             selected={this.props.limitEnd ? moment(this.props.limitEnd) : aMoment}
             onChange={this.handleLimitEndChange}
           />
         </div>
         <input onClick={this.handleCompletedFilter} type="radio" id="complete-filter-1" name="complete-filter" checked={this.props.incompleteFilter ? "checked" : ""} value="Incomplete"/>
         <label for="complete-filter-1">Incomplete</label>
         <input onClick={this.handleCompletedFilter} type="radio" id="complete-filter-2" name="complete-filter" value="Completed"/>
         <label for="complete-filter-2">Complete</label>
         <input onClick={this.handleCompletedFilter} type="radio" id="complete-filter-3" name="complete-filter" value="All" />
         <label for="complete-filter-3">All</label>
       </form>
     </div>
   );
  };
};


function mapStateToProps(state) {
  return {
    incompleteFilter: state.studentAssignments.completedFilter === "Incomplete",
    ascendingFilter: state.studentAssignments.sortDirection === "Ascending",
    limitStart: state.studentAssignments.limitStart,
    limitEnd: state.studentAssignments.limitEnd
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onFilterByCourse: (studentCourseId) => {
      dispatch(filterByCourse(studentCourseId));
    },
    onFilterByCompleted: () => {
      dispatch(filterByCompleted());
    },
    onFilterByIncomplete: () => {
      dispatch(filterByIncomplete());
    },
    onRemoveCompletedFilter: () => {
      dispatch(removeCompletedFilter());
    },
    onChangeAssignmentsDisplay: () => {
      dispatch(changeAssignmentsDisplay());
    },
    onSortDirection: (direction) => {
      dispatch(sortDirection(direction));
    },
    onLimitStartChange: (limit) => {
      dispatch(limitStartChange(limit));
    },
    onLimitEndChange: (limit) => {
      dispatch(limitEndChange(limit));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(AssignmentSearchForm);
