import React, {useContext} from 'react'
import Separator from '../Separator'
import { SquarePen } from 'lucide-react'
import VerifiedUser from '../../assets/icons/VerifiedUser'
import { UserContext } from '../../context/userContext'

const PersonalInfo = () => {
  const {user} = useContext(UserContext);
  return (
    <div className="px-10 py-6 flex flex-col gap-5 overflow-scroll">
      <div className="flex justify-between gap-10">
        <div className="w-full flex flex-col gap-8">
          <div className="font-medium text-2xl"> General Information </div>

          <div className="flex flex-col gap-4">
            <div className="flex gap-5 relative">
              <div className="flex-shrink-0">
                <img
                  // src="https://media.licdn.com/dms/image/v2/D5603AQEvhR-oclWlDw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1725570376005?e=1736380800&v=beta&t=8AvIwEEfanwKjsvLwfbM7bSN55COnJaSmpyDrPOw0tQ"
                  src='/logo.jpg'
                  alt="Profile"
                  className="w-28 h-28 rounded-full object-cover"
                />
                <div className="absolute top-14 left-16">
                  <VerifiedUser />
                </div>
              </div>

              <div className="flex flex-col w-full">
                <span className="text-xs text-gray-400">Your Full Name</span>
                <input
                  type="text"
                  className="border-[1px] border-[#DDD] p-2 rounded-t-lg"
                  placeholder={user?.firstName}
                />
                <input
                  type="text"
                  className="border-[1px] border-[#DDD] p-2 rounded-b-lg"
                  placeholder={user?.lastName}
                />
              </div>
            </div>

            <div className="flex flex-col">
              <span className="text-xs text-gray-400">Your Email</span>
              <input
                type="text"
                className="border-[1px] border-[#DDD] p-2 rounded-lg"
                placeholder={user?.email}
              />
            </div>

            <div className="flex flex-col">
              <span className="text-xs text-gray-400">Your Phone Number</span>
              <input
                type="text"
                className="border-[1px] border-[#DDD] p-2 rounded-lg"
                placeholder={user?.phoneNumber}
              />
            </div>

            <div className='flex gap-5'>
                <button className='px-10 py-2 text-sm rounded-md border border-black'> Edit </button>
                <button className='px-10 py-2 text-sm rounded-md border border-[#1D4CBE] bg-[#1D4CBE] text-white'> Save </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default PersonalInfo