"use client"
import { Button } from '@/components/ui/button'
import { LoginLink, RegisterLink } from '@kinde-oss/kinde-auth-nextjs'
import Image from 'next/image'
import React from 'react'

const Header = () => {
    const navbar = [
        {
            name:'Product',
            link:'/product'
        },
        {
            name:'Pricing',
            link:'/pricing'
        },
        {
            name:'Contact Us',
            link:'/contact'
        },
        {
            name:'About Us',
            link:'/about'
        },
    ]
  return (
    <div>
        <div className='flex items-center justify-between p-5 shadow-sm'>
            <Image src='/logo21.svg' width={100} height={100}
            className='w-[150px] md:w-[200px]'
            alt='logo'/>
            <div className='hidden md:flex gap-14 font-medium text-lg'>
                {
                    navbar.map((index,key)=>(
                        <ul key={key}>
                            <li className='hover:text-primary transition-all duration-300 cursor-pointer'>{index.name}</li>
                        </ul>
                    ))
                }
            </div>
            <div className='flex gap-5'>
                <LoginLink><Button variant='ghost'>Login</Button></LoginLink>
                <RegisterLink><Button>Get Started</Button></RegisterLink>
            </div>
        </div>
    </div>
  )
}

export default Header


