import React, { Component } from 'react'
import { Navbar, Nav, Form, Container, NavDropdown } from 'react-bootstrap'


export default class NavbarComponent extends Component {
  render() {
    return (
      <Navbar sticky="top" bg="dark" variant="dark" className='mb-3'>
        <Container>
          <Navbar.Brand href="/">BCamp</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <NavDropdown title="Akun" id="basic-nav-dropdown">
              <NavDropdown.Item href='/create-admin'>Tambah Admin</NavDropdown.Item>
              <NavDropdown.Item onClick={this.props.handleLogout}>Keluar</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form inline>
            <h5>Admin</h5>
          </Form>
        </Container>
      </Navbar>

    )
  }
}
