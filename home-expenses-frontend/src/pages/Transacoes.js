import React, { useState, useEffect } from 'react';
import { FloatingLabel, Form, InputGroup, Button, Stack } from 'react-bootstrap';
import '../App.css';
import axios from 'axios';
import TransacaoTile from '../components/TransacaoTile';

const URL_API = "http://localhost:5001/api"

function Transacoes(){
    const [pessoas, setPessoas] = useState([]);
    const [transacoes, setTransacoes] = useState([]);
    const { hasClicked, setHasClicked } = useState(false);
  
    const [formData, setFormData] = useState({
      descricao: 'Insira uma descrição.',
      valor: 10,
      tipo: "Receita",
      pessoaId: 1
    });

    useEffect(() => {
        axios.get(`${URL_API}/pessoas`)
            .then(response => {
                setPessoas(response.data);
            })
            .catch(error => {
                console.error('Erro ao buscar pessoas:', error);
            });

        axios.get(`${URL_API}/transacoes`)
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
      
    };
  
    const clearForm = () => {
        setFormData({
        descricao: 'Insira uma descrição.',
        valor: 10,
        tipo: "Receita",
        pessoaId: 1
      });
    
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
  
      const data = {
        Descricao: formData.descricao,
        Valor: parseFloat(formData.valor),
        Tipo: formData.tipo,
        PessoaId: parseInt(formData.pessoaId)
        };
  
      axios.post(`${URL_API}/transacoes`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(response => {
        console.log('Resposta do servidor:', response.data);
        window.alert("Transação Criada!");
        setHasClicked(false);
        clearForm();
      })
      .catch(error => {
        console.error('Erro ao enviar dados:', error);
      });
    };
  
    return (
      <div className="main">
        <div className='container-modal'>
            <div className="text-modal">Transações Registradas</div>
        <Stack gap={3}>
            { transacoes.length === 0 ?
                <span>Você não criou nenhuma transação ainda.</span>
            : transacoes.map((transacao) => (
                <TransacaoTile 
                    nome = {transacao.Nome} 
                    descricao={transacao.Descricao} 
                    valor={transacao.Valor}
                    tipo={transacao.Tipo}
                    pessoa={transacao.NomePessoa}
                    transacaoId={transacao.Id}></TransacaoTile>
                ))
            }
        </Stack>
            <Button 
                variant="primary" 
                type="submit"
                onClick = {setHasClicked(true)}>
            Criar Nova Transação
            </Button>
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
                    />
                </InputGroup>
                <InputGroup>
                    <Form.Control 
                    name = "descricao"
                    as="textarea" 
                    aria-label="Descrição"
                    onChange={handleInputChange}/>
                </InputGroup>
                <InputGroup className="mb-3">
                    <InputGroup.Text>R$</InputGroup.Text>
                    <Form.Control 
                        name = "valor"
                        aria-label="Amount" 
                        placeholder='Valor'
                        onChange={handleInputChange}/>
                </InputGroup>
                  <FloatingLabel controlId="floatingSelectTipo" label="Tipo">
                    <Form.Select aria-label="Floating label select">
                        <option>Selecione um tipo</option>
                        <option name = "tipo"
                                value="Despesa" 
                                onClick={handleInputChange}>Despesa</option>
                        <option name = "tipo"
                                value="Receita" 
                                onClick={handleInputChange}>Receita</option>
                    </Form.Select>
                </FloatingLabel>
                <FloatingLabel controlId="floatingSelectPessoa" label="Pessoa">
                    <Form.Select aria-label="Floating label select">
                        <option>Selecione uma pessoa</option>
                        { pessoas.map((pessoa) => (
                        <option name = "pessoaId"
                                key={pessoa.id} 
                                value={pessoa.id}
                                onClick={handleInputChange}>
                            {pessoa.nome}
                        </option>
                    ))}
                    </Form.Select>
                </FloatingLabel>

            <Button variant="primary" type="submit">
                Criar Transação
            </Button>
            </Form> 
            : " "}
  
      </div>
    );
  }
  
  export default Transacoes;
  