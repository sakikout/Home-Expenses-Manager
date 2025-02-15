import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import { useStorage } from "../components/context/StorageProvider"
import '../App.css';
import axios from 'axios';
import PessoaTile from '../components/PessoaTile';

const URL_API = "http://localhost:5001/api"

function Pessoas(){
    const { login } = useStorage();
    const [pessoas, setPessoas] = useState([]);
    const { hasClicked, setHasClicked } = useState(false);
  
    const [formPessoa, setFormPessoa] = useState({
    id: 0,
      nome: 'John',
      idade: 10,
    });

    
    useEffect(() => {
        axios.get(`${URL_API}/pessoas`)
            .then(response => {
                setPessoas(response.data);
            })
            .catch(error => {
                console.error('Erro ao buscar pessoas:', error);
            });
    }, []);
      
    const handleInputChange = (event) => {
      const { name } = event.target;
        const { value } = event.target;
        setFormPessoa((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      
    };
  
    const clearForm = () => {
        setFormPessoa({
        id: 0,
        nome: 'John',
        idade: 10
      });
    
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
  
        const data = {
            Id: formPessoa.id,
            Nome: formPessoa.nome,
            Idade: parseInt(formPessoa.idade),
            UsuarioId: login
        }
  
      axios.post(`${URL_API}/pessoas`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(response => {
        console.log('Resposta do servidor:', response.data);
        window.alert("Pessoa Criada!");
        clearForm();
        setHasClicked(false);
      })
      .catch(error => {
        console.error('Erro ao enviar dados:', error);
      });
    };
  
    return (
      <div className="main">
            <div className='container-modal'>
                <div className="text-modal">Pessoas Disponíveis</div>
            <Stack gap={3}>
            { pessoas.length === 0 ?
                <span>Você não criou nenhuma pessoa ainda.</span>
            : pessoas.map((pessoa) => (
                <PessoaTile 
                    nome={pessoa.Nome} 
                    idade={pessoa.Idade}
                    pessoaId = {pessoa.Id}></PessoaTile>
                ))
            }
             </Stack>
            <Button 
                variant="primary" 
                type="submit"
                onClick = {setHasClicked(true)}>
            Criar Pessoa
            </Button>
            </div>
            { hasClicked === true ?
              <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridId">
                    <Form.Label>ID</Form.Label>
                    <Form.Control 
                        value={formPessoa.id}
                        onChange={handleInputChange}
                        required/>
                </Form.Group>
                <Form.Group as={Col} controlId="formGridNome">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control 
                        value={formPessoa.nome}
                        onChange={handleInputChange}
                        required/>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridIdade">
                    <Form.Label>Idade</Form.Label>
                    <Form.Control 
                        value={formPessoa.idade} 
                        onChange={handleInputChange}
                        required/>
                </Form.Group>
                </Row>
            <Button variant="primary" type="submit">
                Criar Pessoa
            </Button>
            </Form> 
            : ' '}
  
      </div>
    );
  }
  
  export default Pessoas;