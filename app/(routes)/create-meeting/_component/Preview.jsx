"use client"
import { Clock, LinkIcon, MapPin } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar } from "@/components/ui/calendar"
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'

const Preview = ({formValue}) => {
    const [date, setDate] = useState(new Date())
    const createTimeSlot=(interval)=>{
        const startTime = 8*60 //Subah ke 8 baje
        const endTime = 23*60 // Raat ke 10 baje tak
        const totalSlots = (endTime-startTime)/interval //Kitna Slots available hoga
        const slots = Array.from({length:totalSlots},(_,i)=>{
            const totalMinutes = startTime + i * interval;
            const hours = Math.floor(totalMinutes/60)
            const minutes = totalMinutes % 60;
            const formattedHours = hours > 12 ? hours-12 : hours
            const period = hours >= 12 ? 'PM':'AM'
            return `${String(formattedHours).padStart(2,'0')}:${String(minutes).padStart(2,'0')} ${period}`
        })
        console.log(slots);
        setTimeSlots(slots)
    }
    useEffect(()=>{
        formValue?.duration && createTimeSlot(formValue?.duration)
    },[formValue])
    const [timeSlots,setTimeSlots] = useState()
  return (
    <div className='p-5 py-10 shadow-lg m-5 border-t-8' style={{borderTopColor:formValue?.themeColor}}>
        <Image src='/logo21.svg' alt='logo' width={150} height={150}/>
        <div className='grid grid-cols-1 md:grid-cols-3 mt-5'>
            {/* Meeting Info */}
            <div className='p-4 border-r'>
                <h2>Business Name</h2>
                <h2 className='font-bold text-2xl'>{formValue?.name?formValue?.name:'Meeting Name'}</h2>
                <div className='mt-5 flex flex-col gap-4'>
                    <h2 className='flex gap-2'><Clock/>{formValue?.duration?formValue?.duration:'30'} Min</h2>
                    <h2 className='flex gap-2'><MapPin/>{formValue?.locationtype} Meeting</h2>
                    <h2><Link className='flex gap-2 text-blue-500' href={formValue && formValue.locationUrl ? formValue.locationUrl : '#'}><LinkIcon/> {formValue?.locationUrl?formValue?.locationUrl:'Link'}</Link></h2>
                </div>
            </div>
            {/* Time and Date Selection */}
            <div className='md:col-span-2 flex px-4'>
                <div className='flex flex-col'>
                <h2 className='font-bold text-lg'>Select Date & Time</h2>
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border mt-5"
                    disabled={(d)=>d<=new Date()}
                />
                </div>
                <div className='flex flex-col w-full overflow-auto gap-4 p-5' style={{maxHeight:'400px'}}>
                    {timeSlots?.map((time,index)=>(
                        <Button className='border-primary text-primary' variant='outline'>{time}</Button>
                    ))}
                </div>
            </div>
        </div>
    </div>
  )
}

export default Preview