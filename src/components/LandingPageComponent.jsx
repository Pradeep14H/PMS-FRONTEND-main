import React, { Component } from 'react';
import '../css/LandingPageComponent.css'
import HeaderComponent from './HeaderComponent';

export default class LandingPageComponent extends Component {
render(){
  return (
    <React.Fragment>
      <HeaderComponent />
    <div className="banner-image w-100 vh-100 d-flex justify-content-center align-items-center">
        <div className="content text-center">
        <br /><br />
        <div className="text-size-h1 text-black text-left" style={{color:'black'}}> <b>PMS</b></div><br/>
          <p className="button-css text-black"> <b> The project management system also provides employees with a centralized platform to view their assigned tasks, <br /> update their progress, and communicate with their colleagues.
           <br /> This helps to improve collaboration and ensures that everyone is on the same page. </b> </p><br/>
  
        </div>
    </div>




</React.Fragment>

  )
}
}


