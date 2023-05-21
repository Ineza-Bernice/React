// // Task.js
// import React, { Component } from 'react';

// class Task extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       isEditing: false,
//       editedName: props.task.name
//     };
//   }

//   handleEditClick = () => {
//     this.setState({ isEditing: true });
//   }

//   handleInputChange = (event) => {
//     this.setState({ editedName: event.target.value });
//   }

//   handleSaveClick = () => {
//     const { task, onEditTask }
//     = this.props;
//     const { editedName } = this.state;
//     onEditTask(task.id, editedName);
//     this.setState({ isEditing: false });
//     }
    
//     render() {
//     const { task, onDeleteTask, onToggleTask } = this.props;
//     const { isEditing, editedName } = this.state;

//     return (
//         <li>
//           {isEditing ? (
//             <div>
//               <input type="text" value={editedName} onChange={this.handleInputChange} />
//               <button onClick={this.handleSaveClick}>Save</button>
//             </div>
//           ) : (
//             <div>
//               <span
//                 style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
//                 onClick={() => onToggleTask(task.id)}
//               >
//                 {task.name}
//               </span>
//               <button onClick={this.handleEditClick}>Edit</button>
//               <button onClick={() => onDeleteTask(task.id)}>Delete</button>
//             </div>
//           )}
//         </li>
//       );
//           }
//         }
//  export default Task;        
import React, { Component } from 'react';

class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      newName: this.props.task.name,
    };
  }
 
  handleEdit = () => {
    const { task, onEdit } = this.props;
    const { newName } = this.state;
    onEdit(task.id, newName);
    this.setState({ isEditing: false });
  };

  render() {
    const { task, onDelete, onToggle } = this.props;
    const { isEditing, newName } = this.state;

    return (
      <li className={task.completed ? 'completed' : ''}>
        {isEditing ? (
          <input
            type="text"
            value={newName}
            onChange={(e) => this.setState({ newName: e.target.value })}
            onBlur={this.handleEdit}
            autoFocus
          />
        ) : (
          <span onClick={() => onToggle(task.id)}>{task.name}</span>
        )}
        <div className="actions">
          {!isEditing && (
            <>
              <button className="edit-btn" onClick={() => this.setState({ isEditing: true })}>
                Edit
              </button>
              <button className="delete-btn" onClick={() => onDelete(task.id)}>
                Delete
              </button>
            </>
          )}
        </div>
      </li>
    );
  }
}

export default Task;
  
