import React, { Component } from "react";
import { Link } from "react-router-dom";
const requests = require("../axios/requests");

class RegisterCompany extends Component {
  state = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    role: "recruiter",
    users: [],
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
      role: "recruiter",
    });
  }

  registerRecruiter = async () => {
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

  render() {
    return (
      <>
        <section className="job-detail section pt-5">
          <div className="row">
            <div className="col-lg-6">
              <span style={{ marginLeft: "90px" }}>
                <img
                  src="assets/img/slider/img-1.png"
                  style={{ width: "400px", height: "500px", marginTop: "60px" }}
                  alt=""
                />
              </span>
            </div>
            <div className="col-lg-4">
              <div className="page-login-form" style={{ marginTop: "50px" }}>
                <h3>
                  Sign up to <b style={{ color: "#55BC7E" }}>H&F</b>
                </h3>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label
                        style={{ color: "#000000" }}
                        className="control-label"
                      >
                        First Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="First Name"
                        onChange={(e) => {
                          this.setFirstname(e);
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label
                        style={{ color: "#000000" }}
                        className="control-label"
                      >
                        Last Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Last Name"
                        onChange={(e) => {
                          this.setLastname(e);
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label style={{ color: "#000000" }} className="control-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Demo@example.com"
                    onChange={(e) => {
                      this.setEmail(e);
                    }}
                  />
                </div>

                <div className="form-group">
                  <label style={{ color: "#000000" }} className="control-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    onChange={(e) => {
                      this.setPassword(e);
                    }}
                  />
                </div>
                <button
                  className="btn btn-common log-btn"
                  onClick={this.registerRecruiter}
                >
                  Sign up as a recruiter
                </button>

                <ul className="form-links">
                  <li className="text-center">
                    <Link to="register">Join as a Job Seeker</Link>
                  </li>
                </ul>
                <p className="hr-text">or</p>

                <ul className="form-links">
                  <li className="text-center">
                    <Link to="login">Already have an account</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
}

export default RegisterCompany;
