import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { FaGoogle } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import React from 'react'

const Hero = () => {
  return (
    <div className='flex flex-col justify-center items-center my-[150px]'>
        <div className='text-center max-w-3xl'>
            <h2 className='font-bold text-[60px] text-slate-700'>Easy scheduling ahead</h2>
            <h2 className='text-xl mt-5 text-slate-500'>ScheduleR is your scheduling automation platform for eliminating the back-and-forth emails to find the perfect time, and so much more</h2>
            <div className='flex flex-col gap-4'>
                <h3 className='text-sm pt-4 '>Sign Up free with Google and Facebook</h3>
                <div className='flex justify-center gap-8 pt-5'>
                    <Button className='p-7'><FaGoogle size={30} className='mr-3'/>Sign up with Google</Button>
                    <Button className='p-7'><FaFacebook size={30} className='mr-3'/>Sign up with Facebook</Button>
                </div>
                <hr />
                <h2><Link href='#' className='text-blue-600'>Sign up Free with Email</Link></h2>
            </div>
        </div>
    </div>
  )
}

export default Hero