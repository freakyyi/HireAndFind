import React from "react";
import { Link } from "react-router-dom";
import CardComponent from "./Card/Card.component";

const requests = require("../axios/requests");
const ls = require("local-storage");

class Home extends React.Component {
  state = {
    id: ls.get("id"),
    token: ls.get("token"),
    role: ls.get("role"),
    recommendedJobs: [],
    trendingJobs: [],
  };

  componentDidMount() {
    this.getTrendingJobs();
    this.getRecommendedJobs();
  }
  getRecommendedJobs = async () => {
    let results = await requests.getRecommendedJobs();

    this.setState({ recommendedJobs: results });
  };
  getTrendingJobs = async () => {
    let results = await requests.getTrendingJobs();

    this.setState({ trendingJobs: results });
  };

  sectionHeaderVisibility = () => {
    if (
      this.state.id !== null ||
      this.state.token !== null ||
      this.state.id !== undefined ||
      this.state.token !== undefined
    ) {
      if (this.state.role === "seeker") {
        return (
          <>
            <section class="category section bg-gray">
              <div class="container">
                <div class="section-header"></div>
                <div class="row">
                  <div class="col-lg-3 col-md-6 col-xs-12 f-category">
                    <Link to="Register">
                      <div class="icon bg-color-1">
                        <i class="lni-home"></i>
                      </div>
                      <h3>Account</h3>
                      <p>First you've to create an Account in here</p>
                    </Link>
                  </div>
                  <div class="col-lg-3 col-md-6 col-xs-12 f-category">
                    <Link to="cv-resume">
                      <div class="icon bg-color-2">
                        <i class="lni-world"></i>
                      </div>
                      <h3>CV/Resume</h3>
                      <p>For a job you have to make your CV or resume</p>
                    </Link>
                  </div>
                  <div class="col-lg-3 col-md-6 col-xs-12 f-category">
                    <Link to="category">
                      <div class="icon bg-color-3">
                        <i class="lni-book"></i>
                      </div>
                      <h3>Quick Jobs </h3>
                      <p>
                        Find your best job by our detailed job search feature.
                      </p>
                    </Link>
                  </div>
                  <div class="col-lg-3 col-md-6 col-xs-12 f-category">
                    <Link to="category">
                      <div class="icon bg-color-5">
                        <i class="lni-brush"></i>
                      </div>
                      <h3>Apply them</h3>
                      <p>
                        Finally your apply to the job of your findings and
                        enjoy.
                      </p>
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          </>
        );
      }
    }
  };

