import Separator from '../../components/Separator'

const BasicInfo = () => {
  return (
    <div className='h-[calc(100vh-158px)] px-20 py-6 flex flex-col gap-9 overflow-scroll'>
      <div>
        <div className="font-bold text-3xl">
          2. Basic Property details
        </div>
        <div className='text-2xl'>Tell us about your property so we can help you find the right buyers or tenants faster.</div>
        <Separator />
      </div>


      <div className='flex gap-4 flex-col'>
        <div className='text-xl'>
          Property Type :
        </div>
        <div className='flex gap-8'>
          <div className='text-sm min-w-40 border-[1px] py-3 flex items-center justify-center rounded-xl font-semibold cursor-pointer'> Residential </div>
          <div className='text-sm min-w-40 border-[1px] py-3 flex items-center justify-center rounded-xl font-semibold cursor-pointer'> Commercial </div>

        </div>
      </div>


      <div className='flex gap-4 flex-col'>
        <div className='text-xl'>
          Looking to :
        </div>
        <div className='flex gap-8'>
          <div className='text-sm min-w-40 border-[1px] py-3 flex items-center justify-center rounded-xl font-semibold cursor-pointer'> Rent </div>
          <div className='text-sm min-w-40 border-[1px] py-3 flex items-center justify-center rounded-xl font-semibold cursor-pointer'> Sell </div>
          <div className='text-sm min-w-40 border-[1px] py-3 flex items-center justify-center rounded-xl font-semibold cursor-pointer'> Co-Living Space </div>
        </div>
      </div>

      <div className='flex flex-col'>
        <input type='text' className='border-[1px] px-3 py-[10px] rounded-lg' placeholder='City of the Property' />
        <div className='text-[#717171] text-xs py-2'>
        This helps us display your listing to the right audience based on location.
        </div>
      </div>

    </div>
  )
}

export default BasicInfo