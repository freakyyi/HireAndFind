import React, { Component } from "react";
import Pdf from "react-to-pdf";
import { Link } from "react-router-dom";
const ls = require("local-storage");
const requests = require("../../axios/requests");
let ref = React.createRef();
class Temp1 extends Component {
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
    } else {
    }
  };

  render() {
    return (
      <>
        <div
          class="collapse multi-collapse"
          id="multiCollapseExample1"
          ref={ref}
        >
          <div class="row mt-5 pt-5">
            <div class="col-md-12 text-center">
              <h1>Preview 1</h1>
            </div>
          </div>

          <div class="row">
            <div class="col-md-12">
              <div class="shadow-1-strong bg-white my-5 p-5" id="about">
                <div class="about-section">
                  <div class="row">
                    <div class="col-md-6">
                      <h2 class="h2 fw-light mb-4">Summary</h2>
                      <p>{this.props.summary}</p>
                    </div>
                    <div class="col-md-5 offset-lg-1">
                      <div class="row mt-2">
                        <div class="col-md-12">
                          <h2 class="h2 fw-light mb-4">Personal Info</h2>
                        </div>
                        <br />
                        <div class="col-md-5">
                          <div class="pb-2 fw-bolder">
                            <i
                              class="far fa-calendar-alt pe-2 text-muted"
                              style={{ width: "24px", opacity: 0.85 }}
                            ></i>{" "}
                            Firstname
                          </div>
                        </div>
                        <div class="col-md-7">
                          <div class="pb-2">{this.props.firstname}</div>
                        </div>
                        <div class="col-md-5">
                          <div class="pb-2 fw-bolder">
                            <i
                              class="far fa-calendar-alt pe-2 text-muted"
                              style={{ width: "24px", opacity: 0.85 }}
                            ></i>{" "}
                            Lastname
                          </div>
                        </div>
                        <div class="col-md-7">
                          <div class="pb-2">{this.props.lastname}</div>
                        </div>
                        <div class="col-md-5">
                          <div class="pb-2 fw-bolder">
                            <i
                              class="far fa-envelope pe-2 text-muted"
                              style={{ width: "24px", opacity: 0.85 }}
                            ></i>{" "}
                            Email
                          </div>
                        </div>
                        <div class="col-md-7">
                          <div class="pb-2">{this.props.email}</div>
                        </div>
                        <div class="col-md-5">
                          <div class="pb-2 fw-bolder">
                            <i
                              class="fab fa-skype pe-2 text-muted"
                              style={{ width: "24px", opacity: 0.85 }}
                            ></i>{" "}
                            Profession
                          </div>
                        </div>
                        <div class="col-md-7">
                          <div class="pb-2">{this.props.profession}</div>
                        </div>
                        <div class="col-md-5">
                          <div class="pb-2 fw-bolder">
                            <i
                              class="fas fa-phone pe-2 text-muted"
                              style={{ width: "24px", opacity: 0.85 }}
                            ></i>{" "}
                            Phone
                          </div>
                        </div>
                        <div class="col-md-7">
                          <div class="pb-2">{this.props.phone}</div>
                        </div>
                        <div class="col-md-5">
                          <div class="pb-2 fw-bolder">
                            <i
                              class="fas fa-map-marker-alt pe-2 text-muted"
                              style={{ width: "24px", opacity: 0.85 }}
                            ></i>{" "}
                            Based In
                          </div>
                        </div>
                        <div class="col-md-7">
                          <div class="pb-2">
                            {this.props.city} ,{this.props.state} ,
                            {this.props.zipcode}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="shadow-1-strong bg-white my-5 p-5" id="education">
                <div class="education-section">
                  <h2 class="h2 fw-light mb-2">Work History</h2>
                  <div class="timeline">
                    {this.props.workHistory.map((data, key) => {
                      return (
                        <div
                          class="timeline-card timeline-card-success aos-init aos-animate"
                          data-aos="fade-in"
                          data-aos-delay="0"
                        >
                          <div class="timeline-head px-4 pt-3">
                            <div class="h5">
                              {data.jobTitle} - {data.employer}
                            </div>
                          </div>
                          <div class="timeline-body px-4 pb-4">
                            <div class="text-muted text-small mb-3">
                              {data.startDateW} - {data.endDateW} |{" "}
                              {data.stateW}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div class="shadow-1-strong bg-white my-5 p-5" id="education">
                <div class="education-section">
                  <h2 class="h2 fw-light mb-4">Education</h2>
                  <div class="timeline">
                    {this.props.education.map((data, key) => {
                      return (
                        <div
                          class="timeline-card timeline-card-success aos-init aos-animate"
                          data-aos="fade-in"
                          data-aos-delay="0"
                        >
                          <div class="timeline-head px-4 pt-3">
                            <div class="h5">
                              {data.degree} - {data.institution}
                            </div>
                          </div>
                          <div class="timeline-body px-4 pb-4">
                            <div class="text-muted text-small mb-3">
                              {data.startDate} - {data.endDate}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div class="shadow-1-strong bg-white my-5 p-5" id="skills">
                <div class="skills-section">
                  <h2 class="h2 fw-light mb-4">Professional Skills</h2>
                  <div class="row">
                    <div class="col-md-6">
                      <div class="mb-3">
                        <span class="fw-bolder">HTML</span>
                        <div
                          class="progress my-2 rounded"
                          style={{ height: "20px" }}
                        >
                          <div
                            class="progress-bar bg-info aos-init aos-animate"
                            role="progressbar"
                            data-aos="zoom-in-right"
                            data-aos-delay="100"
                            data-aos-anchor=".skills-section"
                            style={{ width: "95%" }}
                            aria-valuenow="95"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          >
                            Master
                          </div>
                        </div>
                      </div>
                      <div class="mb-3">
                        <span class="fw-bolder">CSS</span>
                        <div
                          class="progress my-2 rounded"
                          style={{ height: "20px" }}
                        >
                          <div
                            class="progress-bar bg-info aos-init aos-animate"
                            role="progressbar"
                            data-aos="zoom-in-right"
                            data-aos-delay="200"
                            data-aos-anchor=".skills-section"
                            style={{ width: "85%" }}
                            aria-valuenow="85"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          >
                            Expert
                          </div>
                        </div>
                      </div>
                      <div class="mb-3">
                        <span class="fw-bolder">JavaScript</span>
                        <div
                          class="progress my-2 rounded"
                          style={{ height: "20px" }}
                        >
                          <div
                            class="progress-bar bg-info aos-init aos-animate"
                            role="progressbar"
                            data-aos="zoom-in-right"
                            data-aos-delay="300"
                            data-aos-anchor=".skills-section"
                            style={{ width: "75%" }}
                            aria-valuenow="75"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          >
                            Advance
                          </div>
                        </div>
                      </div>
                      <div class="mb-3">
                        <span class="fw-bolder">WordPress</span>
                        <div
                          class="progress my-2 rounded"
                          style={{ height: "20px" }}
                        >
                          <div
                            class="progress-bar bg-info aos-init aos-animate"
                            role="progressbar"
                            data-aos="zoom-in-right"
                            data-aos-delay="300"
                            data-aos-anchor=".skills-section"
                            style={{ width: "75%" }}
                            aria-valuenow="75"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          >
                            Advance
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="mb-3">
                        <span class="fw-bolder">Adobe Photoshop</span>
                        <div
                          class="progress my-2 rounded"
                          style={{ height: "20px" }}
                        >
                          <div
                            class="progress-bar bg-secondary aos-init aos-animate"
                            role="progressbar"
                            data-aos="zoom-in-right"
                            data-aos-delay="400"
                            data-aos-anchor=".skills-section"
                            style={{ width: "95%" }}
                            aria-valuenow="95"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          >
                            Master
                          </div>
                        </div>
                      </div>
                      <div class="mb-3">
                        <span class="fw-bolder">Adobe Illustrator</span>
                        <div
                          class="progress my-2 rounded"
                          style={{ height: "20px" }}
                        >
                          <div
                            class="progress-bar bg-secondary aos-init aos-animate"
                            role="progressbar"
                            data-aos="zoom-in-right"
                            data-aos-delay="400"
                            data-aos-anchor=".skills-section"
                            style={{ width: "90%" }}
                            aria-valuenow="90"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          >
                            Expert
                          </div>
                        </div>
                      </div>
                      <div class="mb-3">
                        <span class="fw-bolder">Sketch</span>
                        <div
                          class="progress my-2 rounded"
                          style={{ height: "20px" }}
                        >
                          <div
                            class="progress-bar bg-secondary aos-init aos-animate"
                            role="progressbar"
                            data-aos="zoom-in-right"
                            data-aos-delay="500"
                            data-aos-anchor=".skills-section"
                            style={{ width: "85%" }}
                            aria-valuenow="85"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          >
                            Expert
                          </div>
                        </div>
                      </div>
                      <div class="mb-3">
                        <span class="fw-bolder">Adobe XD</span>
                        <div
                          class="progress my-2 rounded"
                          style={{ height: "20px" }}
                        >
                          <div
                            class="progress-bar bg-secondary aos-init aos-animate"
                            role="progressbar"
                            data-aos="zoom-in-right"
                            data-aos-delay="600"
                            data-aos-anchor=".skills-section"
                            style={{ width: "75%" }}
                            aria-valuenow="75"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          >
                            Beginner
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Pdf
            targetRef={ref}
            filename={this.props.firstname + " CV.pdf"}
            x={0.05}
            y={0.05}
          >
            {({ toPdf }) => (
              <button
                onClick={toPdf}
                class="button btn btn-common"
                style={{ align: "center" }}
              >
                Generate a PDF{" "}
              </button>
            )}
          </Pdf>
        </div>
      </>
    );
  }
}

export default Temp1;
