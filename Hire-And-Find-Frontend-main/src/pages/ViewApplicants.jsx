import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { Card } from "react-bootstrap";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import MoreVertIcon from "@mui/icons-material/MoreVert";
const requests = require("../axios/requests");

const ViewApplicants = (props) => {
  const [applicants, setApplicants] = useState([]);

  useEffect(() => {
    document.getElementById("loading").style.display = "block";
    const getApplicants = async () => {
      let results = await requests.getApplicants(props.match.params.jobId);

      setApplicants(results && results.payLoad);
      if (results) document.getElementById("loading").style.display = "none";
      if (results && results.payLoad.length == 0) {
        document.getElementById("error").style.display = "block";
      }
    };

    getApplicants();
  }, [props]);

  const updateStatus = (appId, input) => async (e) => {
    let results = await requests.updateApplicantionStatus(appId, input);
    console.log(results);
    if (results) {
      setApplicants(results && results.payLoad);
    }
  };
  return (
    <>
      <div className="page-header">
        <h2 className="text-center">Applicants</h2>
      </div>
      <div className="viewapplicants">
        <p
          id="loading"
          style={{
            display: "none",
            marginLeft: "220px",
            fontWeight: "bold",
            marginBottom: "20px",
            fontSize: "40px",
          }}
        >
          Loading...
        </p>

        <p
          id="error"
          style={{
            display: "none",
            marginLeft: "220px",
            fontWeight: "bold",
            marginBottom: "20px",
            fontSize: "40px",
          }}
        >
          No Applicant Yet...
        </p>

        {applicants &&
          applicants.length > 0 &&
          applicants.map((data, i) => {
            return (
              <Card
                className="shadow rounded bg-white"
                style={{
                  width: "80%",
                  margin: "0 auto 20px auto",
                  marginBottom: "20px",
                }}
              >
                <Card.Body style={{}}>
                  <div className="details ">
                    <div className="info">
                      <h6 style={{ color: "blue" }}>
                        {data.seeker.firstname} {data.seeker.lastname}
                      </h6>
                      <span style={{ fontWeight: "500", color: "black" }}>
                        {data.cv.profession}
                      </span>
                      <span style={{ fontWeight: "500", color: "black" }}>
                        {data.Application.status === "pending" ? (
                          "Awaiting Response"
                        ) : (
                          <span
                            className={`${
                              data.Application.status === "accepted"
                                ? "green"
                                : "red"
                            }`}
                          >
                            {" "}
                            {data.Application.status}
                          </span>
                        )}
                      </span>
                    </div>
                    <Link
                      to={`/downloadCV/${data.Application.seekerId} `}
                      className="btn btn-dark"
                    >
                      Download CV
                    </Link>
                    <div className="actions">
                      {data.getAnswer &&
                        data.getAnswer.length > 0 &&
                        data.getAnswer[0].questions &&
                        data.getAnswer[0].questions.length > 0 && (
                          <Link
                            style={{ marginRight: "10px" }}
                            to={{
                              pathname: "/viewanswer",
                              state: { from: data.getAnswer },
                            }}
                          >
                            view Answer
                          </Link>
                        )}
                      <div className="c1">
                        <div className="icondiv">
                          <DoneIcon
                            className="icon"
                            onClick={updateStatus(
                              data.Application._id,
                              "accepted"
                            )}
                          />
                        </div>
                        <div className="icondiv">
                          <QuestionMarkIcon className="icon" />
                        </div>
                        <div className="icondiv">
                          <CloseIcon
                            className="icon"
                            onClick={updateStatus(
                              data.Application._id,
                              "rejected"
                            )}
                          />
                        </div>
                      </div>
                      <MoreVertIcon className="verticalicon" />
                    </div>
                  </div>
                </Card.Body>
              </Card>
            );
          })}
      </div>
    </>
  );
};

export default withRouter(ViewApplicants);
