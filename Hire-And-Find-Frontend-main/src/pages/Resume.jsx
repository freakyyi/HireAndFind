import React, { Component } from "react";
import { Link } from "react-router-dom";
// import Popup from './PopUp';

const requests = require("../axios/requests");
const ls = require("local-storage");
class Resume extends Component {
  state = {
    experience: "",
    firstName: "",
    lastName: "",
    profession: "",
    city: "",
    state: "",
    zipcode: "",
    phone: "",
    email: "",
    jobTitle: "",
    employer: "",
    cityW: "",
    stateW: "",
    startDateW: "",
    endDateW: "",
    workHistory: [],
    institution: "",
    degree: "",
    startDate: "",
    endDate: "",
    education: [],
    skills: [],
    summary: "",
    id: ls.get("id"),
    token: ls.get("token"),
    role: ls.get("role"),
    cv: ls.get("cvId"),
  };

  // componentDidMount(){
  //     this.loggedIn
  // }

  selectExperience(e) {
    if (e.target.value === "zeroToThree") {
      this.setState({
        experience: e.target.value,
      });
    } else if (e.target.value === "threeToFive") {
      this.setState({
        experience: e.target.value,
      });
    } else if (e.target.value === "fiveToTen") {
      this.setState({
        experience: e.target.value,
      });
    } else {
      this.setState({
        experience: e.target.value,
      });
    }
  }
  setWorkHistory() {
    let wh = {
      jobTitle: this.state.jobTitle,
      employer: this.state.employer,
      cityW: this.state.cityW,
      stateW: this.state.stateW,
      startDateW: this.state.startDateW,
      endDateW: this.state.endDateW,
    };
    this.state.workHistory.push(wh);
    document.getElementById("whtable").style.display = "block";
    this.setState({
      jobTitle: "",
      employer: "",
      cityW: "",
      stateW: "",
      startDateW: "",
      endDateW: "",
    });
  }
  setJobTitle(e) {
    this.setState({
      jobTitle: e.target.value,
    });
  }
  setEmployer(e) {
    this.setState({
      employer: e.target.value,
    });
  }
  setCityW(e) {
    this.setState({
      cityW: e.target.value,
    });
  }
  setStateW(e) {
    this.setState({
      stateW: e.target.value,
    });
  }
  setStartDateW(e) {
    this.setState({
      startDateW: e.target.value,
    });
  }
  setEndDateW(e) {
    this.setState({
      endDateW: e.target.value,
    });
  }
  setEducation() {
    let edu = {
      institution: this.state.institution,
      degree: this.state.degree,
      startDate: this.state.startDate,
      endDate: this.state.endDate,
    };

    this.state.education.push(edu);
    document.getElementById("edutable").style.display = "block";
    this.setState({
      institution: "",
      degree: "",
      startDate: "",
      endDate: "",
    });
  }

  setInstitution(e) {
    this.setState({
      institution: e.target.value,
    });
  }
  setDegree(e) {
    this.setState({
      degree: e.target.value,
    });
  }
  setStartDate(e) {
    this.setState({
      startDate: e.target.value,
    });
  }
  setEndDate(e) {
    this.setState({
      endDate: e.target.value,
    });
  }
  setFirstname(e) {
    this.setState({
      firstName: e.target.value,
    });
  }

