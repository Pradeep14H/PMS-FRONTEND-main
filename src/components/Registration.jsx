import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import "../css/Register.css";
import axios from 'axios';
import HeaderComponent from './HeaderComponent';

import { Card, CardContent, CardHeader, TextField, Button } from '@material-ui/core';

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const history = useHistory();
  const [admin, setAdmin] = useState({
    // firstName: '',
    // lastName: '',
    
    email: '',
    key: '',
    userName: '',
    userPassword: '',
  });
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {

    e.preventDefault();
   
    
    axios
      .post('http://localhost:9099/admin/register-admin',
       {userName: admin.userName, userPassword:admin.userPassword, userId:admin.userId})
      .then(() => {
        history.push('/login');
      })
      .catch((err) => {
       
        console.log(err.status);
        setError(JSON.stringify(err.response.data));
      });
  };


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="banner-image">
      <HeaderComponent />
      <Card className="button-css" style={{ width: '30%', margin: '9% auto', borderColor: 'rgba(0, 255, 255, 0.349)', borderStyle: 'solid', borderRadius: '8px', fontStyle: 'normal', fontFamily: 'fantasy', color: 'darkcyan' }}>
        <CardHeader title={<>Admin Register</>} style={{ textAlign: 'center', color: 'black'}} />
        <CardContent>
          <form onSubmit={handleSubmit}>


            <TextField fullWidth required label="User Id" name="userId" value={admin.userId} onChange={handleInputChange}  />

            <TextField fullWidth required label="User Name" name="userName" value={admin.userName} onChange={handleInputChange}  />

            <TextField fullWidth required label="Email" name="email" value={admin.email} onChange={handleInputChange}  />

            <TextField fullWidth required label="Password" name="userPassword" type={showPassword ? 'text' : 'password'} value={admin.userPassword} onChange={handleInputChange} InputProps={{ endAdornment: <Button onClick={togglePasswordVisibility}>{showPassword ? 'SHOW' : 'HIDE'}</Button> }} />


            <br />
            <br />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Button variant="contained" color="primary" type="submit">
                Sign Up
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      </div>
  );
}

export default Register;
