import React from "react";
import { Link, Redirect } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import Flag from "./Flag";

import { Card } from "react-bootstrap";

import StarIcon from "@mui/icons-material/Star";
import Card1 from "./Model";

const requests = require("../axios/requests");
const ls = require("local-storage");

class Category extends React.Component {
  // const [show, setShow] = useState(false);

  handleClose = () => {
    this.setState({ show: false });
  };
  handleShow = (input) => async () => {
    if (this.state.id !== null) {
      if (this.state.cvId !== null) {
        let results = await requests.applyToJob(input);
        if (results) {
          window.location.href = "/jobsapplied";
        }
        console.log("results", results);
      } else {
        window.location.href = "/cv-resume";
      }
    } else {
      window.location.href = "/register";
    }
  };
  handleShow2 = (input) => async () => {
    if (this.state.id !== null) {
      if (this.state.cvId !== null) {
        window.location.href = `/test/${input}`;
      } else {
        window.location.href = "/cv-resume";
      }
    } else {
      window.location.href = "/register";
    }
  };
  handleShow3 = async () => {
    this.setState({ show: true });
  };
  state = {
    // title: "",
    // company: "",
    // date: "",
    // location: "",
    // salary: "",
    // description: "",
    // skills: "",
    show: false,
    jobs: [],
    filteredJobs: [],
    keywords: "",
    selectedLocation: "",
    category: "",
    id: ls.get("id"),
    cvId: ls.get("cvId"),
    remote: "",
    flag: 0,
  };

  setKeywords(e) {
    this.setState({
      keywords: e.target.value,
    });
  }

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

  // formatSkills(data){
  //   let a = ''
  //   for (let i = 0; i < data.length; i++) {
  //   a= a.concat(data[i].concat(','))

  //   }
  // }

  getJobs = async () => {
    try {
      if (
        this.state.keywords === "" ||
        this.state.selectedLocation === "" ||
        this.state.keywords === null ||
        this.state.selectedLocation === null
      ) {
        let results = await requests.getJobs();
        console.log("get jobs results", results);
        this.setState(
          {
            jobs: results,
            filteredJobs: results,
          },
          () => {
            console.log("jobs", this.state.jobs);
            console.log("filteredJobs", this.state.filteredJobs);
          }
        );
        // console.log("Filtered Jobs",this.state.filteredJobs)
      } else if (
        this.state.keywords !== "" ||
        this.state.selectedLocation !== "" ||
        this.state.keywords !== null ||
        this.state.selectedLocation !== null
      ) {
        console.log("NULL");
      }
    } catch (error) {
      console.log(error);
    }
  };
  componentDidMount() {
    this.getJobs();
  }
  filterResults = () => {
    let keywords = this.state.keywords;
    let location = this.state.selectedLocation;
    var newArray = this.state.jobs.filter((el) => {
      if (keywords === "" && location === "") {
        return this.state.filteredJobs;
      } else if (
        el.title.toLowerCase().includes(keywords.toLowerCase()) &&
        el.selectedLocation.toLowerCase().includes(location.toLowerCase())
      ) {
        return this.state.filteredJobs;
      }
    });
    this.setState({
      filteredJobs: newArray,
    });

    console.log("Filtered After Matching New Array", this.state.filteredJobs);

    // console.log("Filtereb Jobs",filteredJobs)
  };
  handleChange = (input) => (e) => {
    let newArray = [];

    newArray = this.state.jobs.filter((data, i) => {
      return data.category === input;
    });

    this.setState({ filteredJobs: newArray });
    if (e.target.checked === true) {
      this.setState({ category: input });
    } else {
      this.setState({ category: "" });
      this.setState({ filteredJobs: this.state.jobs });
    }
  };

  handleRemote = (e) => {
    this.setState({ category: "" });
    if (e.target.value === "0") {
      console.log("00");
      this.setState({ remote: "" });
      this.setState({ filteredJobs: this.state.jobs });
    }
    if (e.target.value === "Remote") {
      let newArray = [];

      newArray = this.state.jobs.filter((data, i) => {
        return data.jobPrimer === "Yes";
      });

      this.setState({ filteredJobs: newArray });

      this.setState({
        remote: e.target.value,
      });
    } else if (e.target.value === "Non Remote") {
      let newArray = [];

      newArray = this.state.jobs.filter((data, i) => {
        return data.jobPrimer === "No";
      });
      this.setState({
        remote: e.target.value,
      });
      this.setState({ filteredJobs: newArray });
    }
  };

