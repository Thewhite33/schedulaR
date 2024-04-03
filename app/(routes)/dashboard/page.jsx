"use client"
import { app } from '@/config/firebase'
import {doc, getDoc, getFirestore} from 'firebase/firestore'
import { LogoutLink, useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import MeetingPage from './meeting-type/page'

const Dashboard = () => {
  const db = getFirestore(app)
  const {user} = useKindeBrowserClient()
  const [loading,setLoading] = useState(true)
  const router = useRouter()
  const isBusinessRegister = async() => {
    const docRef = doc(db,"Business",user.email)
    const docSnap = await getDoc(docRef)
    if(docSnap.exists()){
      setLoading(false)
      router.replace('/dashboard/meeting-type')
    }else{
      setLoading(false)
      router.replace('/create-business')
    }
  }
  useEffect(()=>{
    user && isBusinessRegister()
  },[user])
  if(loading){
    return(
      <h2>Loading...</h2>
    )
  }
  return (
    <div>

    </div>
  )
}

export default Dashboard