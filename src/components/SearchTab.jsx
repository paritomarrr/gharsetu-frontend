import { ChevronDown, Search } from 'lucide-react';
import LocationDropDown from './searchTab/LocationDropDown';
import PriceRange from './searchTab/PriceRange';
import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const SearchTab = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchLocation, setSearchLocation] = useState('');
  const [budget, setBudget] = useState({
    min: searchParams.get('minPrice') || '400000',
    max: searchParams.get('maxPrice') || '500000000',
  });
  const [propertyType, setPropertyType] = useState('buy');
  const [propertyTypeDropdown, setPropertyTypeDropdown] = useState(false);
  const [locationError, setLocationError] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null); // Create a reference for the dropdown

  // Handle clicks outside the dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setPropertyTypeDropdown(false); // Close dropdown if click is outside
      }
    };

    // Add event listener for clicks
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleNavigation = () => {
    if (!searchLocation) {
      setLocationError(true);
      return;
    }
    setLocationError(false);

    const locality = searchLocation.localities?.[0]?.trim() || "";
    const city = searchLocation.city?.trim() || "";
    const state = searchLocation.state?.trim() || "";

    // Ensure correct formatting and preserve spaces
    const searchString = encodeURIComponent(`${locality}, ${city}, ${state}`.trim());

    navigate(`/properties/${propertyType}?search=${searchString}&minPrice=${budget.min}&maxPrice=${budget.max}`);
  };

  const handlePropertyType = (type) => {
    console.log('first', type);
    setPropertyType(type);
    setPropertyTypeDropdown(false);
  };

  const propertyTypeToShow = (type) => {
    if (type === 'buy') {
      return 'Available for Buying';
    } else if (type === 'rent') {
      return 'Available for Rent';
    } else {
      return 'Any';
    }
  };

  return (
    <div className="border border-[#DDD] shadow-custom p-4 w-full md:w-fit  md:pl-8 md:pr-2 gap-2 items-stretch md:items-center rounded-2xl flex flex-col md:flex-row py-4 lg:rounded-full">
      {/* Location Section */}
      <div className="flex flex-col">
        <LocationDropDown setSearchLocation={setSearchLocation} searchLocation={searchLocation} />
        {locationError && <div className="text-red-500 text-xs mt-1">Please select a location.</div>}
      </div>

      {/* Divider for large screens */}
      <div className="hidden md:block bg-[#DDD] h-full w-[1px]" />

      {/* On smaller screens, a horizontal divider after location */}
      <div className="block md:hidden bg-[#DDD] w-full h-[1px]" />

      {/* Price Range Section */}
      <div className="flex flex-col">
        <PriceRange budget={budget} setBudget={setBudget} propertyType={propertyType}/>
      </div>

      {/* Divider for large screens */}
      <div className="hidden md:block bg-[#DDD] h-full w-[1px]" />

      {/* On smaller screens, another horizontal divider after price range */}
      <div className="block md:hidden bg-[#DDD] w-full h-[1px]" />

      {/* Property Type Section */}
      <div className="flex flex-col relative">
        <div className="text-xs font-semibold mb-1">Property Type</div>
        <div className={`${propertyTypeDropdown ? 'md:w-[300px] w-full' : 'w-full md:w-[200px]' } transition-all duration-500 ease-in-out text-sm flex justify-between items-center cursor-pointer`} onClick={() => setPropertyTypeDropdown(!propertyTypeDropdown)}>
          <div> {propertyTypeToShow(propertyType)} </div>
          <ChevronDown size={16} />
        </div>
        <div ref={dropdownRef}>
          {propertyTypeDropdown && (
            <div className='absolute bg-white w-full shadow-md top-14 rounded-md text-sm p-1'>
              <div className='py-1 px-2 cursor-pointer hover:bg-gray-100 rounded-md whitespace-nowrap' onClick={() => handlePropertyType('any')}> Any </div>
              <div className='py-1 px-2 cursor-pointer hover:bg-gray-100 rounded-md whitespace-nowrap' onClick={() => handlePropertyType('buy')}> Available for Buying </div>
              <div className='py-1 px-2 cursor-pointer hover:bg-gray-100 rounded-md whitespace-nowrap' onClick={() => handlePropertyType('rent')}> Available for Rent </div>
            </div>
          )}
        </div>
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
  );
};

export default SearchTab;
