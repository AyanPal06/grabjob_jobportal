import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import useGetCompanyById from "@/hooks/useGetCompanyById";

const CompanySetup = () => {
  const params =useParams();
  useGetCompanyById(params.id);
  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
    existingFileUrl: ""
  });
  
  const {singleCompany} =useSelector(store=>store.company);
  const [loading,setLoading] = useState(false);
  const navigate =useNavigate();
  const changeEventHandeler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandeler=(e)=>{
    const file= e.target.files?.[0];
    setInput({...input,file});
  }
 
  const submitHandeler = async (e)=>{
    e.preventDefault();
    const formData = new FormData();
    formData.append("name",input.name);
    formData.append("description",input.description);
    formData.append("website",input.website);
    formData.append("location",input.location);
    if(input.file){
      formData.append("file",input.file);
    }
    else {
      formData.append("existingFileUrl", input.existingFileUrl);
    }
    try{
      setLoading(true);
      const res= await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`,formData,{
        headers:{
          'Content-Type':'multipart/form-data'
        },withCredentials:true
      });
      //console.log(res.data);
      if(res.data.success){
        toast.success(res.data.message);
        navigate("/admin/companies");
      }
    }
    catch(error){
      console.log(error);
      toast.error(error.response.data.message);
    }
    finally{
      setLoading(false);
    }
  }
  useEffect(()=>{
    setInput({
      name:singleCompany.name || "",
      description:singleCompany.description || "",
      website:singleCompany.website || "",
      location: singleCompany.location || "",
      file:singleCompany.file || null,
      existingFileUrl: singleCompany.logo || "",
    })
  },[singleCompany])
  return (
    <div className="max-w-6xl mx-auto">
      <Navbar />
      <div className="mx-2 max-w-xl md:mx-auto my-10">
        <form onSubmit={submitHandeler}>
          <div className="flex items-center justify-between gap-10 py-8">
            <Button 
              onClick={()=>navigate("/admin/companies")}
              variant="outline"
              className="flex items-center gap-2 text-gray-500 font-semibold"
            >
              <ArrowLeft />
              <span>Back</span>
            </Button>
            <h1 className="font-bold text-xl">Company Setup</h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Company Name</Label>
              <Input
                type="text"
                name="name"
                className="my-2" 
                value={input.name}
                onChange={changeEventHandeler}
              />
            </div>
            <div>
              <Label>Description</Label>
              <Input
                type="text"
                name="description"
                className="my-2"
                value={input.description}
                onChange={changeEventHandeler}
              />
            </div>
            <div>
              <Label>Website</Label>
              <Input
                type="text"
                name="website"
                className="my-2"
                value={input.website}
                onChange={changeEventHandeler}
              />
            </div>
            <div>
              <Label>Location</Label>
              <Input
                type="text"
                name="location"
                className="my-2"
                value={input.location}
                onChange={changeEventHandeler}
              />
            </div>
            <div>
              <Label>Logo</Label>
              <Input
                type="file"
                accept="image/*"
                className="my-2"
                onChange={changeFileHandeler}
              />
            </div>
          </div>
          {loading ? (
            <Button className="w-full my-4">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please Wait
            </Button>
          ) : (
            <Button type="submit" className="w-full my-4">
              Update
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default CompanySetup;
