import React from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Button } from 'react-bootstrap'

const backButton = (props) => {

    return (
        <Row>
            <Col>
                <Link to='/'>
                    {props.backClick ? (
                        <Button onClick={() => props.backClick()}>Back</Button>
                    ) : (
                            <Button>Back</Button>
                        )}
                </Link>
            </Col>
        </Row>
    )
}

export default backButton
