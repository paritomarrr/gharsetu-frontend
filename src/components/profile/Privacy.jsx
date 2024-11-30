import React from 'react'
import { Switch } from '@chakra-ui/react'

const Privacy = () => {
  return (
    <div className="px-10 py-6 flex flex-col gap-5 overflow-scroll">
      <div className="flex justify-between gap-7 flex-col">
        <div className="w-full flex flex-col">
          <div className="font-medium text-2xl"> Privacy Settings </div>
          <div className='text-sm'>Manage your privacy and data sharing preferences</div>
        </div>

        <div className='flex gap-5 flex-col'>
          <div className='flex justify-between items-center'>
            <div>
              <div className='font-semibold'>Data Sharing</div>
              <div className='text-xs'>Manage how your data is shared with third parties</div>
            </div>
            <Switch size='lg' />
          </div>
          <div className='flex justify-between items-center'>
            <div>
              <div className='font-semibold'>SMS Notifications</div>
              <div className='text-xs'>Receive high-priority alerts via SMS</div>
            </div>
            <Switch size='lg' />
          </div>
          {/* <div className='flex flex-col'>
            <div>
              <div className='font-semibold'>Connected Accounts</div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default Privacy