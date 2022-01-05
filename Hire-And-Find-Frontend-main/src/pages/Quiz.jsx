import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useLocation } from "react-router-dom";
const requests = require("../axios/requests");

const Quiz = (props) => {
  const [questionLength, setQuestionLength] = useState([1]);
  const [question, setQuestion] = useState([]);
  const [qs, setQs] = useState("");
  const [option1, setOp1] = useState("");
  const [option2, setOp2] = useState("");
  const [option3, setOp3] = useState("");
  const [option4, setOp4] = useState("");
  const postJob = async (e) => {
    e.preventDefault();
    // setQuestion([
    //   ...question,
    //   {
    //     Qs: qs,
    //     Op1: op1,
    //     Op2: op2,
    //     Op3: op3,
    //     Op4: op4,
    //   },
    // ]);
    question.push({
      Qs: qs,
      option1: option1,
      option2: option2,
      option3: option3,
      option4: option4,
    });

    let results = await requests.quiz(question, props.match.params.jobId);
    console.log("quiz results", results);
    if (results) {
      window.location.href = "/postedjobs";
    }
  };
  return (
    <>
      <div class="page-header">
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <div class="inner-header">
                <h3>Quiz it to get it</h3>
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
                {questionLength &&
                  questionLength.map((data, i) => (
                    <>
                      <div class="form-group">
                        <label
                          style={{ color: "#000000" }}
                          class="control-label"
                        >
                          Enter Your Question
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          style={{
                            border: "1px solid #55BC7E",
                            background: "none",
                          }}
                          placeholder=""
                          required
                          onChange={(e) =>
                            // setQuestion([...question, { Qs: e.target.value }])
                            setQs(e.target.value)
                          }
                        />
                      </div>
                      <div class="row">
                        <div class="col-md-6">
                          <div class="form-group">
                            <label
                              style={{ color: "#000000" }}
                              class="control-label"
                            >
                              Enter option : 1
                            </label>
                            <input
                              type="text"
                              class="form-control"
                              style={{
                                border: "1px solid #55BC7E",
                                background: "none",
                              }}
                              placeholder=""
                              required
                              onChange={(e) =>
                                // setQuestion([
                                //   ...question,
                                //   { opt1: e.target.value },
                                // ])
                                setOp1(e.target.value)
                              }
                            />
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label
                              style={{ color: "#000000" }}
                              class="control-label"
                            >
                              Enter option : 2
                            </label>
                            <input
                              type="text"
                              class="form-control"
                              style={{
                                border: "1px solid #55BC7E",
                                background: "none",
                              }}
                              placeholder=""
                              required
                              onChange={(e) =>
                                // setQuestion([
                                //   ...question,
                                //   { opt2: e.target.value },
                                // ])
                                setOp2(e.target.value)
                              }
                            />
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-6">
                          <div class="form-group">
                            <label
                              style={{ color: "#000000" }}
                              class="control-label"
                            >
                              Enter option : 3
                            </label>
                            <input
                              type="text"
                              class="form-control"
                              style={{
                                border: "1px solid #55BC7E",
                                background: "none",
                              }}
                              placeholder=""
                              required
                              onChange={(e) =>
                                // setQuestion([
                                //   ...question,
                                //   { opt3: e.target.value },
                                // ])
                                setOp3(e.target.value)
                              }
                            />
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label
                              style={{ color: "#000000" }}
                              class="control-label"
                            >
                              Enter option : 4
                            </label>
                            <input
                              type="text"
                              class="form-control"
                              style={{
                                border: "1px solid #55BC7E",
                                background: "none",
                              }}
                              placeholder=""
                              required
                              onChange={(e) =>
                                // setQuestion([
                                //   ...question,
                                //   { opt4: e.target.value },
                                // ])
                                setOp4(e.target.value)
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </>
                  ))}

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
                    <AddCircleIcon
                      className="addcircle"
                      onClick={(e) => {
                        if (
                          qs === "" ||
                          option1 === "" ||
                          option2 === "" ||
                          option3 === "" ||
                          option4 === ""
                        ) {
                          document.getElementById("error").style.display =
                            "block";

                          return;
                        } else {
                          // setQuestion([
                          //   ...question,
                          //   {
                          //     Qs: qs,
                          //     Op1: op1,
                          //     Op2: op2,
                          //     Op3: op3,
                          //     Op4: op4,
                          //   },
                          // ]);
                          question.push({
                            Qs: qs,
                            option1: option1,
                            option2: option2,
                            option3: option3,
                            option4: option4,
                          });
                          console.log(question);
                          setQuestionLength([...questionLength, 1]);
                        }
                      }}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 text-center mt-4">
                    <button
                      className="btn btn-common"
                      type="submit"
                      onClick={postJob}
                    >
                      Post The Job
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

export default withRouter(Quiz);
