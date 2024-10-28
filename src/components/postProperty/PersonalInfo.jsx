import { Button, Input } from '@chakra-ui/react'

const PersonalInfo = () => {
  
  return (
    <div className='h-[calc(100vh-158px)] px-20 py-6 flex flex-col gap-9 overflow-scroll'>
      <div>
        <div className="font-bold text-3xl">
          1. Personal Information
        </div>
        <div className='text-2xl'>Let’s get started with the basics.</div>
      </div>

      <div className='flex flex-col gap-6'>
        <div className='text-xl'>
          Who’s listing this property?
        </div>
        <div className='flex gap-8'>
          <div className='text-sm min-w-28 border-[1px] py-3 flex items-center justify-center rounded-xl font-semibold cursor-pointer'> Owner </div>
          <div className='text-sm min-w-28 border-[1px] py-3 flex items-center justify-center rounded-xl font-semibold cursor-pointer'> Builder </div>
          <div className='text-sm min-w-28 border-[1px] py-3 flex items-center justify-center rounded-xl font-semibold cursor-pointer'> Agent </div>
          <div className='text-sm min-w-28 border-[1px] py-3 flex items-center justify-center rounded-xl font-semibold cursor-pointer'> Flatmate </div>
        </div>
      </div>
      <div className='flex flex-col'>
        <input type='text' className='border-[1px] px-3 py-[10px] rounded-t-lg' placeholder='First Name' />
        <input type='text' className='border-[1px] px-3 py-[10px] rounded-b-lg' placeholder='Last Name' />
        <div className='text-[#717171] text-xs py-2'>
          Make sure it matches the name on your government ID.
        </div>
      </div>
      <div>
        <input type='text' className='border-[1px] px-3 py-[10px] rounded-lg w-full' placeholder='Phone Number' />
      </div>

      <div className='flex flex-col'>
        <input type='text' className='border-[1px] px-3 py-[10px] rounded-lg' placeholder='Email' />
        <div className='text-[#717171] text-xs py-2'>
          We’ll send you important updates and notifications.
        </div>
      </div>

      <div className='flex flex-col'>
        <input type='text' className='border-[1px] px-3 py-[10px] rounded-lg' placeholder='City' />
        <div className='text-[#717171] text-xs py-2'>
          This helps us display your listing to the right audience based on location.
        </div>
      </div>


    </div>
  )
}

export default PersonalInfo