import React from 'react'
import { Col, Form, Row } from 'react-bootstrap'


const MemberProfile = (props) => {
  return (
    <div>
      <Form>
        <Form.Group as={Row} >
          <Form.Label column sm={2}>
            NIK
    </Form.Label>
          <Col sm={10}>
            <Form.Control value={props.data.nik} readOnly />
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm={2}>
            Nama
    </Form.Label>
          <Col sm={10}>
            <Form.Control value={props.data.nama} readOnly />
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm={2}>
            Alamat
    </Form.Label>
          <Col sm={10}>
            <Form.Control value={props.data.alamat} readOnly />
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm={2}>
            Email
    </Form.Label>
          <Col sm={10}>
            <Form.Control value={props.data.email} readOnly />
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm={2}>
            Kontak
    </Form.Label>
          <Col sm={10}>
            <Form.Control value={props.data.kontak} readOnly />
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm={2}>
            Divisi
    </Form.Label>
          <Col sm={10}>
            <Form.Control value={props.data.divisi} readOnly />
          </Col>
        </Form.Group>
      </Form>
    </div>

  )
}
export default MemberProfile