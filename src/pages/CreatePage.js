import React, { Component } from 'react'
import { Container } from 'react-bootstrap'
import { BackButton } from '../components/elements'
import Form from '../components/FormComponent'

export default class CreatePage extends Component {
    componentDidMount() {
        this.props.stateChanged()
    }
    render() {
        return (
            <Container>
                <BackButton />
                <div className='mt-4'>
                    <Form title='Input Data' />
                </div>
            </Container>
        )
    }
}
