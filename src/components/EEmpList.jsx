import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/TaskList.css';
import LoggedComponent from './LoggedComponent';

import EmployeeDash from './EmployeeDash';

const EmployeeList = (props) => {
  const EId = props.location.state.EId;
  const [tasks, setTasks] = useState([]);
  const [searchInput, setSearchInput] = useState("");



  useEffect(() => {
    axios.get('http://localhost:9099/admin/get-all-employee')
      .then(response => {
        setTasks(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
  
  const filterTasks = (searchInput) => {
    return tasks.filter((task) =>
      task.userName.toLowerCase().includes(searchInput.toLowerCase())
    );
  };
  return (
    
    <div className="tasklist-container">
      <LoggedComponent />
      <EmployeeDash EId={EId}/>
      
      <div className="tasklist-content">
        <h2 className="tasklist-heading" style={{backgroundColor: "rgba(0, 0, 0, 0.5)", color: 'white', padding: '10px'}}>Team-mates List</h2>
        <br />
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
     


            </tr>
          </thead>
          <tbody>
{filterTasks(searchInput).map((task) => (
              <tr key={task.userId}>
              <td>{task.userId}</td>
              <td>{task.userName}</td>
              <td>{task.employeeName}</td>
              <td>{task.mobileNumber}</td>
            </tr>
            ))}
          </tbody>
        </table>
        <br />
    <br />
    
      
  </div>
  

</div>
  );
};

export default EmployeeList;
