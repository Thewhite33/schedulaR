"use client"
import React, { useEffect, useState } from 'react'
import MeetTimeDateSelect from '../_components/MeetTimeDateSelect'
import { collection, doc, getDoc, getDocs, getFirestore, query, where } from 'firebase/firestore'
import { app } from '@/config/firebase'

const ShareMeeting = ({params}) => {
    const db = getFirestore(app)
    const [businessInfo,setBusinessInfo] = useState()
    const [eventInfo,setEventInfo] = useState()
    const [loading,setLoading] = useState()
    useEffect(()=>{
        params && getMeetingBusinessAndEventDetails()
    },[params])
    const getMeetingBusinessAndEventDetails = async() => {
        setLoading(true)
        const q = query(collection(db,'Business'),where('businessname','==',params.business))
        const docSnap = await getDocs(q)
        docSnap.forEach((doc)=>{
            setBusinessInfo(doc.data());
        })

        const docRef = doc(db,'MeetingEvent',params.meetingevent)
        const result = await getDoc(docRef)
        setEventInfo(result.data());

        setLoading(false)
    }
  return (
    <div>
        <MeetTimeDateSelect eventInfo={eventInfo} businessInfo={businessInfo}/>
    </div>
  )
}

export default ShareMeeting