  setLastName(e) {
    this.setState({
      lastName: e.target.value,
    });
  }
  setProfession(e) {
    this.setState({
      profession: e.target.value,
    });
  }
  setCity(e) {
    this.setState({
      city: e.target.value,
    });
  }
  setstate(e) {
    this.setState({
      state: e.target.value,
    });
  }
  setZipcode(e) {
    this.setState({
      zipcode: e.target.value,
    });
  }
  setPhone(e) {
    this.setState({
      phone: e.target.value,
    });
  }
  setEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }
  setSkills(e) {
    this.setState({
      skills: e.target.value,
    });
  }

  setSummary(e) {
    this.setState({
      summary: e.target.value,
    });
  }
  postCV = async () => {
    try {
      let results;

      if (
        this.state.experience !== "" ||
        this.state.firstName !== "" ||
        this.state.lastName !== "" ||
        this.state.profession !== "" ||
        this.state.city !== "" ||
        this.state.state !== "" ||
        this.state.zipcode !== "" ||
        this.state.phone !== "" ||
        this.state.email !== "" ||
        this.state.workHistory !== "" ||
        this.state.education !== "" ||
        this.state.skills !== "" ||
        this.state.summary !== ""
      ) {
        // let skills =this.state.skills.split(',')
        results = await requests.createCV(
          this.state.experience,
          this.state.firstName,
          this.state.lastName,
          this.state.profession,
          this.state.city,
          this.state.state,
          this.state.zipcode,
          this.state.phone,
          this.state.email,
          this.state.education,
          this.state.workHistory,
          this.state.skills,
          this.state.summary
        );

        if (results === null || results === undefined) {
          document.getElementById("error").style.display = "block";
          console.log("Please fill in the required details", results);
        } else if (results.status === "403") {
          console.log("cv already exists");
        }
        // else if(results === 500){
        //   console.log("you already have a CV")
        // }
        else {
          window.location.href = "/cv_preview";
          //  console.log("results when there was no submission " ,results)
        }
      }
    } catch (error) {
      console.log("Error is in total post CV: " + error);
    }
  };

  loggedIn = () => {
    if (
      this.state.id !== null ||
      this.state.token !== null ||
      this.state.id !== undefined ||
      this.state.token !== undefined ||
      this.state.role !== null ||
      this.state.role !== undefined ||
      this.state.role !== "recruiter"
    ) {
      if (this.state.role === "seeker" && this.state.cv === null) {
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
                    <div class="inner-header">
                      <h3
                        class="text-center"
                        style={{ textTransform: "capitalize" }}
                      >
                        How long have you been working?
                      </h3>
                    </div>
                    <div class="row">
                      <div
                        class="col-md-12"
                        onChange={(e) => {
                          this.selectExperience(e);
                        }}
                      >
                        <input
                          class="col-md-2"
                          type="radio"
                          value="zeroToThree"
                          name="jobPrimer"
                        />{" "}
                        0-3 Years
                        <input
                          class="col-md-2"
                          type="radio"
                          value="threeToFive"
                          name="jobPrimer"
                        />{" "}
                        3-5 Years
                        <input
                          class="col-md-2"
                          type="radio"
                          value="fiveToTen"
                          name="jobPrimer"
                        />{" "}
                        5-10 Years
                        <input
                          class="col-md-2"
                          type="radio"
                          value="tenPlus"
                          name="jobPrimer"
                        />{" "}
                        10+ Years
                      </div>
                    </div>
                    <div class="inner-header pt-5">
                      <h3
                        class="text-center"
                        style={{ textTransform: "capitalize" }}
                      >
                        What’s the best way for employers to contact you?
                      </h3>
                    </div>
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
                              id="firstname"
                              type="text"
                              class="form-control"
                              style={{
                                border: "1px solid #55BC7E",
                                background: "none",
                              }}
                              placeholder=""
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
                              placeholder=""
                              onChange={(e) => {
                                this.setLastName(e);
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      <div class="form-group">
                        <label
                          style={{ color: "#000000" }}
                          class="control-label"
                        >
                          Profession
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          style={{
                            border: "1px solid #55BC7E",
                            background: "none",
                          }}
                          placeholder=""
                          onChange={(e) => {
                            this.setProfession(e);
                          }}
                        />
                      </div>
                      <div class="row">
                        <div class="col-md-4">
                          <div class="form-group">
                            <label
                              style={{ color: "#000000" }}
                              class="control-label"
                            >
                              City
                            </label>
                            <input
                              type="text"
                              class="form-control"
                              style={{
                                border: "1px solid #55BC7E",
                                background: "none",
                              }}
                              placeholder=""
                              onChange={(e) => {
                                this.setCity(e);
                              }}
                            />
                          </div>
                        </div>
                        <div class="col-md-4">
                          <div class="form-group">
                            <label
                              style={{ color: "#000000" }}
                              class="control-label"
                            >
                              State/Province
                            </label>
                            <input
                              type="text"
                              class="form-control"
                              style={{
                                border: "1px solid #55BC7E",
                                background: "none",
                              }}
                              placeholder=""
                              onChange={(e) => {
                                this.setstate(e);
                              }}
                            />
                          </div>
                        </div>
                        <div class="col-md-4">
                          <div class="form-group">
                            <label
                              style={{ color: "#000000" }}
                              class="control-label"
                            >
                              Zip Code
                            </label>
                            <input
                              type="text"
                              class="form-control"
                              style={{
                                border: "1px solid #55BC7E",
                                background: "none",
                              }}
                              placeholder=""
                              onChange={(e) => {
                                this.setZipcode(e);
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-6">
                          <div class="form-group">
                            <label
                              style={{ color: "#000000" }}
                              class="control-label"
                            >
                              Phone
                            </label>
                            <input
                              type="number"
                              class="form-control"
                              style={{
                                border: "1px solid #55BC7E",
                                background: "none",
                              }}
                              placeholder=""
                              onChange={(e) => {
                                this.setPhone(e);
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
                              Email Address
                            </label>
                            <input
                              type="email"
                              class="form-control"
                              style={{
                                border: "1px solid #55BC7E",
                                background: "none",
                              }}
                              placeholder=""
                              onChange={(e) => {
                                this.setEmail(e);
                              }}
                            />
                          </div>
                        </div>
                      </div>

                      <div class="inner-header pt-3">
                        <h3
                          class="text-center"
                          style={{ textTransform: "capitalize" }}
                        >
                          Now, let’s fill out your work history
                        </h3>
                      </div>
                      <div class="row">
                        <div class="col-md-6">
                          <div class="form-group">
                            <label
                              style={{ color: "#000000" }}
                              class="control-label"
                            >
                              Job Title
                            </label>
                            <input
                              type="text"
                              class="form-control"
                              style={{
                                border: "1px solid #55BC7E",
                                background: "none",
                              }}
                              placeholder=""
                              value={this.state.jobTitle}
                              required="true"
                              onChange={(e) => {
                                this.setJobTitle(e);
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
                              Employer
                            </label>
                            <input
                              type="text"
                              class="form-control"
                              style={{
                                border: "1px solid #55BC7E",
                                background: "none",
                              }}
                              value={this.state.employer}
                              placeholder=""
                              required="true"
                              onChange={(e) => {
                                this.setEmployer(e);
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-6">
                          <div class="form-group">
                            <label
                              style={{ color: "#000000" }}
                              class="control-label"
                            >
                              City
                            </label>
                            <input
                              type="text"
                              class="form-control"
                              style={{
                                border: "1px solid #55BC7E",
                                background: "none",
                              }}
                              value={this.state.city}
                              placeholder=""
                              required="true"
                              onChange={(e) => {
                                this.setCityW(e);
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
                              type="text"
                              class="form-control"
                              value={this.state.stateW}
                              style={{
                                border: "1px solid #55BC7E",
                                background: "none",
                              }}
                              placeholder=""
                              required="true"
                              onChange={(e) => {
                                this.setStateW(e);
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-6">
                          <div class="form-group">
                            <label
                              style={{ color: "#000000" }}
                              class="control-label"
                            >
                              Start Date
                            </label>
                            <input
                              type="date"
                              class="form-control"
                              style={{
                                border: "1px solid #55BC7E",
                                background: "none",
                              }}
                              value={this.state.startDateW}
                              placeholder=""
                              required="true"
                              onChange={(e) => {
                                this.setStartDateW(e);
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
                              End Date
                            </label>
                            <input
                              type="date"
                              class="form-control"
                              style={{
                                border: "1px solid #55BC7E",
                                background: "none",
                              }}
                              value={this.state.endDateW}
                              placeholder=""
                              required="true"
                              onChange={(e) => {
                                this.setEndDateW(e);
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-10"></div>
                        <div class="col-md-2 mt-3">
                          <Link
                            class="mt-3"
                            style={{
                              background: "#55BC7E",
                              width: "30px",
                              height: "28px",
                              padding: "15px",
                              borderRadius: "100%",
                            }}
                            onClick={() => {
                              this.setWorkHistory();
                            }}
                          >
                            <i class="lni-plus" style={{ color: "white" }}></i>
                          </Link>
                        </div>
                      </div>
                      <table id="whtable" style={{ display: "none" }}>
                        <tr>
                          <th>Title</th>
                          <th>Employer</th>
                          <th>City</th>
                          <th>State</th>
                          <th>Starting date</th>
                          <th>Ending date</th>
                        </tr>

                        {this.state.workHistory.map((data, fields) => {
                          return (
                            <tr>
                              <td>{data.jobTitle}</td>
                              <td>{data.employer}</td>
                              <td>{data.cityW}</td>
                              <td>{data.stateW}</td>
                              <td>{data.startDateW}</td>
                              <td>{data.endDateW}</td>
                            </tr>
                          );
                        })}
                      </table>

                      <div class="inner-header pt-3">
                        <h3
                          class="text-center"
                          style={{ textTransform: "capitalize" }}
                        >
                          Great, let’s work on your Education
                        </h3>
                      </div>
                      <div class="row">
                        <div class="col-md-6">
                          <div class="form-group">
                            <label
                              style={{ color: "#000000" }}
                              class="control-label"
                            >
                              Institution
                            </label>
                            <input
                              type="text"
                              class="form-control"
                              style={{
                                border: "1px solid #55BC7E",
                                background: "none",
                              }}
                              value={this.state.institution}
                              placeholder=""
                              onChange={(e) => {
                                this.setInstitution(e);
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
                              Degree
                            </label>
                            <input
                              type="text"
                              class="form-control"
                              style={{
                                border: "1px solid #55BC7E",
                                background: "none",
                              }}
                              value={this.state.degree}
                              placeholder=""
                              onChange={(e) => {
                                this.setDegree(e);
                              }}
                            />
                          </div>
                        </div>
                      </div>

                      <div class="row">
                        <div class="col-md-6">
                          <div class="form-group">
                            <label
                              style={{ color: "#000000" }}
                              class="control-label"
                            >
                              Start Date
                            </label>
                            <input
                              type="date"
                              class="form-control"
                              style={{
                                border: "1px solid #55BC7E",
                                background: "none",
                              }}
                              value={this.state.startDate}
                              placeholder=""
                              onChange={(e) => {
                                this.setStartDate(e);
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
                              End Date
                            </label>
                            <input
                              type="date"
                              class="form-control"
                              style={{
                                border: "1px solid #55BC7E",
                                background: "none",
                              }}
                              value={this.state.endDate}
                              placeholder=""
                              onChange={(e) => {
                                this.setEndDate(e);
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-10"></div>
                        <div class="col-md-2 mt-3">
                          <Link
                            class="mt-3"
                            style={{
                              background: "#55BC7E",
                              width: "30px",
                              height: "28px",
                              padding: "15px",
                              borderRadius: "100%",
                            }}
                            onClick={() => {
                              this.setEducation();
                            }}
                          >
                            <i class="lni-plus" style={{ color: "white" }}></i>
                          </Link>
                        </div>
                      </div>
                      <table id="edutable" style={{ display: "none" }}>
                        <tr>
                          <th>Institution</th>
                          <th>Degree</th>
                          <th>Starting date</th>
                          <th>Ending date</th>
                        </tr>

                        {this.state.education.map((data, fields) => {
                          return (
                            <tr>
                              <td>{data.institution}</td>
                              <td>{data.degree}</td>
                              <td>{data.startDate}</td>
                              <td>{data.endDate}</td>
                            </tr>
                          );
                        })}
                      </table>
                      <div class="form-group">
                        <label
                          style={{ color: "#000000" }}
                          class="control-label"
                        >
                          Skills [ Separated By Comma ]
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          style={{
                            border: "1px solid #55BC7E",
                            background: "none",
                          }}
                          onChange={(e) => {
                            this.setSkills(e);
                          }}
                          placeholder=""
                        />
                      </div>
                      <div class="inner-header pt-3">
                        <h3
                          class="text-center"
                          style={{ textTransform: "capitalize" }}
                        >
                          Finally, let’s work on your summary
                        </h3>
                      </div>
                      <div class="form-group">
                        <label
                          style={{ color: "#000000" }}
                          class="control-label"
                        ></label>
                        <textarea
                          type="text"
                          rows="8"
                          class="form-control"
                          style={{
                            border: "1px solid #55BC7E",
                            background: "none",
                          }}
                          placeholder="Write your summary here....."
                          onChange={(e) => {
                            this.setSummary(e);
                          }}
                        ></textarea>
                      </div>
                      <div class="col-12 text-center mt-4">
                        <p id="error" style={{ display: "none" }}>
                          Please Fill in the required details
                        </p>
                        <Link
                          style={{ background: "#55BC7E" }}
                          class="btn btn-common"
                          onClick={this.postCV}
                        >
                          Save and View your CV
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
      } else if (this.state.role === "seeker" && this.state.cv !== null) {
        return (
          <>
            <div>
              <p
                style={{
                  marginBottom: "115px",
                  textAlign: "center",
                  marginTop: "106px",
                  fontSize: "25px",
                }}
              >
                CV already Exists, You can Update it , instead of creating a new
                one
                <br />
                <br />
                <Link to="/updatecv">Update</Link>
              </p>
            </div>
          </>
        );
      } else {
        return (
          <>
            <div>
              <p
                style={{
                  marginBottom: "174px",
                  textAlign: "center",
                  marginTop: "122px",
                  fontSize: "25px",
                }}
              >
                Sorry for the inconvenience , You have to be signed in as a
                Seeker in order to build your CV
              </p>
            </div>
          </>
        );
      }
    }
    // else {
    //   return (
    //     <>
    // <p>You already have a CV</p>
    //     </>
    //   )
    // }
  };
  render() {
    return (
      <>
        <div class="page-header">
          <div class="container">
            <div class="row">
              <div class="col-lg-12">
                <div class="inner-header">
                  <h3>
                    Build your resume with our <br /> industry-specific bullet
                    points
                  </h3>
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

export default Resume;
