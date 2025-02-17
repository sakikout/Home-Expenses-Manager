import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Col, Form, Row, Button, Container } from 'react-bootstrap';
import '../App.css';
import axios from 'axios';

const URL_API = "http://localhost:5001/api" 

function SignIn(){
    const navigate = useNavigate();
  
    const [formSignIn, setFormSignIn] = useState({
      nome: 'John',
      sobrenome: 'Doe',
      email: 'exemplo@email.com', 
      senha: '1234',
    });
      
    const handleInputChange = (event) => {
      const { name } = event.target;
        const { value } = event.target;
        setFormSignIn((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      
    };
  
    const clearForm = () => {
      setFormSignIn({
        nome: 'John',
        sobrenome: 'Doe',
        email: 'exemplo@email.com', 
        senha: '1234', 
      });
    
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
  
      const data = {
        Nome: formSignIn.nome,
        Sobrenome: formSignIn.sobrenome,
        Email: formSignIn.email,
        Senha: formSignIn.senha

        }

      console.log(data);
  
      axios.post(`${URL_API}/auth/register`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        console.log('Resposta do servidor:', response.data);
        window.alert("Usuário Criado! Faça o login para entrar no sistema.");
        clearForm();
        navigate("/",  { replace: false });
      })
      .catch(error => {
        console.error('Erro ao enviar dados:', error);
      });
    };
  
    return (
      <Container className="vh-100 d-flex align-items-center justify-content-center">
      <Row className="justify-content-md-center">
      <Form>
        <Row className="mb-3">
        <h2>Home Expenses Manager</h2>
        <Form.Group as={Col} controlId="formGridName">
          <Form.Label>Nome</Form.Label>
          <Form.Control 
            name = "nome"
            placeholder="Digite seu nome." 
            onChange={handleInputChange}
            required/>
            <Form.Control.Feedback type="invalid">
              Não pode estar vazio.
            </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridLastName">
          <Form.Label>Sobrenome</Form.Label>
          <Form.Control 
            name = "sobrenome"
            placeholder="Digite seu sobrenome." 
            onChange={handleInputChange}
            required/>
            <Form.Control.Feedback type="invalid">
              Não pode estar vazio.
            </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control 
            name = "email"
            type="email" 
            placeholder="exemplo@email.com" 
            onChange={handleInputChange}
            required/>
            <Form.Control.Feedback type="invalid">
              Insira um e-mail válido.
            </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Senha</Form.Label>
          <Form.Control 
            name = "senha"
            type="password" 
            placeholder="Digite sua senha." 
            onChange={handleInputChange}
            required/>
            <Form.Control.Feedback type="invalid">
              Insira uma senha válida.
            </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <div className="d-flex gap-2 mt-2 mb-3">
      <Button variant="primary" type="submit" onClick={handleSubmit}>
        Cadastrar
      </Button>
      <Button variant="outline-secondary" type="button" onClick={() => navigate("/", { replace: false })}>
        Entrar
      </Button>
      </div>
      </Form>
      </Row>
    </Container>
    );
  }
  
  export default SignIn;
  