import React, { useEffect } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import CompaniesTable from "./CompaniesTable";
import { useNavigate } from "react-router-dom";
import useGetAllCompanies from "@/hooks/useGetAllCompanies";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchCompanyByText } from "@/redux/companySlice";
import Footer from "../shared/Footer";

const Companies = () => {
  useGetAllCompanies();
  const [input,setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(()=>{
     dispatch(setSearchCompanyByText(input));
  },[input])
  return (
    <div className=" mx-2 max-w-6xl md:mx-auto">
      <Navbar />
      <div className="max-w-5xl mx-auto my-10">
        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-0 justify-between my-5">
          <Input className="w-fit" placeholder="Filter by name" onChange={(e)=>setInput(e.target.value)}/>
          <Button onClick={() => navigate("/admin/companies/create")}>
            New Company
          </Button>
        </div>
        <CompaniesTable className="overflow-y-auto md:overflow-y-auto" />
      </div>
      <Footer/>
    </div>
  );
};

export default Companies;
