import React, { Component } from "react";
import { Link, Route, Router, Switch } from "react-router-dom";
import HomeHeader from "./HomeHeader";
const ls = require("local-storage");
const requests = require("../../axios/requests");

class header extends Component {
  state = {
    id: ls.get("id"),
    token: ls.get("token"),
    role: ls.get("role"),
    firtname: "",
  };

  getUser = async () => {
    try {
      if (
        this.state.id !== null ||
        this.state.token !== null ||
        this.state.id !== undefined ||
        this.state.token !== undefined
      ) {
        let results = await requests.getUser(this.state.id);
        if (
          results.data.roleDetails.firstname === null ||
          results.data.roleDetails.firstname === undefined
        ) {
          this.setState({
            firstname: "User",
          });
        } else {
          this.setState({
            firstname: results.data.roleDetails.firstname,
          });
        }
      } else {
        console.log("its null");
      }
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount() {
    this.getUser();
    // console.log("id", typeof this.state.id)
    // console.log("tokjen", this.state.token)
  }
  logout = () => {
    if (
      this.state.id !== null ||
      this.state.token !== null ||
      this.state.id !== undefined ||
      this.state.token !== undefined
    ) {
      ls.clear();
      window.location.href = "/";
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
          <li class="nav-item dropdown">
            <Link
              class="nav-link dropdown-toggle"
              to="/category"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Jobs On HAF
            </Link>
          </li>
          <li class="nav-item dropdown"></li>
          <li class="nav-item dropdown">
            <Link
              class="nav-link dropdown-toggle"
              to="/jobs-near-me"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Jobs Near Me
            </Link>
          </li>
          <li class="nav-item dropdown">
            <Link
              class="nav-link dropdown-toggle"
              to="/scrapping"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Refer a professor
            </Link>
          </li>
          <li class="button-group">
            <Link to="/register" class="button btn btn-common">
              SignUp Or Login
            </Link>
          </li>
        </>
      );
    } else if (this.state.role === "seeker") {
      return (
        <>
          <li class="nav-item dropdown">
            <Link
              class="nav-link dropdown-toggle"
              to="/category"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Jobs On HAF
            </Link>
          </li>
          <li class="nav-item dropdown">
            <Link
              class="nav-link dropdown-toggle"
              to="/jobs-near-me"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Jobs Near Me
            </Link>
          </li>
          <li class="nav-item dropdown">
            <Link
              class="nav-link dropdown-toggle"
              to="/scrapping"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Refer a professor
            </Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link" to="/cv-resume">
              Build CV
            </Link>
          </li>
          <div class="dropdown">
            <li class="button-group">
              <Link class="button btn btn-common">{this.state.firstname}</Link>
            </li>
            <div class="dropdown-content">
              <li>
                <Link to="/view-profile">Edit Profile</Link>
                <Link to="/jobsapplied">Applied Jobs</Link>
                <Link to="/cv_preview">View CV</Link>
                <Link to="/" onClick={this.logout}>
                  Logout
                </Link>
              </li>
            </div>
          </div>
        </>
      );
    } else if (this.state.role === "recruiter") {
      return (
        <>
          <li class="nav-item dropdown">
            <Link
              class="nav-link dropdown-toggle"
              to="/post-job-form"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Post a Job
            </Link>
          </li>
          {/* <li class="nav-item dropdown">
            <Link
              class="nav-link dropdown-toggle"
              to="/error"
              aria-haspopup="true"
              aria-expanded="false"
            >
              View Applications
            </Link>
          </li> */}
          <li class="nav-item dropdown">
            <Link
              class="nav-link dropdown-toggle"
              to="/postedjobs"
              aria-haspopup="true"
              aria-expanded="false"
            >
              View Posted Jobs
            </Link>
          </li>
          <div class="dropdown">
            <li class="button-group">
              <Link class="button btn btn-common">{this.state.firstname}</Link>
            </li>
            <div class="dropdown-content">
              <Link to="/view-profile">Edit Profile</Link>
              <Link to="/" onClick={this.logout}>
                Logout
              </Link>
            </div>
          </div>
        </>
      );
    } else if (this.state.role === "admin") {
      return (
        <>
          <li class="nav-item dropdown">
            <Link
              class="nav-link dropdown-toggle"
              to="/admin"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Dashboard
            </Link>
          </li>
          {/* <li class="nav-item dropdown">
            <Link
              class="nav-link dropdown-toggle"
              to="/error"
              aria-haspopup="true"
              aria-expanded="false"
            >
              View Applications
            </Link>
          </li> */}
          <li class="nav-item dropdown">
            <Link
              class="nav-link dropdown-toggle"
              to="/admin/messages"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Messages
            </Link>
          </li>
          <div class="dropdown">
            <li class="button-group">
              <Link class="button btn btn-common">{this.state.firstname}</Link>
            </li>
            <div class="dropdown-content">
              {/* <Link to="/view-profile">Edit Profile</Link> */}
              <Link to="/" onClick={this.logout}>
                Logout
              </Link>
            </div>
          </div>
        </>
      );
    }
  };
  render() {
    return (
      <>
        <header id="home" class="hero-area">
          <nav class="navbar navbar-expand-lg fixed-top scrolling-navbar">
            <div class="container">
              <div class="theme-header clearfix">
                <div class="navbar-header">
                  <button
                    class="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#main-navbar"
                    aria-controls="main-navbar"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                  >
                    <span class="navbar-toggler-icon"></span>
                    <span class="lni-menu"></span>
                    <span class="lni-menu"></span>
                    <span class="lni-menu"></span>
                  </button>
                  <h3 class="mt-2">
                    H <b style={{ color: "#55BC7E;" }}>&</b> F
                  </h3>
                </div>
                <div class="collapse navbar-collapse" id="main-navbar">
                  <ul class="navbar-nav mr-auto w-100 justify-content-end">
                    <li class="nav-item dropdown active">
                      <Link
                        class="nav-link dropdown-toggle"
                        to="/"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        Home
                      </Link>
                    </li>

                    <li class="nav-item dropdown">
                      <Link
                        class="nav-link dropdown-toggle"
                        to="/about"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        About Us
                      </Link>
                    </li>
                    <li class="nav-item dropdown">
                      <Link
                        class="nav-link dropdown-toggle"
                        to="/contact"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        Contact Us
                      </Link>
                    </li>
                    {this.loggedIn()}
                  </ul>
                </div>
              </div>
            </div>
            <div
              class="mobile-menu"
              data-logo="assets/img/logo-mobile.png"
            ></div>
          </nav>

          <Switch>
            <Route path="/" exact>
              <HomeHeader />
            </Route>
          </Switch>
        </header>
      </>
    );
  }
}

export default header;
