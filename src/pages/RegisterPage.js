import React, { Component } from "react";
import { RowInput } from "../components/elements";
import { Form, Col, Button, Card } from "react-bootstrap";

export default class RegisterPage extends Component {
    initialState = {
        nik: "",
        username: "",
        password: "",
    }
    constructor(props) {
        super(props);
        this.state = this.initialState
    }
    setValueInput = (el) => {
        this.setState({
            [el.name]: el.value,
        });
    };

    handleRegister = () => {
        const { username, password, nik } = this.state;
        if (username === "" || password === "" || nik === "") {
            alert("Isi lengkap data!");
            return;
        }
        let data = [];
        if (localStorage.reactUser) {
            data = JSON.parse(localStorage.reactUser);
        }
        for (let i = 0; i < data.length; i++) {
            let cek = data[i]
            if (cek.nik === nik || cek.username === username) {
                return alert('nik/username telah terdaftar.')
            }
        }
        const userData = JSON.parse(localStorage.reactData)
        userData.forEach(item => {
            if (item.nik === nik) {
                const user = { username, password, nik }
                data.push(user)
                localStorage.reactUser = JSON.stringify(data)
                this.setState(this.initialState)
                return
            }
        });
    }

    render() {
        return (
            <div
                className="d-flex justify-content-center"
                style={{ marginTop: "10%" }}
            >
                <Card className="text-center" style={{ width: "18rem" }}>
                    <Card.Title className="mt-3">Register</Card.Title>
                    <Card.Body>
                        <Form>
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <Form.Label>NIK</Form.Label>
                                    <RowInput
                                        type="number"
                                        name="nik"
                                        value={this.state.nik}
                                        setValue={(el) => this.setValueInput(el)}
                                    />
                                </Form.Group>
                            </Form.Row>
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
                                onClick={this.handleRegister}
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
