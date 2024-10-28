import { Star } from 'lucide-react';
import UnLiked from '../../assets/icons/UnLiked';
import { Link } from 'react-router-dom';


const PropertyCard = () => {
  return (
    <Link to={'/property/gg'} className="flex gap-[10px] flex-col cursor-pointer">
      <div className='relative'>
        <div className="absolute p-[14px] cursor-pointer flex justify-between w-full">
          <div className='bg-white py-1 px-2 rounded-full text-xs'> Guest favourite </div>
          <UnLiked />
        </div>
        <img className="h-[255px] rounded-lg z-0" src='https://res.cloudinary.com/dzqgyl0wf/image/upload/v1729887606/wsaua8yjrxhll6bwrqag.png' alt='err' />
      </div>
      <div className="">
        <div className="flex justify-between">
          <div className="font-semibold text-xl"> ₹75 Lakhs </div>
          <div className="text-sm flex items-center gap-1"> <Star size={14} className='text-[#222222]' /> 4.84 </div>
        </div>
        <div className="text-sm">Connaught Place, New Delhi</div>
        <div className="text-sm">1200 sq.ft</div>
      </div>

    </Link>
  )
}

export default PropertyCard