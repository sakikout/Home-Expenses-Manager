import React from 'react';
import { useStorage } from "../components/context/StorageProvider"
import { Container, Navbar, Button } from 'react-bootstrap';

function CustomNavBar(){
    const { logout } = useStorage();

    return (
    <Navbar className="bg-body-tertiary">
      <Container>
        <Navbar.Brand>Home Expenses Manager</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
          <Button variant="outline-danger" onClick={logout}>
            Sair
            </Button>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    );

}

export default CustomNavBar;