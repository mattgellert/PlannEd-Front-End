export default function studentReducer(
  state = {
    calendar: {
      courses: [],
      dueDates: [],
      toDoItems: [],
      selectedEvent: {},
      defaultDate: null,
      seeToDoFor: null
    },
    directory: {
      subjects: [],
      courses: [],
      addConflict: null
    },
    student: {
      id: null,
      email: "",
      firstName: "",
      lastName: ""
    },
    studentCourses: [],
    studentCourseIds: [],
    studentAssignments: {
      data: [],
      completedFilter: "Incomplete",
      prevCompletedFilter: "Incomplete",
      courseFilter: "All Courses",
      sortBy: "Due Date",
      sortDirection: "Ascending",
      limitStart: null,
      limitEnd: null,
      display: []
    },
    showDeleteCompletedToDos: false,
    selectedSemester: "",
    selectedSubject: "",
    courseSearchTerm: "",
    selectedCourse: {
      data: null,
      selectedLEC: null,
      selectedDIS: null,
      selectedSEM: null,
      selectedTA: null,
      courseColor: null,
      colorSelected: null
    },
    selectedStudentCourse: {
      data: null,
      showDetails: false,
      selectedComponent: null
    },
    courseToRemove: null,
    selectedForToDo: 0,
    slotSelected: false,
    selectedSlot: {
      startTime: null,
      endTime: null,
      info: null,
      title: null,
      description: null,
      date: null
    },
    calendarClick: {
      x: null,
      y: null
    },
    selectedAssignment: {
      id: [],
      subAssignments: [],
      showDetails: null
    },
    eventSelected: {
      data: null,
      edit: null,
      toDelete: null
    },
    loading: false
  }, action) {
  switch (action.type) {
    case "SIGNED_UP":
      return {
        ...state,
        student: action.payload,
        loading: false
      };
    case "ENTER_EMAIL":
      return {
        ...state,
        student: {
          ...state.student,
          email: action.payload
        }
      }
    case "ENTER_FIRST_NAME":
      return {
        ...state,
        student: {
          ...state.student,
          firstName: action.payload
        }
      }
    case "ENTER_LAST_NAME":
      return {
        ...state,
        student: {
          ...state.student,
          lastName: action.payload
        }
      }
    case "SIGNED_IN_AND_FETCHED_COURSES":
      return {
        ...state,
        student: action.payload.student, //fix this later
        studentCourses: action.payload.studentCourses,
        loading: false
      };
    case "SIGN_OUT":
      return {
        calendar: {
          courses: [],
          toDoItems: [],
          selectedEvent: {},
          dueDates: [],
          seeToDoFor: null
        },
        directory: {
          subjects: [],
          courses: [],
          addConflict: null
        },
        student: {
          id: null,
          email: "",
          firstName: "",
          lastName: ""
        },
        studentCourses: [],
        studentCourseIds: [],
        studentAssignments: {
          data: [],
          completedFilter: "Incomplete",
          courseFilter: "All Courses",
          sortBy: "Due Date",
          sortDirection: "Ascending",
          limit: null,
          display: []
        },
        showDeleteCompletedToDos: false,
        selectedSemester: "",
        selectedSubject: "",
        courseSearchTerm: "",
        selectedCourse: {
          data: null,
          selectedLEC: null,
          selectedDIS: null,
          selectedSEM: null,
          selectedTA: null,
          courseColor: null,
          colorSelected: null
        },
        selectedStudentCourse: {
          data: null,
          showDetails: false,
          selectedComponent: null
        },
        courseToRemove: null,
        selectedForTodo: 0,
        selectedAssignment: {
          id: [],
          subAssignments: [],
          showDetails: null
        },
        eventSelected: {
          data: null,
          edit: null,
          toDelete: null
        },
        loading: false
      };
    case "ADD_COURSE_TIME_CONFLICT":
      return {
        ...state,
        directory: {
          ...state.directory,
          addConflict: action.payload
        }
      };
    case "REMOVE_ADD_CONFLICT":
      return {
        ...state,
        directory: {
          ...state.directory,
          addConflict: null
        }
      };
    case "ADDED_COURSE":
      return {
        ...state,
        calendar: {
          ...state.calendar,
          courses: [...state.calendar.courses, ...action.payload.courseDates],
          dueDates: [...state.calendar.dueDates, ...action.payload.dueDates]
        },
        studentCourses: [...state.studentCourses, action.payload.studentCourse],
        studentCourseIds: [...state.studentCourseIds, action.payload.studentCourse.crseId],
        studentAssignments: {
          ...state.studentAssignments,
          data: [...state.studentAssignments.data, ...action.payload.studentAssignments]
        },
        selectedCourse: {
          data: null,
          selectedLEC: null,
          selectedDIS: null,
          selectedSEM: null,
          selectedTA: null,
          courseColor: null,
          colorSelected: null
        },
        loading: false
      };
    case "FETCHED_ASSIGNMENTS":

      const fetchedAssignments = action.payload.studentAssignments;
      const fetchedDueDates = action.payload.dueDates;
      const fetchedCourseDates = action.payload.courseDates;
      const fetchedToDoItems = action.payload.toDoItems;
      return {
        ...state,
        studentAssignments: {
          ...state.studentAssignments,
          display: fetchedAssignments,
          data: fetchedAssignments
        },
        selectedCourse: {
          data: null,
          selectedLEC: null,
          selectedDIS: null,
          selectedSEM: null,
          selectedTA: null,
          courseColor: null,
          colorSelected: null
        },
        calendar: {
          ...state.calendar,
          courses: fetchedCourseDates,
          dueDates: fetchedDueDates,
          toDoItems: fetchedToDoItems
        },
        loading: false
      };
    case "FETCHED_SUB_ASSIGNMENTS":
      const hasParent = action.payload.hasParent;
      const parentId = parseInt(action.payload.parentAssignmentId, 10);
      const subAssignments = action.payload.subAssignments;

      let fetchedIds = [];
      const newSubAssignments = subAssignments.map(subAss => {
        fetchedIds.push(subAss.studentAssignmentId);
        return {
          id: subAss.studentAssignmentId,
          assignment: subAss,
          parentId: parentId
        }
      })

      const selectedIdsWithFetched = [...state.selectedAssignment.id, fetchedIds];
      let updatedSubAssignments = [];
      if (!hasParent) {
        return {
          ...state,
          selectedAssignment: {
            ...state.selectedAssignment,
            id: [[parentId]],
            subAssignments: newSubAssignments
          }
        }
      } else {
          state.selectedAssignment.subAssignments.forEach(subAss => {
            if (subAss.id === parentId) {
              updatedSubAssignments = [...updatedSubAssignments, subAss, ...newSubAssignments];
            } else {
              updatedSubAssignments.push(subAss);
            };
          });
        return {
          ...state,
          selectedAssignment: {
            ...state.selectedAssignment,
            id: selectedIdsWithFetched,
            subAssignments: updatedSubAssignments
          }
        }
      }
    case "FETCHED_DIRECTORY_COURSES":
      return {
        ...state,
        directory: {
          ...state.directory,
          courses: action.payload
        },
        loading: false
      };
    case "FETCHED_DIRECTORY_SUBJECTS":
      return {
        ...state,
        directory: {
          ...state.directory,
          subjects: action.payload
        },
        loading: false
      };
    case "SELECT_DIRECTORY_SEMESTER":
      return {
        ...state,
        selectedSemester: action.payload
      }
    case "SELECT_DIRECTORY_SUBJECT":
      return {
        ...state,
        selectedSubject: action.payload
      };
    case "COMPLETED_ASSIGNMENT":
      const dataWithCompletedAssignment = state.studentAssignments.data.map(studentAssignment => {
        if (studentAssignment.studentAssignmentId === action.payload.studentAssignment.studentAssignmentId) {
          return {
            ...action.payload.studentAssignment
          };
        } else {
          return studentAssignment
        }
      });

      const updatedDueDatesFromAss = action.payload.dueDates;
      const dueDatesWithCompletedAssignment = state.calendar.dueDates.map(date => {
        if (updatedDueDatesFromAss.includes(date.id)) {
          return {
            ...date,
            completed: !date.completed
          }
        } else {
          return date
        }
      });

      const updatedToDosFromAss = action.payload.toDos;
      const toDosWithCompletedAssignment = state.calendar.toDoItems.map(todo => {
        if (updatedToDosFromAss.includes(todo.id)) {
          return {
            ...todo,
            completed: !todo.completed
          }
        } else {
          return todo
        }
      });

      return {
        ...state,
        calendar: {
          ...state.calendar,
          toDoItems: toDosWithCompletedAssignment,
          dueDates: dueDatesWithCompletedAssignment
        },
        studentAssignments: {
          ...state.studentAssignments,
          data: dataWithCompletedAssignment
        },
        loading: false
      };
    case "COMPLETED_SUB_ASSIGNMENT":
      const rootAssignments = action.payload.rootAssignments;
      const subRootAssignments = action.payload.subAssignments;
      const ids = action.payload.ids;

      const updatedDueDatesFromSubCompleted = action.payload.dueDateEvents.filter(date => date.completed).map(date => date.id);
      const updatedDueDatesFromSubIncomplete = action.payload.dueDateEvents.filter(date => !date.completed).map(date => date.id);
      const dueDatesWithCompletedSubAssignment = state.calendar.dueDates.map(date => {
        if (updatedDueDatesFromSubCompleted.includes(date.id)) {
        // if (updatedDueDatesFromSub.includes(date.studentAssignmentId)) {
          return {
            ...date,
            completed: true
          }
        } else if (updatedDueDatesFromSubIncomplete.includes(date.id)) {
          return {
            ...date,
            completed: false
          }
        } else {
          return date
        }
      }); //DO THIS
      debugger

      const updatedToDosFromSub = action.payload.toDos;
      const toDosWithCompletedSubAssignment = state.calendar.toDoItems.map(todo => {
        if (updatedToDosFromSub.includes(todo.studentAssignmentId)) {
          return {
            ...todo,
            completed: !todo.completed
          }
        } else {
          return todo
        }
      }); //DO THIS

      const subAssignmentsWithComplete = state.selectedAssignment.subAssignments.map((subAss, idx) => {
        if (ids.includes(subAss.id)) {
          return {
            ...subAss,
            assignment: {
              ...subAss.assignment,
              completed: subRootAssignments[idx].completed
            }
          }
        } else {
          return subAss
        }
      })
      const rootAssignmentsWithComplete = state.studentAssignments.data.map((ass, idx) => {
        if (ids.includes(ass.studentAssignmentId)) {
          return {
            ...ass,
            completed: rootAssignments[idx].completed
          }
        } else {
          return ass
        }
      })
      //if parent assignment is complete update parent
      return {
        ...state,
        calendar: {
          ...state.calendar,
          toDoItems: toDosWithCompletedSubAssignment,
          dueDates: dueDatesWithCompletedSubAssignment
        },
        studentAssignments: {
          ...state.studentAssignments,
          data: rootAssignmentsWithComplete
        },
        selectedAssignment: {
          ...state.selectedAssignment,
          subAssignments: subAssignmentsWithComplete
        }
      }
    case "COMPLETED_PARENT":
      const withChildrenIds = action.payload.ids;
      const completed = action.payload.completed;
      const rootAssignmentsWithCompletedParent = state.studentAssignments.data.map(ass => {
        if (withChildrenIds.includes(ass.studentAssignmentId)) {
          return {
            ...ass,
            completed: completed
          }
        } else {
          return ass
        }
      });
      const subAssignmentsWithCompletedParent = state.selectedAssignment.subAssignments.map(ass => {
        if (withChildrenIds.includes(ass.id)) {
          return {
            ...ass,
            assignment: {
              ...ass.assignment,
              completed: completed
            }
          }
        } else {
          return ass
        }
      });

       const updatedDueDatesFromParent = action.payload.dueDates;
       const dueDatesWithCompletedParent = state.calendar.dueDates.map(date => {
         if (updatedDueDatesFromParent.includes(date.id)) {
         // if (updatedDueDatesFromParent.includes(date.studentAssignmentId)) {
           return {
             ...date,
             completed: !date.completed
           }
         } else {
           return date
         }
       }); //DO THIS
       // debugger

      const updatedToDosFromParent = action.payload.toDos;
      const toDosWithCompletedParent = state.calendar.toDoItems.map(todo => {
        if (updatedToDosFromParent.includes(todo.studentAssignmentId)) {
          return {
            ...todo,
            completed: !todo.completed
          }
        } else {
          return todo
        }
      }); //DO THIS


      return {
        ...state,
        calendar: {
          ...state.calendar,
          dueDates: dueDatesWithCompletedParent
        },
        studentAssignments: {
          ...state.studentAssignments,
          data: rootAssignmentsWithCompletedParent
        },
        selectedAssignment: {
          ...state.selectedAssignment,
          subAssignments: subAssignmentsWithCompletedParent
        }
      }
    case "SHOW_ASSIGNMENT_DETAILS":

      const assignmentToShowId = action.payload;
      const totalSelectedAssignmentIds = state.selectedAssignment.subAssignments.map(subAss => subAss.id);
      if (totalSelectedAssignmentIds.includes(assignmentToShowId)) {

        return {
          ...state,
          selectedAssignment: {
            ...state.selectedAssignment,
            showDetails: assignmentToShowId
          }
        }
      } else {
        return {
          ...state,
          selectedAssignment: {
            ...state.selectedAssignment,
            showDetails: assignmentToShowId,
            id: [[assignmentToShowId]]
          }
        }
        // return {
        //   ...state,
        //   selectedAssignment: {
        //     subAssignments: [],
        //     showDetails: assignmentToShowId,
        //     id: []
        //   }
        // }
      }
    case "DELETE_TO_DO_ON_COMPLETE":  //CREATE MODAL FOR THIS!!
      return {
        ...state,
        showDeleteCompletedToDos: action.payload
      }
    case "UPDATED_TO_DO":
      return {
        ...state,
        calendar: {
          ...state.calendar,
          toDoItems: action.payload
        },
        loading: false
      }
    case "HIDE_ASSIGNMENT_DETAILS":
      return {
        ...state,
        calendar: {
          ...state.calendar,
          selectedForToDo: null
        },
        selectedAssignment: {
          ...state.selectedAssignment,
          showDetails: null
        }
      }
    case "DESELECT_ASSIGNMENT":
      return {
        ...state,
        selectedAssignment: {
          ...state.selectedAssignment,
          subAssignments: [],
          id: []
        }
      }
    case "DESELECT_SUB_ASSIGNMENT":
      const deselectParentId = action.payload;
      let selectedIds = state.selectedAssignment.id;
      let deselectIds = [];
      let updatedIds = [];
      //rebuild selectedIds with each loop
      //stop at (and don't include) selectedIds[key] (and beyond)
      //collect remaining Ids

      const subAssignmentsLessDeselected = state.selectedAssignment.subAssignments.filter(subAss => {
        if (subAss.parentId === deselectParentId) {
          deselectIds.push(subAss.id)
          return subAss.parentId !== deselectParentId
        } else {
          return subAss.parentId !== deselectParentId
        }
      });

      let continueSearch = true;
      selectedIds.forEach(idSet => {
        if (continueSearch) {

          idSet.forEach(id => {
            if (deselectIds.includes(id)) {
              continueSearch = false;
            }
          })
          if (continueSearch) {
            updatedIds.push(idSet)
          }
        }
      })

      return {
        ...state,
        selectedAssignment: {
          ...state.selectedAssignment,
          id: updatedIds,
          subAssignments: subAssignmentsLessDeselected
        }
      }
    case "SELECT_DIRECTORY_COURSE":
      const directoryCourse = state.selectedCourse.data === action.payload ? null : action.payload;
      return {
        ...state,
        selectedCourse: {
          data: directoryCourse,
          selectedLEC: null,
          selectedDIS: null,
          selectedSEM: null,
          selectedTA: null,
          courseColor: null,
          colorSelected: null
        }
      }
    case "SELECT_DIRECTORY_COURSE_COMPONENT":
      return {
        ...state,
        selectedCourse: {
          ...state.selectedCourse,
          [`selected${action.payload.type}`]: action.payload.component
        }
      }
    case "SELECT_COURSE_COLOR":
      return {
        ...state,
        selectedCourse: {
          ...state.selectedCourse,
          courseColor: action.payload
        }
      }
    case "COURSE_TO_CHANGE_COLOR":
      return {
        ...state,
        selectedCourse: {
          ...state.selectedCourse,
          data: action.payload
        }
      }
    case "SUBMIT_COURSE_COLOR":
      return {
        ...state,
        selectedCourse: {
          ...state.selectedCourse,
          colorSelected: true
        }
      };
    case "LOADING":
      return {
        ...state,
        loading: true
      };
    case "RESET_ASSIGNMENTS_DISPLAY": //implement and make sure settings are default
      return { // NEEDED?????????????
        ...state,
        studentAssignments: {
          ...state.studentAssignments,
          completedFilter: "Incomplete",
          courseFilter: "All Courses",
          sortBy: "Due Date",
          sortDirection: "Ascending",
          limit: "",
          display: state.studentAssignments.data
        }
      }
    case "CHANGE_ASSIGNMENTS_DISPLAY":
      let assignmentsDisplay = state.studentAssignments.data;
      let subAssignmentsDisplay = state.selectedAssignment.subAssignments;
      switch (state.studentAssignments.completedFilter) {
        case "None":
          break;
        case "Completed":
          assignmentsDisplay = assignmentsDisplay.filter(assignment => assignment.completed);
          subAssignmentsDisplay = subAssignmentsDisplay.filter(obj => obj.assignment.completed);
          break;
        case "Incomplete":
          assignmentsDisplay = assignmentsDisplay.filter(assignment => !assignment.completed);
          subAssignmentsDisplay = subAssignmentsDisplay.filter(obj => !obj.assignment.completed);
          break;
        default: break;
      };
      if (state.studentAssignments.courseFilter !== "All Courses") {
        assignmentsDisplay = assignmentsDisplay.filter(assignment => assignment.studentCourseId === parseInt(state.studentAssignments.courseFilter, 10));
      };
      switch (state.studentAssignments.sortBy) {
        case "Due Date":
          assignmentsDisplay = assignmentsDisplay.sort((a,b) => {
            let dateA = new Date(a.dueDate);
            let dateB = new Date(b.dueDate);
            return dateA - dateB;
          });
          if (state.studentAssignments.sortDirection === "Descending") {
            assignmentsDisplay = assignmentsDisplay.reverse();
          };
          break;
        default: break;
      };
      let today = new Date("9/04/2017");
      let later = new Date(today);
      const limitStart = !!state.studentAssignments.limitStart ? state.studentAssignments.limitStart : today;
      later.setDate(later.getDate() + 30);
      const limitEnd = !!state.studentAssignments.limitEnd ? state.studentAssignments.limitEnd : later;
      assignmentsDisplay = assignmentsDisplay.filter(assignment => (new Date(assignment.dueDate)) < limitEnd && (new Date(assignment.dueDate)) > limitStart);
      assignmentsDisplay = assignmentsDisplay.filter(assignment => {
         return (typeof assignment.parentStudentAssignmentId !== "number")
      })
      if (state.studentAssignments.prevCompletedFilter !== state.studentAssignments.completedFilter) {

        return {
          ...state,
          calendar: {
            ...state.calendar,
            defaultDate: limitStart
          },
          studentAssignments: {
            ...state.studentAssignments,
            limitStart: limitStart,
            limitEnd: limitEnd,
            prevCompletedFilter: state.studentAssignments.completedFilter,
            display: assignmentsDisplay
          },
          selectedAssignment: {
            id: [],
            subAssignments: [],
            showDetails: null
          }
        }
      } else {
        return {
          ...state,
          calendar: {
            ...state.calendar,
            defaultDate: limitStart
          },
          studentAssignments: {
            ...state.studentAssignments,
            limitStart: limitStart,
            limitEnd: limitEnd,
            prevCompletedFilter: state.studentAssignments.completedFilter,
            display: assignmentsDisplay
          },
          selectedAssignment: {
            ...state.selectedAssignment,
            subAssignments: subAssignmentsDisplay
          }
        };
      }
    case "FILTER_BY_COURSE":
      return {
        ...state,
        studentAssignments: {
          ...state.studentAssignments,
          courseFilter: action.payload
        }
      }
    case "FILTER_BY_COMPLETED":
      let prevCompletedFilterI = state.studentAssignments.completedFilter;
      return {
        ...state,
        studentAssignments: {
          ...state.studentAssignments,
          prevCompletedFilter: prevCompletedFilterI,
          completedFilter: "Completed"
        }
      }
    case "FILTER_BY_INCOMPLETE":
      let prevCompletedFilterII = state.studentAssignments.completedFilter;
      return {
        ...state,
        studentAssignments: {
          ...state.studentAssignments,
          prevCompletedFilter: prevCompletedFilterII,
          completedFilter: "Incomplete"
        }
      }
    case "REMOVE_COMPLETED_FILTER":
      return {
        ...state,
        studentAssignments: {
          ...state.studentAssignments,
          prevCompletedFilter: state.studentAssignments.completedFilter,
          completedFilter: "None"
        }
      }
    case "SORT_BY":
      return {
        ...state,
        studentAssignments: {
          ...state.studentAssignments,
          sortBy: action.payload
        }
      }
    case "SORT_DIRECTION":
      return {
        ...state,
        studentAssignments: {
          ...state.studentAssignments,
          sortDirection: action.payload
        }
      }
    case "LIMIT_START_CHANGE":
      return {
        ...state,
        studentAssignments: {
          ...state.studentAssignments,
          limitStart: action.payload
        }
      }
    case "LIMIT_END_CHANGE":
      return {
        ...state,
        studentAssignments: {
          ...state.studentAssignments,
          limitEnd: action.payload
        }
      }
    case "SELECT_FOR_TO_DO":

      return {
        ...state,
        selectedForToDo: action.payload
      }
    case "DESELECT_FOR_TO_DO":

      return {
        ...state,
        selectedForToDo: 0,
        slotSelected: false,
        calendarClick: {
          x: 0,
          y: 0
        }
      }
    case "SELECT_SLOT":
      return {
        ...state,
        slotSelected: true,
        selectedSlot: {
          ...state.selectedSlot,
          info: action.payload
        }
      }
    case "START_CHANGE":
      return {
        ...state,
        selectedSlot: {
          ...state.selectedSlot,
          startTime: action.payload
        }
      }
    case "END_CHANGE":

      return {
        ...state,
        selectedSlot: {
          ...state.selectedSlot,
          endTime: action.payload
        }
      }
    case "TITLE_CHANGE":
      return {
        ...state,
        selectedSlot: {
          ...state.selectedSlot,
          title: action.payload
        }
      }
    case "DESC_CHANGE":
      return {
        ...state,
        selectedSlot: {
          ...state.selectedSlot,
          description: action.payload
        }
      }
    case "DATE_CHANGE":
      return {
        ...state,
        selectedSlot: {
          ...state.selectedSlot,
          date: action.payload
        }
      }
    case "SUBMITTED_TO_DO":
      const submittedItem = action.payload;
      const submittedToDo = submittedItem.eventType === "to do" ? submittedItem : null;
      const submittedCourseToDo = submittedItem.eventType === "course to do" ? submittedItem : null;

      if (submittedItem.eventType === "to do") {
        return {
          ...state,
          calendar: {
            ...state.calendar,
            toDoItems: [...state.calendar.toDoItems, submittedToDo]
          },
          slotSelected: false,
          selectedSlot: {
            startTime: null,
            endTime: null,
            info: null,
            title: null,
            description: null,
            date: null
          },
          selectedForToDo: 0
        }
      } else {
        return {
          ...state,
          calendar: {
            ...state.calendar,
            courses: [...state.calendar.courses, submittedCourseToDo]
          },
          slotSelected: false,
          selectedSlot: {
            startTime: null,
            endTime: null,
            info: null,
            title: null,
            description: null,
            date: null
          },
          selectedForToDo: 0
        }
      }
    case "UPDATED_EVENT_DETAILS":
      const updatedItem = action.payload;
      const updatedToDoItems = state.calendar.toDoItems.map(todo => {
        if (todo.id === updatedItem.id) {
          return updatedItem
        } else {
          return todo
        }
      })
      const updatedCourseItems = state.calendar.courses.map(todo => {
        if (todo.id === updatedItem.id) {
          return updatedItem
        } else {
          return todo
        }
      })

      return {
        ...state,
        calendar: {
          ...state.calendar,
          toDoItems: updatedToDoItems,
          courses: updatedCourseItems
        }
      }
    case "COMPLETED_COURSE_TO_DO":
      const calendarCoursesWithCompleted = state.calendar.courses.map(ev => {
        if (ev.id === action.payload.id) {
          return {
            ...ev,
            completed: action.payload.completed
          }
        } else {
          return ev
        }
      })

      return {
        ...state,
        calendar: {
          ...state.calendar,
          courses: calendarCoursesWithCompleted
        }
      }
    case "CALENDAR_CLICK":
      return {
        ...state,
        calendarClick: {
          x: action.payload.x,
          y: action.payload.y
        }
      }
    case "SELECT_STUDENT_COURSE":
      return {
        ...state,
        selectedStudentCourse: {
          data: action.payload,
          showDetails: false
        }
      }
    case "DESELECT_STUDENT_COURSE":
      return {
        ...state,
        selectedStudentCourse: {
          data: null,
          showDetails: false,
          selectedComponent: null
        }
      }
    case "SHOW_STUDENT_COURSE_DETAILS":
      return {
        ...state,
        selectedStudentCourse: {
          ...state.selectedStudentCourse,
          showDetails: action.payload
        }
      }
    case "HIDE_STUDENT_COURSE_DETAILS":
      return {
        ...state,
        selectedStudentCourse: {
          ...state.selectedStudentCourse,
          showDetails: false,
          seletedComponent: null
        }
      }
    case "SELECT_REMOVE_COURSE":
      return {
        ...state,
        courseToRemove: action.payload
      }
    case "DESELECT_REMOVE_COURSE":
      return {
        ...state,
        courseToRemove: null
      }
    case "UPDATED_COURSES":
      console.log("updated courses", action.payload)
      return {
        ...state,
        studentCourses: action.payload,
        selectedCourse: {
          data: null,
          selectedLEC: null,
          selectedDIS: null,
          selectedSEM: null,
          selectedTA: null,
          courseColor: null,
          colorSelected: null
        },
        loading: false
      }
    case "SEE_TO_DOS":
      const seeToDoFor = state.calendar.seeToDoFor === action.payload ? null : action.payload
      return {
        ...state,
        calendar: {
          ...state.calendar,
          seeToDoFor: seeToDoFor
        }
      }
    case "SELECT_EVENT":
      return {
        ...state,
        eventSelected: {
          data: action.payload,
          edit: null,
          toDelete: null
        }
      }
    case "DESELECT_EVENT":
      return {
        ...state,
        eventSelected: {
          data: null,
          edit: null,
          toDelete: null
        },
        selectedSlot: {
          startTime: null,
          endTime: null,
          info: null,
          title: null,
          description: null,
          date: null
        }
      }
    case "EDIT_SELECTED_EVENT":
      const selectedEvent = state.eventSelected.data;
      return {
        ...state,
        eventSelected: {
          ...state.eventSelected,
          edit: true
        },
        selectedSlot: {
          ...state.selectedSlot,
          startTime: selectedEvent.startDate,
          endTime: selectedEvent.endDate,
          title: selectedEvent.title,
          description: selectedEvent.description,
          date: selectedEvent.startDate
        }
      }
    case "EVENT_DELETE_WARNING":
      return {
        ...state,
        eventSelected: {
          ...state.eventSelected,
          toDelete: true
        }
      }
    case "EVENT_CANCEL_DELETE":
      return {
        ...state,
        eventSelected: {
          ...state.eventSelected,
          toDelete: null
        }
      }
    case "EVENT_DELETED":
      const toDoItemsWithoutDeleted = state.calendar.toDoItems.filter(todo => todo.id !== action.payload)
      const courseItemsWithoutDeleted = state.calendar.courses.filter(todo => todo.id !== action.payload)
      return {
        ...state,
        calendar: {
          ...state.calendar,
          toDoItems: toDoItemsWithoutDeleted,
          courses: courseItemsWithoutDeleted
        }
      }
    case "UPDATE_SEARCH_TERM":
      return {
        ...state,
        courseSearchTerm: action.payload
      }
      //REFACTOR TO USE FOR SELECTING WHEN CREATING COMPONENT TO DO
    // case "SHOW_STUDENT_COMP_DETAILS":
    //   return {
    //     ...state,
    //     selectedStudentCourse: {
    //       ...state.seletedStudentCourse,
    //       selectedComponent: action.payload
    //     }
    //   }
    // case "HIDE_STUDENT_COMP_DETAILS":
    //   return {
    //     ...state,
    //     selectedStudentCourse: {
    //       ...state.selectedStudentCourse,
    //       selectedComponent: null
    //     }
    //   }
    default:
      return state;
  }
};
