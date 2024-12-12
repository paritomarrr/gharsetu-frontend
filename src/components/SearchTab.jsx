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
    max: searchParams.get('maxPrice') || '500000000',
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
    <div className="border border-[#DDD] shadow-custom px-8 md:px-8 gap-2 items-stretch md:items-center 
rounded-2xl flex flex-col md:flex-row py-2 lg:rounded-full">
    {/* Location Section */}
    <div className="flex flex-col">
      <LocationDropDown setSearchLocation={setSearchLocation} searchLocation={searchLocation} />
    </div>
  
    {/* Divider for large screens */}
    <div className="hidden md:block bg-[#DDD] h-full w-[1px]" />
  
    {/* On smaller screens, a horizontal divider after location */}
    <div className="block md:hidden bg-[#DDD] w-full h-[1px]" />
  
    {/* Price Range Section */}
    <div className="flex flex-col">
      <PriceRange budget={budget} setBudget={setBudget} />
    </div>
  
    {/* Divider for large screens */}
    <div className="hidden md:block bg-[#DDD] h-full w-[1px]" />
  
    {/* On smaller screens, another horizontal divider after price range */}
    <div className="block md:hidden bg-[#DDD] w-full h-[1px]" />
  
    {/* Property Type Section */}
    <div className="flex flex-col">
      <div className="text-xs font-semibold mb-1">Property Type</div>
      <input 
        type="text" 
        placeholder="Choose property type" 
        className="text-sm focus:outline-none border-b border-[#DDD] pb-1"
      />
    </div>
  
    {/* On large screens, place the search button to the right */}
    <div className="mt-2 md:mt-0 md:ml-auto">
      <div 
        onClick={handleNavigation} 
        className='bg-gradient-to-r from-[#1D4CBE] to-[#6398FF] p-3 rounded-full cursor-pointer flex justify-center items-center'
      >
        <Search size={16} className='text-white' />
      </div>
    </div>
  </div>
  
  )
}

export default SearchTab