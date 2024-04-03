"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronLeft } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import LocationOptions from '@/app/_utils/LocationOptions'
import Image from 'next/image'
import Link from 'next/link'
import ThemeOptions from '@/app/_utils/ThemeOptions'
import { doc, getFirestore, setDoc } from 'firebase/firestore'
import { app } from '@/config/firebase'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

const MeetingForm = ({setFormValue}) => {
    const [themeColor,setThemeColor] = useState('')
    const [name, setname] = useState('')
    const [duration, setduration] = useState(30)
    const [locationtype, setlocationtype] = useState()
    const [locationUrl, setlocationUrl] = useState('')
    const router = useRouter()

    const db = getFirestore(app)
    const {user} = useKindeBrowserClient()

    useEffect(()=>{
        setFormValue({
            name:name,
            duration:duration,
            locationtype:locationtype,
            locationUrl:locationUrl,
            themeColor:themeColor
        })
    },[name,duration,locationtype,locationUrl,themeColor])

    const handleSubmit = async() => {
        const id = Date.now().toString()
        await setDoc(doc(db,"MeetingEvent",id),{
            id:id,
            name:name,
            duration:duration,
            locationtype:locationtype,
            locationUrl:locationUrl,
            themeColor:themeColor,
            businessid:doc(db,'Business',user?.email),
            createdBy:user?.email,
        }).then(resp=>{
            toast("New Meeting Event Created")
            router.replace('/dashboard/meeting-type')
        })
    }
  return (
    <div className='p-8'>
        <Link href={'/dashboard'}>
            <h2 className='flex gap-2'><ChevronLeft/> Cancel</h2>
        </Link>
        <div className='mt-4'>
            <h2 className='font-bold text-2xl my-4'>Create New Event</h2>
            <hr />
        </div>
        <div className='flex flex-col gap-3 my-4'>
            <h2 className='font-bold'>Event Name *</h2>
            <Input
            onChange={(e)=>setname(e.target.value)}
            placeholder='Name your meeting event'/>
            <h2 className='font-bold'>Duration *</h2>
            
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant='outline' className='max-w-40'>{duration} Min</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>  
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={()=>setduration(15)}>15 Min</DropdownMenuItem>
                    <DropdownMenuItem onClick={()=>setduration(30)}>30 Min</DropdownMenuItem>
                    <DropdownMenuItem onClick={()=>setduration(45)}>45 Min</DropdownMenuItem>
                    <DropdownMenuItem onClick={()=>setduration(60)}>60 Min</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <h2 className='font-bold'>Location *</h2>
            <div className='grid grid-cols-3 gap-3'>
                {LocationOptions.map((index,key)=>(
                    <div
                    onClick={()=>setlocationtype(index.name)}
                    key={key} 
                    className={`border flex flex-col justify-center items-center p-3 rounded-lg hover:bg-slate-200 hover:border-slate-300 cursor-pointer ${locationtype==index.name && 'bg-slate-200 border-slate-300'}`}>
                        <Image src={index.icon} width={30} height={30} alt={index.name}/>
                        <h2>{index.name}</h2>
                    </div>
                ))}
            </div>
            {locationtype && 
                <>
                    <h2 className='font-bold'>Add {locationtype} Url *</h2>
                    <Input
                    onChange={(e)=>setlocationUrl(e.target.value)}
                    placeholder='Add Url'/>
                </>
            }
            <h2 className='font-bold'>Select Theme Color</h2>
            <div className='flex justify-evenly'>
                {ThemeOptions.map((color,index)=>(
                    <div 
                    key={index}
                    className={`h-10 w-10 rounded-full cursor-pointer ${themeColor==color && 'border-2 border-black'}`} 
                    style={{backgroundColor:color}} 
                    onClick={()=>setThemeColor(color)}>
                        
                    </div>
                ))}
            </div>
        </div>
        <Button
        onClick={handleSubmit}
        disabled={(!name||!duration||!locationtype||!locationUrl)} className='mt-5 w-35'>Create</Button>
    </div>
  ) 
}

export default MeetingForm
