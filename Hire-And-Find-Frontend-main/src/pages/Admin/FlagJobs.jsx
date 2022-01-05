import React from "react";
import CardComponent from "../Card/Card.component";

const FlagJobs = ({ flagJobs }) => {
  console.log("flagJobs", flagJobs);

  return (
    <>
      <div className="page-header">
        <h2 className="text-center"> Flag Jobs</h2>
      </div>
      <div className="jobappliedcontainer">
        <div className="myjobs mt-3 mb-3">
          {flagJobs &&
            flagJobs.length > 0 &&
            flagJobs.map((data, i) => {
              return <CardComponent data={data} type="recuriter" />;
            })}
        </div>
      </div>
    </>
  );
};

export default FlagJobs;
