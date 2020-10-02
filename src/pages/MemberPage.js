import React, { Component } from 'react'
import { Container } from 'react-bootstrap'
import MemberProfile from '../components/MemberProfile'

class MemberPage extends Component {
    getDataMember = () => {
        let user = JSON.parse(localStorage.reactUserStamp)
        let nik = user[0].nik

        let data = JSON.parse(localStorage.reactData)
       
        data.forEach(el => {
            if (el.nik === nik) {
                this.setState(el)
                return
            }
        })
    }
    sessionCheck = () => {
        if (!localStorage.reactUserStamp) {
            window.location.href = '/login'
        }
    }
    componentDidMount() {
        this.sessionCheck();
        this.getDataMember();
    }
    render() {
        return (
            <div>
                <div className="mt-5">
                    <Container >
                        {this.state ?
                            <MemberProfile data={this.state} />
                            : null}
                    </Container>
                </div>
            </div>
        )
    }
}

export default MemberPage