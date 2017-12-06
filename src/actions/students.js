export function signUpUser(email, firstName, lastName) {
  return (dispatch) => {
    dispatch({ type: "LOADING" });
    return fetch("http://localhost:3000/api/v1/students/sign_up", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({email, firstName, lastName})
    })
    .then(resp => resp.json())
    .then(json => {dispatch({ type: "SIGNED_UP", payload: json.student })});
  };
};

export function signInUser(email) {
  return (dispatch) => {
    dispatch({ type: "LOADING" });
    return fetch(`http://localhost:3000/api/v1/students/sign_in`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({ email })
    })
    .then(resp => resp.json())
    .then(json => {
      return fetch(`http://localhost:3000/api/v1/students/student_courses?studentId=${json.student.id}`)
      .then(resp => resp.json())
      .then(data => {
        dispatch({ type: "SIGNED_IN_AND_FETCHED_COURSES", payload: {
              studentCourses: data.studentCourses,
              student: json.student
            }
        });
      });
    });
  };
};

export function enterEmail(email) {
  return {
    type: "ENTER_EMAIL",
    payload: email
  }
}

export function enterFirstName(firstName) {
  return {
    type: "ENTER_FIRST_NAME",
    payload: firstName
  }
}

export function enterLastName(lastName) {
  return {
    type: "ENTER_LAST_NAME",
    payload: lastName
  }
}

export function enterDirectorySemester(semester) {
  return {
    type: "SELECT_DIRECTORY_SEMESTER",
    payload: semester
  }
}

export function enterDirectorySubject(subject) {
  return {
    type: "SELECT_DIRECTORY_SUBJECT",
    payload: subject
  }
}

export function signOutUser() {
  return { type: "SIGN_OUT"};
};

export function addCourse(student, studentCourse, instructors, color, history) {
  return (dispatch) => {
    dispatch({ type: 'LOADING'});
    return fetch(`http://localhost:3000/api/v1/students/add_student_course`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({ student, studentCourse, instructors, color })
    })
    .then(resp => resp.json())
    .then(data => {
      if (data.error) {
        dispatch({ type: 'ADD_COURSE_TIME_CONFLICT', payload: data.error });
      } else {
        dispatch({ type: 'ADDED_COURSE', payload: { studentCourse: data.studentCourse, studentAssignments: data.studentAssignments, dueDates: data.dueDates, courseDates: data.courseDates }})
        history.push("/dashboard");
        dispatch({ type: "CHANGE_ASSIGNMENTS_DISPLAY" })
      }
    });
  };
};

export function removeAddConflict() {
  return {
    type: "REMOVE_ADD_CONFLICT"
  }
};

export function fetchSubAssignments(studentAssignmentId) { // CHECKED
  return (dispatch) => {
    dispatch({type: "LOADING"});
    return fetch(`http://localhost:3000/api/v1/students/get_sub_assignments?studentAssignmentId=${studentAssignmentId}`)
      .then(resp => resp.json())
      .then(data => {
        dispatch({ type: "FETCHED_SUB_ASSIGNMENTS", payload: {
          parentAssignmentId: data.parentAssignmentId,
          subAssignments: data.subAssignments,
          hasParent: data.hasParent
        }})
        dispatch({ type: "CHANGE_ASSIGNMENTS_DISPLAY" })
    });
  }
}

export function fetchAssignments(studentId) { // CHECKED
  return (dispatch) => {
    dispatch({ type: "LOADING" })
    return fetch(`http://localhost:3000/api/v1/students/student_assignments?studentId=${studentId}`)
    .then(resp => resp.json())
    .then(data => {
      dispatch({ type: "FETCHED_ASSIGNMENTS", payload: { studentAssignments: data.studentAssignments, dueDates: data.dueDates, courseDates: data.courseDates, toDoItems: data.toDoItems }})
      dispatch({ type: "CHANGE_ASSIGNMENTS_DISPLAY" })
    });
  };
};



export function fetchDirectorySubjects(semester) { // CHECKED
  return (dispatch) => {
    dispatch({ type: "LOADING" });
    return fetch(`https://classes.cornell.edu/api/2.0/config/subjects.json?roster=${semester}`)
	    .then(resp => resp.json())
	    .then(json => {
        dispatch({ type: "FETCHED_DIRECTORY_SUBJECTS", payload: json.data.subjects})});
  };
};

