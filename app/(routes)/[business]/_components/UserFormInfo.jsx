
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'

const UserFormInfo = ({setUserName,setEmail,setNotes}) => {
  return (
    <div className='p-4 px-8 space-y-4'>
      <h2 className='font-bold text-2xl'>Enter Details</h2>
      <div>
        <h2>Name*</h2>
        <Input
        onChange={(e)=>setUserName(e.target.value)}/>
      </div>
      <div>
        <h2>Email*</h2>
        <Input
        onChange={(e)=>setEmail(e.target.value)}
        />
      </div>
      <div>
        <h2>Share any Notes</h2>
        <Input
        onChange={(e)=>setNotes(e.target.value)}
        />
      </div>
    </div>
  )
}

export default UserFormInfo