import React, { Component } from "react";
import { Form, Col, Card, Button } from "react-bootstrap";
import { Input } from "../components/elements";
import { connect } from "react-redux";
import { userLogin } from "../actions/dataAction";
import { onLogin } from "../actions/navbarAction";

class LoginPage extends Component {
  state = {
    username: "",
    password: ""
  }

  setInput = (el) => {
    this.setState({ [el.name]: el.value });
  }
  handleLogin = () => {
    const { username, password } = this.state;

    this.props.userLogin(username, password)
   console.log(username);
  }
  componentDidMount() {
  
    this.props.onLogin();
 
  }

  render() {
    console.log(this.state);
    // console.log(this.props.acc);

    return (
      <div
        className="d-flex justify-content-center"
        style={{ marginTop: "10%" }}
      >
        <Card className="text-center" style={{ width: "18rem" }}>
          <Card.Title className="mt-3">Login</Card.Title>
          <Card.Body>
            <Form>
              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Label>Username</Form.Label>
                  <Input
                    type="text"
                    name="username"
                    value={this.state.username}
                    setValue={(el) => this.setInput(el)}
                  />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Label>Password</Form.Label>
                  <Input
                    type="password"
                    name="password"
                    value={this.state.password}
                    setValue={(el) => this.setInput(el)}
                  />
                </Form.Group>
              </Form.Row>
              <Button
                className="mr-2"
                variant="primary"
                onClick={this.handleLogin}
              >
                Login
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
   
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onLogin: () => dispatch(onLogin()),
    userLogin: (x,y) => dispatch(userLogin(x,y)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
