import React, { Component } from 'react'
import { FormComp } from '../components'
import { Button } from 'react-bootstrap';
import { BackButton } from '../components/elements'

class InputPage extends Component {

    render() {
        return (
            <>
                <div className='mb-3'>
                    <BackButton />
                </div>
                <div>
                    <h4>Input Data</h4>
                    <FormComp />
                </div>

            </>
        )
    }
}
export default InputPage