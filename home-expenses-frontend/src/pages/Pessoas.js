import React, { useState, useEffect } from 'react';
import { Form, Col, Row, Button, Stack, Container} from 'react-bootstrap';
import { useStorage } from "../components/context/StorageProvider"
import '../App.css';
import axios from 'axios';
import PessoaTile from '../components/PessoaTile';

const URL_API = "http://localhost:5001/api"

function Pessoas(){
    const { user } = useStorage();
    const [pessoas, setPessoas] = useState([]);
    const [ hasClicked, setHasClicked ] = useState(false);
  
    const [formPessoa, setFormPessoa] = useState({
      id: 0,
      nome: 'John',
      idade: 10,
    });

    
    useEffect(() => {
        axios.get(`${URL_API}/pessoas`, {  
          headers: {
          'Authorization': `Bearer ${user.token}`
        }})
            .then(response => {
                setPessoas(response.data);
            })
            .catch(error => {
                console.error('Erro ao buscar pessoas:', error);
            });

          console.log(user.token);
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
            UsuarioId: user.email
        }
      
      console.log(data);
      console.log(user.token);
  
      axios.post(`${URL_API}/pessoas`, data, {
        headers: {
          'Authorization': `Bearer ${user.token}`,
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        console.log('Resposta do servidor:', response.data);
        window.alert("Pessoa Criada!");
        clearForm();
        setHasClicked(false);

        setPessoas(prevPessoas => [...prevPessoas, response.data]);
      })
      .catch(error => {
        console.error('Erro ao enviar dados:', error);
      });

      console.log(pessoas);
    };

    const handleDelete = (id) => {
      setPessoas(prevPessoas => prevPessoas.filter(p => p.id !== id));
    };

    const handleClose = () => {
      setHasClicked(false);
    }
  
    return (
      <Container className="mt-5">
            <div className='container-modal'>
                <h4>Pessoas Disponíveis</h4>
            <Stack gap={3}>
            { pessoas.length === 0 ?
                <span>Você não criou nenhuma pessoa ainda.</span>
            : pessoas.map((pessoa) => (
                <PessoaTile 
                    nome ={pessoa.nome} 
                    idade ={pessoa.idade}
                    pessoaId= {pessoa.id}
                    onDelete = {handleDelete}>
                    </PessoaTile>
                ))
            }
             </Stack>
             <div className="d-flex gap-2 mt-2 mb-3">
            <Button 
                variant="primary" 
                type="submit"
                onClick = {() => setHasClicked(true)}>
            Criar Pessoa
            </Button>
            </div>
            </div>
            { hasClicked === true ?
              <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridId">
                    <Form.Label>ID</Form.Label>
                    <Form.Control 
                        name = "id"
                        value={formPessoa.id}
                        onChange={handleInputChange}
                        required/>
                <Form.Control.Feedback type="invalid">
                  A pessoa precisa ter um id.
                </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} controlId="formGridNome">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control 
                        name = "nome"
                        value={formPessoa.nome}
                        onChange={handleInputChange}
                        required/>
                 <Form.Control.Feedback type="invalid">
                  É preciso ter um nome.
                </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridIdade">
                    <Form.Label>Idade</Form.Label>
                    <Form.Control 
                        name = "idade"
                        value={formPessoa.idade} 
                        onChange={handleInputChange}
                        required/>
                <Form.Control.Feedback type="invalid">
                  Informe a idade.
                </Form.Control.Feedback>
                </Form.Group>
                </Row>
            <div className="d-flex gap-2 mt-2 mb-3">
            <Button variant="primary" type="submit">
                Criar Pessoa
            </Button>
            <Button variant="outline-secondary" onClick= {handleClose}>
                Fechar
            </Button>
            </div>
            </Form> 
            : ' '}
  
      </Container>
    );
  }
  
  export default Pessoas;