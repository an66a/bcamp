import React from 'react'
import { useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap'
import { BackButton } from '../components/elements'
import Form from '../components/FormComponent'

const EditPage = () => {
    let { nik } = useParams()
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
    return (
        <Container>
            <BackButton />
            <div className='mt-4'>
                {propsData ?
                    <Form title='Edit Karyawan' data={propsData} update />
                    : null}
            </div>
        </Container>
    )
}

export default EditPage
