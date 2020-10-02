import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { Button, Card, Col, Container, Form } from 'react-bootstrap'
import { BackButton } from '../components/elements'
import RowInput from '../components/elements/rowInput';

const DivisiPage = (props) => {
    const initialState = { nama: '', nik: '', alamat: '', email: '', kontak: '', divisi: '' }
    const [state, setState] = useState(initialState)
    let { nik } = useParams()

    const set = () => {
        let data = []
        if (localStorage.reactData) {
            data = JSON.parse(localStorage.reactData)
        }
        let propsData;
        for (let i = 0; i < data.length; i++) {
            let cek = data[i]
            if (cek.nik === nik) {
                propsData = cek
            }
        }
        setState(propsData)
    }

    useEffect(() => {
        set()
    }, [])

    const inputData = () => {
        const { nik, nama, jenis_kelamin, alamat, kecamatan, kabupaten, email, kontak, divisi } = state;
        let data = [];
        if (localStorage.reactData) {
            data = JSON.parse(localStorage.reactData);
        }
        for (let i = 0; i < data.length; i++) {
            let x = data[i]
            if (x.nik === nik) {
                data.splice(i, 1)
            }
        }
        const user = { nik, nama, jenis_kelamin, alamat, kecamatan, kabupaten, email, kontak, divisi };
        data.push(user);
        localStorage.reactData = JSON.stringify(data)
        alert("Sukses")
        setState(initialState)
        window.location.href = '/'
    };
    return (
        <Container>
            <BackButton />
            <div className="d-flex justify-content-center mt-3">
                <Card style={{ width: "100%" }}>
                    <Card.Title className="ml-3 mt-3">Input Divisi</Card.Title>
                    <Card.Body>
                        <Form id="formData">
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <Form.Label>Nama</Form.Label>
                                    <RowInput
                                        type="text"
                                        name="nama"
                                        value={state.nama}
                                        readOnly
                                    />
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label>Divisi</Form.Label>
                                    <Form.Control onChange={e => setState({ ...state, divisi: e.target.value })} as="select">
                                        <option disabled selected>Pilih Divisi</option>
                                        <option>Marketing</option>
                                        <option>App Developer</option>
                                        <option>Quality Assurance</option>
                                        <option>IT Planner</option>
                                        <option>IT Security</option>
                                        {/* <option>--belum ada divisi--</option> */}
                                    </Form.Control>
                                </Form.Group>
                            </Form.Row>

                            <Button variant="primary" onClick={() => inputData()}>
                                Submit
              </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        </Container>
    )
}

export default DivisiPage
