import React from 'react'
import { Link } from 'react-router-dom'

const Error = () => {
    return (
        <div className='h-[calc(100vh-100px)] flex flex-col gap-5 justify-center items-center'>
            <img src='/Error.png' alt="Error" className="w-1/2 rounded-xl" />
            <div className='flex flex-col gap-7'>
                <div className='flex flex-col gap-3'>
                    <div className='text-3xl font-bold'>Uh-oh! Looks like you're lost in the neighborhood.</div>
                    <div className='text-base'>
                        We couldn't find the page you're looking for. Maybe it moved out or took a little detour! 🏠
                    </div>
                </div>
                <div className='flex flex-col justify-center items-center gap-3'>
                    <div>Don’t worry, let's guide you back home.</div>
                    <Link to={'/'} className='py-[11px] px-[20px] bg-black text-white rounded-md w-fit'> Take me Home</Link>
                </div>
            </div>
        </div>
    )
}

export default Error