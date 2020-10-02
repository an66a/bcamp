import React, { Component } from "react";
import { Card, Form, Col, Row, Button } from "react-bootstrap";
import { Input } from "./elements";
import app from 'firebase/app';
import 'firebase/storage';
import { connect } from "react-redux";
import { userInput, deleteUser } from "../actions/dataAction";

class FormComponent extends Component {
  state = {
    id: '',
    nama: '',
    motto: '',
    gitUrl: '',
    photoUrl: '',
    progress: 0,
  }
  setInput = (el) => {
    this.setState({ [el.name]: el.value });
  };
  uploadFile = (el) => {
    const file = el.files[0];
    const storage = app.storage();

    storage.ref('img/' + file.name).put(file).then(e => {
      e.ref.getDownloadURL().then(data => {
        console.log(data);
        this.setState({ photoUrl: data, progress: 100 })
      })
    })
  }

  submitData = () => {
    const { id, nama, motto, gitUrl, photoUrl } = this.state;
    if (id === '' || nama === '' || motto === '' || gitUrl === '' || photoUrl === '') {
      alert('Isi lengkap data');
      return;
    }
    let update = false;
    if (this.props.editUser) {
      update = true
    }
    this.props.dispatch(userInput(id, nama, motto, gitUrl, photoUrl, update));
    this.setState({ id: '', nama: '', motto: '', gitUrl: '', photoUrl: '', progress: 0 })
    document.getElementById('formData').reset()
  }
  deleteData = () => {
    const { id } = this.state;
    this.props.dispatch(deleteUser(id))
  }
  componentDidMount() {
    const member = this.props.member
    this.setState(member)
  }
  render() {
    console.log(this.state);
    return (
      <div>
        <Card>
          <Card.Body>
            <Form id="formData">
              {this.props.editUser ? (null) : (<Form.Group as={Row}>
                <Form.Label column sm={2}>
                  No. ID
                </Form.Label>
                <Col sm={10}>
                  <Input
                    type="number"
                    name="id"
                    value={this.state.id}
                    setValue={(el) => this.setInput(el)}
                    required
                  />
                </Col>
              </Form.Group>)}
              <Form.Group as={Row}>
                <Form.Label column sm={2}>
                  Nama
                </Form.Label>
                <Col sm={10}>
                  <Input
                    type="text"
                    name="nama"
                    value={this.state.nama}
                    setValue={(el) => this.setInput(el)}
                    required
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={2}>
                  Moto
                </Form.Label>
                <Col sm={10}>
                  <Input
                    as="textarea"
                    rows="4"
                    name="motto"
                    value={this.state.motto}
                    setValue={(el) => this.setInput(el)}
                    required
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={2}>
                  Git URL
                </Form.Label>
                <Col sm={10}>
                  <Input
                    type="text"
                    name="gitUrl"
                    value={this.state.gitUrl}
                    setValue={(el) => this.setInput(el)}
                    required
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={2}>
                  Foto
                </Form.Label>
                <Col sm={10}>
                  <progress value={this.state.progress} max='100' id='progress'></progress>
                  <Input
                    type="file"
                    name="photoUrl"
                    // value={this.state.photoUrl}
                    setValue={(el) => this.uploadFile(el)}
                    required
                  />
                </Col>
              </Form.Group>
            </Form>
          </Card.Body>
          <Col>
            <Row>
              <div className="ml-3 mb-3">
                <Button onClick={this.submitData}>Submit</Button>
              </div>
              <div className="ml-3 mb-3">
                <Button onClick={this.deleteData}>Delete</Button>
              </div>
            </Row>
          </Col>

        </Card>
      </div>
    );
  }
}


export default connect()(FormComponent);
