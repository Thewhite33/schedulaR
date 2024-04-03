"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { app } from '@/config/firebase'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { doc, getFirestore, setDoc } from 'firebase/firestore'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'sonner'

const CreateBusiness = () => {
    const [businessname,setBusinessname] = useState('')
    const db = getFirestore(app)
    const {user} = useKindeBrowserClient()
    const router = useRouter()
    const onCreateBusiness = async() => {
        await setDoc(doc(db,"Business",user.email),{
            businessname:businessname,
            email:user.email,
            userName:user.given_name
        }).then(()=>{
            toast("New Business Created")
            router.replace('/dashboard')
        })
    }
  return (
    <div className='p-14 items-center flex flex-col gap-20 my-10'>
        <Image src='/logo21.svg' width={100} height={100}
        className='w-[150px] md:w-[200px]'
        alt='logo'/>
        <div className='flex flex-col items-center gap-4 max-w-3xl'>
            <h2 className='text-4xl font-bold'>What should we call your Business?</h2>
            <p className='text-slate-500'>You can always change this from settings</p>
            <div className='w-full'>
                <label className='text-slate-700'>Team Name</label>
                <Input
                value={businessname}
                onChange={(e)=>setBusinessname(e.target.value)}
                placeholder='Team Name' className='mt-2'/>
            </div>
            <Button
            onClick={onCreateBusiness}
            disabled={!businessname}
            className='w-full'>Create Business</Button>
        </div>
    </div>
  )
}

export default CreateBusiness