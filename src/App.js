import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import { NavbarComp } from "./components";
import { HomePage, LoginPage, MemberPage, RegisterPage, InputPage, EditPage } from "./pages/";
import { userState, getMemberList } from "./actions/dataAction";


class App extends Component {
  componentDidMount() {
    this.props.dispatch(userState());
    this.props.dispatch(getMemberList());
  }

  render() {
    return (
      <>
        <Router>
          <NavbarComp />
          <Container>
            <Switch>
              <Route path="/" exact>
                <HomePage />
              </Route>
              <Route path="/input" exact>
                <InputPage />
              </Route>
              <Route path="/edit/:id" exact>
                <EditPage />
              </Route>
              <Route path="/member" exact>
                <MemberPage />
              </Route>
              <Route path="/register" exact>
                <RegisterPage />
              </Route>
              <Route path="/login" exact>
                <LoginPage />
              </Route>
            </Switch>
          </Container>
        </Router>
      </>
    );
  }
}

export default connect()(App);
