import React, { Component } from 'react';
import Task from './Task';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      filter: 'all',
      taskName: '',
    };
  }
  addTask = (taskName) => {
    const newTask = {
      id: Date.now(),
      name: taskName,
      completed: false,
    };
    this.setState((prevState) => ({
      tasks: [...prevState.tasks, newTask],
    }));
  };

  editTask = (taskId, newName) => {
    this.setState((prevState) => ({
      tasks: prevState.tasks.map((task) =>
        task.id === taskId ? { ...task, name: newName } : task
      ),
    }));
  };
  submitForm = (event) =>{
    event.preventDefault();
    console.log(this.state.taskName);
  }
  deleteTask = (taskId) => {
    this.setState((prevState) => ({
      tasks: prevState.tasks.filter((task) => task.id !== taskId),
    }));
  };

  toggleTaskCompletion = (taskId) => {
    this.setState((prevState) => ({
      tasks: prevState.tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      ),
    }));
  };

  clearCompletedTasks = () => {
    this.setState((prevState) => ({
      tasks: prevState.tasks.filter((task) => !task.completed),
    }));
  };

  setFilter = (filter) => {
    this.setState({ filter });
  };
  handleTaskNameChange = (event) =>(
    this.setState({ taskName: event.target.value})
  )

  render() {
    const { tasks, filter } = this.state;

    let filteredTasks;
    if (filter === 'completed') {
      filteredTasks = tasks.filter((task) => task.completed);
    } else if (filter === 'incomplete') {
      filteredTasks = tasks.filter((task) => !task.completed);
    } else {
      filteredTasks = tasks;
    }

    return (
      <div className="app">
        <form onSubmit={this.submitForm}>
        <h1>ToDo List</h1>
        <div className="add-task">
          <input 
            type="text"
            placeholder="Enter task"
            value={this.state.taskName}
            onChange={this.handleTaskNameChange}
            id="taskInput"
            ref={(input) => (this.taskInput = input)}
          />
          <button
            onClick={() => {
              this.addTask(this.taskInput.value);
              this.taskInput.value = '';
            }}
          >
            Add Task
          </button>
        </div>
        </form>
        <div className="filters">
          <button
            className={filter === 'all' ? 'active' : ''}
            onClick={() => this.setFilter('all')}
          >
            All
          </button>
          <button
            className={filter === 'completed' ? 'active' : ''}
            onClick={() => this.setFilter('completed')}
          >
            Completed
          </button>
          <button
            className={filter === 'incomplete' ? 'active' : ''}
            onClick={() => this.setFilter('incomplete')}
          >
            Incomplete
          </button>
        </div>
        <ul className="task-list">
          {filteredTasks.map((task) => (
            <Task
              key={task.id}
              task={task}
              onEdit={this.editTask}
              onDelete={this.deleteTask}
              onToggle={this.toggleTaskCompletion}
            />
          ))}
        </ul>
        <button className="clear-btn" onClick={this.clearCompletedTasks}>
          Clear Completed Tasks
        </button>
        
      </div>
    );
  }
}

export default App;

