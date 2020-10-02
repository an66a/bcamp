import React, { Component } from "react";
import TableComponent from "../components/TableComponent";
import { connect } from "react-redux";
import { getUsersList } from "../actions/dataAction";
import InputComponent from "../components/InputComponent";
import { Col, Row, Container } from "reactstrap";



class HomeContainer extends Component {

  componentDidMount() {
    this.props.dispatch(getUsersList());
    this.props.stateChanged();
  }

  render() {
    return (
      <div>
        <Container>
          <Row>
            <Col sm='3'>
              <InputComponent />
            </Col>
            <Col sm='9'>
              <TableComponent />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default connect()(HomeContainer);
