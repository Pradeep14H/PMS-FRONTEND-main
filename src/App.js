import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Login from './components/Login';
import Registration from './components/Registration';
import LandingPageComponent from './components/LandingPageComponent';
import AdminLogin from './components/AdminLogin';
import EmployeeLogin from './components/EmployeeLogin';
import TeamLeadLogin from './components/TeamLeadLogin';
import EmployeeDash from './components/EmployeeDash';
import TeamLeadDash from './components/TeamLeadDash';
import AdminDash from './components/AdminDash';
import TaskList from './components/TaskList';
import EmployeeList from './components/EmployeeList';
import ProjectList from './components/ProjectList';
import AddEmployee from './components/AddEmployee';
import TeamList from './components/TeamList';
import ETaskList from './components/ETaskList';
import EEmpList from './components/EEmpList';
import EProjectList from './components/EProjectList';
import Profile from './components/Profile';
import TaskDash from './components/TaskDash';
import PEmpList from './components/PEmpList';
import PTeamList from './components/PTeamList';
import PTaskList from './components/PTaskList';
import TEmpList from './components/TEmpList';
import TTaskList from './components/TTaskList';

function App() {
  return (
    <div>
        <Router>
              
                
                    <Switch> 
                    <Route exact path="/" component={LandingPageComponent} />
                    <Route exact path="/register" component={Registration} />
						              <Route exact path="/login" component={Login} />

                          <Route path = "/adminlogin" component = {AdminLogin}></Route>
                          <Route path = "/emplogin" component = {EmployeeLogin}></Route>
                          <Route path = "/teamleadlogin" component = {TeamLeadLogin}></Route>
                          <Route path = "/empdash" component = {EmployeeDash}></Route>
                          <Route path = "/teamleaddash" component = {TeamLeadDash}></Route>
                          <Route path = "/admindash" component = {AdminDash}></Route>
                          <Route path = "/tasklist" component = {TaskList}></Route>
                          <Route path = "/emplist" component = {EmployeeList}></Route>
                          <Route path = "/projectlist" component = {ProjectList}></Route>
                          <Route path = "/addemp" component = {AddEmployee}></Route>
                          <Route path = "/teamlist" component = {TeamList}></Route>
                          <Route path = "/etasklist" component = {ETaskList}></Route>
                          <Route path = "/eemplist" component = {EEmpList}></Route>
                          <Route path = "/eprojectlist" component = {EProjectList}></Route>
                          <Route path = "/profile" component = {Profile}></Route>
                          <Route path = "/taskdash" component = {TaskDash}></Route>
                          <Route path = "/pemplist" component = {PEmpList}></Route>
                          <Route path = "/pteamlist" component = {PTeamList}></Route>
                          <Route path = "/ptasklist" component = {PTaskList}></Route>
                          <Route path = "/templist" component = {TEmpList}></Route>
                          <Route path = "/ttasklist" component = {TTaskList}></Route>
                          

    
                    </Switch>
                
              
        </Router>
    </div>
    
  );
}

export default App;
