import React from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import { CalendarCheck, Clock, LinkIcon, Timer } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

  

const ScheduledMeetingList = ({meetingList}) => {
    const router = useRouter()
  return (
    <div>
        {meetingList && meetingList.map((meeting,index)=>(
            <Accordion key={index} type="single" collapsible>
                <AccordionItem value="item-1">
                    <AccordionTrigger>{meeting?.formatedDate}</AccordionTrigger>
                    <AccordionContent>
                        <div>
                        <div className='mt-5 flex flex-col gap-4'>
                    <h2 className='flex gap-2'><Clock/>{meeting?.duration} Min</h2>
                    <h2 className='flex gap-2'><CalendarCheck/>{meeting?.formatedDate}</h2>
                    <h2 className='flex gap-2'><Timer/>{meeting.selectedTime}</h2>
                    <h2><Link className='flex gap-2 text-blue-500' href={meeting && meeting.locationUrl ? meeting.locationUrl : '#'}><LinkIcon/> {meeting?.locationUrl}</Link></h2>
                </div>
                <Link href={meeting.locationUrl}><Button className='mt-5'>Join Now</Button></Link>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        ))}
    </div>
  )
}

export default ScheduledMeetingList