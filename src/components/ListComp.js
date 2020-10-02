import React, { Component } from 'react'
import { connect } from "react-redux";
import { CardComp } from './'
import { Col, Container, Row } from 'react-bootstrap';
import { getMemberList } from '../actions/dataAction';


class ListComp extends Component {

  render() {

    let list = this.props.getMemberList
  
    let cardSiswa = list.map((siswa) => {
      return (
        <Col sm='4' className="mt-3" key={siswa.id}>
          <CardComp siswa={siswa} />
        </Col>
      )
    })

    return (
      <Row>
        {cardSiswa}
      </Row>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    getMemberList: state.data.getMemberList,
  };
};
export default connect(mapStateToProps, null)(ListComp)