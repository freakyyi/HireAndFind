import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const requests = require("../../axios/requests");

const AdminDashboard = (props) => {
  //   const [allJobs, setAllJobs] = useState([]);
  //   const [seekers, setSeekers] = useState([]);
  //   const [recruitres, setRecruitres] = useState([]);
  //   useEffect(() => {
  //     const getAll = async () => {
  //       let results = await requests.getAll();
  //       console.log("getAll", results);
  //       setAllJobs(results.payLoad.job);
  //       setSeekers(results.payLoad.seeker);
  //       setRecruitres(results.payLoad.recruiter);
  //     };
  //     getAll();
  //   }, []);
  const { seekers, recruitres, allJobs, flagJobs, users } = props;
  return (
    <>
      <div className="page-header">
        <h3 className="text-center">Admin</h3>
      </div>
      <div className="admincontainer">
        <div className="details">
          <div className="m-3 p-4 users shadow rounded bg-white">
            <h4>
              <strong style={{ color: "black" }}> Users</strong>
            </h4>

            <span className="no">{users && users.length}</span>
            <br />
            <Link to="/admin/users">
              <button className="btn btn-dark">View Details</button>{" "}
            </Link>
          </div>
          {/* <div className="m-3 p-4 experts shadow rounded bg-white">
            <span>
              <strong style={{ color: "black" }}> Recruiters</strong>
            </span>
            <span className="no">{recruitres && recruitres.length}</span>
            <br />
            <Link to="/admin/recruiters">
              <button className="btn btn-dark">View Details</button>{" "}
            </Link>
          </div> */}
          <div className="m-3 p-4 questions shadow rounded bg-white">
            <h4>
              {" "}
              <strong style={{ color: "black" }}> Jobs</strong>
            </h4>
            <span className="no">{allJobs && allJobs.length}</span> <br />
            <Link to="/admin/jobs">
              <button className="btn btn-dark">View Details</button>{" "}
            </Link>
          </div>
          <div className="m-3 p-4 questions shadow rounded bg-white">
            <h4>
              {" "}
              <strong style={{ color: "black" }}> Flag Jobs</strong>
            </h4>
            <span className="no">{flagJobs && flagJobs.length}</span> <br />
            <Link to="/admin/flagjobs">
              <button className="btn btn-dark">View Details</button>{" "}
            </Link>
          </div>
        </div>

        <Link to="/admin/messages">
          <button className="btn btn-dark adminbtn">View messages</button>
        </Link>
      </div>
    </>
  );
};
export default AdminDashboard;
