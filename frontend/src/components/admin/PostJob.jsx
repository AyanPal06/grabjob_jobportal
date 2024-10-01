import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constant";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import Footer from "../shared/Footer";

const PostJob = () => {
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: 0,
    companyId: "",
  });
  const [loading, setLoading] =useState(false);
  const navigate =useNavigate();
  const { companies } = useSelector((store) => store.company);

  const changeEventHandeler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const selectChangeHandeler=(value)=>{
      const selectedCompany=companies.find((company)=>company.name.toLowerCase()===value);
      setInput({...input,companyId:selectedCompany._id});
  }

  const submitHandeler =async (e) =>{
    e.preventDefault();
    try{
      setLoading(true);

      const res=await axios.post(`${JOB_API_END_POINT}/post`,input,{
        headers:{
          'Content-Type':'application/json'
        },
        withCredentials:true
      });
      if(res.data.success){
        toast.success(res.data.message);
        navigate("/admin/jobs")
      }
    }catch(error){
      toast.error(error.response.data.message);
    }
    finally{
      setLoading(false);
    }
    
  }

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center w-screen my-5">
        <form
          onSubmit={submitHandeler}
          className="p-8 max-w-4xl border-gray-300 shadow-lg rounded-md"
        >
          <div className="grid grid-cols-2 gap-3 ">
            <div>
              <Label>Title</Label>
              <Input
                type="text"
                name="title"
                value={input.title}
                onChange={changeEventHandeler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Description</Label>
              <Input
                type="text"
                name="description"
                value={input.description}
                onChange={changeEventHandeler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Requirements</Label>
              <Input
                type="text"
                name="requirements"
                value={input.requirements}
                onChange={changeEventHandeler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Salary (In Lpa)</Label>
              <Input
                type="text"
                name="salary"
                value={input.salary}
                onChange={changeEventHandeler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Location</Label>
              <Input
                type="text"
                name="location"
                value={input.location}
                onChange={changeEventHandeler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Job Type</Label>
              <Input
                type="text"
                name="jobType"
                value={input.jobType}
                onChange={changeEventHandeler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Experience Level (In Years)</Label>
              <Input
                type="text"
                name="experience"
                value={input.experience}
                onChange={changeEventHandeler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>No Of Position</Label>
              <Input
                type="number"
                name="position"
                value={input.position}
                onChange={changeEventHandeler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
          </div>
          {companies.length > 0 && (
            <Select onValueChange={selectChangeHandeler}>
              <SelectTrigger className="mt-4 w-full">
                <SelectValue placeholder="Select a Company" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {companies.map((company) => {
                    return (
                      <SelectItem value={company?.name?.toLowerCase()}>{company.name}</SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
          {loading ? (
            <Button className="w-full mt-4">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please Wait
            </Button>
          ) : (
            <Button type="submit" className="w-full my-4 bg-[#6a38c2] hover:bg-[#5b38a6]">
               Post New Job
            </Button>
          )}
          {companies.length === 0 && (
            <p className="text-xs font-bold text-center my-3 text-red-600 ">
              Please register a company first, before posting a Job.
            </p>
          )}
        </form>
      </div>
      <Footer/>
    </div>
  );
};

export default PostJob;
