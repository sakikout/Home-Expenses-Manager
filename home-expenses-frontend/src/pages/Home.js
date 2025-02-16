import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStorage } from "../components/context/StorageProvider"
import { Container, Row, Col } from 'react-bootstrap';
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