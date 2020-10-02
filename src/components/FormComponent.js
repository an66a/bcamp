import React, { Component } from "react";
import { RowInput } from "./elements";
import { Col, Form, Button, Card } from "react-bootstrap";

export default class FormComponent extends Component {
  initialState = {
    nik: "",
    nama: "",
    jenis_kelamin: "",
    alamat: "",
    kecamatan: "",
    kabupaten: "",
    agama: "",
    email: "",
    kontak: "",
    divisi: ""
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

  inputData = () => {
    const { nik, nama, jenis_kelamin, alamat, kecamatan, kabupaten, email, kontak, divisi } = this.state;
    let data = [];
    if (localStorage.reactData) {
      data = JSON.parse(localStorage.reactData);
    }
    for (let i = 0; i < data.length; i++) {
      let x = data[i]
      if (x.nik === nik) {
        if (this.props.update) {
          data.splice(i, 1)
        } else {
          return alert('nik tidak tersedia.')
        }
      }
    }
    const user = { nik, nama, jenis_kelamin, alamat, kecamatan, kabupaten, email, kontak, divisi };
    data.push(user);
    localStorage.reactData = JSON.stringify(data)
    alert("Sukses")
    this.setState(this.initialState)
    window.location.href='/'
  };
  componentDidMount() {
    this.setState(this.props.data)
  }
  render() {
    // console.log(this.props.data);
    return (
      <div className="d-flex justify-content-center">
        <Card style={{ width: "100%" }}>
          <Card.Title className="ml-3 mt-3">{this.props.title}</Card.Title>
          <Card.Body>
            <Form id="formData">
              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Label>NIK</Form.Label>
                  <RowInput
                    type="number"
                    name="nik"
                    value={this.state.nik}
                    setValue={(el) => this.setValueInput(el)}
                    required
                    readOnly={this.props.update}
                  />
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Nama</Form.Label>
                  <RowInput
                    type="text"
                    name="nama"
                    value={this.state.nama}
                    setValue={(el) => this.setValueInput(el)}
                  />
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Jenis Kelamin</Form.Label>
                  <Form.Control value={this.state.jenis_kelamin} onChange={e => this.setState({ jenis_kelamin: e.target.value })} as="select">
                    <option disabled selected>---</option>
                    <option>Laki-laki</option>
                    <option>Perempuan</option>
                  </Form.Control>
                </Form.Group>
              </Form.Row>

              <Form.Group>
                <Form.Label>Alamat</Form.Label>
                <RowInput
                  type="text"
                  name="alamat"
                  value={this.state.alamat}
                  setValue={(el) => this.setValueInput(el)}
                />
              </Form.Group>

              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Label>Kecamatan</Form.Label>
                  <RowInput
                    type="text"
                    name="kecamatan"
                    required
                    value={this.state.kecamatan}
                    setValue={(el) => this.setValueInput(el)}
                  />
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Kabupaten</Form.Label>
                  <RowInput
                    type="text"
                    name="kabupaten"
                    value={this.state.kabupaten}
                    required
                    setValue={(el) => this.setValueInput(el)}
                  />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Label>Kontak</Form.Label>
                  <RowInput
                    type="number"
                    name="kontak"
                    value={this.state.kontak}
                    setValue={(el) => this.setValueInput(el)}
                  />
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Email</Form.Label>
                  <RowInput
                    type="email"
                    name="email"
                    value={this.state.email}
                    autoComplete="off"
                    required
                    setValue={(el) => this.setValueInput(el)}
                  />
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
