import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStorage } from "../components/context/StorageProvider"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Pessoas from './Pessoas';
import Transacoes from './Transacoes';
import CustomNavBar from '../components/NavBar';

const Home = () => {
  const navigate = useNavigate();
  const { user } = useStorage();

    return (
      <>
      <CustomNavBar></CustomNavBar>
      <Container>
        { user ?
        <Row>
          <Col>
            <Pessoas></Pessoas>
          </Col>

          <Col>
            <Transacoes></Transacoes>
          </Col>

          <Col>
            
          </Col>
          </Row>
        : navigate("/")}
       </Container>
       </>
    );
  };
  
  export default Home;