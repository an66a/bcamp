import React, { Component } from 'react'
import TableKaryawan from '../components/TableKaryawan'
import { connect } from "react-redux";
import { getUsersList } from "../actions/dataAction";
import { Container } from 'react-bootstrap';

class DataPage extends Component {
    componentDidMount() {
        this.props.dispatch(getUsersList());
        this.props.stateChanged()
      }
    render() {
        return (
            <div className='mt-3'>
            <Container>
            <TableKaryawan  />
            </Container>                
            </div>
        )
    }
}
export default connect()(DataPage)