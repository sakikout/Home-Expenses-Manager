import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import '../App.css';
import axios from 'axios';
import logo from "../img/logo.png"

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
  
      axios.post(`${URL_API}/auth/register`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(response => {
        console.log('Resposta do servidor:', response.data);
        window.alert("Usuário Criado!");
        clearForm();
      })
      .catch(error => {
        console.error('Erro ao enviar dados:', error);
      });
    };
  
    return (
      <Form>
        <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridName">
          <Form.Label>Nome</Form.Label>
          <Form.Control 
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
            type="password" 
            placeholder="Digite sua senha." 
            onChange={handleInputChange}
            required/>
            <Form.Control.Feedback type="invalid">
              Insira uma senha válida.
            </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Button variant="primary" type="submit" onClick={handleSubmit}>
        Cadastrar
      </Button>
    </Form>
    );
  }
  
  export default SignIn;
  