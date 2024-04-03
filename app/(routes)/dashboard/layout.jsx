import React from 'react'
import SideNavBar from './_components/SideNavBar'
import DashboardHeader from './_components/DashboardHeader'

const Dashboardlayout = ({children}) => {
  return (
    <div>
      <div className='w-64 bg-slate-100 h-screen fixed'>
        <SideNavBar/>
      </div>
      <div className='pl-64'>
        <DashboardHeader/>
        {children}
      </div>
    </div>
  )
}

export default Dashboardlayout