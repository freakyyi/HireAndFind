import React from "react";
import { useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const Question = () => {
  const [questionLength, setQuestionLength] = useState([1]);
  return (
    <>
      <div className="container">
        <div className="questioncontainer">
          {questionLength &&
            questionLength.map((data) => (
              <div className="row">
                <div className="col-md-12">
                  <label htmlFor="question">Enter Your Question</label>
                </div>
                <div className="col-md-8">
                  <textarea
                    className="w-100 mb-3 questiontext"
                    name="question"
                    id="question"
                    cols="30"
                    rows="10"
                  ></textarea>
                </div>
              </div>
            ))}
          <div className="row">
            <div className="col-md-8">
              <AddCircleIcon
                className="addcircle"
                onClick={(e) => setQuestionLength([...questionLength, 1])}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Question;
