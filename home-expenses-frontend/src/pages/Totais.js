import React, { useState, useEffect } from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import '../App.css';
import axios from 'axios';
import TransacaoTile from '../components/TransacaoTile';

const URL_API = "http://localhost:5001/api"

function TotaisTransacoes(){
    const [pessoas, setPessoas] = useState([]);
    const [transacoes, setTransacoes] = useState([]);

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
      

    return (
        <>
        
        </>
    );
  }
  
  export default TotaisTransacoes;
  