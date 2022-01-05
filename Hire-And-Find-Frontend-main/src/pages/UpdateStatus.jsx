import React, { useState } from "react";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
const requests = require("../axios/requests");

const JobStatus = (props) => {
  const { data } = props;
  //   const [newFlag, setNewFlag] = useState(props && props.flag ? props.flag : 0);

  const updateStatus = (appId, input) => async (e) => {
    let results = await requests.updateApplicantionStatus(appId, input);
    console.log(results);
    if (results.message === "Status Updated") {
      window.location.href = `/viewapplicants/${props.match.params.jobId}`;
    }
  };
  return (
    <>
      <div className="c1">
        <div className="icondiv">
          <DoneIcon
            className="icon"
            onClick={updateStatus(data.Application._id, "accepted")}
          />
        </div>
        <div className="icondiv">
          <QuestionMarkIcon className="icon" />
        </div>
        <div className="icondiv">
          <CloseIcon
            className="icon"
            onClick={updateStatus(data.Application._id, "rejected")}
          />
        </div>
      </div>
    </>
  );
};
export default JobStatus;
