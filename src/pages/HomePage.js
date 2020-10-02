import React, { Component } from 'react';
import { connect } from "react-redux";
import { CardComp } from "../components"
import { Col, Row } from 'react-bootstrap';
import { getMemberList } from '../actions/dataAction';
import { ListComp } from '../components'

class HomePage extends Component {
  render() {
    // console.log(this.props.member);
    return (
      (this.props.getMemberList ?
        <ListComp />
        : null)
    )
  }
}
const mapStateToProps = (state) => {
  return {
    getMemberList: state.data.getMemberList,
    member: state.member
  };
};
export default connect(mapStateToProps, null)(HomePage)