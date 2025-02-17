import React, { useState, useEffect } from 'react';
import { FloatingLabel, Form, InputGroup, Button, Stack, Container } from 'react-bootstrap';
import '../App.css';
import axios from 'axios';
import TransacaoTile from '../components/TransacaoTile';
import { useStorage } from '../components/context/StorageProvider';

const URL_API = "http://localhost:5001/api"

function Transacoes(){
    const { user } = useStorage();
    const [ pessoas, setPessoas ] = useState([]);
    const [transacoes, setTransacoes] = useState([]);
    const [ hasClicked, setHasClicked] = useState(false);
    const [ pessoaSelecionada, setPessoaSelecionada ] = useState(" ");
  
    const [formData, setFormData] = useState({
      nome: 'Nome da transação',
      descricao: 'Insira uma descrição.',
      valor: 10,
      tipo: "Receita",
      pessoaId: 1
    });

    useEffect(() => {
        axios.get(`${URL_API}/pessoas`,{  
          headers: {
          'Authorization': `Bearer ${user.token}`
        }})
            .then(response => {
                setPessoas(response.data);
            })
            .catch(error => {
                console.error('Erro ao buscar pessoas:', error);
            });

        axios.get(`${URL_API}/transacoes`, {  
          headers: {
          'Authorization': `Bearer ${user.token}`
        }}) 
            .then(response => {
                setTransacoes(response.data);
            })
            .catch(error => {
                console.error('Erro ao buscar transacoes:', error);
            });

    }, []);
      
    const handleInputChange = (event) => {
        const { name } = event.target;
        const { value } = event.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
        
        if (name === "pessoaId") {
          const pessoa = pessoas.find(p => p.id === value);
          setPessoaSelecionada(pessoa ? pessoa.nome : " ");
        }
    };
  
    const clearForm = () => {
        setFormData({
        descricao: 'Insira uma descrição.',
        valor: 10,
        tipo: "Receita",
        pessoaId: 0
      });
    
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
  
      const data = {
        Nome: formData.nome,
        Descricao: formData.descricao,
        Valor: parseFloat(formData.valor),
        Tipo: formData.tipo,
        PessoaId: parseInt(formData.pessoaId),
        PessoaNome: pessoaSelecionada
        };

        console.log(data);
  
      axios.post(`${URL_API}/transacoes`, data, {
        headers: {
          'Authorization': `Bearer ${user.token}`,
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        console.log('Resposta do servidor:', response.data);
        window.alert("Transação Criada!");
        setHasClicked(false);
        clearForm();

        setTransacoes(prevTrans => [...prevTrans, response.data]);
      })
      .catch(error => {
        console.error('Erro ao enviar dados:', error);
      });

      console.log(transacoes);
    };

    const handleDelete = (id) => {
      setTransacoes(prevTrans => prevTrans.filter(p => p.id !== id));
    };

    const handleClose = () => {
      setHasClicked(false);
    }
  
    return (
      <Container className="mt-5">
        <div className='container-modal'>
            <h4>Transações Registradas</h4>
        <Stack gap={3}>
            { transacoes.length === 0 ?
                <span>Você não criou nenhuma transação ainda.</span>
            : transacoes.map((transacao) => (
                <TransacaoTile 
                    nome = {transacao.nome} 
                    descricao={transacao.descricao} 
                    valor={transacao.valor}
                    tipo={transacao.tipo}
                    pessoa={transacao.nomePessoa}
                    transacaoId={transacao.id}
                    onDelete={handleDelete}></TransacaoTile>
                ))
            }
        </Stack>
          <div className="d-flex gap-2 mt-2 mb-3">
            <Button 
                variant="primary" 
                type="submit"
                onClick = {() => setHasClicked(true)}>
            Criar Nova Transação
            </Button>
          </div>
            </div>
            { hasClicked === true ?
              <Form onSubmit={handleSubmit}>
                <InputGroup className="mb-3">
                    <Form.Control
                        name= 'nome'
                        placeholder="Nome da transação"
                        aria-label="Nome da transação"
                        aria-describedby="basic-addon2"
                        onChange={handleInputChange}
                        required
                    />
                </InputGroup>
                <InputGroup className="mb-3">
                    <Form.Control 
                    name = "descricao"
                    placeholder= 'Detalhes da Transação'
                    as="textarea" 
                    aria-label="Descrição"
                    onChange={handleInputChange}
                    required/>
                </InputGroup>
                <InputGroup className="mb-3">
                    <InputGroup.Text>R$</InputGroup.Text>
                    <Form.Control 
                        name = "valor"
                        aria-label="Amount" 
                        placeholder='Valor'
                        onChange={handleInputChange}
                        required/>
                </InputGroup>
                <div className="mb-3">
                  <FloatingLabel controlId="floatingSelectTipo" label="Tipo">
                    <Form.Select 
                    name = "tipo"
                    aria-label="Floating label select"
                    onChange={handleInputChange}
                    required>
                        <option>Selecione um tipo</option>
                        <option
                                value=  "Despesa"
                                >Despesa</option>
                        <option
                                value=  "Receita"
                                >Receita</option>
                    </Form.Select>
                </FloatingLabel>
                </div>
                <FloatingLabel controlId="floatingSelectPessoa" label="Pessoa">
                    <Form.Select 
                    name = "pessoaId"
                    aria-label="Floating label select"
                    onChange={handleInputChange}
                    required>
                        <option>Selecione uma pessoa</option>
                        { pessoas.map((pessoa) => (
                        <option name = "pessoaId"
                                key={pessoa.id} 
                                value={pessoa.id}>
                            {pessoa.nome}
                        </option>
                    ))}
                    </Form.Select>
                </FloatingLabel>
            <div className="d-flex gap-2 mt-2 mb-3">
            <Button variant="primary" type="submit">
                Criar Transação
            </Button>
            <Button variant="outline-secondary" onClick= {handleClose}>
              Fechar
            </Button>
            </div>
            </Form> 
            : " "}
  
      </Container>
    );
  }
  
  export default Transacoes;
  