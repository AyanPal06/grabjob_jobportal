import {createSlice} from "@reduxjs/toolkit";

  
const jobSlice = createSlice({
    name:"job",
    initialState:{
        allJobs:[],
        allAdminJobs:[],
        singleJob:null,
        searchJobByText:"",
        allAppliedJobs:[],
        searchedQuery:"",
    },
    reducers:{
        //actions
        setAllJobs:(state,action)=>{
            state.allJobs = action.payload;
        },
        setSingleJob:(state,action)=>{
            state.singleJob =action.payload; 
        },
        setAllAdminJobs:(state,action)=>{
            state.allAdminJobs= action.payload;
        },
        setSearchJobByText:(state,action)=>{
            state.searchJobByText =action.payload;
        },
        setAllAppliedJobs:(state,action)=>{
            state.allAppliedJobs = action.payload;
        },
        setSearchedQuery:(state,action)=>{
            state.searchedQuery=action.payload;
        },
        deleteAppliedJob: (state, action) => {
            const jobId = action.payload; // the ID of the deleted job
            state.allAppliedJobs = state.allAppliedJobs.filter(appliedJob => appliedJob.job._id !== jobId);
        },
        removeAppliedJob: (state, action) => {
            state.allAppliedJobs = state.allAppliedJobs.filter(job => job._id !== action.payload);
        },
        
    }
});

export const {setAllJobs,setSingleJob,setAllAdminJobs,setSearchJobByText,setAllAppliedJobs,setSearchedQuery,deleteAppliedJob,removeAppliedJob } = jobSlice.actions;
export default jobSlice.reducer; 