export function fetchDirectoryCourses(semester, subject) { // CHECKED
  return (dispatch) => {
    dispatch({ type: "LOADING" });
    return fetch(`https://classes.cornell.edu/api/2.0/search/classes.json?roster=${semester}&subject=${subject}`)
	    .then(resp => resp.json())
	    .then(json => {
        dispatch({ type: "FETCHED_DIRECTORY_COURSES", payload: json.data.classes })});
  };
};

export function completeAssignment(studentAssignmentId, isParent) { // CHECKED
  return (dispatch) => {
    dispatch({ type: "LOADING" });
    return fetch("http://localhost:3000/api/v1/students/complete_assignment", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({ studentAssignmentId, isParent })
    })
      .then(resp => resp.json())
      .then(json => {
        // ..changes?
                                  //update "COMPLETED_ASSIGNMENT" to reflect payload
        dispatch({ type: "COMPLETED_ASSIGNMENT", payload: { studentAssignment: json.studentAssignment, dueDates: json.dueDates, toDos: json.toDos }})
        dispatch({ type: "CHANGE_ASSIGNMENTS_DISPLAY" })
      })
  };
};

export function completeSubAssignment(studentAssignmentId, rootAssignmentIds, subAssignmentIds, isParent) { // CHECKED
  return (dispatch) => {
    dispatch({ type: "LOADING" });
    return fetch("http://localhost:3000/api/v1/students/complete_assignment", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({ studentAssignmentId, rootAssignmentIds, subAssignmentIds, isSubAssignment: true, isParent: isParent })
    })
      .then(resp => resp.json())
      .then(json => {
        dispatch({ type: "COMPLETED_SUB_ASSIGNMENT", payload: {
            rootAssignments: json.rootAssignments,
            subAssignments: json.subAssignments,
            ids: json.ids,
            dueDates: json.dueDates,
            toDos: json.toDos ///WRITE BACKEND FOR THIS
          }
        })
        dispatch({ type: "CHANGE_ASSIGNMENTS_DISPLAY" })
      })
  };
};

export function completeParent(studentAssignmentId) {
  return (dispatch) => {
    dispatch({ type: "LOADING "});
    return fetch("http://localhost:3000/api/v1/students/complete_parent_assignment", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({ studentAssignmentId })
    })
      .then(resp => resp.json())
      .then(json => {
        //response should include events to delete
        dispatch({ type: "COMPLETED_PARENT", payload: { ids: json.ids, completed: json.completed, dueDates: json.dueDates, toDos: json.toDos }});  //WRITE BACKEND FOR THIS
        dispatch({ type: "CHANGE_ASSIGNMENTS_DISPLAY" });
      })
  }
}

export function showAssignmentDetails(studentAssignmentId) {
  return {
    type: "SHOW_ASSIGNMENT_DETAILS",
    payload: studentAssignmentId
  }
};

export function hideAssignmentDetails() {
  return {
    type: "HIDE_ASSIGNMENT_DETAILS"
  }
}

export function deselectAssignment() {
  console.log("deselect assignment")
  return {
    type: "DESELECT_ASSIGNMENT"
  }
};

export function deselectSubAssignment(studentAssignmentId) {
  console.log("deselect sub assignment:", studentAssignmentId)
  return {
    type: "DESELECT_SUB_ASSIGNMENT",
    payload: studentAssignmentId
  }
};

export function selectDirectoryCourse(course) {
  return {
    type: "SELECT_DIRECTORY_COURSE",
    payload: course
  }
};

export function selectDirectoryCourseComponent(type, component, section) {
  return {
    type: "SELECT_DIRECTORY_COURSE_COMPONENT",
    payload: {
      type,
      component: {
        ...component,
        section
      }
    }
  }
};

// export function sortBy(attribute) { // COMPLETE BELOW //
//   return {
//     type: "SORT_BY",
//     payload: attribute
//   }
// };

export function sortDirection(direction) {
  return (dispatch) => {
    dispatch({ type: "SORT_DIRECTION", payload: direction })
    dispatch({ type: "CHANGE_ASSIGNMENTS_DISPLAY" })
  }
};

export function limitStartChange(limit) {
  return (dispatch) => {
    dispatch({ type: "LIMIT_START_CHANGE", payload: limit })
    dispatch({ type: "CHANGE_ASSIGNMENTS_DISPLAY" })
  }
};

export function limitEndChange(limit) {
  return (dispatch) => {
    dispatch({ type: "LIMIT_END_CHANGE", payload: limit })
    dispatch({ type: "CHANGE_ASSIGNMENTS_DISPLAY" })
  }
};

