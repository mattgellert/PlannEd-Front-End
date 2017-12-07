import React, { Component } from 'react';

class CourseToDo extends Component {

  handleCompleteCourseToDo = () => {
    this.props.onCompleteCourseToDo(this.props.todo.id);
  };

  render() {
    const todo = this.props.todo;
    const today = new Date();
    return(
      <div className="component-card-wrapper">
        <h3>{todo.title}</h3>
        <p>{`${(new Date(...todo.startDate)).toString().slice(0,21)}`} - {`${(new Date(...todo.endDate)).toString().slice(0,21)}`} {today > todo.endDate ? "(Past)" : "(Upcoming)"}</p>
        <p>{todo.description}</p>
        <button onClick={this.handleCompleteCourseToDo}>{!todo.completed ? "Complete" : "Completed!"}</button>
      </div>
    )
  }
}

export default CourseToDo;
