import React, { Component } from "react";
import { Form } from 'react-bootstrap';

class rowInput extends Component {
  render() {
    return (
      <div>
        <Form.Control
          readOnly={this.props.readOnly}
          type={this.props.type}
          name={this.props.name}
          value={this.props.value}
          onChange={ (el) => this.props.setValue(el.target) }
        />
      </div>
    );
  }
}
export default rowInput;
