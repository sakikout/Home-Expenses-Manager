import React from 'react';
import { useStorage } from "../components/context/StorageProvider"
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function CustomNavBar(){
    const { logout } = useStorage();

    return (
    <Navbar className="bg-body-tertiary">
      <Container>
        <Navbar.Brand>Home Expenses Manager</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
          <span onClick={logout}>
            Sair
            </span>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    );

}

export default CustomNavBar;