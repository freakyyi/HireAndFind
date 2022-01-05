import React, { Component } from "react";
import { Link } from "react-router-dom";
const requests = require("../axios/requests");
const ls = require("local-storage");

class Login extends Component {
  state = {
    email: "",
    password: "",
    users: [],
    id: ls.get("id"),
    token: ls.get("token"),
    cvId: ls.get("cvId"),
  };

  setEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }
  setPassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  loginUser = async () => {
    try {
      if (this.state.email !== "" || this.state.password !== "") {
        let results = await requests.loginUser(
          this.state.email,
          this.state.password
        );
        if (results === undefined || results instanceof Error) {
          document.getElementById("error").style.display = "block";
          document.getElementById("noerror").style.display = "none";
        } else {
          document.getElementById("noerror").style.display = "block";
          document.getElementById("error").style.display = "none";
          ls.set("id", results.data.user._id);
          ls.set("token", results.data.token);
          ls.set("role", results.data.user.role);
          if (results.data.user.role === "seeker" && results.data.cv !== null) {
            console.log("setting cv in LS");
            ls.set("cvId", results.data.cv._id);
            window.location.href = "/";
          } else {
            console.log("setting cv in LS with undefiend values");
            ls.set("cvId", results.data.cv);
            window.location.href = "/";
          }

          // window.location.href = "/";
          console.log(" here are results" + results);
          this.setState({
            users: results,
          });
          const loggedInUser = ls.get("user");
          if (loggedInUser) {
            const foundUser = JSON.parse(loggedInUser);
            ls.set(foundUser);
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  loggedIn = () => {
    if (
      this.state.id === null ||
      this.state.token === null ||
      this.state.id === undefined ||
      this.state.token === undefined
    ) {
      return (
        <>
          <section class="job-detail section pt-5">
            <div class="row">
              <div class="col-lg-6">
                <span style={{ marginLeft: "90px" }}>
                  <img
                    src="assets/img/slider/img-1.png"
                    style={{
                      width: "400px",
                      height: "500px",
                      marginTop: "60px",
                    }}
                    alt=""
                  />
                </span>
              </div>
              <div class="col-lg-4">
                <div class="page-login-form" style={{ marginTop: "90px;" }}>
                  <h3>
                    Sign in to <b style={{ color: "#55BC7E" }}>H&F</b>
                  </h3>
                  <div class="form-group">
                    <label style={{ color: "#000000" }} class="control-label">
                      E-mail
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="John@gmail.com"
                      onChange={(e) => {
                        this.setEmail(e);
                      }}
                    />
                  </div>
                  <div class="form-group">
                    <label style={{ color: "#000000" }} class="control-label">
                      Password
                    </label>
                    <input
                      type="password"
                      class="form-control"
                      placeholder="password"
                      onChange={(e) => {
                        this.setPassword(e);
                      }}
                    />
                  </div>
                  <p id="error" style={{ display: "none" }}>
                    Invalid Email Or Password
                  </p>
                  <p id="noerror" style={{ display: "none" }}>
                    Logging In
                  </p>
                  <button
                    class="btn btn-common log-btn"
                    onClick={this.loginUser}
                  >
                    Login
                  </button>

                  <ul class="form-links">
                    <li class="text-center">
                      <Link to="register">Don't have an account?</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </>
      );
    } else {
      return (
        <>
          <div>
            <h3
              style={{
                marginBottom: "219px",
                textAlign: "center",
                marginTop: "300px",
              }}
            >
              You are already Logged In
            </h3>
          </div>
        </>
      );
    }
  };
  render() {
    return <>{this.loggedIn()}</>;
  }
}

export default Login;
