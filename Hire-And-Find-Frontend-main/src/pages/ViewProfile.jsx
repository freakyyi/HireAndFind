import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getFID } from "web-vitals";
const requests = require("../axios/requests");
const ls = require("local-storage");

class ViewProfile extends Component {
  state = {
    id: ls.get("id"),
    token: ls.get("token"),
    role: ls.get("role"),
    firstname: "",
    lastname: "",
    email: "",
    role: "",
    skills: "",
    experience: [],
    title: "",
    companyS: "",
    location: "",
    headlineS: "",
    description: "",

    education: [],
    institution: "",
    degree: "",
    startDate: "",
    endDate: "",
    address: {},
    street: "",
    city: "",
    stateP: "",
    country: "",
    zipcode: "",
    phone_number: "",
    headlineR: "",
    companyR: "",
    updateBody: {},
  };
  setLastname(e) {
    this.state.updateBody.lastname = e.target.value;

    this.setState({
      lastname: e.target.value,
    });
  }
  setFirstname(e) {
    this.state.updateBody.firstname = e.target.value;
    this.setState({
      firstname: e.target.value,
    });
  }
  setSkills(e) {
    this.state.updateBody.skills = e.target.value;
    this.setState({
      skills: e.target.value,
    });
  }

  // setRProfile() {

  //   let prf = {
  //     street: this.state.street,
  //     city: this.state.city,
  //     stateP: this.state.stateP,
  //     country: this.state.country,
  //     zipcode: this.state.zipcode,
  //   };
  //   this.state.address.push(prf);
  //   this.setState({
  //     street: "",
  //     city: "",
  //     stateP: "",
  //     country: "",
  //     zipcode: "",
  //   });
  // }

  setPhoneNo(e) {
    this.state.updateBody.phone_number = e.target.value;

    this.setState({
      phone_number: e.target.value,
    });
  }

  setTagline(e) {
    this.state.updateBody.headlineR = e.target.value;

    this.state({
      headlineR: e.target.value,
    });
  }
  setCompany(e) {
    this.state.updateBody.companyR = e.target.value;

    this.state({
      companyR: e.target.value,
    });
  }

  setStreet(e) {
    this.state.updateBody.street = e.target.value;
    this.setState({
      street: e.target.value,
    });
  }
  setCity(e) {
    this.state.updateBody.city = e.target.value;
    this.setState({
      city: e.target.value,
    });
  }

  setPState(e) {
    this.state.updateBody.stateP = e.target.value;
    this.setState({
      stateP: e.target.value,
    });
  }

  setCountry(e) {
    this.state.updateBody.country = e.target.value;
    this.setState({
      country: e.target.value,
    });
  }
  setZipcode(e) {
    this.state.updateBody.setZipcode = e.target.value;
    this.setState({
      zipcode: e.target.value,
    });
  }

