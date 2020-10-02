import React from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Button } from 'react-bootstrap'

const BackButton = () => {
    return (
        <Row>
            <Col>
            <Link to='/'>
            <Button>Back</Button>
            </Link>
            </Col>
        </Row>
    )
}

export default BackButton
