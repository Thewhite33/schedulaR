"use client"
import React, { useEffect, useState } from 'react'
import { app } from '@/config/firebase'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { collection, deleteDoc, doc, getDoc, getDocs, getFirestore, orderBy, query, where } from 'firebase/firestore'
import { Clock, Copy, MapPin, Pen, Settings, Trash } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import {DropdownMenu,DropdownMenuContent,DropdownMenuItem,DropdownMenuSeparator,DropdownMenuTrigger,} from "@/components/ui/dropdown-menu"



const MeetingEventList = () => {
    const db = getFirestore(app)
    const { user } = useKindeBrowserClient()
    const [businessInfo,setBusinessInfo] = useState([])
    useEffect(() => {
        user && getEventList()
        user && BusinessInfo()
    }, [user])
    const getEventList = async () => {
        setEventList([])
        const q = query(collection(db, "MeetingEvent"), where("createdBy", '==', user?.email),orderBy('id','desc'))
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach((doc) => {
            console.log(doc.id, "=>", doc.data());
            setEventList(prev => [...prev,doc.data()])
        })
    }
    const [eventList, setEventList] = useState([])
    const onDelete = async(e) => {
        await deleteDoc(doc(db,"MeetingEvent",e?.id)).then(resp=>{
            toast("Metting Event Deleted")
            getEventList()
        })
    }
    const onCopyClickHandler = (e) => {
        const meetingEventUrl = process.env.NEXT_PUBLIC_BASE_URL+'/'+businessInfo.businessname+'/'+e.id
        navigator.clipboard.writeText(meetingEventUrl)
        toast('URL Copied to Clipboard')
    }
    const BusinessInfo = async() => {
        const docRef = doc(db,'Business',user?.email)
        const docSnap = await getDoc(docRef)
        setBusinessInfo(docSnap.data())
    }
    return (
        <div className='mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7'>
            {eventList.length>0?eventList?.map((e,i)=>(
                <div key={i} className='border shadow-md border-t-8 rounded-lg p-5 flex flex-col gap-3' style={{borderTopColor:e?.themeColor}}>
                    <div className='flex justify-end'>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Settings className='text-gray-500 cursor-pointer'/>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className='flex gap-2'><Pen/> Edit</DropdownMenuItem>
                                <DropdownMenuItem className='flex gap-2'
                                onClick={()=>onDelete(e)}
                                ><Trash/> Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <h2 className='font-semibold text-2xl'>{e.name}</h2>
                    <div className='flex justify-between'>
                        <h2 className='flex gap-2 text-gray-500'><Clock/> {e.duration} Min</h2>
                        <h2 className='flex gap-2 text-gray-500'><MapPin/> {e.locationtype} Meet</h2>
                    </div>
                    <hr />
                    <div className='flex justify-between'>
                        <h2 className='flex gap-2 text-sm text-blue-600 items-center cursor-pointer'><Copy className='h-4 w-4 text-sm items-center text-blue-600'
                        onClick={()=>{
                            onCopyClickHandler(e)
                        }}/> Copy Link</h2>
                        <Button variant='outline' className='border-blue-700 rounded-full text-blue-700'>Share</Button>
                    </div>
                </div>
            )):<h2>Loding...</h2>}
        </div>
    )
}

export default MeetingEventList
