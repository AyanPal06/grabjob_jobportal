import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { useSelector } from "react-redux";
import Footer from "./shared/Footer";
import { Button } from "./ui/button";

// const jobsArray = [1, 2, 3, 4, 5, 6, 7, 8];
const Jobs = () => { 
  
  const {allJobs, searchedQuery} = useSelector(store=>store.job);
  const [filterJobs, setFilterJobs]=useState(allJobs);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  useEffect(()=>{
     if(searchedQuery){
       const filteredJobs = allJobs.filter((job)=>{
          return job.title.toLowerCase().includes(searchedQuery.toLowerCase()) || 
          job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.location.toLowerCase().includes(searchedQuery.toLowerCase())
       })
       setFilterJobs(filteredJobs);
     }else{
      setFilterJobs(allJobs)
     }
  },[allJobs,searchedQuery]);

  const toggleFilterPanel = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  return (
    <div className="mx-3">
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5">
        <div className="flex flex-col md:flex-row mx-3 gap-5">
        <div className="md:hidden">
            <Button onClick={toggleFilterPanel} className="mb-4">
              Filters
            </Button>
          </div>
          <div className="hidden md:block w-20%">
            <FilterCard />
          </div>

          {filterJobs.length <= 0 ? (
            <span>Job not found.</span>
          ) : (
            <div className="flex-1 h-[88vh] overflow-y-auto pb-5 ">
              <div className="grid grid-col-1 lg:grid-cols-3 gap-4">
                {filterJobs.map((job) => (
                  <div key={job?._id}>
                    <Job job={job}/>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {isFilterOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg z-50 p-4 overflow-y-auto ">
            <Button onClick={toggleFilterPanel} className="mb-4">
              Close
            </Button>
            <FilterCard className="overflow-y-auto"/>
          </div>
        </div>
      )}
      <Footer/>
    </div>
  );
};

export default Jobs;
