import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";

const filterData = [
  {
    filterType: "Location",
    array: [
      "Delhi NCR",
      "Bangalore",
      "Hydrabad",
      "Pune",
      "Kolkata",
      "Mumbai",
      "Noida",
    ],
  },
  {
    filterType: "Industry",
    array: [
      "Frontend Developer",
      "Backend Developer",
      "FullStack Developer",
      "Graphic Designer",
      "Data Analyst",
      "Software Engineer",
      "Sofeware Developer",
    ],
  },
  
];
const FilterCard = () => {
  const [selectedValue,setSelectedValue] = useState('');
  const dispatch = useDispatch();
  const changeHandeler = (value)=>{
    setSelectedValue(value);
  }
  useEffect(()=>{
    dispatch(setSearchedQuery(selectedValue));
  },[selectedValue])
  return (
    <div className="w-full bg-white rounded-md p-3">
      <h1 className="font-bold text-lg">Filter Jobs</h1>
      <hr className="mt-3"/>
      <RadioGroup value={selectedValue} onValueChange={changeHandeler}>
        {
          filterData.map((data,index)=>(
            <div>
              <h1 className="font-bold text-lg">{data.filterType}</h1>
              {
                data.array.map((item,idx)=>{
                  const itemId = `r${index}-${idx}`
                  return(
                    <div className="flex items-center space-x-2 my-1 text-sm">
                        <RadioGroupItem value={item} id={itemId}/>
                        <Label htmlFor={itemId}>{item}</Label>
                    </div>
                  )
                })
              }
            </div>
          ))
        }
      </RadioGroup>
    </div>
  );
};

export default FilterCard;
