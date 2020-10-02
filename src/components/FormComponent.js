import React, { Component } from "react";
import { Card, Form, Col, Row, Button } from "react-bootstrap";
import { Input } from "./elements";
import { connect } from "react-redux";
import { userInput, userUpdate } from "../actions/dataAction";

class FormComponent extends Component {
  state = {
    id: '',
    nama: '',
    motto: '',
    gitUrl: '',
  }
  setInput = (el) => {
    this.setState({ [el.name]: el.value });
  };

  submitData = () => {
    const { id, nama, motto, gitUrl, photoUrl } = this.state;
    if (id === '' || nama === '' || motto === '' || gitUrl === '' || photoUrl === '') {
      alert('Isi lengkap data');
      return;
    }
    let doThing = userInput;
    if (this.props.editUser) {
      doThing = userUpdate
    }
    this.props.dispatch(doThing(id, nama, motto, gitUrl, photoUrl));
    this.setState({ id: '', nama: '', motto: '', gitUrl: '', photoUrl: '' })
    document.getElementById('formData').reset()
  }
  deleteData = () => {
    const { id } = this.state;
    this.props.dispatch(userUpdate(id))
  }
  componentDidMount() {
    const member = this.props.member
    this.setState(member)
  }
  render() {
    console.log(this.props);
    return (
      <div>
        <Card>
          <Card.Body>

            <Form id="formData">
              {/* {this.props.editUSer ? ( */}
                <Form.Group as={Row}>
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
                      readOnly={this.props.editUser}
                    />
                  </Col>
                </Form.Group>
                {/* ) : null} */}
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
                  Photo URL
                </Form.Label>
                <Col sm={10}>
                  <Input
                    type="text"
                    name="photoUrl"
                    value={this.state.photoUrl}
                    setValue={(el) => this.setInput(el)}
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
