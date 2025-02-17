import React, { useState, useEffect } from 'react';
import { Table, Container } from "react-bootstrap";
import '../App.css';
import axios from 'axios';
import { useStorage } from '../components/context/StorageProvider';

const URL_API = "http://localhost:5001/api"

function TotaisTransacoes(){
    const { user } = useStorage();
    const [totais, setTotais] = useState([]);
    const [totalGeral, setTotalGeral] = useState(null);

    useEffect(() => {
        axios.get(`${URL_API}/totais`, {  
          headers: {
          'Authorization': `Bearer ${user.token}`
        }})
        .then(response => {
            // console.log(response.data)
            setTotais(response.data.totais);
            setTotalGeral(response.data.totalGeral);
          })
          .catch(error => console.error("Erro ao buscar totais:", error));

      }
      , [totais]);
      

    return (
        <Container className="mt-5">
        <h4>Consulta de Totais</h4>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Pessoa</th>
            <th>Total de Receitas</th>
            <th>Total de Despesas</th>
            <th>Saldo</th>
          </tr>
        </thead>
        <tbody>
          {totais.map((pessoa) => (
            <tr key={pessoa.pessoaId}>
              <td>{pessoa.nomePessoa}</td>
              <td className="text-success">R$ {pessoa.totalReceitas}</td>
              <td className="text-danger">R$ {pessoa.totalDespesas}</td>
              <td className={pessoa.saldo >= 0 ? "text-success" : "text-danger"}>
                R$ {pessoa.saldo}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {totalGeral && (
        <div className="mt-4">
          <h4>Total Geral</h4>
          <p><strong>Receitas:</strong> R$ {totalGeral.totalReceitas}</p>
          <p><strong>Despesas:</strong> R$ {totalGeral.totalDespesas}</p>
          <p><strong>Saldo Líquido:</strong> <span className={totalGeral.saldoLiquido >= 0 ? "text-success" : "text-danger"}>
            R$ {totalGeral.saldoLiquido}
          </span></p>
        </div>
      )}
        </Container>
    );
  }
  
  export default TotaisTransacoes;
  