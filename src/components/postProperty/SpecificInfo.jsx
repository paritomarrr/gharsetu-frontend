import Separator from '../../components/Separator'

const SpecificInfo = () => {
  return (
    <div className='h-[calc(100vh-158px)] px-20 py-6 flex flex-col gap-9 overflow-scroll'>
      <div>
        <div className="font-bold text-3xl">
          3. Property Specific Details
        </div>
        <div className='text-2xl'>Provide specific information to showcase your property’s best attributes.</div>
        <Separator />
      </div>

      <div className='flex gap-4 flex-col'>
        <div className='text-xl'>
          Property Sub-Type :
        </div>
        <div className='flex gap-8'>
          <div className='text-sm min-w-40 border-[1px] py-3 flex items-center justify-center rounded-xl font-semibold cursor-pointer'> Apartment </div>
          <div className='text-sm min-w-40 border-[1px] py-3 flex items-center justify-center rounded-xl font-semibold cursor-pointer'> Independent Floor </div>
          <div className='text-sm min-w-40 border-[1px] py-3 flex items-center justify-center rounded-xl font-semibold cursor-pointer'> Independent House </div>
          <div className='text-sm min-w-40 border-[1px] py-3 flex items-center justify-center rounded-xl font-semibold cursor-pointer'> Villa </div>
          <div className='text-sm min-w-40 border-[1px] py-3 flex items-center justify-center rounded-xl font-semibold cursor-pointer'> Plot </div>
        </div>
      </div>

      <div className='flex flex-col'>
        <input type='text' className='border-[1px] px-3 py-[10px] rounded-lg' placeholder='Building / Project / Society' />
        <div className='text-[#717171] text-xs py-2'>
          This helps us display your listing to the right audience based on location.
        </div>
      </div>

      <div className='flex flex-col'>
        <input type='text' className='border-[1px] px-3 py-[10px] rounded-lg' placeholder='Locality' />
        <div className='text-[#717171] text-xs py-2'>
          This helps us display your listing to the right audience based on location.
        </div>
      </div>

      <div className='flex gap-4 flex-col'>
        <div className='text-xl'>
          Furnish Type :
        </div>
        <div className='flex gap-8'>
          <div className='text-sm min-w-40 border-[1px] py-3 flex items-center justify-center rounded-xl font-semibold cursor-pointer'> Fully furnished </div>
          <div className='text-sm min-w-40 border-[1px] py-3 flex items-center justify-center rounded-xl font-semibold cursor-pointer'> Semi-furnished </div>
          <div className='text-sm min-w-40 border-[1px] py-3 flex items-center justify-center rounded-xl font-semibold cursor-pointer'> Unfurnished </div>
        </div>
      </div>

      <div className='flex gap-4 flex-col'>
        <div className='text-xl font-medium'>
          BHK Configuration :
        </div>
        <div className='flex gap-8'>
          <div className='text-sm min-w-40 border-[1px] py-3 flex items-center justify-center rounded-xl font-semibold cursor-pointer'> 1 BHK </div>
          <div className='text-sm min-w-40 border-[1px] py-3 flex items-center justify-center rounded-xl font-semibold cursor-pointer'> 2 BHK </div>
          <div className='text-sm min-w-40 border-[1px] py-3 flex items-center justify-center rounded-xl font-semibold cursor-pointer'> 3 BHK </div>
          <div className='text-sm min-w-40 border-[1px] py-3 flex items-center justify-center rounded-xl font-semibold cursor-pointer'> 4 BHK </div>
          <div className='text-sm min-w-40 border-[1px] py-3 flex items-center justify-center rounded-xl font-semibold cursor-pointer'> 4+ BHK </div>
        </div>
      </div>

      <div className='flex gap-4 flex-col'>
        <div className='text-xl font-medium'>
          Select Amenities :
        </div>

        <div>
          <div className='text-lg'>
            Flat furnishings
          </div>

          <div className='text-lg'>
            Society Amenties
          </div>
        </div>
      </div>

      <div className='flex flex-col'>
        <input type='text' className='border-[1px] px-3 py-[10px] rounded-lg' placeholder='Price' />
        <div className='text-[#717171] text-xs py-2'>
          Enter the asking price for your property in your local currency. Make sure to set a competitive price to attract potential buyers or renters.        </div>
      </div>

      <div className='flex gap-4 flex-col'>
        <div className='text-xl font-medium'>
          Construction Type :        
        </div>
        <div className='flex gap-8'>
          <div className='text-sm min-w-40 border-[1px] py-3 flex items-center justify-center rounded-xl font-semibold cursor-pointer'> Ready to Move </div>
          <div className='text-sm min-w-40 border-[1px] py-3 flex items-center justify-center rounded-xl font-semibold cursor-pointer'> Under Construction </div>
        </div>
      </div>


    </div>
  )
}

export default SpecificInfo