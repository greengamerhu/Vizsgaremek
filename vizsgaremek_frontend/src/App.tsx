

import './App.css'
import { Col, Container, Row } from 'react-bootstrap';
import NavbarComp from './components/navbar';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
    <>
        <NavbarComp/>

      <Container fluid   data-bs-theme="dark">

            <Row> 
              <Col md={8}> apad</Col>
              <Col md={4}>fasza</Col>
            </Row>
      </Container>
    </>
  )
}

export default App
