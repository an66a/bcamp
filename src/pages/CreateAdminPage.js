import React, { Component } from 'react'
import FormAdmin from '../components/FormAdmin'
import { Container } from 'react-bootstrap'

export default class CreateAdminPage extends Component {
    componentDidMount() {        
        this.props.stateChanged()
      }
    render() {
        return (
            <Container>
                <div style={{ marginTop: "8%" }}>
                    <FormAdmin />
                </div>
            </Container>

        )
    }
}
