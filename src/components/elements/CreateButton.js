import React from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Button } from 'react-bootstrap'

const CreateButton = () => {
    return (
        <Row>
            <Col>
            <Link to='/create'>
            <Button>Input Data</Button>
            </Link>
            </Col>
        </Row>
    )
}

export default CreateButton
