import React from 'react';
import './Dashboard.css'
import { Container } from 'react-bootstrap';
import LeftContainer from '../components/Dashboard/Left/LeftContainer'
import RightContainer from '../components/Dashboard/Right/RightContainer'

export default function Dashboard()  {
  
  return (
    <Container fluid className="d-flex flex-row p-0 justify-content-center" id="all-container">
      <LeftContainer />
      <RightContainer />
    </Container>
  )

};
