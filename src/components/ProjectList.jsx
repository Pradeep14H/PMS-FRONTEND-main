import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/TaskList.css';
import LoggedComponent from './LoggedComponent';
import AdminDash from './AdminDash';
import { Link } from 'react-router-dom';

const ProjectList = () => {
  const [tasks, setTasks] = useState([]);
  const [projectDetails, setProjectDetails] = useState({});
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [newPId, setPId] = useState('');
  const handleOpenForm = () => setIsFormOpen(true);
  const handleCloseForm = () => setIsFormOpen(false);

  const handleInputChange = (event) => setProjectDetails(
    { ...projectDetails, [event.target.name]: event.target.value }
    )

  const handleNewChange = (e) =>{
    console.log(e.target.value);
    setPId(e.target.value);
  }
  const handleAddProjectSubmit = (event) => {
    projectDetails.projectId = newPId;
     event.preventDefault(); 
     axios.post('http://localhost:9099/admin/add-project', projectDetails)
     .then((response) => { setTasks([...tasks, response.data]); handleCloseForm(); })
     .catch((error) => { console.log(error); }); }

  useEffect(() => {
    axios.get('http://localhost:9099/admin/get-all-projects')
      .then(response => {
        setTasks(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
  const handleUpdate = (projectId) => { 
    setProjectDetails(tasks.find((task) => task.projectId === projectId)); 
    handleOpenForm(); }

  const handleUpdateProjectSubmit = (event) => { 
    event.preventDefault(); axios.put('http://localhost:9099/admin/update-project', projectDetails)
  .then((response) => { setTasks(tasks.map((task) => 
    (task.projectId === projectDetails.projectId ? response.data : task))); handleCloseForm(); })
    .catch((error) => { console.log(error); }); }

  const handleDelete = (projectId) => {
    axios.delete(`http://localhost:9099/admin/delete-project/${projectId}`)
      .then(() => {
        setTasks(tasks.filter(task => task.projectId !== projectId));
      })
      .catch(error => {
        console.log(error);
      });
  };

  
  return (
    
    <div className="tasklist-container">
      <LoggedComponent />

      <AdminDash/>
      <div className="tasklist-content">
        <h2 className="tasklist-heading" style={{backgroundColor: "rgba(0, 0, 0, 0.5)", color: 'white', padding: '10px'}}>Project List</h2>
        <button onClick={handleOpenForm} className='update-button'>Add Project</button>
  {isFormOpen && (
    <form className="add-task-form-container" onSubmit={projectDetails.projectId ? handleUpdateProjectSubmit : handleAddProjectSubmit}>
      <input type="text" name="projectId" value={projectDetails.projectId} onChange={handleInputChange} placeholder="Project ID"/>
      <input type="text" name="newprojectId" value={newPId} onChange={handleNewChange} placeholder="New Project ID"/>
      <input type="text" name="projectName" value={projectDetails.projectName} onChange={handleInputChange} placeholder="Project Name" required />
      <input type="text" name="projectBudget" value={projectDetails.projectBudget} onChange={handleInputChange} placeholder="Project Budget" required />
      <input type="text" name="projectManagerName" value={projectDetails.projectManagerName} onChange={handleInputChange} placeholder="Project Manager Name" required />
      <input type="text" name="projectTechnology" value={projectDetails.projectTechnology} onChange={handleInputChange} placeholder="Project Technology" required />
      <input type="text" name="projectCode" value={projectDetails.projectCode} onChange={handleInputChange} placeholder="Project Code" required />
      <input type="text" name="projectCoordinator" value={projectDetails.projectCoordinator} onChange={handleInputChange} placeholder="Project Coordinator" required />
      <input type="text" name="projectDiscription" value={projectDetails.projectDiscription} onChange={handleInputChange} placeholder="Project Discription" required />
      <button type="submit" className='update-button'>{projectDetails.projectId ? 'Update Project' : 'Add Project'}</button>
      <button type="button" onClick={handleCloseForm} className='delete-button'>Cancel</button>
    </form>
  )}
        <table className="tasklist-table">
          <thead>
            <tr>
              <th>Project ID</th>
              <th>Project Name</th>
              <th>Project Budget</th>
              <th>Project Manager Name</th>
              <th>View Employees</th>
              <th>View Teams</th>
              <th>View Tasks</th>
              <th>Update</th>
              <th>Delete</th>

            </tr>
          </thead>
          <tbody>
            {tasks.map(task => (
              <tr key={task.projectId}>
                <td>{task.projectId}</td>
                <td>{task.projectName}</td>
                <td>{task.projectBudget}</td>
                <td>{task.projectManagerName}</td>

                <td>
                <Link className="text-white" to={{
                      pathname: "/pemplist",
                      state: { PId: task.projectId }
                    }}>
                  <button className="update-button">
                 
                    Emps
                  </button></Link>
                </td>

                <td>
                <Link className="text-white" to={{
                      pathname: "/pteamlist",
                      state: { PId: task.projectId }
                    }}>
                  <button className="update-button">
                 
                  TEAMS
                  </button></Link>
            
                </td>

                <td>
                <Link className="text-white" to={{
                      pathname: "/ptasklist",
                      state: { PId: task.projectId }
                    }}>
                  <button className="update-button">
                 
                  TASKS
                  </button></Link>
                  
                </td>
                
                <td>
                  <button className="update-button" onClick={() => handleUpdate(task.projectId)}>
                    Update
                  </button>
                </td>
                <td>
                  <button className="delete-button" onClick={() => handleDelete(task.projectId)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProjectList;
