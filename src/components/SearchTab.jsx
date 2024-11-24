import { Search } from 'lucide-react';
import LocationDropDown from './searchTab/LocationDropDown';
import PriceRange from './searchTab/PriceRange';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const SearchTab = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchLocation, setSearchLocation] = useState('');
  const [budget, setBudget] = useState({
    min: searchParams.get('minPrice') || '400000',
    max: searchParams.get('maxPrice') || '10000000',
  });
  const [propertyType, setPropertyType] = useState('');
  const navigate = useNavigate();

  //   {
  //     "searchLocation": {
  //         "localities": [
  //             "Indirapuram"
  //         ],
  //         "city": "Noida",
  //         "state": "Uttar Pradesh"
  //     },
  //     "budget": {
  //         "min": "400000",
  //         "max": "10000000"
  //     },
  //     "propertyType": ""
  // }

  // http://localhost:5173/properties/buy?search=Sector62+Noida+UttarPradesh&minPrice=400000&maxPrice=10000000
  // http://localhost:5173/properties/buy?search=Indirapuram+Ghaziabad+UttarPradesh&minPrice=400000&maxPrice=10000000

  const handleNavigation = () => {

    const searchComponents = [
      searchLocation.localities?.[0]?.replace(/\s+/g, ''),
      searchLocation.city?.replace(/\s+/g, ''),
      searchLocation.state?.replace(/\s+/g, '')
    ].filter(Boolean);

    const selectedMode = 'buy';

    const searchString = searchComponents.join('+');

    navigate(`/properties/${selectedMode}?search=${searchString}&minPrice=${budget.min}&maxPrice=${budget.max}`)

  };

  return (
    <div className="py-2 flex border-[1px] relative border-[#DDD] shadow-custom pl-8 pr-2 rounded-full items-center">
      <LocationDropDown setSearchLocation={setSearchLocation} searchLocation={searchLocation} />
      <div className='bg-[#DDD] h-full w-[1px] mx-6'></div>
      <PriceRange budget={budget} setBudget={setBudget} />
      <div className='bg-[#DDD] h-full w-[1px] mx-6'></div>
      <div>
        <div className="text-xs font-semibold"> Property Type </div>
        <input type="text" placeholder="Choose property type" className="text-sm focus:outline-none" />
      </div>
      <div onClick={handleNavigation} className='bg-gradient-to-r cursor-pointer from-[#1D4CBE] to-[#6398FF] p-4 rounded-full'>
        <Search size={16} className='text-white' />
      </div>
    </div>
  )
}

export default SearchTab