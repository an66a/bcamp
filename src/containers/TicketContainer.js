import React, { Component } from "react";
import TicketComponent from "../components/TicketComponent";
import { Container } from "reactstrap";
// import firebase from 'firebase/app';
// import 'firebase/auth';

class TicketContainer extends Component {
 
  componentDidMount(){
    this.props.stateChanged()
  }
  render() {
    return (
      <Container>
        <TicketComponent />
      </Container>
    );
  }
}
export default TicketContainer;

