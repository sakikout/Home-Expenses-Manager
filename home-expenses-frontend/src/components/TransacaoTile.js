import React from 'react';
import { Card, Badge, ListGroup} from 'react-bootstrap';
import axios from 'axios';
import '../App.css';

const URL_API = "http://localhost:5001/api"

function TransacaoTile(nome, descricao, valor, tipo, pessoaNome, transacaoId){

    const handleDelete = () => {
        console.log("Delete button was clicked!");
        axios.delete(`${URL_API}/transacoes/${transacaoId}`)
          .then(response => {
            console.log('Resposta do servidor:', response.data);
            window.alert("Transação Deletada!");
          })
          .catch(error => {
            console.error('Erro ao deletar transação:', error);
          });
      };

    return (
        <>
        {
            tipo === "Receita" ?
        <Card border="success" style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title>{nome}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">{tipo}</Card.Subtitle>
              <Card.Text>
                {descricao}
              </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
            <ListGroup.Item>{pessoaNome}</ListGroup.Item>
            <ListGroup.Item>R${valor}</ListGroup.Item>
          </ListGroup>
          <Badge bg="danger" pill onClick={handleDelete}>
            Deletar
            </Badge>
          </Card>
            : 

        <Card border="danger" style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>{nome}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{tipo}</Card.Subtitle>
          <Card.Text>
            {descricao}
          </Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
        <ListGroup.Item>{pessoaNome}</ListGroup.Item>
        <ListGroup.Item>R${valor}</ListGroup.Item>
      </ListGroup>
        <Badge bg="danger" pill onClick={handleDelete}>
            Deletar
        </Badge>
      </Card>
        }
        
      </>
    );

}

export default TransacaoTile;