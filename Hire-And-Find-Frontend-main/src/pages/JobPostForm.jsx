import React, { Component } from "react";
import { Link } from "react-router-dom";
const requests = require("../axios/requests");
const ls = require("local-storage");
class JobPostForm extends Component {
  state = {
    selectedLocation: "",
    selectedCategory: "",
    selectedHires: "",
    company: "",
    title: "",
    jobPrimer: "",
    contractType: "",
    lowerSalary: "",
    upperSalary: "",
    description: "",
    skills: "",
    jobs: [],
    id: ls.get("id"),
    token: ls.get("token"),
    role: ls.get("role"),
  };

  selectLocation(e) {
    if (e.target.value === 0) {
      this.setState({
        selectedLocation: "",
      });
    } else {
      this.setState({
        selectedLocation: e.target.value,
      });
    }
  }

  setCompany(e) {
    this.setState({
      company: e.target.value,
    });
  }

  setTitle(e) {
    this.setState({
      title: e.target.value,
    });
  }

  setDescription(e) {
    this.setState({
      description: e.target.value,
    });
  }

  selectCategory(e) {
    if (e.target.value === 0) {
      this.setState({
        selectedCategory: "",
      });
    } else {
      this.setState({
        selectedCategory: e.target.value,
      });
    }
  }

  selectHires(e) {
    if (e.target.value !== 0) {
      this.setState({
        selectedHires: e.target.value,
      });
    } else {
      this.setState({
        selectedHires: "N/A",
      });
    }
  }
  setSkills(e) {
    this.setState({
      skills: e.target.value,
    });
  }

  selectJobPrimer(e) {
    if (e.target.value === "No") {
      this.setState({
        jobPrimer: e.target.value,
      });
    } else {
      this.setState({
        jobPrimer: e.target.value,
      });
    }
  }

  selectContractType(e) {
    if (e.target.value === "Temporarily") {
      this.setState({
        contractType: e.target.value,
      });
    } else {
      this.setState({
        contractType: e.target.value,
      });
    }
  }

