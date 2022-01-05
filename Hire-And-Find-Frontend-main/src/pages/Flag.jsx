import React, { useState } from "react";
const requests = require("../axios/requests");
const ls = require("local-storage");
const Flag = (props) => {
  console.log("Flag", props);
  const [newFlag, setNewFlag] = useState(
    props && props.flag && props.flag.flag ? props.flag.flag : 0
  );
  const [userId, setUserId] = useState(
    props && props.flag && props.flag.userId ? props.flag.userId : 0
  );
  let currentUser = ls.get("id");

  console.log("newFlag", newFlag);
  console.log("userId", userId);
  console.log("currentUser", currentUser);

  const flag = (input) => async (e) => {
    setNewFlag(1);
    let results = await requests.flagJob(input);
    console.log(results);
  };
  const unflag = (input) => async (e) => {
    setNewFlag(0);
    let results = await requests.unFlagJob(input);
    console.log(results);
  };
  return (
    <>
      {newFlag && newFlag == 1 && currentUser === userId ? (
        <button
          type="button"
          className="btn btn-danger flagbtn"
          onClick={unflag(props.id)}
        >
          unFlag
        </button>
      ) : newFlag && newFlag == 1 && currentUser !== userId ? (
        <>
          <button
            disabled
            type="button"
            className="btn btn-danger flagbtn"
            // onClick={flag(props.id)}
          >
            Flaged
          </button>
        </>
      ) : (
        <button
          type="button"
          className="btn btn-danger flagbtn"
          onClick={flag(props.id)}
        >
          Flag
        </button>
      )}
    </>
  );
};
export default Flag;
