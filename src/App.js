import React, { Component } from "react";
import NavbarComponent from "./components/NavbarComponent";
import HomeContainer from "./containers/HomeContainer";
import { Switch, Route } from "react-router-dom";
import TicketContainer from "./containers/TicketContainer";
import firebase from "firebase/app";
import "firebase/auth";
import LoginContainer from "./containers/LoginContainer";
// import * as firebase from 'firebase'


export default class App extends Component {
  handleLogout() {
    firebase
      .auth()
      .signOut()
      .then(function () {
        window.location.reload();
      })
      .catch(function (err) {
        console.log(err.code);
      });
  }
  stateChanged() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        //login
        console.log("you're sign in");      
      } else {
        //logout
        console.log("you're logout");
        window.location.href = "/login";
      }
    });
  }
  render() {
    return (
      <div>    
        <Switch>         
          <Route path="/" exact>
            <NavbarComponent handleLogout={this.handleLogout} />   
            <HomeContainer stateChanged={this.stateChanged} />
          </Route>
          <Route path="/ticket" exact> 
            <TicketContainer stateChanged={this.stateChanged} />
          </Route>      
        <Route path="/login" exact>
            <LoginContainer />
          </Route>
        </Switch>
      </div>
    );
  }
}
