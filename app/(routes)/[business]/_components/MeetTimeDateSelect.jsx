"use client"
import { CalendarCheck, Clock, LinkIcon, MapPin, Timer } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { render } from '@react-email/render';
import { Calendar } from "@/components/ui/calendar"
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { format } from 'date-fns'
import TimeDateSelection from './TimeDateSelection'
import UserFormInfo from './UserFormInfo'
import { collection, doc, getDocs, getFirestore, query, setDoc, where } from 'firebase/firestore'
import { app } from '@/config/firebase'
import { toast } from 'sonner'
import Plunk from '@plunk/node'
import Email from '@/emails';
import { useRouter } from 'next/navigation';

const plunk = new Plunk(process.env.NEXT_PUBLIC_PLUNK_API_KEY);

const MeetTimeDateSelect = ({eventInfo,businessInfo}) => {
  const [date, setDate] = useState(new Date())
  const [selectedTime,setSelectedTime] = useState()
  const [enableTimeSlot,setEnabaleTimeSlot] = useState(false)
  const [step,setStep] = useState(1)
  const [username,setUserName] = useState()
  const [email,setEmail] = useState()
  const [notes,setNotes] = useState()
  const router = useRouter()
  const [prevBooking,setPrevBooking] = useState([])
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
    const db = getFirestore(app)
    useEffect(()=>{
        eventInfo?.duration && createTimeSlot(eventInfo?.duration)
    },[eventInfo])
    const [timeSlots,setTimeSlots] = useState()
    const handleDateChange = (date) => {
      setDate(date)
      const day = format(date,'EEEE') //Docs for date available in date fns
      if(businessInfo?.daysAvailable?.[day]){
        getPreventBooking(date)
        setEnabaleTimeSlot(true)
      }else{
        setEnabaleTimeSlot(false)
      }
    }
    const sendEmail = (user) => {
      const emailHtml = render(<Email
      businessName={businessInfo?.businessname}
      date={format(date,'PPP').toString()}
      duration={eventInfo.duration}
      meetingTime={selectedTime}
      meetingUrl={eventInfo.locationUrl}
      userFirstName={user}
      />);
      plunk.emails.send({
        to: email,
        subject: "Meeting Schedule Detail",
        body: emailHtml,
      }).then(resp => {
        console.log(resp);
        router.replace('/confirmation')
      })
    }
    const handleScheduleEvent = async() => {
      const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if(regex.test(email)==false){
          toast('Enter valid email address')
          return ;
        }
      const docId = Date.now().toString()
      await setDoc(doc(db,'ScheduleMeetings',docId),{
        businessname:businessInfo.businessname,
        businessEmail:businessInfo.email,
        selectedTime:selectedTime,
        selectedDate:date,
        formatedDate:format(date,'PPP'),
        formatedTimeStamp:format(date,'t'),
        duration:eventInfo.duration,
        locationUrl:eventInfo.locationUrl,
        eventId:eventInfo.id,
        id:docId,
        username:username,
        email:email,
        notes:notes,
      }).then(resp=>{
        toast('Meeting Scheduled Sucessfully')
        sendEmail(username)
      })

    }
    const getPreventBooking = async(date_) => {
      const q = query(collection(db,'ScheduleMeetings'),where('selectedDate','==',date_),where('eventId','==',eventInfo.id))
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((doc)=>{
        console.log("--",doc.data());
        setPrevBooking(prev=>[...prev,doc.data()])
      })
    }
  return (
    <div className='p-5 py-10 shadow-lg m-5 border-t-8 mx-10 md:mx-26 lg:mx-56 my-10 ' style={{borderTopColor:eventInfo?.themeColor}}>
        <Image src='/logo21.svg' alt='logo' width={150} height={150}/>
        <div className='grid grid-cols-1 md:grid-cols-3 mt-5'>
            {/* Meeting Info */}
            <div className='p-4 border-r'>
                <h2>{businessInfo?.businessname}</h2>
                <h2 className='font-bold text-2xl'>{eventInfo?.name?eventInfo?.name:'Meeting Name'}</h2>
                <div className='mt-5 flex flex-col gap-4'>
                    <h2 className='flex gap-2'><Clock/>{eventInfo?.duration?eventInfo?.duration:'30'} Min</h2>
                    <h2 className='flex gap-2'><MapPin/>{eventInfo?.locationtype} Meeting</h2>
                    <h2 className='flex gap-2'><CalendarCheck/>{format(date,'PPP')}</h2>
                    {selectedTime && <h2 className='flex gap-2'><Timer/>{selectedTime}</h2>}
                    <h2><Link className='flex gap-2 text-blue-500' href={eventInfo && eventInfo.locationUrl ? eventInfo.locationUrl : '#'}><LinkIcon/> {eventInfo?.locationUrl?eventInfo?.locationUrl:'Link'}</Link></h2>
                </div>
            </div>
            {/* Time and Date Selection */}
            {step==1 ?
              <TimeDateSelection prevBooking={prevBooking} selectedTime={selectedTime} date={date} enableTimeSlot={enableTimeSlot} handleDateChange={handleDateChange} setSelectedTime={setSelectedTime} timeSlots={timeSlots}/>
            :
            <UserFormInfo setUserName={setUserName} setEmail={setEmail} setNotes={setNotes}/>
            }
        </div>
        <div className='flex gap-3 justify-end'>
          {step==2 && <Button variant='outline' className='mt-10 float-right' onClick={()=>setStep(1)}>Back</Button>}
          {step==1?
          <Button
          disabled={!selectedTime || !date}
          onClick={()=>setStep(step+1)}
          className='mt-10 float-right'>Next</Button>:<Button onClick={handleScheduleEvent} className='mt-10' disabled={!username || !email}>Schedule</Button>}
        </div>
    </div>
  )
}

export default MeetTimeDateSelect