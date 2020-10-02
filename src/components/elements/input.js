import React, { Component } from 'react';
import { Form } from 'react-bootstrap';

class Input extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <Form.Control      
            readOnly={this.props.readOnly}        
            type={ this.props.type }
            name={ this.props.name }
            value={ this.props.value }
            onChange={ (el) => this.props.onChangeValue(el.target) }
          />
           
         );
    }
}
 
export default Input;