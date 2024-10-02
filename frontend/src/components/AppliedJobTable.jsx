import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";
import { useSelector } from "react-redux";

const AppliedJobTable = () => {
  const {allAppliedJobs}= useSelector(store=>store.job);
  // const {jobs} = useSelector(store => store.job.allJobs); 
  return (
    <div>
      <Table>
        <TableCaption>A list of your applied jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Job Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allAppliedJobs.length<=0 ?<span className="font-semibold">You haven't applied any job yet.</span> :(allAppliedJobs.map((appliedJob) => {
            const jobExists = appliedJob.job && appliedJob.job.title && appliedJob.job.company;
            if(jobExists){
              return(<TableRow key={appliedJob._id}>
                { <TableCell> {appliedJob?.createdAt?.split("T")[0]}</TableCell> }
                <TableCell> {appliedJob?.job?.title}</TableCell>
                <TableCell>{appliedJob?.job?.company.name}</TableCell>
  
                <TableCell className="text-right"><Badge className={`${appliedJob?.status==="rejected" ? 'bg-red-500':appliedJob.status === 'pending'? 'bg-gray-400' : 'bg-green-500'}`}>{appliedJob?.status?.toUpperCase() }</Badge></TableCell>
              </TableRow>
              );
            }
            
          })
        )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJobTable;
