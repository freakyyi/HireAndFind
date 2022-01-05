import React, { Component } from "react";
import { Link } from "react-router-dom";

class About extends Component {
  render() {
    return (
      <>
        <div class="page-header">
          <div class="container">
            <div class="row">
              <div class="col-lg-12">
                <div class="inner-header">
                  <h3>About</h3>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="about section">
          <div class="container">
            <div class="row">
              <div class="col-lg-6 col-md-6 col-xs-12">
                <div class="about-content">
                  <h3>About HAF</h3>
                  <p>
                    Our Aim is to provide you a way for multiple income streams!
                  </p>

                  <Link to="/" class="btn btn-common">
                    Learn More
                  </Link>
                </div>
              </div>
              <div class="col-lg-6 col-md-6 col-xs-12">
                <img
                  class="img-fluid float-right"
                  src={`${process.env.PUBLIC_URL}/assets/img/about/img1.jpg`}
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>

        <section id="counter" class="section bg-gray">
          <div class="container">
            <div class="row">
              <div class="col-lg-3 col-md-6 col-xs-12">
                <div class="counter-box">
                  <div class="icon">
                    <i class="lni-home"></i>
                  </div>
                  <div class="fact-count">
                    <h3>
                      <span class="counter">800</span>
                    </h3>
                    <p>Jobs Posted</p>
                  </div>
                </div>
              </div>

              <div class="col-lg-3 col-md-6 col-xs-12">
                <div class="counter-box">
                  <div class="icon">
                    <i class="lni-briefcase"></i>
                  </div>
                  <div class="fact-count">
                    <h3>
                      <span class="counter">80</span>
                    </h3>
                    <p>All Companies</p>
                  </div>
                </div>
              </div>

              <div class="col-lg-3 col-md-6 col-xs-12">
                <div class="counter-box">
                  <div class="icon">
                    <i class="lni-pencil-alt"></i>
                  </div>
                  <div class="fact-count">
                    <h3>
                      <span class="counter">900</span>
                    </h3>
                    <p>Resumes</p>
                  </div>
                </div>
              </div>

              <div class="col-lg-3 col-md-6 col-xs-12">
                <div class="counter-box">
                  <div class="icon">
                    <i class="lni-save"></i>
                  </div>
                  <div class="fact-count">
                    <h3>
                      <span class="counter">1200</span>
                    </h3>
                    <p>Applications</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="how-it-works section">
          <div class="container">
            <div class="section-header">
              <h2 class="section-title">How It Works?</h2>
              <p>
                After getting Registered on our website , you have to build your
                CV as a job seeker, Wait!? Are you going to make a CV rn? Leave
                that to us! we will do that for you , after you create the CV we
                will display the relevant jobs.
              </p>
            </div>
            <div class="row">
              <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                <div class="work-process">
                  <span class="process-icon">
                    <i class="lni-user"></i>
                  </span>
                  <h4>Create an Account</h4>
                  <p>wait.</p>
                </div>
              </div>
              <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                <div class="work-process step-2">
                  <span class="process-icon">
                    <i class="lni-search"></i>
                  </span>
                  <h4>Search Jobs</h4>
                  <p>wait.</p>
                </div>
              </div>
              <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                <div class="work-process step-3">
                  <span class="process-icon">
                    <i class="lni-cup"></i>
                  </span>
                  <h4>Apply</h4>
                  <p>wait.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
}

export default About;
