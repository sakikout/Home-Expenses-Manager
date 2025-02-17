import React from 'react';
import { Card, Badge} from 'react-bootstrap';
import axios from 'axios';
import '../App.css';
import { useStorage } from './context/StorageProvider';


const URL_API = "http://localhost:5001/api" 

function PessoaTile(props){
    const { nome, idade, pessoaId, onDelete } = props;
    const { user } = useStorage();

    const handleDelete = () => {
        console.log("Delete button was clicked!");
        axios.delete(`${URL_API}/pessoas/${pessoaId}`,
          {
            headers: {
              'Authorization': `Bearer ${user.token}`,
              'Content-Type': 'application/json',
            },
          }
        )
          .then(response => {
            console.log('Resposta do servidor:', response.data);
            window.alert("Pessoa Deletada!");
            onDelete(pessoaId);
          })
          .catch(error => {
            console.error('Erro ao deletar pessoa:', error);
          });
      };

    return (
        <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>{pessoaId}: {nome}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{idade}</Card.Subtitle>
        </Card.Body>
        <Badge bg="danger" pill 
              style={{ cursor: "pointer"}}
              onClick={handleDelete}>
            Deletar
        </Badge>
      </Card>
    );

}

export default PessoaTile;