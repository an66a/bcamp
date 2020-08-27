import React, { Component } from "react";
import {
  Button,
  Label,
  Input,
  FormGroup,
  Form,
  CardBody,
  CardTitle,
  Col,
  Card,
} from "reactstrap";
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database'



export default class LoginContainer extends Component {

  Auth(){
    firebase.auth().onAuthStateChanged(user => {
      if(user){
      //login
      console.log("you're sign in");
     window.location.href = '/'
      
      } else {
      //logout
      console.log("you're logout");
      // window.location.href = '/login'  

        
      }
      })

  }
  
  handleLogin() {
    const el = (el) => {
      return document.getElementById(el);
    };
    
    const email_text = el('email_text');
    const password_text = el('password_text');
    firebase.auth().signInWithEmailAndPassword(email_text.value, password_text.value)
    // .then(function(data){
    //   // console.log(data)
    //   // location.reload();
    // })
    .catch(function(err){
      console.log(err.code)
      switch(err.code) {
        case 'auth/user-not-found':
        alert('User tidak terdaftar!');
        break;
        case 'auth/wrong-password':
        alert('Kata sandi/password yang anda masukan salah.')
      break;
      case 'auth/invalid-email':
        alert('Format email salah!');
        break;
      }    
    })
  }
  handleSignup() {  
    const el = (el) => {
      return document.getElementById(el);
    };
    
    const email_text = el('email_text');
    const password_text = el('password_text');
    firebase.auth().createUserWithEmailAndPassword(email_text.value, password_text.value)
    .then(function(data){
    console.log('berhasil daftar')
    firebase.database().ref("react/users/" + data.user.uid).set({     
    email: email_text.value,
    password: password_text.value,
  }) 
    })
    .catch(function(err){
      console.log(err.code)
    switch(err.code){
      case 'auth/invalid-email':
        alert('Format email salah!');
        break;
        case 'auth/weak-password':
          alert('Password terlalu lemah!');
          break;
          case 'auth/email-already-in-use':
            alert('Email sudah digunakan!');
            break;
    }
    })
  }
  
  componentDidMount(){
    this.Auth()
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
              <CardTitle>
                <h4>Login Parkir App</h4>
              </CardTitle>
              <Form id="loginForm">
                <FormGroup>
                  <Label>Email</Label>
                  <Input
                    type="email"
                    name="userEmail"
                    id="email_text"
                    autoComplete="off"
                    className="text-center"
                
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Password</Label>
                  <Input
                    type="password"
                    name="password"
                    id="password_text"
                    autoComplete="off"
                    className="text-center"
                   
                  />
                </FormGroup>
              </Form>
              <Button className='mr-2' onClick={() => this.handleLogin()}>Login</Button>
              <Button onClick={() => this.handleSignup()}>Daftar</Button>
            </CardBody>
          </Card>
        </Col>
      </div>
    );
  }
}
