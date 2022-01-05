import React, { useState, useEffect } from "react";
import CardComponent from "./Card/Card.component";
const requests = require("../axios/requests");

const JobSeeker = () => {
  const [allAppliedJobs, setAllAppliedJobs] = useState([]);

  useEffect(() => {
    const getAllJobs = async () => {
      let results = await requests.getJobsAppliedBySeeker();
      console.log(
        "getJobsAppliedBySeeker",
        results["Your Applied Jobs and their status "].payLoad
      );
      setAllAppliedJobs(
        results && results["Your Applied Jobs and their status "].payLoad
      );
      // ["Your Applied Jobs and their status "].payLoad
    };
    getAllJobs();
  }, []);
  return (
    <>
      <div className="page-header">
        <h2 className="text-center">Jobs Applied</h2>
      </div>
      <div className="jobappliedcontainer">
        <div className="myjobs">
          {allAppliedJobs &&
            allAppliedJobs.length > 0 &&
            allAppliedJobs.map((data, i) => {
              return <CardComponent key={data._id} data={data} type="seeker" />;
            })}
        </div>
      </div>
    </>
  );
};
export default JobSeeker;
