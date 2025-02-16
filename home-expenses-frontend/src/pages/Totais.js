import React, { useState, useEffect } from 'react';
import { Table, Container } from "react-bootstrap";
import '../App.css';
import axios from 'axios';

const URL_API = "http://localhost:5001/api"

function TotaisTransacoes(){
    const [totais, setTotais] = useState([]);
    const [totalGeral, setTotalGeral] = useState(null);

    useEffect(() => {
        axios.get(`${URL_API}/totais`)
        .then(response => {
            setTotais(response.data.totais);
            setTotalGeral(response.data.totalGeral);
          })
          .catch(error => console.error("Erro ao buscar totais:", error));
      }, []);
      

    return (
        <Container className="mt-5">
        <h2>Consulta de Totais</h2>
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
            <tr key={pessoa.PessoaId}>
              <td>{pessoa.NomePessoa}</td>
              <td className="text-success">R$ {pessoa.TotalReceitas.toFixed(2)}</td>
              <td className="text-danger">R$ {pessoa.TotalDespesas.toFixed(2)}</td>
              <td className={pessoa.Saldo >= 0 ? "text-success" : "text-danger"}>
                R$ {pessoa.Saldo.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {totalGeral && (
        <div className="mt-4">
          <h4>Total Geral</h4>
          <p><strong>Receitas:</strong> R$ {totalGeral.TotalReceitas.toFixed(2)}</p>
          <p><strong>Despesas:</strong> R$ {totalGeral.TotalDespesas.toFixed(2)}</p>
          <p><strong>Saldo Líquido:</strong> <span className={totalGeral.SaldoLiquido >= 0 ? "text-success" : "text-danger"}>
            R$ {totalGeral.SaldoLiquido.toFixed(2)}
          </span></p>
        </div>
      )}
        </Container>
    );
  }
  
  export default TotaisTransacoes;
  