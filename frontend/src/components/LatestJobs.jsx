import React from "react";
import LatestJobCards from "./LatestJobCards";
import { useSelector } from "react-redux";
// const randomJobs = [1, 2, 3, 4, 5, 6, 7, 8];
const LatestJobs = () => {
  const { allJobs } = useSelector((store) => store.job);

  return (
    <div className=" w-[90%] lg:max-w-7xl mx-auto my-20">
      <h1 className=" text-xl md:text-4xl  font-bold flex justify-center">
        <span className="text-[#6A38C2]">Latest</span>Job Openings
      </h1>
      <div className="grid sm:grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center gap-4 my-5">
        {allJobs.length <= 0 ? (
          <span>No Job Available</span>
        ) : (
          allJobs
            ?.slice(0, 6)
            .map((job) => <LatestJobCards key={job._id} job={job} />)
        )}
      </div>
    </div>
  );
};

export default LatestJobs;
