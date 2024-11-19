import { Text } from '@chakra-ui/react'
import React from 'react'

const Security = () => {
  return (
    <div className="px-10 py-6 flex flex-col gap-5 overflow-scroll">
      <div className="flex justify-between gap-7 flex-col">
        <div className="w-full flex flex-col">
          <div className="font-medium text-2xl"> Password & Security </div>
          <div className='text-sm'>Manage your account security settings</div>
        </div>

        <div className='flex gap-4 flex-col'>
          <div className='w-full'>
            <input
              type="text"
              className="border-[1px] w-full border-[#DDD] p-2 rounded-lg"
              placeholder="Current Password"
            />
            <div className='text-[#717171] text-xs'> Enter your existing password to verify your identity before making changes </div>
          </div>
          <div className='w-full'>
            <input
              type="text"
              className="border-[1px] w-full border-[#DDD] p-2 rounded-lg"
              placeholder="New Password"
            />
            <div className='text-[#717171] text-xs'> Choose a new password with at least 8 characters, including letters, numbers, and symbols for added security. </div>
          </div>
          <div className='w-full'>
            <input
              type="text"
              className="border-[1px] w-full border-[#DDD] p-2 rounded-lg"
              placeholder="Confirm New Password"
            />
            <div className='text-[#717171] text-xs'> Re-enter your new password to confirm it matches.</div>
          </div>
        </div>

        <button className='px-10 py-2 text-sm rounded-md w-fit border border-[#1D4CBE] bg-[#1D4CBE] text-white'> Update Password </button>

      </div>
    </div>
  )
}

export default Security