import React, { useState, useEffect, useRef } from 'react'
import { Menu } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleIsOpen } from '../store/slices/SignInSlice';

const ProfileDropDown = () => {
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef(null)

    const dispatch = useDispatch();
    const toggleDropDown = () => {
        setIsOpen(!isOpen)
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    const openSignInModal = () => {
        dispatch(toggleIsOpen())
    }

    return (
        <div className='relative' ref={dropdownRef}>
            <div onClick={toggleDropDown} className='flex items-center gap-[14px] py-2 px-3 border-[1px] rounded-full cursor-pointer'>
                <Menu size={20} />
                <div className='bg-primary text-white flex justify-center items-center rounded-full py-1 px-[10px]'> K </div>
            </div>
            <div className='absolute right-0'>
                {isOpen && (
                    <div className='py-2 border-[1px] rounded-xl bg-white shadow-custom w-[220px] text-sm'>
                        <div onClick={openSignInModal} className='py-[10px] px-4 font-bold cursor-pointer'>
                            Sign Up
                        </div>
                        <div className='py-[10px] px-4'>
                            Log In
                        </div>
                        <div className='w-full h-[1px] bg-[#DDD]'> </div>
                        <div className='py-[10px] px-4'>
                            Sign Up
                        </div>
                        <div className='py-[10px] px-4'>
                            Log In
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ProfileDropDown
