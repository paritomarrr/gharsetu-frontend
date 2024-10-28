import { ArrowRight } from 'lucide-react'
import SubmissionBadge from '../../assets/icons/SubmissionBadge'

const PropertyPostSuccess = () => {
  return (
    <div className='flex h-[calc(100vh-158px)] items-center justify-center'>
      <div className='flex gap-6 flex-col px-48'>
        <div className='flex justify-center'>
          <div className='bg-[#EEF5F0] w-fit flex py-2 px-[11px] rounded-full items-center gap-2'>
            <SubmissionBadge />
            <div className='text-xl font-medium text-[#589E67]'>Submission Completed! 🥳</div>
          </div>
        </div>
        <div className='text-5xl font-bold text-center'>
          Thank you for providing your property details. Your listing is now under review.
        </div>
        <div className='flex justify-center'>
          <div className='flex items-center gap-2 bg-[#1D4CBE] w-fit px-32 py-3 font-medium text-white rounded-xl'>
          View listed property <ArrowRight size={16}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PropertyPostSuccess