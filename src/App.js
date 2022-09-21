import React, { Component } from "react";
import SideNavBar from "./components/sideNavBar";
import firebase from "./firebase";
import LoginPage from "./components/Login/login";
import { setLogInDetails } from "./actions/setpersondetailsaction";
import { connect } from "react-redux";

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
    };
    this.authListener = this.authListener.bind(this);
  }
  componentDidMount() {
    this.authListener();
  }
  authListener() {
    firebase.auth().onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        const loginDetails = { isLoggedIn: true };
        this.setState({ user });
        this.props.setOnLogInDetails(loginDetails);
        // localStorage.setItem("user", user.uid);
      } else {
        this.setState({ user: null });
        // localStorage.removeItem("user");
      }
    });
  }
  render() {
    return (
      <div className="App">
        {this.props.loginDetails.isLoggedIn ? <SideNavBar /> : <LoginPage />}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    loginDetails: state.loginDetails,
  };
};

const mapDisptachToProps = (dispatch) => {
  return {
    setOnLogInDetails: (p) => {
      dispatch(setLogInDetails(p));
    },
  };
};

export default connect(mapStateToProps, mapDisptachToProps)(App);
