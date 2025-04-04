import { Star } from 'lucide-react';
import UnLiked from '../../assets/icons/UnLiked';
import { Link } from 'react-router-dom';
import { use } from 'framer-motion/client';
import { useEffect } from 'react';
import { convertPriceToWords } from '../../helperFunctions/basicHelpers';


const PropertyCard = ({property}) => {

  let location = property?.address?.locality || '';
  let city = property?.address?.city || '';
  const formattedCity = city.replace(/\s+/g, '-');
  const formattedLocation = location.replace(/\s+/g, '-');

  return (
    <Link to={`/property/properties-for-${property?.availableFor}-in-${formattedLocation}-${formattedCity}-${property?._id}`} className="flex gap-[10px] flex-col cursor-pointer">
      <div className='relative'>
        <img className="h-[250px] w-full rounded-lg z-0" src={property?.images[0]?.cloudinaryUrl || 
          "https://res.cloudinary.com/dzqgyl0wf/image/upload/v1729887606/wsaua8yjrxhll6bwrqag.png"
        } alt='Property' />
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