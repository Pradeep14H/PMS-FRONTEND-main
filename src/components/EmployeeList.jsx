import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/TaskList.css';
import LoggedComponent from './LoggedComponent';

import { Input } from '@material-ui/core';
import AdminDash from './AdminDash';
import { Link } from 'react-router-dom';

const EmployeeList = () => {
  const [tasks, setTasks] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [newUserId, setNewUserId] = useState("");
  const [newUserName, setNewUserName] = useState("");
  const [newName, setNewName] = useState("");
  const [newSal, setNewSal] = useState("");
  const [newUserPassword, setNewUserPassword] = useState("");
  const [newRating, setNewRating] = useState("");
  const [newMobile, setNewMobile] = useState("");
  const [showAddTaskForm, setShowAddTaskForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [selectedUserName, setSelectedUserName] = useState("");
  const [selectedEmployeeName, setSelectedEmployeeName] = useState("");
  const [selectedMobileNumber, setSelectedMobileNumber] = useState("");
  const [selectedEmployeeSalary, setSelectedEmployeeSalary] = useState("");
  const [selectedRatings, setSelectedRatings] = useState("");
  const [selectedUserPassword, setSelectedUserPassword] = useState("");
  const [selectedEmployeePosition, setSelectedEmployeePosition] = useState("");
 const [open, setOpen] = useState(false);
  


  useEffect(() => {
    axios.get('http://localhost:9099/admin/get-all-employee')
      .then(response => {
        setTasks(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
const handleOpenModal = () => {
    setOpen(true);
    };
    
    const handleCloseModal = () => {
    setOpen(false);
};

  const handleUpdate = (userId) => {
    const selectedTask = tasks.find((task) => task.userId === userId);
    setSelectedUserId(selectedTask.userId);
    setSelectedUserName(selectedTask.userName);
    setSelectedEmployeeName(selectedTask.employeeName);
    setSelectedMobileNumber(selectedTask.mobileNumber);
    setSelectedEmployeeSalary(selectedTask.employeeSalary);
    setSelectedRatings(selectedTask.ratings);
    setSelectedUserPassword(selectedTask.userPassword);
  };
  
  const handleAddTask = () => {
    const newEmp = {
      employeeName: newName,
      employeeSalary: newSal,
      mobileNumber: newMobile,
      ratings: newRating,
      userId: newUserId,
      userName: newUserName,
      userPassword: newUserPassword
    };

    axios.post('http://localhost:9099/admin/addemployee', newEmp)
      .then(response => {
        setTasks([...tasks, response.data]);
        setNewName("");
        setNewUserId("");
        setNewUserName("");
        setNewMobile("");
        setNewUserPassword("");
        setNewSal("");
        setNewRating("");
        setShowAddTaskForm(false);
      })
      .catch(error => {
        console.log(error);
      });
  };


  const handleDelete = (userId) => {
    alert(`Employee with ID: ${userId} will be deleted!!`);
    axios.delete(`http://localhost:9099/admin/delete-employee/${userId}`)
      .then(() => {
        setTasks(tasks.filter(task => task.userId !== userId));
      })
      .catch(error => {
        console.log(error);
      });
  };
  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    const updatedEmp = {
      userId: selectedUserId,
      userName: selectedUserName,
      employeeName: selectedEmployeeName,
      mobileNumber: selectedMobileNumber,
      employeeSalary: selectedEmployeeSalary,
      ratings: selectedRatings,
      role : selectedEmployeePosition,
      userPassword: selectedUserPassword,
    };
    axios.put(`http://localhost:9099/admin/update-employee`, updatedEmp)
      .then((response) => {
        const updatedTasks = [...tasks];
        const index = updatedTasks.findIndex((task) => task.userId === selectedUserId);
        updatedTasks[index] = response.data;
        setTasks(updatedTasks);
        setShowUpdateForm(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  

  
  const filterTasks = (searchInput) => {
    return tasks.filter((task) =>
      task.userName.toLowerCase().includes(searchInput.toLowerCase())
    );
  };
  return (
    
    <div className="tasklist-container">
      <LoggedComponent /> 
  
      <AdminDash/>
      <div className="tasklist-content">
        <h2 className="tasklist-heading" style={{backgroundColor: "rgba(0, 0, 0, 0.5)", color: 'white', padding: '10px'}}>Employee List</h2>
        <input
          type="text"
          placeholder="Search Emp by name..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <table className="tasklist-table">
          <thead>
            <tr>
              <th>Emp ID</th>
              <th>Emp Name</th>
              <th>User Name</th>
              <th>Mobile No</th>
              <th>Emp Salary</th>
              <th>Tasks</th>
              <th>Update</th>
              <th>Delete</th>

            </tr>
          </thead>
          <tbody>
{filterTasks(searchInput).map((task) => (
              <tr key={task.userId}>
              <td>{task.userId}</td>
              <td>{task.userName}</td>
              <td>{task.employeeName}</td>
              <td>{task.mobileNumber}</td>
              <td>{task.employeeSalary}</td>
              <td>
                <Link className="text-white" to={{
                      pathname: "/etasklist",
                      state: { EId: task.userId }
                    }}>
                  <button className="update-button">
                 
                    Task
                  </button></Link>
                </td>
              <td>
                <button className="update-button" onClick={() => { handleUpdate(task.userId); setShowUpdateForm(true); }}>
  Update
</button>

              </td>
              <td>
                <button className="delete-button" onClick={() => handleDelete(task.userId)}>
                  Delete
                </button>
              </td>
            </tr>
            ))}
          </tbody>
        </table>
        <br />
    <br />
    <button className="add-task-button" onClick={() => setShowAddTaskForm(!showAddTaskForm)}>
      {showAddTaskForm ? "Cancel" : "Add Employee"}
    </button>
    {showAddTaskForm && (
      <div className="add-task-form-container">
        <h2>Add New Employee</h2>
        <label htmlFor="userId">Emp User ID</label>
        <input
          type="text"
          name="userId"
          id="userId"
          value={newUserId}
          onChange={(e) => setNewUserId(e.target.value)}
          required
        />
        <label htmlFor="userName">Emp User-Name</label>
        <input
          type="text"
          name="userName"
          id="userName"
          value={newUserName}
          onChange={(e) => setNewUserName(e.target.value)}
          required
        />
        <label htmlFor="userPassword">Emp User-Password</label>
        <input
          type="password"
          name="userPassword"
          id="userPassword"
          value={newUserPassword}
          onChange={(e) => setNewUserPassword(e.target.value)}
          required
        />
        <label htmlFor="employeeName">Employee Name</label>
        <input
        type="text"
          name="newName"
          id="newName"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          required
        />
        <label htmlFor="employeeSalary">Employee Salary</label>
        <input
        type="text"
          name="newSal"
          id="newSal"
          value={newSal}
          onChange={(e) => setNewSal(e.target.value)}
          required
        />
        <label htmlFor="employeeNumber">Employee Mob-Number</label>
        <input
        type="text"
          name="newMobile"
          id="newMobile"
          value={newMobile}
          onChange={(e) => setNewMobile(e.target.value)}
          required
        />
        <label htmlFor="employeeRating">Employee Rating</label>
        <input
        type="number"
          name="newMobile"
          id="newMobile"
          value={newRating}
          onChange={(e) => setNewRating(e.target.value)}
          required
        />
        <button onClick={handleAddTask} className="add-task-submit-button">
          Add Employee
        </button>
      </div>
    )}
  </div>
  <form className="add-task-form-container" style={{ display: showUpdateForm ? "block" : "none" }} onSubmit={handleUpdateSubmit}>
  <h2>Update Employee Details</h2>
  <label htmlFor="userId">Emp User ID</label>
  <input
    type="text"
    name="userId"
    id="userId"
    value={selectedUserId}
    onChange={(e) => setSelectedUserId(e.target.value)}
    required
  />
  <label htmlFor="userName">Emp User-Name</label>
  <input
    type="text"
    name="userName"
    id="userName"
    value={selectedUserName}
    onChange={(e) => setSelectedUserName(e.target.value)}
    required
  />
  <label htmlFor="userPassword">Emp User-Password</label>
  <input
    type="password"
    name="userPassword"
    id="userPassword"
    value={selectedUserPassword}
    onChange={(e) => setSelectedUserPassword(e.target.value)}
    required
  />
  <label htmlFor="employeeName">Employee Name</label>
  <input
    type="text"
    name="employeeName"
    id="employeeName"
    value={selectedEmployeeName}
    onChange={(e) => setSelectedEmployeeName(e.target.value)}
    required
    />
    <label htmlFor="employeePosition">Employee Position</label>
    <input
    type="text"
    name="employeePosition"
    id="employeePosition"
    value={selectedEmployeePosition}
    onChange={(e) => setSelectedEmployeePosition(e.target.value)}
    required
    />
<label htmlFor="employeeNumber">Employee Mobile Number</label>
    <input
    type="text"
    name="employeeNumber"
    id="employeeNumber"
    value={selectedMobileNumber}
    onChange={(e) => setSelectedMobileNumber(e.target.value)}
    required
    />
<label htmlFor="employeeSalary">Employee Salary</label>
    <input
    type="text"
    name="employeeSalary"
    id="employeeSalary"
    value={selectedEmployeeSalary}
    onChange={(e) => setSelectedEmployeeSalary(e.target.value)}
    required
    />
    <button type="submit" className="add-task-submit-button">Update Employee</button>
    
    </form> 


</div>
  );
};

export default EmployeeList;
