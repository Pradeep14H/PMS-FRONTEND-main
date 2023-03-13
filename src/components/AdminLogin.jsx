import React, { useState } from 'react';
import axios from 'axios';
import '../css/AdminLogin.css'
import { Card, CardContent, CardHeader, TextField, Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import HeaderComponent from './HeaderComponent';

const AdminLogin = () => {
    const history = useHistory();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [admin, setAdmin] = useState({
    // firstName: '',
    // lastName: '',
    
    email: '',
    key: '',
    userName: '',
    userPassword: '',
  });
  const handleInputChange = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };

  const [showPassword, setShowPassword] = useState(false);
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    const credentials = {
      userName: userName,
      userPassword: password
    };

    try {
      const response = await axios.post(
        'http://localhost:9099/admin/authenticate-admin/' + admin.userName + "/" + admin.userPassword
      );
      if(response.data.userName === admin.userName){
        alert("Login Successful");
      }
      history.push('/emplist');
      console.log(response.data);
    } catch (error) {
      alert("Login Failed - Enter Valid Credentials");
      console.log(error);
    }
  };

  return (
    <div className="banner-image">
      <HeaderComponent />
    <Card className="button-css" style={{ width: '30%', margin: '9% auto', borderColor: 'rgba(0, 255, 255, 0.349)', borderStyle: 'solid', borderRadius: '8px', fontStyle: 'normal', fontFamily: 'fantasy', color: 'darkcyan' }}>
      <CardHeader title={<>Admin Login</>} style={{ textAlign: 'center', color: 'black'}} />
      <CardContent>
        <form onSubmit={handleSubmit}>

          <TextField fullWidth required label="User Name" name="userName" value={admin.userName} onChange={handleInputChange}  />

          

          <TextField fullWidth required label="Password" name="userPassword" type={showPassword ? 'text' : 'password'} value={admin.userPassword} onChange={handleInputChange} InputProps={{ endAdornment: <Button onClick={togglePasswordVisibility}>{showPassword ? 'SHOW' : 'HIDE'}</Button> }} />


          <br />
          <br />
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button variant="contained" color="primary" type="submit">
              Sign In
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
    </div>
  );
};

export default AdminLogin;
