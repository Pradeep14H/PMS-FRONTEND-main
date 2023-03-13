import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/TaskList.css';
import LoggedComponent from './LoggedComponent';
import AdminDash from './AdminDash';
import EmployeeDash from './EmployeeDash';

const ETaskList = (props) => {
    const EId = props.location.state.EId;
  const [tasks, setTasks] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [newTaskId, setNewTaskId] = useState("");
  const [newTaskName, setNewTaskName] = useState("");
  const [newTaskSDate, setNewTaskSDate] = useState("");
  const [newTaskEDate, setNewTaskEDate] = useState("");
  const [newTaskEmpId, setNewTaskEmpId] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [newTaskStatus, setNewTaskStatus] = useState("");
  const [selectTaskStatus, setSelectedTaskStatus] = useState("");
const [selectedTaskId, setSelectedTaskId] = useState("");
const [selectedTaskName, setSelectedTaskName] = useState("");
const [selectedTaskSDate, setSelectedTaskSDate] = useState("");
const [selectedTaskEDate, setSelectedTaskEDate] = useState("");
const [selectedTaskEmpId, setSelectedTaskEmpId] = useState("");
const [selectedFeedback, setSelectedFeedback] = useState("");
const [selectedTaskDescription, setSelectedTaskDescription] = useState("");
  const [showAddTaskForm, setShowAddTaskForm] = useState(false);
  const [showUpdateTaskForm, setShowUpdateTaskForm] = useState(false);

  
  
  const [taskToUpdate, setTaskToUpdate] = useState({});

  const hadleCloseUform = () => {
    setShowUpdateTaskForm(false);
  }

  const hadleCloseAform = () =>{
    setShowAddTaskForm(false);
  }

  useEffect(() => {
    axios.get(`http://localhost:9099/employee/tasks/${EId}`)
      .then(response => {
        setTasks(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleDelete = (taskId) => {
    axios.delete(`http://localhost:9099/admin/delete-task/${taskId}`)
      .then(() => {
        setTasks(tasks.filter(task => task.taskId !== taskId));
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleUpdate = (task) => {
    setSelectedTaskId(task.taskId);
    setSelectedTaskName(task.taskName);
    setSelectedTaskEmpId(task.employees.userId);
    setSelectedTaskStatus(task.taskStatus);
    setSelectedTaskEDate(task.endDate);
    setSelectedTaskSDate(task.taskStartDate);
    setSelectedTaskDescription(task.taskDescription);
    setShowUpdateTaskForm(true);
  };

  const handleUpdateTaskSubmit = (e) => {
    e.preventDefault();

    const updatedTask = {
      taskId: selectedTaskId,
      taskName: selectedTaskName,
      taskDescription: selectedTaskDescription,
      employees: {userId: selectedTaskEmpId},
      taskStatus: selectTaskStatus,
      taskStartDate: selectedTaskSDate,
      endDate: selectedTaskEDate,
      feedback: selectedFeedback
    };

    axios.put(`http://localhost:9099/admin/update-task`, updatedTask)
      .then(response => {
        setTasks(tasks.map(task => task.taskId === taskToUpdate.taskId ? response.data : task));
        setTaskToUpdate({});
        setShowUpdateTaskForm(false);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleAddTask = () => {
    const newTask = {
      taskId: newTaskId,
      employees: {userId: newTaskEmpId},
      taskName: newTaskName,
      taskDescription: newTaskDescription,
      taskStatus: newTaskStatus, // assuming new tasks always have the "Pending" status
      taskStartDate: newTaskSDate, // current date as ISO string
      endDate: newTaskEDate,
      feedback: "No Feedback"
    };

    axios.post('http://localhost:9099/admin/add-task', newTask)
      .then(response => {
        setTasks([...tasks, response.data]);
        setNewTaskName("");
        setNewTaskDescription("");
        setShowAddTaskForm(false);
      })
      .catch(error => {
        console.log(error);
      });
  };



  const filterTasks = (searchInput) => {
    return tasks.filter((task) =>
      task.taskName.toLowerCase().includes(searchInput.toLowerCase())
    );
  };

  return (
    <div className="tasklist-container">
      <LoggedComponent />
      
      <EmployeeDash EId={EId}/>
      <div className="tasklist-content">
        <h2 className="tasklist-heading" style={{backgroundColor: "rgba(0, 0, 0, 0.5)", color: 'white', padding: '10px'}}>
            EmpId: {EId} - Task List</h2>
        <input
          type="text"
          placeholder="Search tasks..." 
          onChange={(e) =>setSearchInput(e.target.value)}
          value={searchInput}
          />
          <br />
          <br />

          <button className="update-button" onClick={() => setShowAddTaskForm(!showAddTaskForm)}>
          {showAddTaskForm ? "Cancel" : "Add Task"}
          </button>
          {showAddTaskForm && (
          <form onSubmit={handleAddTask} className="add-task-form-container">
          <input
          type="text"
          placeholder="Task Id"
          value={newTaskId}
          onChange={(e) => setNewTaskId(e.target.value)}
          required
          />
          <input
          type="text"
          placeholder="Employee Id"
          value={newTaskEmpId}
          onChange={(e) => setNewTaskEmpId(e.target.value)}
          required
          />
          <input
          type="text"
          placeholder="Task Name"
          value={newTaskName}
          onChange={(e) => setNewTaskName(e.target.value)}
          required
          />
          <input
          type="text"
          placeholder="Start Date (YYYY-MM-DD)"
          value={newTaskSDate}
          onChange={(e) => setNewTaskSDate(e.target.value)}
          required
          />
          <input
          type="text"
          placeholder="End Date (YYYY-MM-DD)"
          value={newTaskEDate}
          onChange={(e) => setNewTaskEDate(e.target.value)}
          required
          />
          <input
          type="text"
          placeholder="Task Status"
          value={newTaskStatus}
          onChange={(e) => setNewTaskStatus(e.target.value)}
          required
          />
          <textarea
          placeholder="Task Description"
          value={newTaskDescription}
          onChange={(e) => setNewTaskDescription(e.target.value)}
          required
          />
          <button type="submit" className="update-button">Add</button>
          <button className='delete-button' onClick={hadleCloseAform}>Close</button>
          </form>
          )}
          {showUpdateTaskForm && (
          <form className="add-task-form-container" style={{ display: showUpdateTaskForm ? "block" : "none" }} onSubmit={handleUpdateTaskSubmit}>
          <h2>Update Task Details</h2>
          <label htmlFor="taskId">Task ID</label>
          <input
            type="text"
            name="taskId"
            id="taskId"
            value={selectedTaskId}
            onChange={(e) => setSelectedTaskId(e.target.value)}
            required
          />
          <label htmlFor="taskName">Task Name</label>
          <input
            type="text"
            name="taskName"
            id="taskName"
            value={selectedTaskName}
            onChange={(e) => setSelectedTaskName(e.target.value)}
            required
          />
          <label htmlFor="startDate">Start Date</label>
          <input
            type="date"
            name="startDate"
            id="startDate"
            value={selectedTaskSDate}
            onChange={(e) => setSelectedTaskSDate(e.target.value)}
            required
          />
          <label htmlFor="endDate">End Date</label>
          <input
            type="date"
            name="endDate"
            id="endDate"
            value={selectedTaskEDate}
            onChange={(e) => setSelectedTaskEDate(e.target.value)}
            required
          />
          <label htmlFor="employeeId">Employee ID</label>
          <input
            type="text"
            name="employeeId"
            id="employeeId"
            value={selectedTaskEmpId}
            onChange={(e) => setSelectedTaskEmpId(e.target.value)}
            required
            />
          <label htmlFor="taskDescription">Task Description</label>
          <textarea
            name="taskDescription"
            id="taskDescription"
            value={selectedTaskDescription}
            onChange={(e) => setSelectedTaskDescription(e.target.value)}
            required
          />
          <label htmlFor="taskStatus">Task Status</label>
          <select
            name="taskStatus"
            id="taskStatus"
            value={selectTaskStatus}
            onChange={(e) => setSelectedTaskStatus(e.target.value)}
            required
          >
            <option value="">Select Task Status</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
          <label htmlFor="employeeId">Feedback</label>
          <input
            type="text"
            name="feedback"
            id="feedback"
            value={selectedFeedback}
            onChange={(e) => setSelectedFeedback(e.target.value)}
            required
            />
          
          <button type="submit" className="update-button">Update Task</button>
        </form>
          )}
          <table className="tasklist-table">
          <thead>
          <tr>
          <th>Task Id</th>
          <th>Task Name</th>
          <th>Status</th>
          <th>Start Date</th>
          <th>End Date</th>
          <th>Description</th>
          <th>Actions</th>
          </tr>
          </thead>
          <tbody>
          {filterTasks(searchInput).map((task) => (
          <tr key={task.taskId}>
          <td>{task.taskId}</td>
          <td>{task.taskName}</td>
          <td>{task.taskStatus}</td>
          <td>{task.taskStartDate}</td>
          <td>{task.endDate}</td>
          <td>{task.taskDescription}</td>
          <td>
          <button onClick={() => handleUpdate(task)} className='update-button'>Update</button>
          <button onClick={() => handleDelete(task.taskId)} className='delete-button'>Delete</button>
          </td>
          </tr>
          ))}
          </tbody>
          </table>
          </div>
          </div>
          );
          };
          
          export default ETaskList;
