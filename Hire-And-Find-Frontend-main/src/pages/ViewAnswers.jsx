import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";

const ViewAnswers = (props) => {
  console.log(props.location.state.from);
  const [question, setQuestion] = useState(props.location.state.from);

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
                {question &&
                  question[0] &&
                  question[0].questions &&
                  question[0].questions.map((data, i) => {
                    console.log(data);

                    return (
                      <>
                        <div class="form-group">
                          <label
                            style={{ color: "#000000" }}
                            class="control-label"
                          >
                            <strong>
                              Q({i + 1}): {data.Qs.toUpperCase()}
                            </strong>
                          </label>
                        </div>
                        <div class="row">
                          <div class="col-md-6" style={{ color: "#000000" }}>
                            <strong> Ans: {data.Answer.toUpperCase()}</strong>
                          </div>
                        </div>
                      </>
                    );
                  })}

                <div className="row">
                  <div className="col-12 text-center mt-4">
                    <Link
                      className="btn btn-common"
                      type="submit"
                      to="/postedjobs"
                    >
                      Back
                    </Link>
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

export default withRouter(ViewAnswers);
