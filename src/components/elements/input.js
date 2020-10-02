import React, { Component } from 'react';
import { Form } from 'react-bootstrap';

class Input extends Component {
    render() { 
        return ( 
            <Form.Control      
            as={ this.props.as }        
            type={ this.props.type }
            name={ this.props.name }
            value={ this.props.value }
            onChange={ (el) => this.props.setValue(el.target) }
          />
           
         );
    }
}
 
export default Input;