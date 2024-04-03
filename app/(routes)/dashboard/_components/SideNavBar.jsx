"use client"
import { Button } from '@/components/ui/button'
import { FaPlus } from "react-icons/fa";
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Briefcase, Calendar, Clock1, Settings } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const SideNavBar = () => {
    const menu = [
        {
            id:1,
            name:'Meeting Type',
            path:'/dashboard/meeting-type',
            icon:Briefcase
        },
        {
            id:2,
            name:'Scheduled Meeting',
            path:'/dashboard/scheduledmeeting',
            icon:Calendar
        },
        {
            id:3,
            name:'Availability',
            path:'/dashboard/availability',
            icon:Clock1
        },
        {
            id:4,
            name:'Settings',
            path:'/dashboard/settings',
            icon:Settings
        },
    ]
    const path = usePathname()
    const [activepath,setActivepath] = useState(path)
    useEffect(()=>{
        path && setActivepath(path)
    },[path])
  return (
    <div className='p-5 py-14'>
        <div className='flex justify-center'>
            <Image src='/logo21.svg' width={150} height={150}
            alt='logo'/>
        </div>
        <Link href={'/create-meeting'}>
            <Button className='flex gap-2 w-full rounded-xl mt-7'><FaPlus className='mr-2'/> Create</Button>
        </Link>
        <div className='mt-5 flex flex-col gap-5'>
            {menu.map((item,index)=>(
                <Link href={item.path} key={index}>
                    <Button
                    className={`w-full flex gap-2 justify-start hover:bg-slate-300 transition-all duration-500 ease-in-out ${activepath==item.path ? 'bg-slate-300 font-bold':''}`} variant="ghost"
                    key={index}><item.icon/> {item.name}</Button>
                </Link>
            ))}
        </div>
    </div>
  )
}

export default SideNavBar