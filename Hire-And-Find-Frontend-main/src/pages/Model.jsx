import React from "react";
import { Link, Redirect } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import Flag from "./Flag";

import { Card } from "react-bootstrap";

import StarIcon from "@mui/icons-material/Star";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

const requests = require("../axios/requests");
const ls = require("local-storage");

class Card1 extends React.Component {
  state = {
    // title: "",
    // company: "",
    // date: "",
    // location: "",
    // salary: "",
    // description: "",
    // skills: "",
    show: false,

    id: ls.get("id"),
    cvId: ls.get("cvId"),
    remote: "",
    flag: 0,
  };

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
  render() {
    const { data } = this.props;

    return (
      <>
        <div
          className="content-area mb-5"
          style={{ boxShadow: "0px 10px 22px #00000029" }}
        >
          <p>
            {data && data.package === "none" ? (
              ""
            ) : (
              <span>
                <CheckBoxIcon className="checkboxicon" />{" "}
                <span className="intersting">INTERSTING JOB</span>
              </span>
            )}
          </p>
          <div className="row" style={{ borderBottom: "1px solid #344863" }}>
            <div className="col-md-8" style={{ marginRight: "120px" }}>
              <p
                className="mb-0"
                style={{ color: "#37383D", fontSize: "16px" }}
              >
                {data.title}
              </p>
              <label for="" style={{ color: "#37383D", marginRight: "10px" }}>
                {data.createdAt.slice(0, 10)}
              </label>
              <label
                for=""
                style={{
                  color: "#37383D",
                  marginRight: "10px",
                  marginLeft: "10px",
                }}
              >
                {data.company}
              </label>
              <label for="" style={{ color: "#37383D", marginLeft: "10px" }}>
                {data.selectedLocation}
              </label>
            </div>
            <div className="col-md-1 text-right">
              <p
                className="mb-0"
                style={{ color: "#37383D", fontSize: "16px" }}
              >
                {data.lowerSalary}
              </p>
            </div>
            To
            <div className="col-md-1 text-right">
              <p
                className="mb-0"
                style={{
                  color: "#37383D",
                  fontSize: "16px",
                  float: "left",
                }}
              >
                {data.upperSalary}
              </p>
            </div>
          </div>

          <p style={{ color: "#37383D", fontSize: "12px" }} className="pt-3">
            {data.description}
          </p>

          <div class="row">
            <div className="pl-3 pr-2">
              <p
                style={{
                  color: "#37383D",
                  fontSize: "16px",
                  marginRight: "0px",
                }}
              >
                Skills:
              </p>
            </div>
            <div>
              {data.skills.map((data, fields) => {
                return (
                  <Link
                    style={{
                      background: "#55BC7E",
                      color: "white",
                      borderRadius: "5px;",
                      paddingTop: "4px",
                      marginRight: "5px",
                    }}
                    className="p-1"
                  >
                    {data}
                  </Link>
                );
              })}
            </div>
            <div className="apply">
              <Button
                className="applybtn w-75"
                style={{ marginRight: "10px" }}
                onClick={this.handleShow3}
              >
                View Details
              </Button>

              <Flag flag={data.flagged} id={data._id} />
              {data && data.package === "none" ? (
                <button
                  type="button"
                  className="applybtn"
                  onClick={this.handleShow(data._id)}
                >
                  Apply
                </button>
              ) : (
                <>
                  <button
                    // to={`/test/${data._id}`}
                    type="button"
                    as="button"
                    className="applybtn"
                    onClick={this.handleShow2(data._id)}
                  >
                    Apply
                  </button>
                  {/* <StarIcon
                    style={{
                      marginLeft: "10px",
                      color: "#26ae61",
                    }}
                  /> */}
                </>
              )}
            </div>
          </div>
          <MyVerticallyCenteredModal
            show={this.state.show}
            onHide={() => this.setState({ show: false })}
            data={data}
          />
        </div>
      </>
    );
  }
}

function MyVerticallyCenteredModal(props) {
  const { data } = props;
  console.log(data);
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      {/* <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Modal heading
          </Modal.Title>
        </Modal.Header> */}
      <Modal.Body>
        <Card style={{ width: "40rem", margin: "auto", height: "auto" }}>
          <Card.Body>
            <Card.Title>
              <div className="d-flex justify-content-between align-items-center">
                <h4>{data.title}</h4>
                <span style={{ color: "black" }}>
                  Posted Date : {data.createdAt.substring(0, 10)}{" "}
                </span>
              </div>
            </Card.Title>
            <Card.Subtitle className="mb-2 mt-2 text-muted">
              <div className="d-flex justify-content-between align-items-center">
                <span style={{ color: "black" }}>Company: {data.company}</span>

                <span style={{ color: "black" }}>
                  Category: {data.category}
                </span>
              </div>
              <br />
              <div className="d-flex justify-content-between align-items-center">
                <p style={{ color: "black" }}>
                  Location : {data.selectedLocation}{" "}
                </p>

                <p style={{ color: "black" }}>
                  <strong style={{ color: "black" }}> Salary : </strong>
                  Rs. {data.lowerSalary} to Rs. {data.upperSalary}
                </p>
              </div>
              <br />
              <div className="d-flex justify-content-between align-items-center">
                <p style={{ color: "black" }}>
                  {" "}
                  Positions : {data.selectedHires}{" "}
                </p>{" "}
                <p style={{ color: "black" }}>
                  {" "}
                  Job Type :{" "}
                  {data.jobPrimer && data.jobPrimer === "Yes"
                    ? "Remote"
                    : "Onsite"}{" "}
                </p>
              </div>
              <br />

              <p style={{ color: "black" }}>
                {" "}
                contractType : {data.contractType}{" "}
              </p>
            </Card.Subtitle>
            <br />

            <Card.Text style={{ color: "black" }}>
              <h6>Description:</h6>
              {data.description.substring(0, 50)}
              <br />
              <br />
              <h6>Skills:</h6>
              <div className="d-flex">
                {data.skills &&
                  data.skills.length > 0 &&
                  data.skills.map((data, i) => {
                    return (
                      <span
                        key={i}
                        style={{
                          display: "flex",
                          backgroundColor: "#26ae61",
                          color: "white",
                          padding: "10px 20px",
                          margin: "10px",
                        }}
                        className="d-flex"
                      >
                        {data}
                      </span>
                    );
                  })}
              </div>
            </Card.Text>
          </Card.Body>
        </Card>
      </Modal.Body>
      {/* <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer> */}
    </Modal>
  );
}
export default Card1;
