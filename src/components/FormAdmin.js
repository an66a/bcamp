import React, { Component } from "react";
import { RowInput } from "./elements"
import { Col, Form, Button, Card } from "react-bootstrap";
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';


export default class FormAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            email: "",
            password: "",
        };
    }
    setValueInput = (el) => {
        this.setState({
            [el.name]: el.value,
        });
    };

    inputData = () => {
        const { username, email, password } = this.state

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(data => {
                // console.log(data)
                firebase.database().ref('react/users/admin/' + username).set({ email, username })
                .then(data => {
                    if(data !== null){
                      window.location.reload();
                      alert('Input sukses!');
                    }
                  })
            })
            .catch(err => {
                switch (err.code) {
                    case 'auth/invalid-email':
                        alert('Format email salah!');
                        break;
                    case 'auth/weak password':
                        alert('Password terlalu lemah!');
                        break;
                    case 'auth/email-already-in-use':
                        alert('Email sudah terdaftar');
                        break;
                        default:
                }
            })
    }
    render() {
        return (


            <div className='d-flex justify-content-center'>

                <Card style={{ width: '50%' }}>
                    <Card.Title className='ml-3 mt-3'>Input Data Admin</Card.Title>
                    <Card.Body>
                        <Form>

                            <Form.Row>

                                <Form.Group as={Col}>
                                    <Form.Label>Username</Form.Label>
                                    <RowInput type="text"
                                        name="username"
                                        value={this.state.username}
                                        setValue={(el) => this.setValueInput(el)} />
                                </Form.Group>

                            </Form.Row>


                            <Form.Row>

                                <Form.Group as={Col}>
                                    <Form.Label>Email</Form.Label>
                                    <RowInput type="email"
                                        name="email"
                                        value={this.state.email}
                                        autoComplete="off"
                                        setValue={(el) => this.setValueInput(el)} />
                                </Form.Group>

                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <Form.Label>Passsword</Form.Label>
                                    <RowInput type="password"
                                        name="password"
                                        value={this.state.password}
                                        autoComplete="off"
                                        setValue={(el) => this.setValueInput(el)} />
                                </Form.Group>

                            </Form.Row>
                            <Button variant="primary" onClick={this.inputData}>
                                Submit
        </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}