  render() {
    return (
      <>
        {this.sectionHeaderVisibility()}
        <section id="featured" class="section">
          <div class="container">
            <div class="section-header">
              <h2 class="section-title">
                <u>LATEST</u> <span style={{ color: "red" }}> TRENDING</span>{" "}
                JOBS HERE
              </h2>
            </div>
            <div className="myjobs">
              {this.state.trendingJobs &&
                this.state.trendingJobs.length > 0 &&
                this.state.trendingJobs.map((data) => (
                  <CardComponent key={data._id} data={data} type="home" />
                ))}
            </div>
            <div class="row">
              {/* <div class="col-lg-4 col-md-6 col-xs-12">
                <div class="job-featured">
                  <div class="icon">
                    <img src="assets/img/features/img1.png" alt="" />
                  </div>
                  <div class="content">
                    <h3>
                      <Link to="jobs-near-me">Software Engineer</Link>
                    </h3>
                    <p class="brand">MizTech</p>
                    <div class="tags">
                      <span>
                        <i class="lni-map-marker"></i> New York
                      </span>
                      <span>
                        <i class="lni-user"></i>John Smith
                      </span>
                    </div>
                    <span class="full-time">Full Time</span>
                  </div>
                </div>
              </div> */}

              <div class="col-12 text-center mt-4">
                <Link to="category" class="btn btn-common">
                  Browse All Jobs
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section id="featured" class="section">
          <div class="container">
            <div class="section-header">
              <h2 class="section-title">
                <u>EXPLORE</u> JOBS
              </h2>
            </div>
            <div className="myjobs">
              {this.props.allJobs &&
                this.props.allJobs.length > 0 &&
                this.props.allJobs.map((data) => (
                  <CardComponent key={data._id} data={data} type="home" />
                ))}
            </div>
            <div class="row">
              {/* <div class="col-lg-4 col-md-6 col-xs-12">
                <div class="job-featured">
                  <div class="icon">
                    <img src="assets/img/features/img1.png" alt="" />
                  </div>
                  <div class="content">
                    <h3>
                      <Link to="jobs-near-me">Software Engineer</Link>
                    </h3>
                    <p class="brand">MizTech</p>
                    <div class="tags">
                      <span>
                        <i class="lni-map-marker"></i> New York
                      </span>
                      <span>
                        <i class="lni-user"></i>John Smith
                      </span>
                    </div>
                    <span class="full-time">Full Time</span>
                  </div>
                </div>
              </div> */}

              <div class="col-12 text-center mt-4">
                <Link to="category" class="btn btn-common">
                  Browse All Jobs
                </Link>
              </div>
            </div>
          </div>
        </section>
        {this.state.role && this.state.role === "seeker" && (
          <>
            <section id="featured" class="section">
              <div class="container">
                <div class="section-header">
                  <h2 class="section-title" style={{ color: "#26ae61" }}>
                    <u>Recommended</u> JOBS
                  </h2>
                </div>
                <div className="myjobs">
                  {this.state.recommendedJobs &&
                    this.state.recommendedJobs.length > 0 &&
                    this.state.recommendedJobs.map((data) => (
                      <CardComponent key={data._id} data={data} type="home" />
                    ))}
                </div>
                <div class="row">
                  <div class="col-12 text-center mt-4">
                    <Link to="category" class="btn btn-common">
                      Browse All Jobs
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}

        <section class="category section bg-gray">
          <div class="container">
            <div class="section-header">
              <h2 class="section-title text-center">
                <u>Browse</u> Job Category
              </h2>
            </div>
            <div class="row">
              <div class="col-lg-3 col-md-6 col-xs-12 f-category">
                <Link to="category">
                  <div class="icon bg-color-1">
                    <i class="lni-home"></i>
                  </div>
                  <h3>Video Editing</h3>
                  <p>First you've to create an Account in here</p>
                </Link>
              </div>
              <div class="col-lg-3 col-md-6 col-xs-12 f-category">
                <Link to="category">
                  <div class="icon bg-color-2">
                    <i class="lni-world"></i>
                  </div>
                  <h3>Video Editing</h3>
                  <p>For a job you have to make your CV or resume</p>
                </Link>
              </div>
              <div class="col-lg-3 col-md-6 col-xs-12 f-category">
                <Link to="category">
                  <div class="icon bg-color-3">
                    <i class="lni-book"></i>
                  </div>
                  <h3>Video Editing </h3>
                  <p>Find your best job by our detailed job search feature.</p>
                </Link>
              </div>
              <div class="col-lg-3 col-md-6 col-xs-12 f-category">
                <Link to="category">
                  <div class="icon bg-color-5">
                    <i class="lni-brush"></i>
                  </div>
                  <h3>Video Editing</h3>
                  <p>
                    Finally your apply to the job of your findings and enjoy.
                  </p>
                </Link>
              </div>
              <div class="col-lg-3 col-md-6 col-xs-12 f-category">
                <Link to="category">
                  <div class="icon bg-color-5">
                    <i class="lni-brush"></i>
                  </div>
                  <h3>Video Editing</h3>
                  <p>
                    Finally your apply to the job of your findings and enjoy.
                  </p>
                </Link>
              </div>
              <div class="col-lg-3 col-md-6 col-xs-12 f-category">
                <Link to="category">
                  <div class="icon bg-color-5">
                    <i class="lni-brush"></i>
                  </div>
                  <h3>Video Editing</h3>
                  <p>
                    Finally your apply to the job of your findings and enjoy.
                  </p>
                </Link>
              </div>
              <div class="col-lg-3 col-md-6 col-xs-12 f-category">
                <Link to="category">
                  <div class="icon bg-color-5">
                    <i class="lni-brush"></i>
                  </div>
                  <h3>Video Editing</h3>
                  <p>
                    Finally your apply to the job of your findings and enjoy.
                  </p>
                </Link>
              </div>
              <div class="col-lg-3 col-md-6 col-xs-12 f-category">
                <Link to="category">
                  <div class="icon bg-color-5">
                    <i class="lni-brush"></i>
                  </div>
                  <h3>Video Editing</h3>
                  <p>
                    Finally your apply to the job of your findings and enjoy.
                  </p>
                </Link>
              </div>
              <div class="col-12 text-center mt-4">
                <Link to="category" class="btn btn-common">
                  View All
                </Link>
              </div>
            </div>
          </div>
        </section>

        <div id="browse-jobs" class="section bg-gray">
          <div class="container">
            <div class="row">
              <div class="col-lg-6 col-md-12 col-sm-12">
                <div class="text-wrapper">
                  <div>
                    <h3>1000+ Pakistan top company post there job in here.</h3>
                    <p>
                      Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                      sed diam nonumy eirmod tempor invidunt ut labore et dolore
                      magna aliquyam erat, sed diam voluptua. At vero eos et
                      accusam et justo duo dolores et ea rebum. Stet clita kasd
                      gubergren, no sea tak
                    </p>
                    <Link class="btn btn-common" to="/register">
                      Create Account
                    </Link>
                  </div>
                </div>
              </div>
              <div class="col-lg-6 col-md-12 col-sm-12">
                <div class="img-thumb">
                  <img class="img-fluid" src="assets/img/search.png" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Home;
