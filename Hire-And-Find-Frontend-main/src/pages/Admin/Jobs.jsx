import React from "react";
import CardComponent from "../Card/Card.component";

const Jobs = ({ allJobs }) => {
  console.log("allJobs", allJobs);
  return (
    <>
      <div className="page-header">
        <h2 className="text-center"> All Jobs</h2>
      </div>
      <div className="jobappliedcontainer">
        <div className="myjobs mt-3 mb-3">
          {allJobs &&
            allJobs.length > 0 &&
            allJobs.map((data, i) => {
              return <CardComponent data={data} type="recuriter" />;
            })}
        </div>
      </div>
    </>
  );
};

export default Jobs;
