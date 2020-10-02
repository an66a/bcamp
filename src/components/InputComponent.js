import React, { Component } from 'react'
import {
  Card, CardBody, Label, FormGroup,
  CardTitle, Button, Form, Input
} from 'reactstrap';
import firebase from "firebase/app";
import "firebase/database";

export default class InputComponent extends Component {
  
  parkingHandlerOut() {
    const el = (el) => {
      return document.getElementById(el);
    };
    const db = firebase.database();
    var jenis = el("jenis_kendaraan").value;
    var plat = el("plat_nomor").value;
    var no_tiket = el("no_tiket").value;
  
    db.ref("react/parkir/masuk/" + no_tiket)
      .once("value")
      .then(tiket => {
        console.log(tiket.val());
        var d = new Date();
        var n = d.toLocaleTimeString();
        var y = d.getTime();
        var tglKeluar = d.toLocaleDateString()
        var masuk = tiket.val().waktu_masuk;
        var a = tiket.val().timestamp;
        var b = new Date(a)
        var tglMasuk = b.toLocaleDateString()
        var x = y - a;
        var detik = 1000 * 1;
        var menit = 1000 * 60;
        var lama_parkir = x/detik;
        var lama_parkir2 = Math.ceil(x/menit);
        var lama_parkirMnt = lama_parkir2 + " menit";
        var motor = 3000;
        var mobil = 5000;
        var mntMotor = 1000;
        var mntMobil = 3000;      
        var lamaDtk = '';
        var biaya = '';
        if (lama_parkir >= 120) {
          lamaDtk = lama_parkir - 120;
        } else {
          lamaDtk = 0;
        }   
        var lamaMnt = Math.ceil(lamaDtk/60) 
        var biayaMntMotor = lamaMnt * mntMotor;
        var biayaMntMobil = lamaMnt * mntMobil;
  
        if (jenis === "motor") {
          biaya = motor + biayaMntMotor;
        } else {
          biaya = mobil + biayaMntMobil;
        }

        var parkirRecord = [];
        if (localStorage.parkirRecord) {
          parkirRecord = JSON.parse(localStorage.parkirRecord);
        }
        var user = {     
          tanggal_masuk: tglMasuk, 
          tanggal_keluar: tglKeluar, 
          waktu_masuk: masuk,
          waktu_keluar: n,
          jenis_kendaraan: jenis,
          plat_nomor: plat,
          lama_parkir: lama_parkirMnt,
          biaya: biaya,
          timestamp: a,
      }
      parkirRecord.push(user);

      localStorage.parkirRecord = JSON.stringify(parkirRecord);       
              
        db.ref("react/parkir/masuk/" + no_tiket).remove();
        window.location.reload()
      }).catch(err => { console.log(err);})
    var form = el("input_tiket");
    form.reset();
    
  }
  
  render() {    

    return (
      <div className='mt-5'>
    
      <Card className='text-white text-center' color='dark'>        
          <CardBody  >
          <CardTitle>
            <h4>
            Input Tiket
            </h4>
            </CardTitle>
         <Form id='input_tiket'>
         <FormGroup>
          <Label>No. Tiket</Label>
          <Input type="number" name="no_tiket" id="no_tiket" maxLength={4} autoComplete='off' required/>
          </FormGroup>
         <FormGroup>
          <Label>Plat Nomor</Label>
          <Input type="text" name="plat_nomor" id="plat_nomor" maxLength={8} autoComplete='off'/>
          </FormGroup>
          <FormGroup>
          <Label>Jenis Kendaraan</Label>
          <Input type="select" name="select" id="jenis_kendaraan">
            <option value='motor'>Motor</option>
            <option value='mobil'>Mobil</option>    
          </Input>  
        </FormGroup>
         </Form>
            <Button onClick={() => this.parkingHandlerOut()}>Input</Button>
          </CardBody>
        </Card>       
      </div>
    )
  }
}
