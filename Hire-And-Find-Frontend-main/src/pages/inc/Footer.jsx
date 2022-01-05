import React, { Component } from "react";
import { Link } from "react-router-dom";

class footer extends Component {
  render() {
    return (
      <>
        <footer>
          <section class="footer-Content">
            <div class="container">
              <div class="row">
                <div class="col-lg-3 col-md-3 col-xs-12">
                  <div class="widget">
                    <h3 style={{ color: "#fff;" }}>
                      H <b style={{ color: "#344863" }}>&</b> F
                    </h3>
                    <div class="textwidget">
                      <p>Subscribe to our newsletter</p>
                    </div>
                  </div>
                </div>
                <div class="col-lg-3 col-md-3 col-xs-12">
                  <div class="widget">
                    <h3 class="block-title">
                      <u>Hot</u> Jobs
                    </h3>
                    <div class="textwidget">
                      <ul class="menu">
                        <li>
                          <Link to="/">Ux Ui Design</Link>
                        </li>
                        <li>
                          <Link to="/">App Development</Link>
                        </li>
                        <li>
                          <Link to="/">Web Development</Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="col-lg-3 col-md-3 col-xs-12">
                  <div class="widget">
                    <h3 class="block-title">
                      <u>Contact</u> Us
                    </h3>
                    <div class="textwidget">
                      <ul class="menu">
                        <li>
                          <Link to="/">Ux Ui Design</Link>
                        </li>
                        <li>
                          <Link to="/">App Development</Link>
                        </li>
                        <li>
                          <Link to="/">Web Development</Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="col-lg-3 col-md-3 col-xs-12">
                  <div class="widget">
                    <h3 class="block-title">
                      <u>Job's</u>by Category
                    </h3>
                    <div class="textwidget">
                      <ul class="menu">
                        <li>
                          <Link to="/">Ux Ui Design</Link>
                        </li>
                        <li>
                          <Link to="/">App Development</Link>
                        </li>
                        <li>
                          <Link to="/">Web Development</Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-lg-3">
                  <p>All Rights Reserved@2021</p>
                </div>
                <div class="col-lg-9">
                  <p>Final Year Project In Making , Front-End Completed</p>
                </div>
              </div>
            </div>
          </section>

          <div id="copyright">
            <div class="container">
              <div class="row">
                <div class="col-md-12">
                  <div class="site-info text-center">
                    <p>
                      Designed and Developed by{" "}
                      <Link to="/ttps://uideck.com/" rel="nofollow">
                        Shaheer And Faheem
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </>
    );
  }
}

export default footer;
