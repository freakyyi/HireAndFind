import React, { useState } from "react";
import { Link } from "react-router-dom";
const requests = require("../axios/requests");

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    let results = await requests.addMessage(name, email, subject, message);
    alert(results);
  };
  return (
    <>
      <div class="page-header">
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <div class="inner-header">
                <h3>Contact</h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section id="contact" class="section">
        <div class="contact-form">
          <div class="container">
            <div class="row contact-form-area">
              <div class="col-md-12 col-lg-6 col-sm-12">
                <div class="contact-block">
                  <h2>Contact Form</h2>
                  <form id="contactForm" method="POST">
                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group">
                          <input
                            type="text"
                            class="form-control"
                            id="name"
                            name="name"
                            placeholder="Name"
                            required
                            data-error="Please enter your name"
                            onChange={(e) => setName(e.target.value)}
                          />
                          <div class="help-block with-errors"></div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group">
                          <input
                            type="text"
                            placeholder="Email"
                            id="email"
                            class="form-control"
                            name="name"
                            required
                            data-error="Please enter your email"
                            onChange={(e) => setEmail(e.target.value)}
                          />
                          <div class="help-block with-errors"></div>
                        </div>
                      </div>
                      <div class="col-md-12">
                        <div class="form-group">
                          <input
                            type="text"
                            placeholder="Subject"
                            id="msg_subject"
                            class="form-control"
                            required
                            data-error="Please enter your subject"
                            onChange={(e) => setSubject(e.target.value)}
                          />
                          <div class="help-block with-errors"></div>
                        </div>
                      </div>
                      <div class="col-md-12">
                        <div class="form-group">
                          <textarea
                            class="form-control"
                            id="message"
                            placeholder="Your Message"
                            rows="5"
                            data-error="Write your message"
                            onChange={(e) => setMessage(e.target.value)}
                            required
                          ></textarea>
                          <div class="help-block with-errors"></div>
                        </div>
                        <div class="submit-button">
                          <button
                            class="btn btn-common"
                            id="submit"
                            type="submit"
                            onClick={handleSubmit}
                          >
                            Send Message
                          </button>
                          <div
                            id="msgSubmit"
                            class="h3 text-center hidden"
                          ></div>
                          <div class="clearfix"></div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div class="col-md-12 col-lg-6 col-sm-12">
                <div class="contact-right-area wow fadeIn">
                  <h2>Contact Address</h2>
                  <div class="contact-info">
                    <div class="single-contact">
                      <div class="contact-icon">
                        <i class="lni-map-marker"></i>
                      </div>
                      <p>
                        Main Office: Opening Soon <br /> Opening Soon after
                        completing this project
                      </p>
                    </div>
                    <div class="single-contact">
                      <div class="contact-icon">
                        <i class="lni-envelope"></i>
                      </div>
                      <p>
                        <Link to="/">
                          Customer Support:{" "}
                          <span
                            class="__cf_email__"
                            data-cfemail="5f363139301f323e3633713c3032"
                          >
                            [email&#160;protected]
                          </span>
                          Technical Support:{" "}
                        </Link>
                      </p>
                      <p>
                        <Link to="/">
                          <span
                            class="__cf_email__"
                            data-cfemail="097a7c7979667b7d4964686065276a6664"
                          >
                            [email&#160;protected]
                          </span>
                        </Link>
                      </p>
                    </div>
                    <div class="single-contact">
                      <div class="contact-icon">
                        <i class="lni-phone-handset"></i>
                      </div>
                      <p>
                        <Link to="#">Main Office: ###</Link>
                      </p>
                      <p>
                        <Link to="#">Customer Supprort: ###</Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-12">
                <div id="conatiner-map">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13004080.414077152!2d-104.65693512785852!3d37.27559283318413!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54eab584e432360b%3A0x1c3bb99243deb742!2sUnited+States!5e0!3m2!1sen!2sin!4v1530855407925"
                    allowfullscreen=""
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
