import { Star } from 'lucide-react';
import UnLiked from '../../assets/icons/UnLiked';
import { Link } from 'react-router-dom';
import { use } from 'framer-motion/client';
import { useEffect } from 'react';
import { convertPriceToWords } from '../../helperFunctions/basicHelpers';


const PropertyCard = ({property}) => {

  
  return (
    <Link to={`/property/${property?._id}`} className="flex gap-[10px] flex-col cursor-pointer">
      <div className='relative'>
        <div className="absolute p-[14px] cursor-pointer flex justify-between w-full">
          <div className='bg-white py-1 px-2 rounded-full text-xs'> Guest favourite </div>
          <UnLiked />
        </div>
        <img className="h-[250px] w-full rounded-lg z-0" src={property?.images[0]?.cloudinaryUrl || 
          "https://res.cloudinary.com/dzqgyl0wf/image/upload/v1729887606/wsaua8yjrxhll6bwrqag.png"
        } alt='err' />
      </div>
      <div className="">
        <div className="flex justify-between">
          <div className="font-semibold text-xl flex gap-2 items-center"> ₹{convertPriceToWords(property?.askedPrice)} {property?.availableFor === 'Rent' && (<div className='text-sm flex items-end'> / month </div>)}  </div>
          <div className="text-sm flex items-center gap-1"> <Star size={14} className='text-[#222222]' /> 4.84 </div>
        </div>
        <div className="text-sm"> {property?.address.locality}, {property?.address.city} </div>
      </div>
    </Link>
  )
}

export default PropertyCard