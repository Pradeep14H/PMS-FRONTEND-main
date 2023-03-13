import React, { Component } from 'react'
import '../css/HeaderComponent.css'

class LoggedComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                 
        }
    }

    render() {
        return (
            
             
                <nav style={{backgroundColor: "rgba(255, 255, 255, 0.5)" , padding: "10px" }} className="navbar navbar-expand-lg navbar-dark" >
    <div className="container">
      <a className="navbar-brand text-black" href="/"> <b>PMS</b></a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon text-black"></span>
      </button>
  
      <div className="collapse navbar-collapse" id="navbarNav">
        <div className="mx-auto"></div>
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link text-black" href="/"><b>Home</b></a>
          </li>
          &nbsp; &nbsp;<li className="nav-item">
            <a className="nav-link text-black" href="#about"><b>About</b></a>
          </li>
          &nbsp; &nbsp;<li className="nav-item">
            <a className="nav-link text-black" href="#contact"><b>Contact</b></a>
          </li>
          {/* &nbsp; &nbsp;<li className="nav-item">
            <a className="nav-link text-black" href="/profile">Profile</a>
          </li> */}
          &nbsp; &nbsp;<li className="nav-item">
            <a className="nav-link text-black" href="/"><b>Sign Out</b></a>
          </li>

        </ul>
      </div>
    </div>
  </nav>
                
         
        )
    }
}

export default LoggedComponent
