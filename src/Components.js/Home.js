import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'

export default function Home() {
  return (
    <div>
        
        <Header/>
        <div className='main-wrapper'>
        <Outlet />
        </div>
    </div>
  )
}
