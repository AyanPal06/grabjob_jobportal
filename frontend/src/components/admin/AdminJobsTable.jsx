import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Eye, MoreVertical,Trash } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { deleteAppliedJob, setAllAdminJobs } from "@/redux/jobSlice"; 
import { JOB_API_END_POINT } from "@/utils/constant";

const AdminJobsTable = () => {
  const {allAdminJobs,searchJobByText}=useSelector(store=>store.job);
  const [filterJobs, setFilterJobs]= useState(allAdminJobs);
  const navigate =useNavigate();
  const dispatch=useDispatch();
  useEffect(()=>{
    const filteredJobs =  allAdminJobs.filter((job)=>{
      if(!searchJobByText){
        return true;
      }
      return job?.title?.trim().replace(/\s+/g, '').toLowerCase().includes(searchJobByText.trim().replace(/\s+/g, '').toLowerCase()) ||  job?.company?.name?.trim().replace(/\s+/g, '').toLowerCase().includes(searchJobByText.trim().replace(/\s+/g, '').toLowerCase()) ||
      job?.company?.name?.trim().toLowerCase().includes(searchJobByText.trim().toLowerCase());

    });
    setFilterJobs(filteredJobs);
  },[allAdminJobs,searchJobByText])

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      try {
        const res = await axios.delete(`${JOB_API_END_POINT}/delete/${id}`, { withCredentials: true });
        if (res.data.success) {
          toast.success(res.data.message);
          const updatedJobs = filterJobs.filter((job) => job._id !== id);
          dispatch(setAllAdminJobs(updatedJobs)); 
          dispatch(deleteAppliedJob(id));
          dispatch(removeAppliedJob(id));
        }
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  };


  return (
    <div>
      <Table>
        <TableCaption>
          {" "}
          A list of your recent posted Jobs.{" "}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead> Company Name </TableHead>
            <TableHead> Role </TableHead>
            <TableHead> Date </TableHead>
            <TableHead className="text-right"> Action </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterJobs?.map((job) => (
            <tr>
              
              <TableCell>{job?.company?.name}</TableCell>
              <TableCell>{job?.title}</TableCell>
              <TableCell>{job?.createdAt.split("T")[0]}</TableCell>
              <TableCell className="text-right cursor-pointer">
                <Popover>
                  <PopoverTrigger>
                    <MoreVertical />
                  </PopoverTrigger>
                  <PopoverContent className="w-32">
                  <div onClick={() => handleDelete(job._id)} className="flex items-center w-fit gap-2 cursor-pointer text-red-500">
                      <Trash className="w-4" />
                      <span>Delete</span>
                    </div>
                    <div onClick={()=>navigate(`/admin/jobs/${job._id}/applicants`)} className="flex items-center w-fit gap-2 cursor-pointer mt-2">
                      <Eye className="w-4"/>
                      <span>
                        Applicants
                      </span>
                    </div>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </tr>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminJobsTable;
