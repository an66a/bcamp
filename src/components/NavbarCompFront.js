import React, { Component } from 'react'
import { NavDropdown, Form, Nav, Container, Navbar } from 'react-bootstrap'

export default class NavbarCompFront extends Component {
  state = {
    member: false
  }
  handleLogout = () => {
    this.setState({ member: false })
    window.location.href = '/login'
    localStorage.removeItem('reactUserStamp')
  }
  sessionCheck = () => {
    if (localStorage.reactUserStamp != null) {
 
      this.setState({ member: true })
    } else {
      // window.location.href = '/login'
    }
  }
  componentDidMount() {
    this.sessionCheck();
  }
  render() {
    return (
      <Navbar sticky="top" bg="dark" variant="dark" className='mb-3'>
        <Container>
          <Navbar.Brand href="/">BCamp</Navbar.Brand>
          {this.state.member ? (
            <Nav className="mr-auto">
              {/* <Nav.Link href="/member">Profil</Nav.Link> */}
              <NavDropdown title="Akun">
                <NavDropdown.Item onClick={this.handleLogout}>Keluar</NavDropdown.Item>
              </NavDropdown>
            </Nav>

          ) : (
              <Nav>
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link href="/register">Register</Nav.Link>
              </Nav>
            )}
        </Container>
      </Navbar>
    )
  }
}
