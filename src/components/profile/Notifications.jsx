import React from 'react'
import { Switch } from '@chakra-ui/react'

const Notifications = () => {
  return (
    <div className="px-10 py-6 flex flex-col gap-5 overflow-scroll">
      <div className="flex justify-between gap-7 flex-col">
        <div className="w-full flex flex-col">
          <div className="font-medium text-2xl"> Notification Preferences </div>
          <div className='text-sm'>Manage how you receive notifications</div>
        </div>

        <div className='flex gap-5 flex-col'>
          <div className='flex justify-between items-center'>
            <div>
              <div className='font-semibold'>Email Notifications</div>
              <div className='text-xs'>Receive property updates and new lead alerts</div>
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
          <div className='flex justify-between items-center'>
            <div>
              <div className='font-semibold'>Daily Whatsapp Insights</div>
              <div className='text-xs'>Receive daily insights of listings on whatsapp</div>
            </div>
            <Switch size='lg' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Notifications