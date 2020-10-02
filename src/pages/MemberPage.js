import React, { useEffect } from 'react'
import { Col, Form, Row, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux";
import { getMemberDetail } from '../actions/dataAction'

const MemberPage = (props) => {
    const dispatch = useDispatch()
    useEffect(() => {       
                dispatch(getMemberDetail());      
    }, [])
    const state = useSelector(state => state.data.getMemberDetail)
    return (
        (state ?
        <div>
           
            <Row className="mb-5">
                <Col className="d-flex justify-content-center">
                    <Image src={state.photoUrl} roundedCircle width="40%" />
                </Col>
            </Row>
            <Form>
                <Form.Group as={Row}>
                    <Form.Label column sm={2}>
                        Nama
    </Form.Label>
                    <Col sm={10}>
                        <Form.Control value={state.nama} readOnly />
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column sm={2}>
                        Motto
    </Form.Label>
                    <Col sm={10}>
                        <Form.Control as="textarea" rows="3" value={state.motto} readOnly />
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column sm={2}>
                        Git URL
    </Form.Label>
                    <Col sm={10}>
                        <Form.Control value={state.gitUrl} readOnly />
                    </Col>
                </Form.Group>
            </Form>
        </div>: null )
    )
}
export default MemberPage