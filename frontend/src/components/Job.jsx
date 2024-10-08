import React from "react";
import { Button } from "./ui/button";
import { Star } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const Job = ({job}) => {
  const navigate =useNavigate();
  // const jobId ="wbjdbambdasmvdh"

  const daysAgoFunction = (mongodbTime)=>{
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime-createdAt;
    return Math.floor(timeDifference/(1000*24*60*60));

  }

  const truncatedDescription = job?.description
  ? job.description.substring(0, 50) + (job.description.length > 50 ? "..." : "")
  : "";

  return (
    <div className=" p-5 rounded-md shadow-xl bg-white border border-gray-100">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">{daysAgoFunction(job?.createdAt)===0?"Today":`${daysAgoFunction(job?.createdAt)} days ago`}</p>
        <Button variant="outline" className="rounded-full cursor-text" size="icon">
          <Star className="text-[#7209B7]"/>
        </Button>
      </div>

      <div className="flex item-center  gap-2 my-2">
        <Button className="p-6 cursor-default" variant="outline" size="icon">
          <Avatar>
            <AvatarImage src={job?.company?.logo} />
          </Avatar>
        </Button>
        <div>
          <h1 className="font-medium text-md md:text-lg">{job?.company?.name}</h1>
          <p className="text-sm text-gray-500">India</p>
        </div>
      </div>
      <div>
        <h1 className="font-bold text-md md:text-lg my-2">{job?.title}</h1>
        <p className="text-sm text-grey-600">{truncatedDescription}</p>
      </div>
      <div className="flex items-center gap-2 mt-4">
         <Badge className={'text-blue-700 font-bold'} variant="ghost"> {job?.position} Position</Badge>
         <Badge className={'text-[#F83002] font-bold'} variant="ghost"> {job?.jobType}</Badge>
         <Badge className={'text-[#7209B7] font-bold'} variant="ghost"> {job?.salary} LPA</Badge>
      </div>
      <div className="flex item-center gap-4 mt-4">
        <Button className="bg-[#7209B7] text-white w-full" onClick={()=>navigate(`/description/${job?._id}`)} variant="outline">Details</Button>
      </div>
    </div>
  );
};

export default Job;
