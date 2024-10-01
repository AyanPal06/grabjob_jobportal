import React, { useEffect } from "react";
import Navbar from "./shared/Navbar";
import Job from "./Job";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import Footer from "./shared/Footer";

//const randomJobs = [1, 2, 3];

const Browse = () => {
  useGetAllJobs();
  const {allJobs}=useSelector(store=>store.job);
  const dispatch = useDispatch();
  useEffect(()=>{
    return ()=>{
       dispatch(setSearchedQuery(""));
    }
  })

  return (
    <div className="max-w-6xl mx-auto">
      <Navbar />
      <div className="max-w-6xl mx-auto my-10">
        <h1 className="mx-3 md:mx-0 font-bold text-xl my-10 ">Search Results ({allJobs.length}) </h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {allJobs.map((job) => {
            return <Job job={job} key={job._id}/>;
          })}
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Browse;
