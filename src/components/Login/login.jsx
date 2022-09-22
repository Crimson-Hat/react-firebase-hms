import React, { Component } from "react";
import "./login.css";
import firebase from "../../firebase";

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disableBtn: "",
      email: "",
      password: "",
      invaild: "invaild",
    };
  }
  login = (e) => {
    this.setState({
      disableBtn: "disable",
      invaild: "invaild",
    });
    e.preventDefault();
    console.log("jsjshshshs");
    firebase
      .auth()
      .signInWithEmailAndPassword(
        this.state.email,
        this.state.password
        //this.state.email, this.state.password
      )
      .then((u) => {
        this.setState({
          disableBtn: "",
          invaild: "invaild",
        });
        // console.log(u);
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          disableBtn: "",
          invaild: "",
        });
      });
  };
  onEdit = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    return (
      <div className="login_page">
        <div className="container-fluid p-0">
          <div className="row">
            <div className="col-lg-4 p-0 first_section">
              <div className="box">
                <div className="from_section">
                  <i class="fa fa-hospital-o" aria-hidden="true"></i>
                  <ul>
                    <li>
                      <i class="fa fa-user-md" aria-hidden="true"></i>
                    </li>
                    <h3 style={{ color: "white" }}>Hopital Management</h3>
                    <li></li>
                  </ul>

                  <form onSubmit={this.login}>
                    <input
                      name="email"
                      class="form-control form-control-lg"
                      type="email"
                      placeholder="admin@example.com"
                      onChange={this.onEdit}
                      autocomplete="off"
                      required
                    />
                    <input
                      class="form-control form-control-lg"
                      type="password"
                      placeholder="123456"
                      name="password"
                      onChange={this.onEdit}
                      required
                    />
                    <p className={this.state.invaild}>
                      Invalid login or password
                    </p>
                    <button
                      type="submit"
                      class="btn btn-info"
                      disabled={this.state.disableBtn}
                    >
                      Login
                      <i class="fa fa-unlock" aria-hidden="true"></i>
                    </button>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-lg-8 p-0 second_section">
              <div className="box">
                <img alt="" srcset={require("../../Images/doctorbg.jpg")} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginPage;
