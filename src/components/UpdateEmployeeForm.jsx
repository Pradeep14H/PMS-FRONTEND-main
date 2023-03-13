import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@material-ui/core';

const UpdateEmployeeForm = ({ open, handleClose, handleUpdateSubmit, selectedEmployee }) => {
  const [selectedUserName, setSelectedUserName] = useState(selectedEmployee.userName);
  const [selectedEmployeeName, setSelectedEmployeeName] = useState(selectedEmployee.employeeName);
  const [selectedMobileNumber, setSelectedMobileNumber] = useState(selectedEmployee.mobileNumber);
  const [selectedEmployeeSalary, setSelectedEmployeeSalary] = useState(selectedEmployee.employeeSalary);
  const [selectedRatings, setSelectedRatings] = useState(selectedEmployee.ratings);
  const [selectedUserPassword, setSelectedUserPassword] = useState(selectedEmployee.userPassword);

  const handleUserNameChange = (e) => setSelectedUserName(e.target.value);
  const handleEmployeeNameChange = (e) => setSelectedEmployeeName(e.target.value);
  const handleMobileNumberChange = (e) => setSelectedMobileNumber(e.target.value);
  const handleEmployeeSalaryChange = (e) => setSelectedEmployeeSalary(e.target.value);
  const handleRatingsChange = (e) => setSelectedRatings(e.target.value);
  const handleUserPasswordChange = (e) => setSelectedUserPassword(e.target.value);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Update Employee Details</DialogTitle>
      <DialogContent>
        <form onSubmit={handleUpdateSubmit}>
          <TextField label="User Name" value={selectedUserName} onChange={handleUserNameChange} fullWidth margin="normal" />
          <TextField label="Employee Name" value={selectedEmployeeName} onChange={handleEmployeeNameChange} fullWidth margin="normal" />
          <TextField label="Mobile Number" value={selectedMobileNumber} onChange={handleMobileNumberChange} fullWidth margin="normal" />
          <TextField label="Employee Salary" value={selectedEmployeeSalary} onChange={handleEmployeeSalaryChange} fullWidth margin="normal" />
          <TextField label="Ratings" value={selectedRatings} onChange={handleRatingsChange} fullWidth margin="normal" />
          <TextField label="User Password" value={selectedUserPassword} onChange={handleUserPasswordChange} fullWidth margin="normal" />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">Cancel</Button>
        <Button onClick={handleUpdateSubmit} color="primary">Update</Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateEmployeeForm;
