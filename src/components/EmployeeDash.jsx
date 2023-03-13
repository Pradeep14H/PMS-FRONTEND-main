import React from 'react';
import '../css/EmployeeDash.css';
import { Link } from 'react-router-dom';


const EmployeeDash = (props) => {
    const EId = props.EId;
    return (
  <nav style={{backgroundColor: "rgba(255, 255, 255, 0.5)"}} className={`navbar navbar-expand-lg navbar-dark ${true ? 'navbar--visible' : 'navbar--hidden'}`}>
        <div className="container">
          <a className="navbar-brand text-black" href="/">
            <b>Employee Dashboard</b>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon text-black"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <div className="mx-auto"></div>
            <ul className="navbar-nav">
            
              <li className="nav-item">
              <Link className="nav-link text-white" to={{
                      pathname: "/etasklist",
                      state: { EId: EId }
                    }}><b>Task List</b></Link>
              </li>
                
              &nbsp; &nbsp;
              <li className="nav-item">
              <Link className="nav-link text-white" to={{
                      pathname: "/eemplist",
                      state: { EId: EId }
                    }}><b>Teammates List</b></Link>
              </li>

              &nbsp; &nbsp;
              <li className="nav-item">
              <Link className="nav-link text-white" to={{
                      pathname: "/eprojectlist",
                      state: { EId: EId }
                    }}><b>Project List</b></Link>
              </li>
              
              
            </ul>
          </div>
        </div>
      </nav>
    );
  };

export default EmployeeDash;
