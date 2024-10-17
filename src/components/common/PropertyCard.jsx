import { Star } from 'lucide-react';
import UnLiked from '../../assets/icons/UnLiked';


const PropertyCard = () => {
  return (
    <div className="flex gap-[10px] flex-col cursor-pointer">
      <div className='relative'>
        <div className="absolute p-[14px] cursor-pointer flex justify-between w-full">
          <div className='bg-white py-1 px-2 rounded-full text-xs'> Guest favourite </div>
          <UnLiked />
        </div>
        <img className="h-[255px] rounded-lg z-0" src='https://s3-alpha-sig.figma.com/img/53a5/3145/feb2184851666f7851298fda9131f8f1?Expires=1730073600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=fDoQdTa8R8vMgB6QKvyAlhu0gHysyAiPdokniUgzZ7D~TAtkSRVu44ZF8BHSRaWK9Tmgt9LRkIB06h~XArBTM01v6WslkD5t978EfsGmYy5OFH6OI9S38IysL2kOdNcZoVrW1n5QcpUUuniRKsAu0gstck5upSCVfCs4LdBfSeTcopiHFNRUml~VjMTir1B~DCxmXpLUsNerc9MwumP1T7gmWepa0Q36JVvzJ5MaUYH5QTnrbSSNUPBbT8AHDSuvLw7kG8BPkNi1NTYkppMR3bX9MrZUZmWsSOQqEP9ZXh07hBL051fBe61KIVdrx8wFJAVPYWUDb8el1b5aCxTc-w__' alt='err' />
      </div>
      <div className="">
        <div className="flex justify-between">
          <div className="font-semibold text-xl"> ₹75 Lakhs </div>
          <div className="text-sm flex items-center gap-1"> <Star size={14} className='text-[#222222]' /> 4.84 </div>
        </div>
        <div className="text-sm">Connaught Place, New Delhi</div>
        <div className="text-sm">1200 sq.ft</div>
      </div>

    </div>
  )
}

export default PropertyCard