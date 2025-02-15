import React from 'react';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import axios from 'axios';
import '../App.css';


const URL_API = "http://localhost:5001/api" 

function PessoaTile(nome, idade, pessoaId){

    const handleDelete = () => {
        console.log("Delete button was clicked!");
        axios.delete(`${URL_API}/pessoas/${pessoaId}`)
          .then(response => {
            console.log('Resposta do servidor:', response.data);
            window.alert("Pessoa Deletada!");
          })
          .catch(error => {
            console.error('Erro ao deletar pessoa:', error);
          });
      };

    return (
        <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>{nome}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{idade}</Card.Subtitle>
        </Card.Body>
        <Badge bg="danger" pill onClick={handleDelete}>
            Deletar
        </Badge>
      </Card>
    );

}

export default PessoaTile;