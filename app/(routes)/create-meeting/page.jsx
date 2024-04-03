"use client"
import React, { useState } from 'react'
import MeetingForm from './_component/MeetingForm'
import Preview from './_component/Preview'

const CreateMeeting = () => {
    const [formValue,setformValue] = useState()
  return (
    <div className='grid grid-cols-1 md:grid-cols-3'>
        {/* Meeting Form */}
        <div className='shadow-md border h-screen'>
            <MeetingForm setFormValue={(v)=>setformValue(v)}/>
        </div>
        {/* Preview */}
        <div className='md:col-span-2'>
            <Preview formValue={formValue}/>
        </div>
    </div>
  )
}

export default CreateMeeting