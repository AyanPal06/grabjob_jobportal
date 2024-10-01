import {Job} from "../models/job.model.js";

export const postJob =async (req,res)=>{
   try{
       const {title,description,requirements,salary,location,jobType,experience,position,companyId} = req.body;
       const userId =req.id;

       if(!title || !description || !requirements || !salary || !location || !jobType || !experience  || !position || !companyId ){
        return res.status(400).json({
          message:"Something wents wrong.",
          success:false
        })
       };
       const job = await Job.create({
        title,
        description,
        requirements:requirements.split(","),
        salary:Number(salary),
        location,
        jobType,
        experienceLevel:experience,
        position,
        company:companyId,
        created_by:userId

       });
       return res.status(201).json({
        message:"New job created Successfully.",
        job,
        success:true
       })
   }
   catch(error){
     console.log(error);
   }
}

export const getAllJobs = async (req,res)=>{
   try{
     const keyword =req.query.keyword || "";
     const query = {
      $or:[
        {title:{$regex:keyword,$options:"i"}},
        {description:{$regex:keyword,$options:"i"}},
      ]
     };
     const jobs = await Job.find(query).populate({
      path:"company"
     }).sort({createdAt: -1}); 
     if(!jobs){
      return res.status(404).json({
        message:"Jobs not Found.",
        success:false
      })
     };
     return res.status(200).json({
      jobs,
      success:true
     })
   }
   catch(error){
    console.log(error);
   }
}
// Admin side

export const getJobById = async (req,res)=>{
  try{
     const jobId = req.params.id;
     const job = await Job.findById(jobId).populate({
      path:"applications"
     })
     if(!job){
      return res.status(404).json({
        message:"Jobs not Found.",
        success:false
      })
     };
     return res.status(200).json(
      {
        job,
        success:true
      })
  }
  catch(error){
    console.log(error);
  }
}

// it is for admin .
export const getAdminJobs = async (req,res)=>{
  try{
     const adminId = req.id;
     const jobs =await Job.find({created_by:adminId}).populate({
      path:'company',
      createdAt:-1
     });
     if(!jobs){
      return res.ststus(404).json({
        message:"Jobs not found.",
        success:false
      })
     }
     return res.status(200).json({
      jobs,
      success:true
     })
  }
  catch(error){
    console.log(error);
  }
}


export const deleteJobById = async (req, res) => {
  try {
      const jobId = req.params.id; // Get the job ID from the URL parameters

      // Use findByIdAndDelete to remove the job directly
      const deletedJob = await Job.findByIdAndDelete(jobId);

      if (!deletedJob) {
          return res.status(404).json({
              message: "Job not found",
              success: false
          });
      }

      return res.status(200).json({
          message: "Job deleted successfully",
          success: true
      });
  } catch (error) {
      console.error("Error deleting job:", error);
      return res.status(500).json({
          message: "Internal server error",
          success: false
      });
  }
};