export function filterByCourse(studentCourseId) {
  return (dispatch) => {
    dispatch({ type: "FILTER_BY_COURSE", payload: studentCourseId })
    dispatch({ type: "CHANGE_ASSIGNMENTS_DISPLAY" })
  }
};

export function filterByCompleted() {
  return (dispatch) => {
    dispatch({ type: "FILTER_BY_COMPLETED" })
    dispatch({ type: "CHANGE_ASSIGNMENTS_DISPLAY" })
  }
};

export function filterByIncomplete() {
  return (dispatch) => {
    dispatch({ type: "FILTER_BY_INCOMPLETE" })
    dispatch({ type: "CHANGE_ASSIGNMENTS_DISPLAY" })
  }
};

export function removeCompletedFilter() {
  return (dispatch) => {
    dispatch({ type: "REMOVE_COMPLETED_FILTER" })
    dispatch({ type: "CHANGE_ASSIGNMENTS_DISPLAY" })
  }
};

export function filterByDueDate(days) {
  return {
    type: "FILTER_BY_DUE_DATE",
    payload: days
  }
};

export function changeAssignmentsDisplay() {
  return {
    type: "CHANGE_ASSIGNMENTS_DISPLAY"
  }
};

export function selectForToDo(studentAssignmentId) {
  return {
    type: "SELECT_FOR_TO_DO",
    payload: studentAssignmentId
  }
}

export function deselectForToDo() {
  return {
    type: "DESELECT_FOR_TO_DO"
  }
}

export function selectSlot(slotInfo) {
  return {
    type: "SELECT_SLOT",
    payload: slotInfo
  }
}

export function startChange(startTime) {
  return {
    type: "START_CHANGE",
    payload: startTime
  }
}

export function endChange(endTime) {
  return {
    type: "END_CHANGE",
    payload: endTime
  }
}

export function titleChange(title) {
  return {
    type: "TITLE_CHANGE",
    payload: title
  }
}

export function submitToDo(date, time, studentAssignmentId, title) {
  return (dispatch) => {
    dispatch({ type: "LOADING" })
    return fetch('http://localhost:3000/api/v1/students/add_assignment_to_do', {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({ date, time, studentAssignmentId, title })
    })
      .then(resp => resp.json())
      .then(json => {
        dispatch({ type: "SUBMITTED_TO_DO", payload: json })
      })
  }
}

export function calendarClick(xPos, yPos) {
  return {
    type: "CALENDAR_CLICK",
    payload: { x: xPos, y: yPos }
  }
}

export function selectCourseColor(color) {
  return {
    type: "SELECT_COURSE_COLOR",
    payload: color
  }
}

export function submitCourseColor() {
  return {
    type: "SUBMIT_COURSE_COLOR"
  }
}

export function selectStudentCourse(studentCourseId) {
  return {
    type: "SELECT_STUDENT_COURSE",
    payload: studentCourseId
  }
}

export function deselectStudentCourse() {
  return {
    type: "DESELECT_STUDENT_COURSE"
  }
}

export function showStudentCourseDetails(studentCourseId) {
  return {
    type: "SHOW_STUDENT_COURSE_DETAILS",
    payload: studentCourseId
  }
}

export function hideStudentCourseDetails() {
  return {
    type: "HIDE_STUDENT_COURSE_DETAILS"
  }
}

export function showStudentCompDetails(studentCompId) {
  return {
    type: "SHOW_STUDENT_COMP_DETAILS",
    payload: studentCompId
  }
}

export function hideStudentCompDetails() {
  return {
    type: "HIDE_STUDENT_COMP_DETAILS"
  }
}

export function selectRemoveCourse(studentCourseId) {
  console.log("select remove course")
  return {
    type: "SELECT_REMOVE_COURSE",
    payload: studentCourseId
  }
}

export function deselectRemoveCourse(studentCourseId) {
  console.log("deselect remove course")
  return {
    type: "DESELECT_REMOVE_COURSE"
  }
}

export function removeCourse(studentCourseId) {
  return (dispatch) => {
    dispatch({ type: "LOADING" })
    //post studentCourseId --> remove all associated objects
    fetch("http://localhost:3000/api/v1/students/remove_course", {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({ studentCourseId })
    })
      .then(resp => resp.json())
      .then(json => {
        dispatch({ type: "UPDATED_COURSES", payload: json.studentCourses })
      });
  }
}
