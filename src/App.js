import React, { Component } from "react";
import NavbarComponent from "./components/NavbarComponent";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import DataPage from "./pages/DataPage";
import DivisiPage from "./pages/DivisiPage";
import RegisterPage from "./pages/RegisterPage";
import EditPage from "./pages/EditPage";
import CreatePage from "./pages/CreatePage";
import LoginPage from "./pages/LoginPage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MemberPage from "./pages/MemberPage";
import CreateAdminPage from "./pages/CreateAdminPage";
import NavbarCompFront from './components/NavbarCompFront'

export default class App extends Component {
  state = {
    isLogin: false,
  };

  handleLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(function () {
        window.location.href = "/login";
      })
      .catch(function (err) {
        console.log(err.code);
      });
  }
  stateChanged = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {   
        this.setState({ isLogin: true })
      } else {
        if (localStorage.reactUserStamp) {
          window.location.href = '/member'
        } else if (!localStorage.reactUserStamp) {
          window.location.href = '/login'
        }
      }
    });
  }

  render() {
    return (
      <div>
        <Router>
          {this.state.isLogin ?
            <NavbarComponent handleLogout={this.handleLogout} />
            : <NavbarCompFront />}
          <Switch>
            <Route path='/' exact>
              <DataPage
                stateChanged={this.stateChanged}
                users={this.state.users}
              />
            </Route>
            <Route path='/create' exact >
              <CreatePage stateChanged={this.stateChanged} />
            </Route>
            <Route path='/create-admin' exact >
              <CreateAdminPage stateChanged={this.stateChanged} />
            </Route>
            <Route path='/divisi/:nik' exact component={DivisiPage} />
            <Route path='/edit/:nik' exact component={EditPage} />
            <Route path='/member' exact >
              <MemberPage stateChanged={this.stateChanged} />
            </Route>
            <Route path='/login' exact>
              <LoginPage />
            </Route>
            <Route path='/register' exact>
              <RegisterPage />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}
