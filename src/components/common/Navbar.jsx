import React from 'react'
import MainIcon from '../../assets/icons/MainIcon'
import { Link } from 'react-router-dom'
import { Bell, Menu } from 'lucide-react';
import ProfileDropDown from '../ProfileDropDown';



const Navbar = () => {
  return (
    <div className='px-20 py-4 border-b-[1px] flex justify-between items-center'>
      <Link to={'/'} className='flex items-center gap-2'>
        <MainIcon />
        <div className='font-MavenPro font-bold text-[30px]'> GharSetu </div>
      </Link>

      <div className='flex text-[#6A6A6A] items-center'>
        <div className='p-3'> Buy </div>
        <div className='bg-[#DDD] h-6 w-[1px]'></div>
        <div className='p-3'> Rent </div>
        <div className='bg-[#DDD] h-6 w-[1px]'></div>
        <div className='p-3'> Post Property </div>
      </div>

      <div className='flex gap-4 items-center'>
        <Bell size={20} />
        <ProfileDropDown />
      </div>
    </div>
  )
}

export default Navbar