import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import PropertyCard from '../components/common/PropertyCard'
import { useEffect } from 'react'
import axios from 'axios'

const SellerProfile = () => {
  const { sellerId } = useParams()
  const [sellerData, setSellerData] = useState()
  const [properties, setProperties] = useState()

  console.log('sellerId', sellerId)

  useEffect(() => {
    const getSellerData = async () => {
      const res = await axios.post('https://gharsetu-server.vercel.app/api/v1/users/getSellerprofile', {
        sellerId
      })
      console.log('resss', res)
      setSellerData(res.data.seller)
      setProperties(res.data.properties)
    }
    getSellerData()
  }, [sellerId])


  console.log('sellerId', sellerId)
  return (
    <div className='px-16 py-6 flex flex-col gap-5'>
      <div>
        <div className='font-semibold text-2xl'> Seller Profile </div>
      </div>

      <div className='flex justify-between'>
        <div className='flex gap-5 items-center'>
          <img
            className='w-32 h-32 rounded-full'
            // src='https://media.licdn.com/dms/image/v2/D5603AQEvhR-oclWlDw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1725570376005?e=1736380800&v=beta&t=8AvIwEEfanwKjsvLwfbM7bSN55COnJaSmpyDrPOw0tQ'
            src='/logo.png'
            alt='Seller profile'
          />
          <div className='flex flex-col gap-3'>
            <div className='text-xl font-semibold'>
              {sellerData?.firstName} {sellerData?.lastName}
            </div>
            <div className='text-sm text-gray-500'>
              {sellerData?.email}
            </div>
            <div className='text-sm text-gray-500'>
              {sellerData?.phoneNumber}
            </div>
          </div>
        </div>

        {/* <a
          href="mailto:team@gharsetu.com"
          className="bg-primary cursor-pointer h-fit px-3 py-2 rounded-md text-white"
        >
          Report Seller
        </a> */}

      </div>

      <div className='flex flex-col gap-5'>
        <div className='text-xl font-semibold'>
          Listed properties
        </div>
        <div className='grid grid-cols-4 gap-5'>
          {
            properties?.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))
          }
        </div>
      </div>

    </div>
  )
}

export default SellerProfile