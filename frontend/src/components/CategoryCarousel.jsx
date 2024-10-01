import React from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "@/redux/jobSlice";

const category = [
  "Frontend Developer",
  "Backend Developer",
  "Data Science",
  "Graphic Designer",
  "FullStack Developer",
  "Software Developer",
];
const CategoryCarousel = () => {

  const dispatch=useDispatch();
  const navigate=useNavigate();
  const serachJobHandeler =(query)=>{
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  }
  return (
    <div className="text-center">
      <Carousel className="w-[60%] md:w-full max-w-xl mx-auto my-2">
        <CarouselContent>
          {category.map((cat, index) => (
            <CarouselItem className="basic-1 md:basis-1/2 lg:basis-1/3">
                <Button onClick={()=>serachJobHandeler(cat)} variant="outline" className="rounded-full">{cat}</Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext/>
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;
