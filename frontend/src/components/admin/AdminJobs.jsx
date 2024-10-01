import React, { useEffect } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import AdminJobsTable from "./AdminJobsTable";
import useGetAllAdminJobs from "@/hooks/useGetAllAdminJobs";
import { setSearchJobByText } from "@/redux/jobSlice";
import Footer from "../shared/Footer";

const AdminJobs = () => {
  useGetAllAdminJobs();
  const [input,setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(()=>{
     dispatch(setSearchJobByText(input));
  },[input])
  return (
    <div className="max-w-6xl mx-2 md:mx-auto">
      <Navbar />
      <div className="max-w-5xl mx-auto my-10">
        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-0 justify-between my-5">
          <Input className="w-fit" placeholder="Filter by name/role" onChange={(e)=>setInput(e.target.value)}/>
          <Button onClick={() => navigate("/admin/jobs/create")}>
          New Jobs
          </Button>
        </div>
        <AdminJobsTable className="overflow-y-auto md:overflow-y-hidden"/>
      </div>
      <Footer/>
    </div>
  );
};

export default AdminJobs;
