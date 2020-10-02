import React, { Component } from "react";
import { RowInput } from "../components/elements";
import { Form, Col, Button, Card } from "react-bootstrap";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

export default class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
  }
  setValueInput = (el) => {
    this.setState({
      [el.name]: el.value,
    });
  };
  sessionCheckMember = () => {
    if (localStorage.reactUserStamp != null) {
      window.location.href = '/member'
      // this.setState({ member: true })
    } else {
      // window.location.href = '/login'
    }
  }
  auth = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        //login
        this.setState({ isLogin: true });
        window.location.href = "/";
      } else { 
      }
    });
  };
  handleLogin = () => {
    const { username, password } = this.state;
    if (username === "" || password === "") {
      alert("Masukan username dan password!");
      return;
    }
    firebase
      .database()
      .ref("react/users/admin/" + username)
      .once("value")
      .then((data) => {
        let userData = data.val();
        if (userData === null) return
        firebase
          .auth()
          .signInWithEmailAndPassword(userData.email, password)
          .catch((err) => {
            console.log(err.code);
            switch (err.code) {
              case "auth/user-not-found":
                alert("User tidak terdaftar!");
                break;
              case "auth/wrong-password":
                alert("Kata sandi/password yang anda masukan salah.");
                break;
              case "auth/invalid-email":
                alert("Format email salah!");
                break;
              case "auth/argument-error":
                alert("Masukan alamat email!");
                break;
              default:
            }
          });
      })

    let data = [];
    if (localStorage.reactUser) {
      data = JSON.parse(localStorage.reactUser);
    }
    for (let i = 0; i < data.length; i++) {
      let cek = data[i]
      if (cek.username === username && cek.password === password) {
        let reactUserStamp = []
        let user = { username, nik: cek.nik };
        reactUserStamp.push(user);
        localStorage.reactUserStamp = JSON.stringify(reactUserStamp);
        window.location.href = "/member";
        return
      }
    }
  }
  componentDidMount() {
    this.auth();
    this.sessionCheckMember();
  }
  render() {
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
                  <RowInput
                    type="text"
                    name="username"
                    value={this.state.username}
                    setValue={(el) => this.setValueInput(el)}
                  />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Label>Password</Form.Label>
                  <RowInput
                    type="password"
                    name="password"
                    value={this.state.password}
                    setValue={(el) => this.setValueInput(el)}
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
