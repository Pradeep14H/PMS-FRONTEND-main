import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/TaskList.css';
import LoggedComponent from './LoggedComponent';
import AdminDash from './AdminDash';
import { Link } from 'react-router-dom';



const PTeamList = (props) => {
  const PId = props.location.state.PId;
  const [tasks, setTasks] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [isUpdateFormOpen, setIsUpdateFormOpen] = useState(false);
  const [pId, setpId] = useState('');
  const [npId, setnpId] = useState('');
  const [newTeam, setNewTeam] = useState({
    teamId: '',
    teamName: '',
    teamLeadName: '',
    teamMembers: [],
    project: ''
  });
  const [updatedTeam, setUpdatedTeam] = useState({
    teamId: '',
    teamName: '',
    teamLeadName: '',
    teamMembers: [],
    project: ''

  });

  useEffect(() => {
    axios.get(`http://localhost:9099/admin/getteams/${PId}`)
      .then(response => {
        
        setTasks(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios.get('http://localhost:9099/admin/get-all-employee')
      .then(response => {
        console.log(response.data);
        setEmployees(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleDelete = (teamId) => {
    axios.delete(`http://localhost:9099/admin/delete-team/${teamId}`)
      .then(() => {
        setTasks(tasks.filter(task => task.teamId !== teamId));
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleUpdate = (team) => {
    setIsUpdateFormOpen(true);
    setUpdatedTeam(team);
    setpId(team.project.projectId);
  };

  const handleAddFormOpen = () => {
    
    setIsAddFormOpen(true);
  };

  const handleUpdateFormClose = () => {
    setIsUpdateFormOpen(false);

    setUpdatedTeam({
      teamId: '',
      teamName: '',
      teamLeadName: '',
      teamMembers: [],
      project: ''
    });
  };

  const handleAddFormClose = () => {
    setIsAddFormOpen(false);
    setNewTeam({
      teamId: '',
      teamName: '',
      teamLeadName: '',
      teamMembers: [],
      project: ''
    });
  };

  // const handleAddFormSubmit = (event) => {
  //   event.preventDefault();
  //   // alert(JSON.stringify(newTeam));
  //   newTeam.project.projectId = npId;
  //   axios.post('http://localhost:9099/admin/addteam', newTeam)
  //     .then(response => {
  //       setTasks([...tasks, response.data]);
  //       handleAddFormClose();
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:9099/admin/addteam', {
      ...newTeam,
      project: {
        projectId: npId,
      },
    })
      .then(response => {
        setTasks([...tasks, response.data]);
        handleAddFormClose();
      })
      .catch(error => {
        console.log(error);
      });
  };
  

  const handleUpdateFormSubmit = (event) => {
    event.preventDefault();
    updatedTeam.project.projectId = pId;
    alert(JSON.stringify(updatedTeam));
    axios.put('http://localhost:9099/admin/update-team', updatedTeam)
      .then(() => {
        setTasks(tasks.map(task => task.teamId === updatedTeam.teamId ? updatedTeam : task));
        handleUpdateFormClose();
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
        <h2 className="tasklist-heading" style={{backgroundColor: "rgba(0, 0, 0, 0.5)", color: 'white', padding: '10px'}}>
          Project Team List</h2>
        <button className="update-button" onClick={handleAddFormOpen}>
          Add Team
        </button>
        {isAddFormOpen && (
          <form className="add-task-form-container" onSubmit={handleAddFormSubmit}>
          <h3>Add New Team</h3>
          <div className="form-group">
          <label htmlFor="teamId">Team ID:</label>
          <input
          type="text"
          id="teamId"
          name="teamId"
          value={newTeam.teamId}
          onChange={(e) => setNewTeam({...newTeam, teamId: e.target.value})}
          />
          </div>
          <div className="form-group">
          <label htmlFor="teamId">Project ID:</label>
          <input
          type="text"
          id="project"
          name="project"
          placeholder="Project Id"
          value={npId}
          onChange={(e) => {
            // const newMembers = Array.from(e.target.selectedOptions, option => ({ userId: option.value }));
          
            setnpId(e.target.value);
          }}
          />
          </div>
          <div className="form-group">
          <label htmlFor="teamName">Team Name:</label>
          <input
          type="text"
          id="teamName"
          name="teamName"
          value={newTeam.teamName}
          onChange={(e) => setNewTeam({...newTeam, teamName: e.target.value})}
          />
          </div>
          <div className="form-group">
          <label htmlFor="teamLeadName">Team Lead Name:</label>
          <input
          type="text"
          id="teamLeadName"
          name="teamLeadName"
          value={newTeam.teamLeadName}
          onChange={(e) => setNewTeam({...newTeam, teamLeadName: e.target.value})}
          />
          </div>
          <div className="form-group">
          <label htmlFor="teamMembers">Team Members:</label>
          <select
          multiple
          id="teamMembers"
          name="teamMembers"
          value={newTeam.teamMembers}
          onChange={(e) => {
            const newMembers = Array.from(e.target.selectedOptions, option => ({ userId: option.value }));
          
            setNewTeam({...newTeam, teamMembers: [...newMembers]});
          }
        }
          >
          {employees.map(employee => (
          <option key={employee.userId} value={employee.userId}>{employee.userId}</option>
          ))}
          </select>
          </div>
          <div className="form-group">
          <button type="submit" className="update-button">Add Team</button>
          <button type="button" className="delete-button" onClick={handleAddFormClose}>Cancel</button>
          </div>
          </form>
          )}
          <table className="tasklist-table">
          <thead>
          <tr>
          <th>Team ID</th>
          <th>Team Name</th>
          <th>Team Lead Name</th>
          <th>Employee List</th>
          <th>Task List</th>
          <th>Action</th>
          </tr>
          </thead>
          <tbody>
          {tasks.map(task => (
          <tr key={task.teamId}>
          <td>{task.teamId}</td>
          <td>{task.teamName}</td>
          <td>{task.teamLeadName}</td>
          
          <td><Link className="text-white" to={{
                      pathname: "/templist",
                      state: { TId: task.teamId }
                    }}>
                  <button className="update-button">
                 
                  Emps
                  </button></Link>
          </td>
          
          <td>
          <Link className="text-white" to={{
                      pathname: "/ttasklist",
                      state: { TId: task.teamId }
                    }}>
                  <button className="update-button">
                 
                  TASKS
                  </button></Link>
          </td>
          <td>
          <button className="update-button" onClick={() => handleUpdate(task)}>Update</button>
          <button className="delete-button" onClick={() => handleDelete(task.teamId)}>Delete</button>
          </td>
          </tr>
          ))}
          </tbody>
          </table>
          {isUpdateFormOpen && (
          <form className="add-task-form-container" onSubmit={handleUpdateFormSubmit}>
          <h3>Update Team</h3>
          <div className="form-group">
          {/* <td>{task.project.projectId}</td> */}
          <label htmlFor="teamId">Team ID:</label>
          <input
          type="text"
          id="teamId"
          name="teamId"
          value={updatedTeam.teamId}
          onChange={(e) => setUpdatedTeam({...updatedTeam, teamId: e.target.value})}
          />
          </div>

          <div className="form-group">
          <label htmlFor="teamId">Project ID:</label>
          <input
          type="text"
          id="project"
          name="project"
          placeholder="Project Id"
          value={pId}
          
          onChange={(e) => {
            // const newMembers = Array.from(e.target.selectedOptions, option => ({ userId: option.value }));
          
            setNewTeam({...newTeam, project: {projectId: e.target.value}});
            setpId(e.target.value);
          }}
          />
          </div>
          
          <div className="form-group">
          <label htmlFor="teamName">Team Name:</label>
          <input
          type="text"
          id="teamName"
          name="teamName"
value={updatedTeam.teamName}
onChange={(e) => setUpdatedTeam({...updatedTeam, teamName: e.target.value})}
/>

</div>
<div className="form-group">
<label htmlFor="teamLeadName">Team Lead Name:</label>
<input
type="text"
id="teamLeadName"
name="teamLeadName"
value={updatedTeam.teamLeadName}
onChange={(e) => setUpdatedTeam({...updatedTeam, teamLeadName: e.target.value})}
/>
</div>
<div className="form-group">
<label htmlFor="teamMembers">Team Members:</label>
<select
multiple
id="teamMembers"
name="teamMembers"
value={updatedTeam.teamMembers}
onChange={(e) => {
  const newMembers = Array.from(e.target.selectedOptions, option => ({ userId: option.value }));

  setUpdatedTeam({...updatedTeam, teamMembers: [...newMembers]});
}
}

>
{employees.map(employee => (
<option key={employee.employeeId} value={employee.userId}>{employee.employeeName}</option>
))}
</select>
</div>
<div className="form-group">
<button type="submit" className="update-button">Update Team</button>
<button type="button" className="delete-button" onClick={handleUpdateFormClose}>Cancel</button>
</div>
</form>
)}
</div>
</div>
);
};
export default PTeamList;





          
          
          
          
