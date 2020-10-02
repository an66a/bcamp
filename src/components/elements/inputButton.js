import React from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Button } from 'react-bootstrap'

const InputButton = () => {
    return (
        <Row>
            <Col>
            <Link to='/input'>
            <Button>Input Data</Button>
            </Link>
            </Col>
        </Row>
    )
}

export default InputButton
