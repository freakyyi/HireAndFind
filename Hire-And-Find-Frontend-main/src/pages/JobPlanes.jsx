import React, { useState } from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  withRouter,
  Redirect,
} from "react-router-dom";
import { useLocation } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";
import { Modal, Button } from "react-bootstrap";
const requests = require("../axios/requests");
const ls = require("local-storage");

const JobPlanes = (props) => {
  const [show, setShow] = useState(false);
  const [newJobId, setJobId] = useState(false);

  const { from } = props.location.state;
  console.log("from", from.data);

  const published_key =
    "pk_test_51J33DXAS6wWQYlKwJGLdbC0nYHBOorKvLDxp1pkSU6Ikk7EwiMQcNiyJ2qqBsoL4FLDbsrBfk4Jj8OuR6X78X6qn00pVi1l00l";

  const onToken = async (token) => {
    let price = 12;
    let jobData = from.data;
    let plan = "basic";
    let results = await requests.stripApi(price, plan, jobData, token);
    console.log("Strip result", results);
    if (results && results._id) {
      setJobId(results._id);
      setShow(true);
    }
  };

  const onToken1 = async (token) => {
    let price = 20;
    let jobData = from.data;
    let plan = "standard";
    let results = await requests.stripApi(price, plan, jobData, token);
    console.log("Strip result", results);
    if (results && results._id) {
      setJobId(results._id);
      setShow(true);
    }
  };
  const onToken2 = async (token) => {
    let price = 39;
    let jobData = from.data;
    let plan = "premium";
    let results = await requests.stripApi(price, plan, jobData, token);
    console.log("Strip result", results);
    if (results && results._id) {
      setJobId(results._id);
      setShow(true);
    }
  };
  return (
    <>
      <div class="page-header">
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <div class="inner-header">
                <h3>Choose your "HOT JOB" Plan!!</h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="pricing" class="section bg-gray">
        <div class="container">
          <div class="row pricing-tables">
            <div class="col-lg-4 col-md-4 col-xs-12">
              <div class="pricing-table">
                <div class="pricing-details">
                  <span>
                    <img
                      src="assets/img/job1.svg"
                      style={{
                        width: "250px",
                        height: "250px",
                        margin: " 0 auto",
                        display: "block",
                      }}
                      alt=""
                    />
                  </span>
                  <ul>
                    <li style={{ color: "#344863;" }}>
                      Job Exposure on Homepage for 3 days
                    </li>
                    <li style={{ color: "#344863;" }}>You'll get </li>
                    <li style={{ color: "#344863;" }}>You'll get</li>
                    <li style={{ color: "#344863;" }}>You'll get</li>
                    <li style={{ color: "#344863;" }}>You'll get</li>
                    <li style={{ color: "#344863;" }}>You'll get</li>
                  </ul>
                </div>
                <div class="plan-button">
                  {/* <Link
                    to={{
                      pathname: "/stripe",
                      state: {
                        from: { data: { job: from.data, price: 12 } },
                      },
                    }}
                    class="btn btn-border"
                  >
                    $12
                  </Link> */}

                  <StripeCheckout
                    // className="storebtn"
                    name="H&F"
                    image="https://stripe.com/img/documentation/checkout/marketplace.png"
                    description={`Total price is $${12}`}
                    label="$12"
                    panelLabel="Pay Now"
                    amount={1200}
                    // currency="PKR"
                    stripeKey={published_key}
                    shippingAddress={false}
                    billingAddress={false}
                    token={onToken}
                  />
                </div>
              </div>
            </div>
            <div class="col-lg-4 col-md-4 col-xs-12">
              <div class="pricing-table">
                <div class="pricing-details">
                  <span>
                    <img
                      src="assets/img/job3.svg"
                      style={{
                        width: "250px",
                        height: "250px",
                        margin: " 0 auto",
                        display: "block",
                      }}
                      alt=""
                    />
                  </span>
                  <ul>
                    <li style={{ color: "#344863;" }}>
                      Job Exposure on Homepage for 10 days
                    </li>
                    <li style={{ color: "#344863;" }}>You'll get</li>
                    <li style={{ color: "#344863;" }}>You'll get</li>
                    <li style={{ color: "#344863;" }}>You'll get</li>
                    <li style={{ color: "#344863;" }}>You'll get</li>
                    <li style={{ color: "#344863;" }}>You'll get</li>
                  </ul>
                </div>
                <div class="plan-button">
                  {/* <Link to="category" class="btn btn-border">
                    $20
                  </Link> */}

                  <StripeCheckout
                    // className="storebtn"
                    name="H&F"
                    image="https://stripe.com/img/documentation/checkout/marketplace.png"
                    description={`Total price is $${20}`}
                    label="$20"
                    panelLabel="Pay Now"
                    amount={2000}
                    // currency="PKR"
                    // currency="INR"
                    stripeKey={published_key}
                    shippingAddress={false}
                    billingAddress={false}
                    token={onToken1}
                  />
                </div>
              </div>
            </div>
            <div class="col-lg-4 col-md-4 col-xs-12">
              <div class="pricing-table">
                <div class="pricing-details">
                  <span>
                    <img
                      src="assets/img/job4.svg"
                      style={{
                        width: "250px",
                        height: "250px",
                        margin: " 0 auto",
                        display: "block",
                      }}
                      alt=""
                    />
                  </span>
                  <ul>
                    <li style={{ color: "#344863;" }}>
                      Job Exposure on Homepage for 15 days
                    </li>
                    <li style={{ color: "#344863;" }}>You'll get</li>
                    <li style={{ color: "#344863;" }}>You'll get</li>
                    <li style={{ color: "#344863;" }}>You'll get</li>
                    <li style={{ color: "#344863;" }}>You'll get</li>
                    <li style={{ color: "#344863;" }}>You'll get</li>
                  </ul>
                </div>
                <div class="plan-button">
                  {/* <Link to="category" class="btn btn-border">
                    $39
                  </Link> */}

                  <StripeCheckout
                    // className="storebtn"
                    name="H&F"
                    image="https://stripe.com/img/documentation/checkout/marketplace.png"
                    description={`Total price is $${39}`}
                    label="$39"
                    panelLabel="Pay Now"
                    amount={3900}
                    // currency="PKR"
                    // currency="INR"
                    stripeKey={published_key}
                    shippingAddress={false}
                    billingAddress={false}
                    token={onToken2}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <MyVerticallyCenteredModal
          show={show}
          onHide={() => setShow(false)}
          jobId={newJobId}
        />
      </div>

      {/* <div class="col-12 text-center mt-2 mb-3">
                    <Link to="quiz" style={{background: "#55BC7E"}} class="btn btn-common">Continue & Post
                        </Link>
                </div>  */}
    </>
  );
};

export default withRouter(JobPlanes);

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      {/* <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Modal heading
          </Modal.Title>
        </Modal.Header> */}
      <Modal.Body>
        <p style={{ color: "black" }}>You want to add Quiz</p>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-between">
        <Button>
          <Link style={{ color: "white" }} to={`/quiz/${props.jobId}`}>
            Yes
          </Link>
        </Button>
        <Button onClick={props.onHide}>No</Button>
      </Modal.Footer>
    </Modal>
  );
}
