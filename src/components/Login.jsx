import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import LoginService from '../services/LoginService';
import HeaderComponent from './HeaderComponent';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user_name: '',
      password: '',
      error: false,
      loginSuccess: false,
    };
  }

  handleOnChangeUserName = (e) => {
    this.setState({
      user_name: e.target.value,
    });
  };

  handleOnChangePassword = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  onSubmit = async (e) => {
    const data = {
      user_name: this.state.user_name,
      password: this.state.password,
    };
    const loginResult = await LoginService(data);
    if (loginResult !== 200) {
      this.setState({
        error: true,
        loginSuccess: false,
      });
    } else
      this.setState({
        loginSuccess: true,
        error: false,
      });
  };

  render() {
    const { loginSuccess, error } = this.state;

    return (
      
    <div className="container my-5 content text-center" id="services">
      <HeaderComponent />
    <div className="p-5">
      <h2>CHOOSE YOUR PORTAL</h2>
  
      <div className="row justify-content-center">
        <div className="col-md-4 mb-5">
          <div className="card" style={{width: '20rem',height: '28rem', borderradius: '15px'}}>
            <div className="inner">
              <img src="https://replicate.delivery/pbxt/V4EwTzXJaQ5YI5yXa2es6H00RXei3XN2jtCr2YsEwQWex9GhA/out..jpg" className="card-img-top" style={{ height: '200px', width: '100%', objectFit: 'cover', borderRadius: '15px' }}/>
            </div>
            <div className="card-body">
              <h5><b>Employee Login</b></h5>
              <p>Sign In as a Employee to get access to the services that are reserved for Employee.</p>
              <br/>
              <a href="/emplogin"><button className="button-css-contact"> Sign In </button></a>&nbsp;&nbsp;
              {/* <button type="button" routerLink="/signup-farmer" className="button-css-signin">Register</button> */}
            </div>
          </div>
        </div>
  
  
  
        <div className="col-md-4 mb-5">
          <div className="card" style={{width:'20rem', height: '28rem', borderradius: '15px'}}>
            <div className="inner">
            <img src="https://replicate.delivery/pbxt/fwhCMGGqSLTfy0p7xUJDcqxOGbvhIjniWm3gOondWjhw9eGhA/out..jpg" className="card-img-top" style={{ height: '200px', width: '100%', objectFit: 'cover', borderRadius: '15px' }}/>
            </div>
            <div className="card-body">
              <h5><b>Team-Lead Login</b></h5>
              <p>Sign In as a Team-Lead to get access to the services that are reserved for Leads.</p>
              <br/>
              <a href="/teamleadlogin"><button className="button-css-contact"> Sign In </button></a> &nbsp;&nbsp;
              {/* <button routerLink="/signup-dealer" className="button-css-signin">Register</button> */}
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-5">
          <div className="card" style={{width: '20rem', height: '28rem', borderradius: '15px'}}>
            <div className="inner">
              <img src="https://replicate.delivery/pbxt/OAM5S46V26pjFpmaz6eIiEBcoos3Hlf1dMb6WLrN2rY60eGhA/out..jpg" className="card-img-top" style={{ height: '200px', width: '100%', objectFit: 'cover', borderRadius: '15px' }}/>
            </div>
            <div className="card-body">
              <h5><b>Admin Login</b></h5>
              <p>Sign In as an Admin to get access to the services that are reserved for admins.</p>
              <br/>
              <a href="/adminlogin"> <button className="button-css-contact"> Sign In  </button> </a>&nbsp;&nbsp;
            </div>
          </div>
        </div>
      </div>
    </div>
    
  </div>
   

   


    );
  }
}