import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

import { Card } from "react-bootstrap";

// import Avatar from "@mui/material/Avatar";
import EditIcon from "@mui/icons-material/Edit";
import { Link, withRouter } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

const requests = require("../../axios/requests");
const ls = require("local-storage");

const CardComponent = (props) => {
  const [show, setShow] = useState(false);
  const { data, type } = props;
  const [deleteAJob, setDeleteJob] = useState("");
  const [userId, setUserId] = useState(ls.get("id"));

  const deleteJob = async (id) => {
    let results = await requests.deleteJob(id);
    if (results.message === "SUCCESS") {
      if (props.match.url === "/admin/flagjobs") {
        alert("Job Deleted");
        window.location.href = "/admin/flagjobs";
      } else if (props.match.url === "/admin/jobs") {
        alert("Job Deleted");
        window.location.href = "/admin/jobs";
      } else window.location.href = "/postedjobs";
    }
    setDeleteJob(results.message);
  };
  const handleShow = async () => {
    setShow(true);
  };
  return (
    <>
      {type && type === "recuriter" && (
        <Card style={{ width: "25rem", margin: "10px", height: "auto" }}>
          <Card.Body>
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
            <div className="d-flex justify-content-between">
              <Card.Title>{data.title}</Card.Title>
              {/* {data && data.package !== "none" && (
                <StarIcon
                  style={{
                    marginLeft: "10px",
                    color: "#26ae61",
                  }}
                />
              )} */}
            </div>

            <span style={{ color: "black" }}>
              Posted Date : {data.createdAt.substring(0, 10)}{" "}
            </span>

            <Card.Subtitle className="mb-2 mt-2 text-muted">
              <div className="d-flex justify-content-between">
                <span style={{ color: "black" }}> {data.company}</span>

                <span style={{ color: "black" }}> {data.category}</span>
              </div>
              <p style={{ color: "black" }}> {data.selectedLocation} </p>
              <p>
                <strong style={{ color: "black" }}> Salary : </strong>
                Rs. {data.lowerSalary} to Rs. {data.upperSalary}
              </p>
              <p style={{ color: "black" }}>
                {" "}
                Positions : {data.selectedHires}{" "}
              </p>
            </Card.Subtitle>
            <Card.Text>
              {data.description.substring(0, 50)}
              <br />
              {data.skills &&
                data.skills.length > 0 &&
                data.skills.map((data, i) => {
                  return (
                    <span key={i} style={{ color: "black" }}>
                      {" "}
                      {data}{" "}
                    </span>
                  );
                })}
            </Card.Text>

            {props && props.match.url === "/admin/flagjobs" ? (
              <>
                {/* <button className="btn btn-dark mt-2">Approve</button>{" "} */}
                <button
                  onClick={() => deleteJob(data._id)}
                  className="btn btn-danger mt-2"
                >
                  Delete
                </button>
              </>
            ) : (
              props &&
              props.match.url === "/postedjobs" && (
                <>
                  <Link to={`/viewapplicants/${data._id}`}>
                    <Button className="btn btn-dark mt-2">
                      View Applicants
                    </Button>
                  </Link>
                  <button
                    className="btn btn-danger ml-2 mt-2"
                    onClick={() => deleteJob(data._id)}
                  >
                    Delete
                  </button>
                  <Link to={`/edit/${data._id}`}>
                    {/* <Button className="btn btn-dark mt-2">View Details</Button> */}
                    <EditIcon className="ml-4 mt-2" />
                  </Link>
                </>
              )
            )}
            {props &&
              props.match.url === "/admin/jobs" &&
              data &&
              data.flag == 1 && (
                <button
                  onClick={() => deleteJob(data._id)}
                  className="btn btn-danger mt-2"
                >
                  Delete
                </button>
              )}
          </Card.Body>
        </Card>
      )}
      {type && type === "home" && (
        <Card style={{ width: "20rem", margin: "10px", height: "auto" }}>
          <Card.Body>
            <Card.Title>{data.title}</Card.Title>
            <span style={{ color: "black" }}>
              Posted Date : {data.createdAt.substring(0, 10)}{" "}
            </span>

            <Card.Subtitle className="mb-2 mt-2 text-muted">
              <div className="d-flex justify-content-between">
                <span style={{ color: "black" }}> {data.company}</span>

                <span style={{ color: "black" }}> {data.category}</span>
              </div>
              <p style={{ color: "black" }}> {data.selectedLocation} </p>
              <p>
                <strong style={{ color: "black" }}> Salary : </strong>
                Rs. {data.lowerSalary} to Rs. {data.upperSalary}
              </p>
              <p style={{ color: "black" }}>
                {" "}
                Positions : {data.selectedHires}{" "}
              </p>
            </Card.Subtitle>
            <Card.Text>
              {data.description.substring(0, 50)}
              <br />
              {data.skills &&
                data.skills.length > 0 &&
                data.skills.map((data, i) => {
                  return (
                    <span key={i} style={{ color: "black" }}>
                      {" "}
                      {data}{" "}
                    </span>
                  );
                })}
            </Card.Text>
          </Card.Body>
          {props && props.match.url === "/admin/jobs" ? (
            <>
              <button className="btn btn-dark mt-2">Approve</button>{" "}
              <button
                onClick={() => deleteJob(data._id)}
                className="btn btn-danger mt-2"
              >
                Delete
              </button>
            </>
          ) : (
            <>
              {/* {userId && (
                <Link to={`/edit/${data._id}`}> */}
              <Button
                className="btn btn-dark mt-2 viewdetailsbtn"
                onClick={handleShow}
              >
                View Details
              </Button>
              {/* </Link> */}
            </>
          )}
          <MyVerticallyCenteredModal
            show={show}
            onHide={() => setShow(false)}
            data={data}
          />
        </Card>
      )}
      {type && type === "seeker" && (
        <>
          <Card style={{ width: "18rem", margin: "10px" }}>
            <Card.Body>
              <Card.Title>
                {data && data.job && data.job.title && data.job.title}
              </Card.Title>
              <span style={{ color: "black" }}>
                Posted Date :{" "}
                {data &&
                  data.job &&
                  data.job.createdAt &&
                  data.job.createdAt.substring(0, 10)}{" "}
              </span>

              <Card.Subtitle className="mb-2 mt-2 text-muted">
                <div className="d-flex justify-content-between">
                  <span style={{ color: "black" }}>
                    {" "}
                    {data && data.job && data.job.company && data.job.company}
                  </span>

                  <span style={{ color: "black" }}>
                    {" "}
                    {data && data.job && data.job.category && data.job.category}
                  </span>
                </div>
                <p style={{ color: "black" }}>
                  {" "}
                  {data &&
                    data.job &&
                    data.job.selectedLocation &&
                    data.job.selectedLocation}{" "}
                </p>
                <p>
                  <strong style={{ color: "black" }}> Salary : </strong>
                  Rs.{" "}
                  {data &&
                    data.job &&
                    data.job.lowerSalary &&
                    data.job.lowerSalary}{" "}
                  to Rs.{" "}
                  {data &&
                    data.job &&
                    data.job.upperSalary &&
                    data.job.upperSalary}
                </p>
                <p style={{ color: "black" }}>
                  {" "}
                  Positions :{" "}
                  {data &&
                    data.job &&
                    data.job.selectedHires &&
                    data.job.selectedHires}{" "}
                </p>
              </Card.Subtitle>
              <Card.Text>
                {data &&
                  data.job &&
                  data.job.description &&
                  data.job.description.substring(0, 50)}
                <br />
                {data &&
                  data.job &&
                  data.job.skills &&
                  data.job.skills.length > 0 &&
                  data.job.skills.map((data, i) => {
                    return (
                      <span key={i} style={{ color: "black" }}>
                        {" "}
                        {data}{" "}
                      </span>
                    );
                  })}
              </Card.Text>
              <Button
                className={`btn mt-2 ${
                  data && data.status && data.status === "pending"
                    ? "btn-warning"
                    : data && data.status && data.status === "accepted"
                    ? "btn-success"
                    : "btn-danger"
                } `}
              >
                {data.status}
              </Button>
            </Card.Body>
          </Card>
        </>
      )}

      {type && type === "messages" && (
        <Card style={{ width: "25rem", margin: "10px" }}>
          <Card.Body>
            <Card.Title style={{ color: "black" }}>
              {" "}
              {data.messages.Name}{" "}
            </Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {data.messages.subject}
            </Card.Subtitle>
            <Card.Text>{data.messages.message}</Card.Text>
          </Card.Body>
        </Card>
      )}

      {type && type === "scrape" && (
        <Card
          style={{
            width: "25rem",
            margin: "10px",
            height: "100%",
            border: "1px solid rgba(0,0,0,.125)",
          }}
        >
          <Card.Body>
            <Card.Title>
              <a
                href={data.linkToJob}
                target="_blank"
                rel="noreferrer"
                class="mb-0"
                style={{
                  color: "#55BC7E",
                  fontSize: "18px",
                  marginBottom: "10px",
                  fontWeight: "bold",
                }}
              >
                {data.jobTitle}
              </a>
            </Card.Title>
            <span style={{ color: "black" }}>{data.date}</span>

            <Card.Subtitle className="mb-2 mt-2 text-muted">
              <div className="d-flex justify-content-between">
                <span style={{ color: "black" }}>{data.company}</span>

                {/* <span style={{ color: "black" }}>
                              {data.category}
                            </span> */}
              </div>
              <p style={{ color: "black" }}>{data.location}</p>
              <p>Salary: {data.salary}</p>
              {/* <p style={{ color: "black" }}>
                            Positions : {data.selectedHires}
                          </p> */}
            </Card.Subtitle>
            <Card.Text>
              <p style={{ color: "#37383D", fontSize: "14px" }} class="pt-3">
                Summary: {data.summary}
              </p>
            </Card.Text>
          </Card.Body>
        </Card>
      )}

      {type && type === "professor" && (
        <Card
          style={{
            width: "25rem",
            margin: "10px",
            height: "100%",
            border: "1px solid rgba(0,0,0,.125)",
          }}
        >
          <Card.Body>
            <Card.Title style={{ color: "black" }}>
            
            <a
                href={data.link}
                target="_blank"
                rel="noreferrer"
                class="mb-0"
                style={{
                  color: "#55BC7E",
                  fontSize: "18px",
                  marginBottom: "10px",
                  fontWeight: "bold",
                }}
              >
                {data.Name && data.Name}
              </a>
            </Card.Title>

            <Card.Text>
              <p style={{ color: "#37383D", fontSize: "14px" }}>
                Post: {data.post && data.post}
              </p>
              <p style={{ color: "#37383D", fontSize: "14px" }}>
                Phone Number: {data.post && data.post}
              </p>
              <p style={{ color: "#37383D", fontSize: "14px" }}>
                Email: {data.email && data.email}
              </p>
            </Card.Text>
          </Card.Body>
        </Card>
      )}
    </>
  );
};

export default withRouter(CardComponent);

function MyVerticallyCenteredModal(props) {
  const { data } = props;
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
