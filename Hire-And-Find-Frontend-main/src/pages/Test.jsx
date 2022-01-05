import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
const requests = require("../axios/requests");

const Test = (props) => {
  const [question, setQuestion] = useState([]);
  const [answer, setAnswer] = useState([]);

  const postJob = async (e) => {
    e.preventDefault();
    let results = await requests.answer(props.match.params.jobId, answer);

    console.log("test results", results);
    if (results === "Applied to the Job") {
      window.location.href = "/jobsapplied";
    }
  };

  useEffect(() => {
    const getQuiz = async () => {
      let results = await requests.test(props.match.params.jobId);
      setQuestion(results);
      console.log("test results", results);
    };
    getQuiz();
  }, []);

  const handleChange = (input) => async (e) => {
    answer.push({
      Qs: input,
      Answer: e.target.defaultValue,
    });
  };
  return (
    <>
      <div class="page-header">
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <div class="inner-header">
                <h3>Test</h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section class="job-detail section pt-5">
        <div class="row">
          <div class="col-lg-2"></div>
          <div class="col-lg-8">
            <div
              class="page-login-form box"
              style={{ boxShadow: " 0px 10px 22px #00000029" }}
            >
              <form class="login-form">
                {question && question[0] && question[0].questions ? (
                  question[0].questions.map((data, i) => {
                    console.log(data);

                    return (
                      <>
                        <div class="form-group">
                          <label
                            style={{ color: "#000000" }}
                            class="control-label"
                          >
                            {data.Qs.toUpperCase()}
                          </label>
                        </div>
                        <div class="row" onChange={handleChange(data.Qs)}>
                          <div class="col-md-6">
                            <input
                              style={{ marginRight: "10px" }}
                              type="radio"
                              name="option"
                              value={data.option1.toUpperCase()}
                            />
                            {data.option1.toUpperCase()}
                            {/* <div class="form-group">
                              <label
                                style={{ color: "#000000" }}
                                class="control-label"
                              >
                                {data.option1.toUpperCase()}
                              </label>
                            </div> */}
                          </div>
                          <div class="col-md-6">
                            {/* <div class="form-group">
                              <label
                                style={{ color: "#000000" }}
                                class="control-label"
                              >
                                {data.option2.toUpperCase()}
                              </label>
                            </div> */}
                            <input
                              style={{ marginRight: "10px" }}
                              type="radio"
                              name="option"
                              value={data.option2.toUpperCase()}
                            />
                            {data.option2.toUpperCase()}
                          </div>

                          <div class="col-md-6">
                            {/* <div class="form-group">
                              <label
                                style={{ color: "#000000" }}
                                class="control-label"
                              >
                                {data.option3.toUpperCase()}
                              </label>
                            </div> */}
                            <input
                              style={{ marginRight: "10px" }}
                              type="radio"
                              name="option"
                              value={data.option3.toUpperCase()}
                            />
                            {data.option3.toUpperCase()}
                          </div>
                          <div class="col-md-6">
                            {/* <div class="form-group">
                              <label
                                style={{ color: "#000000" }}
                                class="control-label"
                              >
                                {data.option4.toUpperCase()}
                              </label>
                            </div> */}
                            <input
                              style={{ marginRight: "10px" }}
                              type="radio"
                              name="option"
                              value={data.option4.toUpperCase()}
                            />
                            {data.option4.toUpperCase()}
                          </div>
                        </div>
                      </>
                    );
                  })
                ) : (
                  <h5 className="text-center">No Quiz Found</h5>
                )}

                <div class="row">
                  <div class="col-md-12 d-flex">
                    <p
                      id="error"
                      style={{
                        display: "none",
                        color: "red",
                      }}
                    >
                      Please Fill in the required details
                    </p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 text-center mt-4">
                    <button
                      className="btn btn-common"
                      type="submit"
                      onClick={postJob}
                    >
                      Apply to the Job
                    </button>{" "}
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="col-lg-2"></div>
        </div>
      </section>
    </>
  );
};

export default withRouter(Test);
