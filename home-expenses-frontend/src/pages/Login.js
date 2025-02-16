import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStorage } from "../components/context/StorageProvider";
import { Col, Form, Row, Button } from 'react-bootstrap';
import '../App.css';
import axios from 'axios';

const URL_API = "http://localhost:5001/api"

function Login({navigation}){
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
          login({email})
          console.log(response.data)
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
      <Form>
      <Row className="mb-3">
      <Form.Group as={Col} controlId="formGridEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control 
          type="email" 
          placeholder="exemplo@email.com" 
          onChange={(e => setEmail(e.target.value))}
          required/>
      </Form.Group>

      <Form.Group as={Col} controlId="formGridPassword">
        <Form.Label>Senha</Form.Label>
        <Form.Control 
          type="password" 
          placeholder="Digite sua senha." 
          onChange={(e => setSenha(e.target.value))}
          required/>
      </Form.Group>
    </Row>
    <Button variant="primary" type="submit" onClick={handleSubmit}>
      Entrar
    </Button>
    <Button variant="secondary" onClick={handleSignIn}>
      Cadastrar-se
    </Button>
    </Form>
    </>
    );
  }
  
  export default Login;
  