import React, { Component } from "react";
import {
  Card,
  CardBody,
  Label,
  CardTitle,
  Button,
  Input,
  Col,
  FormGroup,
  Form,
} from "reactstrap";
import firebase from "firebase/app";
import "firebase/database";

export default class TicketComponent extends Component {
  parkingHandlerIn() {
    console.log('Tiket Oke');
    var randomTiket = Math.floor(Math.random() * 9000 + 1000);
    // var randomTiket = 3040;
    var d = new Date();
    var n = d.toLocaleTimeString();
    var y = d.getTime();
    document.getElementById("no_tiket").value = randomTiket;
    document.getElementById("waktu_masuk").value = n;

    firebase.database().ref("react/parkir/masuk/" + randomTiket)
      .once("value")
      .then((tiket) => {
        if (tiket.val() === null) {
          firebase.database().ref("react/parkir/keluar/" + randomTiket)
            .once("value")
            .then((tiket) => {
              if (tiket.val() === null) {
                firebase.database().ref("react/parkir/masuk/" + randomTiket).set({
                  waktu_masuk: n,
                  timestamp: y,
                });
              } else {
                alert("silahkan tekan lagi.");
                document.getElementById("tiket-generator").reset();
              }
            });
        } else {
          alert("silahkan tekan lagi.");
          document.getElementById("tiket-generator").reset();
        }
      });
  }
  
  render() {
    return (
      <div
        className="container d-flex justify-content-center"
        style={{ marginTop: "10%" }}
      >
        <Col sm="4">
          <Card className="text-white text-center" color="dark">
            <CardBody>
              <CardTitle><h4>Tiket Generator</h4></CardTitle>
              <Form id="tiket-generator">
                <FormGroup>
                  <Label>No. Tiket</Label>
                  <Input
                    type="number"
                    name="no_tiket"
                    id="no_tiket"                   
                    autoComplete="off"
                    className="text-center"
                    readOnly
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Waktu Masuk</Label>
                  <Input
                    type="text"
                    name="waktu_masuk"
                    id="waktu_masuk"
                    autoComplete="off"
                    className="text-center"
                    readOnly
                  />
                </FormGroup>
              </Form>
              <Button onClick={() => this.parkingHandlerIn()}>Tekan</Button>
            </CardBody>
          </Card>
        </Col>
      </div>
    );
  }
}