  setLowerSalary(e) {
    this.setState({
      lowerSalary: e.target.value,
    });
  }
  setUpperSalary(e) {
    this.setState({
      upperSalary: e.target.value,
    });
  }
  checkEmpty = async () => {
    document.getElementById("error").style.display = "block";
  };
  postJob = async () => {
    try {
      if (
        this.state.selectedLocation !== null ||
        this.state.selectedCategory !== null ||
        this.state.selectedHires !== null ||
        this.state.company !== null ||
        this.state.title !== null ||
        this.state.jobPrimer !== null ||
        this.state.contractType !== null ||
        this.state.lowerSalary !== null ||
        this.state.upperSalary !== null ||
        this.state.description !== null ||
        this.state.skills !== null
      ) {
        console.log("im in post job");
        let skills = this.state.skills.split(",");

        let results = await requests.postJob(
          this.state.company,
          this.state.title,
          this.state.selectedCategory,
          this.state.selectedLocation,
          this.state.jobPrimer,
          this.state.selectedHires,
          this.state.contractType,
          this.state.upperSalary,
          this.state.lowerSalary,
          this.state.description,
          skills
        );

        if (results === null) {
          document.getElementById("error").style.display = "block";
          console.log("Please fill in the required details", results);
        } else {
          window.location.href = "/category";
        }
      } else {
        console.log(
          "Please fill in the required details, this is the major if"
        );
        // <>
        // <h4>Please fill in the required details</h4>
        // </>
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
      this.state.role !== undefined ||
      this.state.role !== "seeker"
    ) {
      if (this.state.role === "recruiter") {
        return (
          <>
            <section class="job-detail section pt-5">
              <div class="row">
                <div class="col-lg-2"></div>
                <div class="col-lg-8">
                  <div
                    class="page-login-form box"
                    style={{ boxShadow: "0px 10px 22px #00000029" }}
                  >
                    <div class="inner-header">
                      <h3
                        class="text-center"
                        style={{ textTransform: "capitalize" }}
                      >
                        Let's get started
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
                              Company Name
                            </label>
                            <input
                              type="text"
                              class="form-control"
                              onChange={(e) => {
                                this.setCompany(e);
                              }}
                              style={{
                                border: "1px solid #55BC7E",
                                background: "none",
                              }}
                              placeholder=""
                            />
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label
                              style={{ color: "#000000" }}
                              class="control-label"
                            >
                              Category
                            </label>
                            <div class="search-category-container">
                              <label class="styled-select">
                                <select
                                  style={{
                                    border: "1px solid #55BC7E",
                                    background: "none",
                                  }}
                                  onChange={(e) => {
                                    this.selectCategory(e);
                                  }}
                                >
                                  <option value={0}>Categories</option>
                                  <option value="Information Technology">
                                    Information Technology
                                  </option>
                                  <option value="Edcuation">
                                    Edcuation/Training
                                  </option>
                                  <option value="Consultants">
                                    Consultants
                                  </option>
                                  <option value="Call Centre">
                                    Call Centre
                                  </option>
                                  <option value="Accounting">
                                    Accounting / Taxation
                                  </option>
                                  <option value="Electronics">
                                    Electronics
                                  </option>
                                  <option value="Health And Fitness">
                                    Health And Fitness
                                  </option>
                                  <option value="Engineering">
                                    Engineering
                                  </option>
                                  <option value="Media">
                                    Media/Communications
                                  </option>
                                  <option value="Real Estate">
                                    Real Estate/Property
                                  </option>
                                  <option value="Banking">
                                    Banking/Financial Services
                                  </option>
                                  <option value="Advertising">
                                    Advertising / PR
                                  </option>
                                </select>
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="form-group">
                        <label
                          style={{ color: "#000000" }}
                          class="control-label"
                        >
                          Job title
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
                            this.setTitle(e);
                          }}
                        />
                      </div>
                      <div class="form-group">
                        <label
                          style={{ color: "#000000" }}
                          class="control-label"
                        >
                          Choose Your Location
                        </label>
                        <div class="search-category-container">
                          <label class="styled-select">
                            <select
                              style={{
                                border: "1px solid #55BC7E",
                                background: "none",
                              }}
                              onChange={(e) => {
                                this.selectLocation(e);
                              }}
                            >
                              <option value={0}>Locations</option>
                              <option value="islamabad">Islamabad</option>
                              <option value="lahore">Lahore</option>
                              <option value="rawalpindi">Rawalpindi</option>
                              <option value="sialkot">Sialkot</option>
                              <option value="faislabad">Faislabad</option>
                              <option value="multan">Multan</option>
                              <option value="peshawar">Peshawar</option>
                              <option value="quetta">Quetta</option>
                              <option value="sargodha">Sargodha</option>
                              <option value="abbottabad">Abbottabad</option>
                              <option value="bhawalnagar">Bhawalnagar</option>
                              <option value="hariPur">HariPur</option>
                              <option value="sargodha">Sargodha</option>
                              <option value="jehlum">Jehlum</option>
                              <option value="mansehra">Mansehra</option>
                              <option value="sahiwal">Sahiwal</option>
                            </select>
                          </label>
                        </div>
                      </div>

                      <div class="inner-header pt-3">
                        <h3
                          class="text-center"
                          style={{ textTransform: "capitalize" }}
                        >
                          Can this job be performed remotely, meaning primarily
                          from home?
                        </h3>
                      </div>
                      <div class="row">
                        <div
                          class="col-md-12"
                          onChange={(e) => {
                            this.selectJobPrimer(e);
                          }}
                        >
                          <input
                            class="col-md-4"
                            type="radio"
                            value="Yes"
                            name="jobPrimer"
                          />{" "}
                          Yes
                          <input
                            class="col-md-4"
                            type="radio"
                            value="No"
                            name="jobPrimer"
                          />{" "}
                          No
                        </div>
                      </div>

                      <div class="inner-header pt-3">
                        <h3
                          class="text-center"
                          style={{ textTransform: "capitalize" }}
                        >
                          How many hires?
                        </h3>
                      </div>

                      <div class="form-group">
                        <label
                          style={{ color: "#000000" }}
                          class="control-label"
                        >
                          Number of hires
                        </label>
                        <div class="search-category-container">
                          <label class="styled-select">
                            <select
                              style={{
                                border: "1px solid #55BC7E",
                                background: "none",
                              }}
                              onChange={(e) => {
                                this.selectHires(e);
                              }}
                            >
                              <option value={0}>Specify</option>
                              <option value={"1"}>1</option>
                              <option value={"2"}>2</option>
                              <option value={"3"}>3</option>
                              <option value={"5-10"}>5-10</option>
                            </select>
                          </label>
                        </div>
                      </div>
                      <div class="form-group">
                        <label
                          style={{ color: "#000000" }}
                          class="control-label pb-3"
                        >
                          What contract type is it?
                        </label>
                        <div class="row">
                          <div
                            class="col-md-12"
                            onChange={(e) => {
                              this.selectContractType(e);
                            }}
                          >
                            <input
                              class="col-md-4"
                              type="radio"
                              value="Temporarily"
                              name="contractType"
                            />{" "}
                            Temporarily
                            <input
                              class="col-md-4"
                              type="radio"
                              value="Internship"
                              name="contractType"
                            />{" "}
                            Internship
                          </div>
                        </div>
                      </div>

                      <div class="inner-header pt-3">
                        <h3
                          class="text-center"
                          style={{ textTransform: "capitalize" }}
                        >
                          Salary
                        </h3>
                      </div>

                      <div className="row">
                        <div className="col-md-3">
                          <div className="form-group">
                            <input
                              type="text"
                              className="form-control"
                              style={{
                                border: "1px solid #55BC7E",
                                background: "none",
                              }}
                              onChange={(e) => {
                                this.setUpperSalary(e);
                              }}
                              placeholder="PKR 50,000"
                            />
                          </div>
                        </div>
                        <div className="col-md-3">
                          <h3
                            className="text-center"
                            style={{ textTransform: "capitalize" }}
                          >
                            To
                          </h3>
                        </div>
                        <div className="col-md-3">
                          <div className="form-group">
                            <input
                              type="text"
                              className="form-control"
                              style={{
                                border: "1px solid #55BC7E",
                                background: "none",
                              }}
                              placeholder="PKR 50,000"
                              onChange={(e) => {
                                this.setLowerSalary(e);
                              }}
                            />
                          </div>
                        </div>
                        <div className="col-md-3">
                          <h3>Per Month</h3>
                        </div>
                      </div>

                      <div className="inner-header pt-3">
                        <h3
                          className="text-center"
                          style={{ textTransform: "capitalize" }}
                        >
                          Job description
                        </h3>
                      </div>
                      <div className="form-group">
                        <label
                          style={{ color: "#000000" }}
                          className="control-label"
                        >
                          Describe the responsibilities of this job, required
                          work experience, skills, or education.
                        </label>
                        <textarea
                          type="text"
                          rows="8"
                          className="form-control"
                          style={{
                            border: "1px solid #55BC7E",
                            background: "none",
                          }}
                          placeholder=""
                          onChange={(e) => {
                            this.setDescription(e);
                          }}
                        />
                      </div>
                      <div className="form-group">
                        <label
                          style={{ color: "#000000" }}
                          className="control-label"
                        >
                          Skills [ Separated By Comma ]
                        </label>
                        <input
                          type="text"
                          className="form-control"
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

                      <div className="col-12 text-center mt-4">
                        <p id="error" style={{ display: "none" }}>
                          Please Fill in the required details
                        </p>
                        <button
                          className="btn btn-common"
                          type="button"
                          onClick={this.postJob}
                        >
                          Post The Job
                        </button>{" "}
                        {this.state.company !== "" &&
                        this.state.title !== "" &&
                        this.state.selectedCategory !== "" &&
                        this.state.selectedLocation !== "" &&
                        this.state.jobPrimer !== "" &&
                        this.state.selectedHires !== "" &&
                        this.state.contractType !== "" &&
                        this.state.upperSalary !== "" &&
                        this.state.lowerSalary !== "" &&
                        this.state.description !== "" &&
                        this.state.skills !== "" ? (
                          <Link
                            to={{
                              pathname: "/job-plans",
                              state: {
                                from: {
                                  data: {
                                    company: this.state.company,
                                    title: this.state.title,
                                    selectedCategory:
                                      this.state.selectedCategory,
                                    selectedLocation:
                                      this.state.selectedLocation,
                                    jobPrimer: this.state.jobPrimer,
                                    selectedHires: this.state.selectedHires,
                                    contractType: this.state.contractType,
                                    upperSalary: this.state.upperSalary,
                                    lowerSalary: this.state.lowerSalary,
                                    description: this.state.description,
                                    skills: this.state.skills,
                                  },
                                },
                              },
                            }}
                            className="ml-2 btn btn-common"
                          >
                            Post a Trending Job
                          </Link>
                        ) : (
                          <>
                            <p id="error" style={{ display: "none" }}>
                              Please Fill in the required details
                            </p>
                            <button
                              className="btn btn-common"
                              type="button"
                              onClick={this.checkEmpty}
                            >
                              Post a Trending Job
                            </button>{" "}
                          </>
                        )}
                      </div>
                    </form>
                  </div>
                </div>
                <div className="col-lg-2"></div>
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
                  marginBottom: "174px",
                  textAlign: "center",
                  marginTop: "100px",
                }}
              >
                You need to be signed in as a Recruiter
              </h3>
            </div>
          </>
        );
      }
    }
  };
  // componentDidMount() {

  //   this.loggedIn()

  // }

  render() {
    return (
      <>
        <div className="page-header">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="inner-header">
                  <h3>
                    <b style={{ color: "#55BC7E" }}>HAF</b> for employers <br />{" "}
                    Hire the perfect Employee
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div></div>
        {this.loggedIn()}
      </>
    );
  }
}

export default JobPostForm;
