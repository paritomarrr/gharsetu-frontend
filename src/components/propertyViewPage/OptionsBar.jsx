import { Input } from "@chakra-ui/react";
import { ChevronDown, Search, X } from "lucide-react";
import { useState, useEffect } from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import PropertySearchBar from "./PropertySearchBar";
import {
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
} from '@chakra-ui/react'
import PriceRange from "./optionBar/PriceRange";

const OptionsBar = ({ mode }) => {
  const [selectedMode, setSelectedMode] = useState("buy");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const search = searchParams.get('search');
  const minPrice = searchParams.get('minPrice');
  const maxPrice = searchParams.get('maxPrice');

  const [searchQuery, setSearchQuery] = useState(search ? search : '');

  useEffect(() => {
    setSelectedMode(mode);
  }, [mode]);

  const handleSearch = () => {
    console.log({
      selectedMode,
      searchQuery
    })
    navigate(`/properties/${selectedMode}?search=${searchQuery}`);
  };

  const clearFilters = () => {
    navigate(`/properties/${selectedMode}`);
  }

  return (
    <div className="px-5 py-3 border-b-[1px] flex gap-4">
      <div className="flex w-full">
        <Menu>
          <MenuButton>
            <div className="flex border-[1px] border-gray-300 py-[8px] rounded-l-md px-2 items-center text-sm">
              <span className="whitespace-nowrap">
                {selectedMode === "rent" ? "Rent" : "Buy"}
              </span>
              <ChevronDown size={20} />
            </div>
          </MenuButton>
          <MenuList className="text-sm">
            <MenuItem onClick={() => setSelectedMode('buy')}>Buy</MenuItem>
            <MenuItem onClick={() => setSelectedMode('rent')}>Rent</MenuItem>
          </MenuList>
        </Menu>

        <PropertySearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} selectedMode={selectedMode} />

        <div className="py-2 border-[1px] border-gray-300 rounded-r-md px-3 cursor-pointer" onClick={handleSearch}>
          <Search size={20} className="text-gray-500" />
        </div>
      </div>


      {/* Clear all Filters */}
        <div onClick={clearFilters} className="text-sm font-semibold cursor-pointer text-red-600 flex items-center">
          Clear <X size={16} />
        </div>

      {/* Price Range */}
      <PriceRange />


      {/* No. Of Bedrooms */}
      <Menu>
        <MenuButton>
          <div className="flex border-[1px] border-gray-300 py-2 rounded-md px-2 items-center text-sm">
            <span className="whitespace-nowrap"> No. of Bedrooms </span>{" "}
            <ChevronDown size={20} />
          </div>
        </MenuButton>
        <MenuList className="text-sm">
          <MenuItem> 1 BHK </MenuItem>
          <MenuItem> 2 BHK</MenuItem>
          <MenuItem> 3 BHK</MenuItem>
          <MenuItem> 4 BHK</MenuItem>
          <MenuItem> 5+ BHK</MenuItem>
        </MenuList>
      </Menu>

      {/* Age of property */}
      <Menu>
        <MenuButton>
          <div className="flex border-[1px] border-gray-300 py-2 rounded-md px-2 items-center text-sm">
            <span className="whitespace-nowrap"> Property Age </span>{" "}
            <ChevronDown size={20} />
          </div>
        </MenuButton>
        <MenuList className="text-sm">
          <MenuItem>Newly Constructed</MenuItem>
          <MenuItem>Coming Soon</MenuItem>
          <MenuItem>3+ Years</MenuItem>
          <MenuItem>5+ Years</MenuItem>
          <MenuItem>10+ Years</MenuItem>
        </MenuList>
      </Menu>

      {/* Posted By */}
      <Menu>
        <MenuButton>
          <div className="flex border-[1px] border-gray-300 py-2 rounded-md px-2 items-center text-sm">
            <span className="whitespace-nowrap"> Posted By </span>{" "}
            <ChevronDown size={20} />
          </div>
        </MenuButton>
        <MenuList className="text-sm">
          <MenuItem> Owner </MenuItem>
          <MenuItem> Builder </MenuItem>
          <MenuItem> Dealer </MenuItem>
        </MenuList>
      </Menu>
    </div>
  );
};

export default OptionsBar;
