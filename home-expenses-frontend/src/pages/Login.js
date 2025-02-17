import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStorage } from "../components/context/StorageProvider";
import { Col, Form, Row, Button, Container } from 'react-bootstrap';
import '../App.css';
import axios from 'axios';

const URL_API = "http://localhost:5001/api"

function Login(){
    const navigate = useNavigate();
    const { login } = useStorage();
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

  
    const handleSignIn = () => {
      console.log("Sign In!");
      navigate("signIn",  { replace: false });
    };

  
    const handleSubmit = (event) => {
      event.preventDefault();
      axios.post(`${URL_API}/auth/login`, {Email: email, Senha: senha})
      .then(response => {
        if(response.data.error !== true){
          console.log(response.data);
          var token = response.data['token'];
          login({email, token});
          navigate("home",  { replace: false });
        } else {
          window.alert("Verifique suas credenciais e tente novamente.");
        }
      })
      .catch(error => {
        console.error('Erro ao enviar dados:', error);
      });
    };
  
  
    return (
      <>
      <Container className="vh-100 d-flex align-items-center justify-content-center">
      <Row className="justify-content-md-center">
      <Form>
      <Row className="mb-3">
        <h2>Home Expenses Manager</h2>
      <Form.Group as={Col} controlId="formGridEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control 
          name = "email"
          type="email" 
          placeholder="exemplo@email.com" 
          onChange={(e => setEmail(e.target.value))}
          required/>
      </Form.Group>

      <Form.Group as={Col} controlId="formGridPassword">
        <Form.Label>Senha</Form.Label>
        <Form.Control 
          name = "senha"
          type="password" 
          placeholder="Digite sua senha." 
          onChange={(e => setSenha(e.target.value))}
          required/>
      </Form.Group>
    </Row>
    <div className="d-flex gap-2 mt-2 mb-3">
    <Button variant="primary" type="submit" onClick={handleSubmit}>
      Entrar
    </Button>
    <Button variant="outline-secondary" onClick={handleSignIn}>
      Cadastrar-se
    </Button>
    </div>
    </Form>
    </Row>
    </Container>
    </>
    );
  }
  
  export default Login;
  