  render() {
    console.log("category", this.state.category);
    return (
      <>
        <div className="categorycontainer">
          <div className="page-header">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="inner-header">
                    <h3>Your Dream Job Is Waiting for you</h3>
                  </div>
                  <div className="job-search-form bg-cyan1 job-featured-search">
                    <form>
                      <div className="row justify-content-center">
                        <div className="col-lg-5 col-md-5 col-xs-12">
                          <div className="form-group  bg-cyan">
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Job title or keywords"
                              onChange={(e) => {
                                this.setKeywords(e);
                              }}
                            />
                          </div>
                        </div>
                        <div className="col-lg-5 col-md-5 col-xs-12">
                          <div className="form-group">
                            <div className="search-category-container">
                              <label className="styled-select">
                                <select
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
                                  <option value="bhawalnagar">
                                    Bhawalnagar
                                  </option>
                                  <option value="hariPur">HariPur</option>
                                  <option value="sargodha">Sargodha</option>
                                  <option value="jehlum">Jehlum</option>
                                  <option value="mansehra">Mansehra</option>
                                  <option value="sahiwal">Sahiwal</option>
                                </select>
                              </label>
                            </div>
                            <i className="lni-map-marker"></i>
                          </div>
                        </div>
                        <div className="col-lg-1 col-md-1 col-xs-12">
                          <button
                            type="button"
                            className="button"
                            onClick={this.filterResults}
                          >
                            <i className="lni-search"></i>
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <section className="job-detail section pt-5">
            <div className="row">
              <div className="col-lg-3">
                <div
                  className="sideber ml-5"
                  style={{ boxShadow: "0px 10px 22px #00000029" }}
                >
                  <div className="widghet">
                    <h6 style={{ color: "black" }}>Search by job type</h6>
                  </div>
                  <div
                    className="form-group"
                    style={{
                      borderBottom: " 1px solid #344863",
                      paddingBottom: "30px",
                    }}
                  >
                    <div className="search-category-container">
                      <label className="styled-select">
                        <select
                          onChange={(e) => {
                            this.handleRemote(e);
                          }}
                        >
                          <option value={0}>Full time job</option>
                          <option value="Remote">Remote</option>
                          <option value="Non Remote">Non Remote</option>
                        </select>
                      </label>
                    </div>
                  </div>
                  <div className="widghet">
                    <h6 style={{ color: "black" }}>Select Job Category</h6>
                  </div>
                  <div
                    className="form-check"
                    style={{
                      borderBottom: " 1px solid #344863",
                      paddingBottom: "30px",
                    }}
                  >
                    <div className="row py-2">
                      <div className="col-lg-8 col-md-4 col-xs-2">
                        <label
                          className="form-check-label"
                          for="flexCheckDefault"
                        >
                          Information Technology
                        </label>
                      </div>
                      <div className="col-lg-2 col-md-4 col-xs-4">
                        <input
                          className="form-check-input text-right"
                          type="checkbox"
                          name="categories"
                          value=""
                          id="flexCheckDefault"
                          checked={
                            this.state.category === "Information Technology"
                          }
                          onChange={this.handleChange("Information Technology")}
                        />
                      </div>
                    </div>
                    <div className="row py-2">
                      <div className="col-lg-8 col-md-4 col-xs-2">
                        <label
                          className="form-check-label"
                          for="flexCheckDefault"
                        >
                          Edcuation/Training
                        </label>
                      </div>
                      <div className="col-lg-2 col-md-4 col-xs-4">
                        <input
                          className="form-check-input text-right"
                          type="checkbox"
                          name="categories"
                          value=""
                          id="flexCheckDefault"
                          checked={this.state.category === "Edcuation"}
                          onChange={this.handleChange("Edcuation")}
                        />
                      </div>
                    </div>
                    <div className="row py-2">
                      <div className="col-lg-8 col-md-4 col-xs-2">
                        <label
                          className="form-check-label"
                          for="flexCheckDefault"
                        >
                          Consultants
                        </label>
                      </div>
                      <div className="col-lg-2 col-md-4 col-xs-4">
                        <input
                          className="form-check-input text-right"
                          type="checkbox"
                          name="categories"
                          value=""
                          id="flexCheckDefault"
                          checked={this.state.category === "Consultants"}
                          onChange={this.handleChange("Consultants")}
                        />
                      </div>
                    </div>
                    <div className="row py-2">
                      <div className="col-lg-8 col-md-4 col-xs-2">
                        <label
                          className="form-check-label"
                          for="flexCheckDefault"
                        >
                          Accounting / Taxation
                        </label>
                      </div>
                      <div className="col-lg-2 col-md-4 col-xs-4">
                        <input
                          className="form-check-input text-right"
                          type="checkbox"
                          name="categories"
                          value=""
                          id="flexCheckDefault"
                          checked={this.state.category === "Accounting"}
                          onChange={this.handleChange("Accounting")}
                        />
                      </div>
                    </div>
                    <div className="row py-2">
                      <div className="col-lg-8 col-md-4 col-xs-2">
                        <label
                          className="form-check-label"
                          for="flexCheckDefault"
                        >
                          Health And Fitness
                        </label>
                      </div>
                      <div className="col-lg-2 col-md-4 col-xs-4">
                        <input
                          className="form-check-input text-right"
                          type="checkbox"
                          name="categories"
                          value=""
                          id="flexCheckDefault"
                          checked={this.state.category === "Health And Fitness"}
                          onChange={this.handleChange("Health And Fitness")}
                        />
                      </div>
                    </div>
                    <div className="row py-2">
                      <div className="col-lg-8 col-md-4 col-xs-2">
                        <label
                          className="form-check-label"
                          for="flexCheckDefault"
                        >
                          Call Centre
                        </label>
                      </div>
                      <div className="col-lg-2 col-md-4 col-xs-4">
                        <input
                          className="form-check-input text-right"
                          type="checkbox"
                          name="categories"
                          value=""
                          id="flexCheckDefault"
                          checked={this.state.category === "Call Centre"}
                          onChange={this.handleChange("Call Centre")}
                        />
                      </div>
                    </div>
                    <div className="row py-2">
                      <div className="col-lg-8 col-md-4 col-xs-2">
                        <label
                          className="form-check-label"
                          for="flexCheckDefault"
                        >
                          Electronics
                        </label>
                      </div>
                      <div className="col-lg-2 col-md-4 col-xs-4">
                        <input
                          className="form-check-input text-right"
                          type="checkbox"
                          name="categories"
                          value=""
                          id="flexCheckDefault"
                          checked={this.state.category === "Electronics"}
                          onChange={this.handleChange("Electronics")}
                        />
                      </div>
                    </div>
                    <div className="row py-2">
                      <div className="col-lg-8 col-md-4 col-xs-2">
                        <label
                          className="form-check-label"
                          for="flexCheckDefault"
                        >
                          Engineering
                        </label>
                      </div>
                      <div className="col-lg-2 col-md-4 col-xs-4">
                        <input
                          className="form-check-input text-right"
                          type="checkbox"
                          name="categories"
                          value=""
                          id="flexCheckDefault"
                          checked={this.state.category === "Engineering"}
                          onChange={this.handleChange("Engineering")}
                        />
                      </div>
                    </div>
                    <div className="row py-2">
                      <div className="col-lg-8 col-md-4 col-xs-2">
                        <label
                          className="form-check-label"
                          for="flexCheckDefault"
                        >
                          Media/Communications
                        </label>
                      </div>
                      <div className="col-lg-2 col-md-4 col-xs-4">
                        <input
                          className="form-check-input text-right"
                          type="checkbox"
                          name="categories"
                          value=""
                          id="flexCheckDefault"
                          checked={this.state.category === "Media"}
                          onChange={this.handleChange("Media")}
                        />
                      </div>
                    </div>
                    <div className="row py-2">
                      <div className="col-lg-8 col-md-4 col-xs-2">
                        <label
                          className="form-check-label"
                          for="flexCheckDefault"
                        >
                          Real Estate/Property
                        </label>
                      </div>
                      <div className="col-lg-2 col-md-4 col-xs-4">
                        <input
                          className="form-check-input text-right"
                          type="checkbox"
                          name="categories"
                          value=""
                          id="flexCheckDefault"
                          checked={this.state.category === "Real Estate"}
                          onChange={this.handleChange("Real Estate")}
                        />
                      </div>
                    </div>
                    <div className="row py-2">
                      <div className="col-lg-8 col-md-4 col-xs-2">
                        <label
                          className="form-check-label"
                          for="flexCheckDefault"
                        >
                          Banking/Financial Services
                        </label>
                      </div>
                      <div className="col-lg-2 col-md-4 col-xs-4">
                        <input
                          className="form-check-input text-right"
                          type="checkbox"
                          name="categories"
                          value=""
                          id="flexCheckDefault"
                          checked={this.state.category === "Banking"}
                          onChange={this.handleChange("Banking")}
                        />
                      </div>
                    </div>
                    <div className="row py-2">
                      <div className="col-lg-8 col-md-4 col-xs-2">
                        <label
                          className="form-check-label"
                          for="flexCheckDefault"
                        >
                          Advertising / PR
                        </label>
                      </div>
                      <div className="col-lg-2 col-md-4 col-xs-4">
                        <input
                          className="form-check-input text-right"
                          type="checkbox"
                          name="categories"
                          value=""
                          id="flexCheckDefault"
                          checked={this.state.category === "Advertising"}
                          onChange={this.handleChange("Advertising")}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="widghet mt-3">
                    <h6 style={{ color: "black" }}>Experience</h6>
                  </div>
                  <div
                    className="form-check"
                    style={{
                      borderBottom: " 1px solid #344863",
                      paddingBottom: "30px",
                    }}
                  >
                    <div className="row py-2">
                      <div className="col-lg-8 col-md-4 col-xs-2">
                        <label
                          className="form-check-label"
                          for="flexCheckDefault"
                        >
                          Less than 3 Years
                        </label>
                      </div>
                      <div className="col-lg-2 col-md-4 col-xs-4">
                        <input
                          className="form-check-input text-right"
                          type="checkbox"
                          value=""
                          id="flexCheckDefault"
                        />
                      </div>
                    </div>
                    <div className="row py-2">
                      <div className="col-lg-8 col-md-4 col-xs-2">
                        <label
                          className="form-check-label"
                          for="flexCheckDefault"
                        >
                          3-5 Years
                        </label>
                      </div>
                      <div className="col-lg-2 col-md-4 col-xs-4">
                        <input
                          className="form-check-input text-right"
                          type="checkbox"
                          value=""
                          id="flexCheckDefault"
                        />
                      </div>
                    </div>
                    <div className="row py-2">
                      <div className="col-lg-8 col-md-4 col-xs-2">
                        <label
                          className="form-check-label"
                          for="flexCheckDefault"
                        >
                          5-10 Years
                        </label>
                      </div>
                      <div className="col-lg-2 col-md-4 col-xs-4">
                        <input
                          className="form-check-input text-right"
                          type="checkbox"
                          value=""
                          id="flexCheckDefault"
                        />
                      </div>
                    </div>
                    <div className="row py-2">
                      <div className="col-lg-8 col-md-4 col-xs-2">
                        <label
                          className="form-check-label"
                          for="flexCheckDefault"
                        >
                          More than 10 Years
                        </label>
                      </div>
                      <div className="col-lg-2 col-md-4 col-xs-4">
                        <input
                          className="form-check-input text-right"
                          type="checkbox"
                          value=""
                          id="flexCheckDefault"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-8">
                {this.state.filteredJobs.map((data, fields) => {
                  return (
                    <>
                      <Card1 data={data} />
                    </>
                  );
                })}
              </div>
            </div>
          </section>
        </div>
      </>
    );
  }
}

export default Category;
