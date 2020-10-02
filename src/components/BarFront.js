import React, { Component } from 'react'
import { NavDropdown, Form, Nav, Container, Navbar } from 'react-bootstrap'

export default class BarFront extends Component {

    render() {
        return (
            <Navbar sticky="top" bg="dark" variant="dark" className='mb-3'>
                <Container>
                    <Navbar.Brand href="/">BCamp</Navbar.Brand>
                    <Nav className="mr-auto">
                    </Nav>
                    <Nav>
                        <Nav.Link href="/login">Login</Nav.Link>
                        <Nav.Link href="/register">Register</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        )
    }
}
