import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/TaskDash.css';
import LoggedComponent from './LoggedComponent';
import AdminDash from './AdminDash';


const TaskDash = () => {
  const [tasks, setTasks] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [newTaskId, setNewTaskId] = useState("");
  const [newTaskName, setNewTaskName] = useState("");
  const [newTaskSDate, setNewTaskSDate] = useState("");
  const [newTaskEDate, setNewTaskEDate] = useState("");
  const [newTaskEmpId, setNewTaskEmpId] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [newTaskStatus, setNewTaskStatus] = useState("");
  const [selectedTaskStatus, setSelectedTaskStatus] = useState("");
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
  };

  const hadleCloseAform = () => {
    setShowAddTaskForm(false);
  };

  useEffect(() => {
    axios
      .get('http://localhost:9099/admin/get-all-list-of-tasks')
      .then(response => {
        setTasks(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleDelete = taskId => {
    axios
      .delete(`http://localhost:9099/admin/delete-task/${taskId}`)
      .then(() => {
        setTasks(tasks.filter(task => task.taskId !== taskId));
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleUpdate = task => {
    setSelectedTaskId(task.taskId);
    setSelectedTaskName(task.taskName);
    setSelectedTaskEmpId(task.employees.userId);
    setSelectedTaskStatus(task.taskStatus);
    setSelectedTaskEDate(task.endDate);
    setSelectedTaskSDate(task.taskStartDate);
    setSelectedTaskDescription(task.taskDescription);
    setShowUpdateTaskForm(true);
  };

  const handleUpdateTaskSubmit = e => {
    e.preventDefault();

    const updatedTask = {
      taskId: selectedTaskId,
      taskName: selectedTaskName,
      taskDescription: selectedTaskDescription,
      employees: { userId: selectedTaskEmpId },
      taskStatus: selectedTaskStatus,
      taskStartDate: selectedTaskSDate,
      endDate: selectedTaskEDate,
      feedback: selectedFeedback
    };

    axios
      .put(`http://localhost:9099/admin/update-task`, updatedTask)
      .then(response => {
        setTasks(
          tasks.map(task =>
            task.taskId === taskToUpdate.taskId ? response.data : task
            )
            );
            setShowUpdateTaskForm(false);
            })
            .catch(error => {
            console.log(error);
            });
            };
            
            const handleAddTaskSubmit = e => {
            e.preventDefault();
            const newTask = {
                taskId: newTaskId,
                taskName: newTaskName,
                taskDescription: newTaskDescription,
                employees: { userId: newTaskEmpId },
                taskStatus: newTaskStatus,
                taskStartDate: newTaskSDate,
                endDate: newTaskEDate
              };
              
              axios
                .post(`http://localhost:9099/admin/create-task`, newTask)
                .then(response => {
                  setTasks([...tasks, response.data]);
                  setShowAddTaskForm(false);
                })
                .catch(error => {
                  console.log(error);
                });
            };

            const handleSearch = () => {
            axios
            .get(`http://localhost:9099/admin/search-tasks/${searchInput}`)
            .then(response => {
            setTasks(response.data);
            })
            .catch(error => {
            console.log(error);
            });
            };
            
            const handleReset = () => {
            axios
            .get(`http://localhost:9099/admin/get-all-list-of-tasks`)
            .then(response => {
            setTasks(response.data);
            setSearchInput("");
            })
            .catch(error => {
            console.log(error);
            });
            };
            
            return (
            <div className="taskList">
            <LoggedComponent />
            <AdminDash />
            <div className="searchContainer">
            <input
            type="text"
            placeholder="Search by Task Name or Employee Name"
            className="searchInput"
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)}
            />
            <button className="searchButton" onClick={handleSearch}>
            Search
            </button>
            <button className="resetButton" onClick={handleReset}>
            Reset
            </button>
            </div>
            <div className="addTaskButtonContainer">
            <button
            className="addTaskButton"
            onClick={() => setShowAddTaskForm(true)}
            >
            Add Task
            </button>
            </div>
            {showAddTaskForm && (
            <div className="addTaskFormContainer">
            <form onSubmit={handleAddTaskSubmit} className="addTaskForm">
            <label>
            Task ID:
            <input
            type="text"
            name="taskId"
            required
            value={newTaskId}
            onChange={e => setNewTaskId(e.target.value)}
            />
            </label>
            <label>
            Task Name:
            <input
            type="text"
            name="taskName"
            required
            value={newTaskName}
            onChange={e => setNewTaskName(e.target.value)}
            />
            </label>
            <label>
            Employee ID:
            <input
            type="text"
            name="employeeId"
            required
            value={newTaskEmpId}
            onChange={e => setNewTaskEmpId(e.target.value)}
            />
            </label>
            <label>
            Task Description:
            <textarea
            name="taskDescription"
            required
            value={newTaskDescription}
            onChange={e => setNewTaskDescription(e.target.value)}
            />
            </label>
            <label>
            Task Status:
            <select
            name="taskStatus"
            required
            value={newTaskStatus}
            onChange={e => setNewTaskStatus(e.target.value)}
            >
            <option value="not-started">Not Started</option>
            <option value="in-progress">In Progress</option>              
            <option value="completed">Completed</option>
            </select>
            </label>
            <label>
            Start Date:
            <input
            type="date"
            name="startDate"
            required
            value={newTaskSDate}
            onChange={e => setNewTaskSDate(e.target.value)}
            />
            </label>
            <label>
            End Date:
            <input
            type="date"
            name="endDate"
            required
            value={newTaskEDate}
            onChange={e => setNewTaskEDate(e.target.value)}
            />
            </label>
            <button type="submit" className="submitTaskButton">
            Add Task
            </button>
            </form>
            </div>
            )}
            {showUpdateTaskForm && (
            <div className="updateTaskFormContainer">
            <form onSubmit={handleUpdateTaskSubmit} className="updateTaskForm">
            <h2>Update Task: {selectedTaskName}</h2>
            <label>
            Task ID:
            <input
            type="text"
            name="taskId"
            required
            value={selectedTaskId}
            onChange={e => setSelectedTaskId(e.target.value)}
            />
            </label>
            <label>
            Task Name:
            <input
            type="text"
            name="taskName"
            required
            value={selectedTaskName}
            onChange={e => setSelectedTaskName(e.target.value)}
            />
            </label>
            <label>
            Employee ID:
            <input
            type="text"
            name="employeeId"
            required
            value={selectedTaskEmpId}
            onChange={e => setSelectedTaskEmpId(e.target.value)}
            />
            </label>
            <label>
            Task Description:
            <textarea
            name="taskDescription"
            required
            value={selectedTaskDescription}
            onChange={e => setSelectedTaskDescription(e.target.value)}
            />
            </label>
            <label>
            Task Status:
            <select
            name="taskStatus"
            required
            value={selectedTaskStatus}
            onChange={e => setSelectedTaskStatus(e.target.value)}
            >
            <option value="not-started">Not Started</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
            </select>
            </label>
            <label>
            Start Date:
            <input
            type="date"
            name="startDate"
            required
            value={selectedTaskSDate}
            onChange={e => setSelectedTaskSDate(e.target.value)}
            />
            </label>
            <label>
            End Date:
            <input
            type="date"
            name="endDate"
            required
            value={selectedTaskEDate}
            onChange={e => setSelectedTaskEDate(e.target.value)}
            />
            </label>
            <button type="submit" className="submitTaskButton" >
            Update Task
            </button>
            </form>
            </div>
            )}
            <div className="taskContainer">
            {tasks.map(task => (
            <div key={task.taskId} className="task">
            <h2>{task.taskName}</h2>
            <p>{task.taskDescription}</p>
            <p>Status: {task.taskStatus}</p>
            <p>Start Date: {task.taskStartDate}</p>
            <p>End Date: {task.endDate}</p>
            <p>Employee: {task.employees.userId}</p>
            <div className="taskButtons">
            <button onClick={() => handleUpdate(task)}>Update</button>
            <button onClick={() => handleDelete(task.taskId)}>Delete</button>
            </div>
            </div>
            ))}
            </div>
            </div>
            );
            };
            export default TaskDash;