import React, { useEffect, useState } from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';
import LoggedComponent from './LoggedComponent';
import '../css/Profile.css';
import axios from 'axios';

export default function Profile() {
  const [userId, setUserId] = useState(null);
  const [emp, setEmp] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:9099/admin/get-employee-by-id/${userId}`)
      .then(response => {
        setEmp(response.data);
        console.log(emp);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  // Function to handle submission of user Id
  const handleUserIdSubmit = (event) => {
    event.preventDefault();
    const input = event.target.elements.userIdInput.value.trim();
    if (input) {
      setUserId(input);
    }
  }

  // If user Id not yet provided, display prompt
  if (!userId) {
    return (
      <>
      <LoggedComponent></LoggedComponent>
      
      <section className="vh-100 d-flex justify-content-center align-items-center" style={{ backgroundColor: '#f4f5f7' }}>
        <form onSubmit={handleUserIdSubmit}>
          <label htmlFor="userIdInput" className="user-id-label">Enter Employee ID: </label>
          <input id="userIdInput" type="text" className="user-id-input" />
          <button type="submit" className='update-button'>Submit</button>
        </form>
      </section>
      </>
    );
  }

  // If user Id provided, display profile page
  return (
    <section className="vh-100" style={{ backgroundColor: '#f4f5f7' }}>
      <LoggedComponent />
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol lg="6" className="mb-4 mb-lg-0">
            <MDBCard className="mb-3" style={{ borderRadius: '.5rem' }}>
              <MDBRow className="g-0">
                <MDBCol md="4" className="gradient-custom text-center text-white"
                  style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
                  <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                    alt="Avatar" className="my-5" style={{ width: '80px' }} fluid />
                  <MDBTypography tag="h5">Owner Test1</MDBTypography>
                  <MDBCardText>Tournament Owner</MDBCardText>
                  <MDBIcon far icon="edit mb-5" />
                </MDBCol>
                <MDBCol md="8">
                  <MDBCardBody className="p-4">
                    <MDBTypography tag="h6">Information</MDBTypography>
                    <hr className="mt-0 mb-4" />
                    <MDBRow className="pt-1">
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Email</MDBTypography>
                        <MDBCardText className="text-muted">info@example.com</MDBCardText>
                      </MDBCol>
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Phone</MDBTypography>
                        <MDBCardText className="text-muted">123 456 789</MDBCardText>
                      </MDBCol>
                    </MDBRow>

                    <MDBTypography tag="h6">Information</MDBTypography>
                    <hr className="mt-0 mb-4" />
                    <MDBRow className="pt-1">
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Email</MDBTypography>
                        <MDBCardText className="text-muted">info@example.com</MDBCardText>
                        <MDBCol size="6" className="mb-3"/>
                        <MDBTypography tag="h6">Phone</MDBTypography>
                    <MDBCardText className="text-muted">123 456 789</MDBCardText>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCol>
          </MDBRow>
        </MDBCard>
      </MDBCol>
    </MDBRow>
  </MDBContainer>
</section>
  )
  };