import React, { Component } from "react";
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { BrowserRouter as Router, NavLink, Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { userLogout, stateCheck } from '../actions/dataAction';

class NavbarComp extends Component {

  componentDidMount() {
    // this.props.userState();
    this.props.stateCheck();
  }

  render() {
    const isLogin = this.props.isLogin;
    const isAdmin = this.props.isAdmin;
    const isMember = this.props.isMember;

    let toAdmin;
    let toLogin;
    let toMember;

    if (isLogin) {
      if (isAdmin) {
        toAdmin = <Redirect to="/" />;
      } else {
        toMember = <Redirect to='/member' />;
      }
    } else {
      toLogin = <Redirect to="/login" />;
    }
    return (
      <div className="mb-3">
        {toLogin}{toAdmin}{toMember}
        <Navbar
          sticky="top"
          collapseOnSelect
          expand="lg"
          bg="dark"
          variant="dark"
        >
          <Container>
            <Navbar.Brand>BCamp</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto">
                {isAdmin ? (
                  <Nav.Link as={Link} to='/'>
                    Home
                  </Nav.Link>
                ) : null}
                {isAdmin ? (
                  <Nav.Link as={Link} to='/input'>
                    Input
                  </Nav.Link>
                ) : null}
              </Nav>

              {this.props.isLogout ?
                <Nav>
                  {this.props.onRegis ?
                    <Nav.Link as={Link} to='/login' >
                      Login
                  </Nav.Link> : null}
                  {this.props.onLogin ?
                    <Nav.Link as={Link} to='/register' >
                      Register
                  </Nav.Link> : null}

                </Nav> : null}

              {isLogin ? (
                <Nav>
                  <NavDropdown title="Akun" id="collasible-nav-dropdown">
                    <NavDropdown.Item
                      onClick={this.props.userLogout}                    >
                      Keluar
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              ) : null}

            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>

    );


  }
}

const mapStateToProps = (state) => {
  return {
    isLogin: state.data.isLogin,
    isAdmin: state.data.isAdmin,
    isSiswa: state.data.isSiswa,
    isLogout: state.data.isLogout,
    onLogin: state.navbar.onLogin,
    onRegis: state.navbar.onRegis,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {

    userLogout: () => dispatch(userLogout()),
    stateCheck: () => dispatch(stateCheck()),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(NavbarComp);
