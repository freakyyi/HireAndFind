/* eslint-disable jsx-a11y/role-supports-aria-props */
import React, { Component } from "react";
import { Link } from "react-router-dom";
import Temp1 from "./cv_templete/Temp1";
import Temp2 from "./cv_templete/Temp2";
import Temp3 from "./cv_templete/Temp3";
import Temp4 from "./cv_templete/Temp4";
const ls = require("local-storage");
const requests = require("../axios/requests");

class CvPreview extends Component {
  state = {
    experience: "",
    firstname: "",
    lastname: "",
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
  getCV = async () => {
    try {
      if (
        this.state.id !== null ||
        this.state.token !== null ||
        this.state.id !== undefined ||
        this.state.token !== undefined
      ) {
        if (this.state.cv !== null) {
          console.log("in full gham");
          let results = await requests.getCV(this.state.id);
          results = results[0];
          console.log("results of cv :", results);
          this.setState({
            firstname: results.firstName,
            lastname: results.lastName,
            profession: results.profession,
            zipcode: results.zipcode,
            city: results.city,
            state: results.state,
            phone: results.phone,
            email: results.email,
            skills: results.skills,
            experience: results.experience,
            education: results.education,
            workHistory: results.workHistory,
            summary: results.summary,
          });
          return <></>;
        } else if (this.state.cv === null) {
          console.log("Im in a state where there is no CV");
          return <></>;
        }
      } else {
        console.log("its null");
      }
    } catch (error) {
      console.log(error);
    }
  };
  componentDidMount() {
    this.getCV();
  }

  hasCV = () => {
    if (this.state.cv === null) {
      return (
        <>
          <div>
            <p
              style={{
                marginBottom: "108px",
                textAlign: "center",
                marginTop: "97px",
                fontSize: "25px",
              }}
            >
              Ahhh , Snap :( no cv found
              <br></br>
              <br></br>
              <Link to="cv-resume">Don't have a CV? Lets create it!</Link>
            </p>
          </div>
        </>
      );
    } else if (this.state.cv !== null) {
      return (
        <>
          <section class="job-detail section pt-5">
            <div class="row">
              <div class="col-lg-3"></div>
              <div class="col-lg-6">
                <div
                  class="page-login-form box"
                  style={{ boxShadow: " 0px 10px 22px #00000029" }}
                >
                  <div class="inner-header">
                    <h3 class="text-center" style={{ textTransform: "none" }}>
                      Take a look at your CV with our FOUR different templates
                    </h3>
                  </div>

                  <div class="row">
                    <div class="col-md-3">
                      <img
                        data-toggle="collapse"
                        data-target="#multiCollapseExample1"
                        aria-expanded="false"
                        aria-controls="multiCollapseExample1"
                        src="https://via.placeholder.com/150?text=Preview 1"
                        alt="Downlaod One"
                      />
                    </div>
                    <div class="col-md-3">
                      <img
                        data-toggle="collapse"
                        data-target="#multiCollapseExample2"
                        aria-expanded="false"
                        aria-controls="multiCollapseExample2"
                        src="https://via.placeholder.com/150?text=Preview 2"
                        alt="Downlaod One"
                      />
                    </div>
                    <div class="col-md-3">
                      <img
                        data-toggle="collapse"
                        data-target="#multiCollapseExample3"
                        aria-expanded="false"
                        aria-controls="multiCollapseExample3"
                        src="https://via.placeholder.com/150?text=Preview 3"
                        alt="Downlaod One"
                      />
                    </div>
                    <div class="col-md-3">
                      <img
                        data-toggle="collapse"
                        data-target="#multiCollapseExample4"
                        aria-expanded="false"
                        aria-controls="multiCollapseExample4"
                        src="https://via.placeholder.com/150?text=Preview 4"
                        alt="Downlaod One"
                      />
                    </div>
                  </div>

                  <Temp1
                    firstname={this.state.firstname}
                    lastname={this.state.lastname}
                    experience={this.state.experience}
                    profession={this.state.profession}
                    city={this.state.city}
                    state={this.state.state}
                    zipcode={this.state.zipcode}
                    phone={this.state.phone}
                    email={this.state.email}
                    summary={this.state.summary}
                    workHistory={this.state.workHistory}
                    education={this.state.education}
                    skills={this.state.skills}
                  />
                  <Temp2
                    firstname={this.state.firstname}
                    lastname={this.state.lastname}
                    experience={this.state.experience}
                    profession={this.state.profession}
                    city={this.state.city}
                    state={this.state.state}
                    zipcode={this.state.zipcode}
                    phone={this.state.phone}
                    email={this.state.email}
                    summary={this.state.summary}
                    workHistory={this.state.workHistory}
                    education={this.state.education}
                    skills={this.state.skills}
                  />
                  <Temp3
                    firstname={this.state.firstname}
                    lastname={this.state.lastname}
                    experience={this.state.experience}
                    profession={this.state.profession}
                    city={this.state.city}
                    state={this.state.state}
                    zipcode={this.state.zipcode}
                    phone={this.state.phone}
                    email={this.state.email}
                    summary={this.state.summary}
                    workHistory={this.state.workHistory}
                    education={this.state.education}
                    skills={this.state.skills}
                  />
                  <Temp4
                    firstname={this.state.firstname}
                    lastname={this.state.lastname}
                    experience={this.state.experience}
                    profession={this.state.profession}
                    city={this.state.city}
                    state={this.state.state}
                    zipcode={this.state.zipcode}
                    phone={this.state.phone}
                    email={this.state.email}
                    summary={this.state.summary}
                    workHistory={this.state.workHistory}
                    education={this.state.education}
                    skills={this.state.skills}
                  />
                </div>
              </div>
              <div class="col-lg-2"></div>
            </div>
          </section>
        </>
      );
    }
  };

  render() {
    return (
      <>
        <div class="page-header">
          <div class="container">
            <div class="row">
              <div class="col-lg-12">
                <div class="inner-header">
                  <h3>My Resume </h3>
                </div>
              </div>
            </div>
          </div>
        </div>

        {this.hasCV()}
      </>
    );
  }
}

export default CvPreview;
