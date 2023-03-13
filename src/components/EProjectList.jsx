import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/TaskList.css';
import LoggedComponent from './LoggedComponent';
import EmployeeDash from './EmployeeDash';

const EProjectList = (props) => {
  const EId = props.location.state.EId;
  const [tasks, setTasks] = useState([]);
  const [projectDetails, setProjectDetails] = useState({});


  useEffect(() => {
    axios.get('http://localhost:9099/admin/get-all-projects')
      .then(response => {
        setTasks(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
  
  
  return (
    
    <div className="tasklist-container">
      <LoggedComponent />
      <EmployeeDash EId={EId}/>

      <div className="tasklist-content">
 
        <h2 className="tasklist-heading" style={{backgroundColor: "rgba(0, 0, 0, 0.5)", color: 'white', padding: '10px'}}>Project List</h2>

<br />

        <table className="tasklist-table">
          <thead>
            <tr>
              <th>Project ID</th>
              <th>Project Name</th>
              <th>Project Budget</th>
              <th>Project Manager Name</th>
              <th>Project Technology</th>

            </tr>
          </thead>
          <tbody>
            {tasks.map(task => (
              <tr key={task.projectId}>
                <td>{task.projectId}</td>
                <td>{task.projectName}</td>
                <td>{task.projectBudget}</td>
                <td>{task.projectManagerName}</td>
                <td>{task.projectTechnology}</td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EProjectList;
