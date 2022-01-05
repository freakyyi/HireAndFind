import React, { Component } from "react";
import { Link } from "react-router-dom";
const requests = require("../axios/requests");
const ls = require("local-storage");
class Register extends Component {
  state = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    role: "seeker",
    users: [],
    id: ls.get("id"),
    token: ls.get("token"),
  };
  setFirstname(e) {
    this.setState({
      firstname: e.target.value,
    });
  }
  setLastname(e) {
    this.setState({
      lastname: e.target.value,
    });
  }
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
  setRole(e) {
    this.setState({
      role: "seeker",
    });
  }

  registerSeeker = async () => {
    try {
      if (
        this.state.firstname !== "" ||
        this.state.lastname !== "" ||
        this.state.email !== "" ||
        this.state.password !== ""
      ) {
        let results = await requests.registerUser(
          this.state.firstname,
          this.state.lastname,
          this.state.email,
          this.state.password,
          this.state.role
        );
        this.setState({
          users: results,
        });
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
                <div class="page-login-form" style={{ marginTop: "50px" }}>
                  <h3>
                    Sign up to <b style={{ color: "#55BC7E" }}>H&F</b>
                  </h3>
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label
                          style={{ color: "#000000" }}
                          class="control-label"
                        >
                          First Name
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          placeholder="First Name"
                          onChange={(e) => {
                            this.setFirstname(e);
                          }}
                        />
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                        <label
                          style={{ color: "#000000" }}
                          class="control-label"
                        >
                          Last Name
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Last Name"
                          onChange={(e) => {
                            this.setLastname(e);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div class="form-group">
                    <label style={{ color: "#000000" }} class="control-label">
                      Email
                    </label>
                    <input
                      type="email"
                      class="form-control"
                      placeholder="demo@example.com"
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
                      placeholder="Password"
                      onChange={(e) => {
                        this.setPassword(e);
                      }}
                    />
                  </div>
                  <button
                    class="btn btn-common log-btn"
                    type="button"
                    onClick={this.registerSeeker}
                  >
                    Join as Job Seeker
                  </button>

                  <ul class="form-links">
                    <li class="text-center">
                      <Link to="company_register">Join as a Company</Link>
                    </li>
                  </ul>
                  <p class="hr-text">or</p>

                  <ul class="form-links">
                    <li class="text-center">
                      <Link to="login">Already have an account</Link>
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
              You are already Registered
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

export default Register;
