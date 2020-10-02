import React, { Component } from "react";
import { Form, Col, Card, Button } from "react-bootstrap";
import { Input } from "../components/elements";
import { connect } from "react-redux";
import { userSignUp } from "../actions/dataAction";
import { onRegis } from "../actions/navbarAction";

class RegisterPage extends Component {
  state = {
    id: "",
    email: "",
    username: "",
    password: "",
  };
  setInput = (el) => {
    this.setState({ [el.name]: el.value });
  };
  handleSignUp = () => {
    const { id, email, username, password } = this.state;
    this.props.dispatch(userSignUp(id, email, username, password));
  };
  componentDidMount() {
    this.props.dispatch(onRegis());
  }
  render() {
    return (
      <div
        className="d-flex justify-content-center"
        style={{ marginTop: "5%" }}
      >
        <Card className="text-center" style={{ width: "18rem" }}>
          <Card.Title className="mt-3">Register</Card.Title>
          <Card.Body>
            <Form>
              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Label>No. ID</Form.Label>
                  <Input
                    type="number"
                    name="id"
                    value={this.state.id}
                    setValue={(el) => this.setInput(el)}
                  />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Label>Email</Form.Label>
                  <Input
                    type="email"
                    name="email"
                    value={this.state.email}
                    setValue={(el) => this.setInput(el)}
                  />
                </Form.Group>
              </Form.Row>
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
                onClick={this.handleSignUp}
              >
                Register
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    );
  }
}


export default connect()(RegisterPage)