  getUser = async () => {
    try {
      if (
        this.state.id !== null ||
        this.state.token !== null ||
        this.state.id !== undefined ||
        this.state.token !== undefined
      ) {
        let results = await requests.getUser(this.state.id);
        let zipcode, city, state, country, street;
        if (
          results.data.roleDetails.firstname !== null ||
          results.data.roleDetails.firstname !== undefined
        ) {
          this.setState({
            firstname: "User",
          });

          if (results.data.roleDetails.role === "seeker") {
            this.setState({
              firstname: results.data.roleDetails.firstname,
              lastname: results.data.roleDetails.lastname,
              email: results.data.roleDetails.email,
              role: results.data.roleDetails.role,
              skills: results.data.roleDetailsSpecified.skills,
              experience: results.data.roleDetailsSpecified.experience,
              education: results.data.roleDetailsSpecified.education,
            });
          } else if (
            results.data.roleDetails.role === "recruiter" &&
            results.data.roleDetailsSpecified.address !== undefined
          ) {
            console.log("here as a recruiter");

            let { zipcode, city, state, country, street } =
              results.data.roleDetailsSpecified.address;
            this.setState({
              firstname: results.data.roleDetails.firstname,
              lastname: results.data.roleDetails.lastname,
              email: results.data.roleDetails.email,
              role: results.data.roleDetails.role,
              phone_number: results.data.roleDetailsSpecified.phone_number,
              headlineR: results.data.roleDetailsSpecified.headline,
              companyR: results.data.roleDetailsSpecified.company,
              zipcode: zipcode,
              city: city,
              stateP: state,
              country: country,
              street: street,
            });
          } else {
            this.setState({
              firstname: results.data.roleDetails.firstname,
              lastname: results.data.roleDetails.lastname,
              email: results.data.roleDetails.email,
              role: results.data.roleDetails.role,
              phone_number: results.data.roleDetailsSpecified.phone_number,
              headlineR: results.data.roleDetailsSpecified.headline,
              companyR: results.data.roleDetailsSpecified.company,
              zipcode: zipcode,
              city: city,
              stateP: state,
              country: country,
              street: street,
            });
          }
        } else {
          console.log("im in else block of 2nd IF");
          // let {zipcode, city, state, country, street} = results.data.roleDetailsSpecified.address
        }
      } else {
        console.log("its null");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // viewProfile = async () => {
  //   if (
  //     this.state.id !== null ||
  //     this.state.token !== null ||
  //     this.state.id !== undefined ||
  //     this.state.token !== undefined ||
  //     this.state.role !== null ||
  //     this.state.role !== undefined
  //   ) {
  //     if (this.state.role === "recruiter") {
  //       return <></>;
  //     } else if (this.state.role === "seeker") {
  //       return <></>;
  //     } else {
  //     }
  //   } else {
  //   }
  // };
  deleteProfile = async () => {
    console.log("Delete ID", this.state.id);

    let deleteUser = await requests.deleteUser(this.state.id);
    if (deleteUser.message === "SUCCESS") {
      ls.clear();
      window.location.href = "/";
    }
  };

  updateProfile = async () => {
    let address = {
      street: this.state.street,
      city: this.state.city,
      state: this.state.stateP,
      zipcode: this.state.zipcode,
      country: this.state.country,
    };
    this.state.updateBody.address = address;
    console.log(this.state.updateBody);

    console.log("here in update proifle starting");
    try {
      if (
        this.state.id !== null ||
        this.state.token !== null ||
        this.state.id !== undefined ||
        this.state.token !== undefined
      ) {
        let resultsAsRole = await requests.updateUserAsRole(
          this.state.id,
          this.state.updateBody
        );
        let resultsAsMain = await requests.updateUser(
          this.state.id,
          this.state.updateBody
        );
        if (this.state.role === "recruiter") {
          console.log("here in update profile function of recruiter");
          console.log(
            "main results lastname, ",
            resultsAsRole.data.updatedAsRole.phone_number
          );
        } else if (this.state.role === "seeker") {
          console.log("here in update profile function of seeker");
          console.log(
            "main results lastname, ",
            resultsAsMain.data.updatedAsUser.lastname
          );
        }
      } else {
        console.log("its no role");
      }
    } catch (error) {
      console.log(error);
    }
  };
  loggedIn = () => {
    if (
      this.state.id !== null ||
      this.state.token !== null ||
      this.state.id !== undefined ||
      this.state.token !== undefined ||
      this.state.role !== null ||
      this.state.role !== undefined
    ) {
      if (this.state.role === "seeker") {
        return (
          <>
            <section class="job-detail section pt-5">
              <div class="row">
                <div class="col-lg-2"></div>
                <div class="col-lg-8">
                  <div
                    class="page-login-form box"
                    style={{ boxShadow: " 0px 10px 22px #00000029" }}
                  >
                    <form class="login-form">
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
                              style={{
                                border: "1px solid #55BC7E",
                                background: "none",
                              }}
                              placeholder={this.state.firstname}
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
                              style={{
                                border: "1px solid #55BC7E",
                                background: "none",
                              }}
                              placeholder={this.state.lastname}
                              onChange={(e) => {
                                this.setLastname(e);
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
                              Role
                            </label>
                            <input
                              type="string"
                              class="form-control"
                              style={{
                                border: "1px solid #55BC7E",
                                background: "none",
                              }}
                              placeholder={this.state.role}
                              readOnly="readonly"
                            />
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label
                              style={{ color: "#000000" }}
                              class="control-label"
                            >
                              Email Address
                            </label>
                            <input
                              type="email"
                              class="form-control"
                              style={{
                                border: "1px solid #55BC7E",
                                background: "none",
                              }}
                              placeholder={this.state.email}
                              readOnly="readonly"
                            />
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label
                              style={{ color: "#000000" }}
                              class="control-label"
                            >
                              Skills
                            </label>
                            <input
                              type="text"
                              class="form-control"
                              style={{
                                border: "1px solid #55BC7E",
                                background: "none",
                              }}
                              placeholder={this.state.skills}
                              onChange={(e) => {
                                // let skills =this.state.skills.split(',')

                                this.setSkills(e);
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      <div class="col-12 text-center mt-4">
                        <Link
                          to="/view-profile"
                          style={{ background: "#55BC7E" }}
                          class="btn btn-common"
                          onClick={this.updateProfile}
                        >
                          Update Profile
                        </Link>
                        <Link
                          to="/view-profile"
                          style={{ marginLeft: "20px" }}
                          class="btn btn-danger"
                          onClick={this.deleteProfile}
                        >
                          Delete Account
                        </Link>
                      </div>
                    </form>
                  </div>
                </div>
                <div class="col-lg-2"></div>
              </div>
            </section>
          </>
        );
      } else if (this.state.role === "recruiter") {
        return (
          <>
            <section class="job-detail section pt-5">
              <div class="row">
                <div class="col-lg-2"></div>
                <div class="col-lg-8">
                  <div
                    class="page-login-form box"
                    style={{ boxShadow: " 0px 10px 22px #00000029" }}
                  >
                    <form class="login-form">
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
                              style={{
                                border: "1px solid #55BC7E",
                                background: "none",
                              }}
                              placeholder={this.state.firstname}
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
                              style={{
                                border: "1px solid #55BC7E",
                                background: "none",
                              }}
                              placeholder={this.state.lastname}
                              onChange={(e) => {
                                this.setLastname(e);
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
                              Role
                            </label>
                            <input
                              type="string"
                              class="form-control"
                              style={{
                                border: "1px solid #55BC7E",
                                background: "none",
                              }}
                              placeholder={this.state.role}
                              readOnly="readonly"
                            />
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label
                              style={{ color: "#000000" }}
                              class="control-label"
                            >
                              Email Address
                            </label>
                            <input
                              type="email"
                              class="form-control"
                              style={{
                                border: "1px solid #55BC7E",
                                background: "none",
                              }}
                              placeholder={this.state.email}
                              readOnly="readonly"
                            />
                          </div>
                        </div>

                        <div class="col-md-6">
                          <div class="form-group">
                            <label
                              style={{ color: "#000000" }}
                              class="control-label"
                            >
                              Phone Number
                            </label>
                            <input
                              type="email"
                              class="form-control"
                              style={{
                                border: "1px solid #55BC7E",
                                background: "none",
                              }}
                              placeholder={this.state.phone_number}
                              onChange={(e) => {
                                this.setPhoneNo(e);
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
                              TagLine
                            </label>
                            <input
                              type="email"
                              class="form-control"
                              style={{
                                border: "1px solid #55BC7E",
                                background: "none",
                              }}
                              placeholder={this.state.headlineR}
                              onChange={(e) => {
                                this.setTagline(e);
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
                              Company
                            </label>
                            <input
                              type="email"
                              class="form-control"
                              style={{
                                border: "1px solid #55BC7E",
                                background: "none",
                              }}
                              placeholder={this.state.companyR}
                              onChange={(e) => {
                                this.setCompany(e);
                              }}
                            />
                          </div>
                        </div>

                        {/* {this.state.address.map((data, fields) => {
                            return (
                              <> */}
                        <div class="col-md-6">
                          <div class="form-group">
                            <label
                              style={{ color: "#000000" }}
                              class="control-label"
                            >
                              Street
                            </label>
                            <input
                              type="email"
                              class="form-control"
                              style={{
                                border: "1px solid #55BC7E",
                                background: "none",
                              }}
                              placeholder={this.state.street}
                              onChange={(e) => {
                                this.setStreet(e);
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
                              City
                            </label>
                            <input
                              type="email"
                              class="form-control"
                              style={{
                                border: "1px solid #55BC7E",
                                background: "none",
                              }}
                              placeholder={this.state.city}
                              onChange={(e) => {
                                this.setCity(e);
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
                              State
                            </label>
                            <input
                              type="email"
                              class="form-control"
                              style={{
                                border: "1px solid #55BC7E",
                                background: "none",
                              }}
                              placeholder={this.state.stateP}
                              onChange={(e) => {
                                this.setPState(e);
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
                              Country
                            </label>
                            <input
                              type="email"
                              class="form-control"
                              style={{
                                border: "1px solid #55BC7E",
                                background: "none",
                              }}
                              placeholder={this.state.country}
                              onChange={(e) => {
                                this.setCountry(e);
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
                              ZipCode
                            </label>
                            <input
                              type="email"
                              class="form-control"
                              style={{
                                border: "1px solid #55BC7E",
                                background: "none",
                              }}
                              placeholder={this.state.zipcode}
                              onChange={(e) => {
                                this.setZipcode(e);
                              }}
                            />
                          </div>
                        </div>
                        {/* </>
                            );
                          })} */}
                      </div>
                      <div class="col-12 text-center mt-4">
                        <Link
                          to="/view-profile"
                          style={{ background: "#55BC7E" }}
                          class="btn btn-common"
                          onClick={this.updateProfile}
                        >
                          Update Profile
                        </Link>
                        <Link
                          to="/view-profile"
                          style={{ marginLeft: "20px" }}
                          class="btn btn-danger"
                          onClick={this.deleteProfile}
                        >
                          Delete Account
                        </Link>
                      </div>
                    </form>
                  </div>
                </div>
                <div class="col-lg-2"></div>
              </div>
            </section>
          </>
        );
      } else {
        return <></>;
      }
    }
  };

  componentDidMount() {
    this.getUser();
  }
  render() {
    return (
      <>
        <div class="page-header">
          <div class="container">
            <div class="row">
              <div class="col-lg-12">
                <div class="inner-header">
                  <h3>My Profile </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
        {this.loggedIn()}
      </>
    );
  }
}

export default ViewProfile;
