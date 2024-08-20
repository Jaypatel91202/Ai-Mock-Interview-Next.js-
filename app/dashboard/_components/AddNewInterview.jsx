"use client"

import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { chatSession } from "@/utils/GeminiAiModal";
import { Loader2Icon, LoaderCircle } from "lucide-react";
  


function AddNewInterview() {

  const[openDialog,setOpenDialog] = useState(false)
  const[jobPosition,setJobPosition] = useState()
  const[jobDesc,setJobDesc] = useState()
  const[jobExperience,setJobExperience] = useState()
  const[loading,setLoading]=useState(false)

  const onSubmit=async(e)=>{
    setLoading(true)
    e.preventDefault()
    console.log(jobPosition,jobDesc,jobExperience)

    const InputPrompt="Job Position: "+jobPosition+", Job Description: "+jobDesc+", Years of Experience: "+jobExperience+", Depends on this information please give US "+process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT+" interveiew question with answered in Json format , Give question and answered as field in JSON"

    const result = await chatSession.sendMessage(InputPrompt)

    const MockJsonResp = (result.response.text()).replace('```json','').replace('```','')

    console.log(JSON.parse(MockJsonResp))
    setLoading(false)
  }
  return (
    <div>
      <div className="p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all "
      onClick={()=>setOpenDialog(true)}>
        <h2 className="font-bold text-lg text-center">+ Add New </h2>
      </div>
      <Dialog open={openDialog}>

        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">Tell me more about your job interivew</DialogTitle>
            <DialogDescription>
              <form onSubmit={onSubmit}>
                <div>
                    <h2 className="font-bold text-2xl"></h2>
                    <h2>Add Details about job position/role, Job description and years of experience</h2>
                    <div className="mt-7 my-3">
                      <label>Job Role/Job position</label>
                      <Input placeholder="Ex. Full Stack Developer " className="mt-2" required
                        onChange={(event)=>setJobPosition(event.target.value)}
                      />
                    </div>

                    <div className="my-3">
                      <label>Job Description</label>
                      <Textarea placeholder="Ex. React,Angular" className="mt-2" required
                        onChange={(event)=>setJobDesc(event.target.value)}
                      />
                    </div>

                    <div className="my-3">
                      <label>Years of Experience</label>
                      <Input placeholder="Ex. 5 " className="mt-2" type="number" max="50" required
                        onChange={(event)=>setJobExperience(event.target.value)}
                      />
                    </div>

                </div>
                <div className="flex gap-5 justify-end mt-10">
                    <Button type="button" variant='ghost' onClick={()=>setOpenDialog(false)}>Cancel </Button>
                    <Button type="submit"  disabled={loading}>
                      {loading?
                      <>
                        <LoaderCircle className="animate-spin"/>'Generating from AI'
                         </>:'Start Interview'
                      }
                      </Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewInterview;
