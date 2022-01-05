import React, { useEffect, useState } from "react";
import CardComponent from "./Card/Card.component";
const requests = require("../axios/requests");
const ls = require("local-storage");

const JobRecuriter = () => {
  let id2 = ls.get("id");
  const [id, setId] = useState(id2);
  const [allJobs, setAllJobs] = useState([]);
  console.log("ls id", id);

  useEffect(() => {
    const getAllJobs = async () => {
      let results = await requests.getJobsPostedByRecuriters(id);
      setAllJobs(results);
    };
    getAllJobs();
  }, [id]);
  return (
    <>
      <div className="page-header">
        <h2 className="text-center">Jobs Posted</h2>
      </div>
      <div className="jobappliedcontainer">
        <div className="myjobs">
          {allJobs &&
            allJobs.length > 0 &&
            allJobs.map((data, i) => {
              return (
                <CardComponent key={data._id} data={data} type="recuriter" />
              );
            })}
        </div>
      </div>
    </>
  );
};

export default JobRecuriter;
