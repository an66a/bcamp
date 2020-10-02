import React, { Component } from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class CardComponent extends Component {
    state = {
        test: false,
    }
    // your link creation
    //  newTo = { 
    //     pathname: '/edit/'+this.props.siswa.id, 
    //     param1: "Par1" 
    //   };
    render() {

        return (

            <div>
                <Card style={{ width: '20rem' }}>
                    <Card.Img variant="top" src={this.props.siswa.photoUrl} style={{ height: 200 }} />
                    {/* <Card.ImgOverlay> */}
                    <Card.Body>
                        <Card.Title>{this.props.siswa.nama}</Card.Title>
                        <Card.Text>{this.props.siswa.motto}
                        </Card.Text>
                        <Button variant="primary" className='mr-2' href={this.props.siswa.gitUrl}>Go Github</Button>
                        <Link to={{
                            pathname: '/edit/' + this.props.siswa.id,
                         
                      
                            // state: { fromDashboard: true }
                        
                        }}
                        >
                            <Button variant="primary" className='mr-2' >Edit</Button>
                        </Link>

                    </Card.Body>
                    {/* </Card.ImgOverlay> */}
                </Card>
            </div>
        )
    }
}

export default CardComponent
