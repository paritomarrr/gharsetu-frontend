import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure
} from "@chakra-ui/react";
import { ChevronDown, Search, Sliders } from "lucide-react";
import PropertySearchBar from "./PropertySearchBar";
import PriceRange from "./optionBar/PriceRange";

const OptionsBar = ({ mode }) => {
  const [selectedMode, setSelectedMode] = useState("buy");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const search = searchParams.get('search');
  const [searchQuery, setSearchQuery] = useState(search ? search : '');

  // Track currently active filter modal on mobile
  const [activeFilter, setActiveFilter] = useState(null);

  // Selected Filters State
  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState([]);
  const [selectedPropertyAge, setSelectedPropertyAge] = useState(""); // single value (radio)
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [builtUpArea, setBuiltUpArea] = useState(""); 
  const [selectedBedBath, setSelectedBedBath] = useState([]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    setSelectedMode(mode);
  }, [mode]);

  const handleSearch = () => {
    // Update URL or global state as needed
    navigate(`/properties/${selectedMode}?search=${searchQuery}`);
  };

  const clearFilters = () => {
    // Resetting all filters
    navigate(`/properties/${selectedMode}`);
    setSearchQuery('');
    setSelectedPropertyTypes([]);
    setSelectedPropertyAge("");
    setSelectedAmenities([]);
    setBuiltUpArea("");
    setSelectedBedBath([]);
  };

  // Open a given filter in the modal for mobile
  const openFilterModal = (filterName) => {
    setActiveFilter(filterName);
    onOpen();
  };

  // Handle applying filters in the modal
  const applyFilterChanges = () => {
    // Integrate selected filters into global or URL-based state if needed
    // For now, just close the modal.
    onClose();
    setActiveFilter(null);
  };

  // Helper functions for updating state
  const toggleCheckbox = (value, selectedArray, setSelectedArray) => {
    if (selectedArray.includes(value)) {
      setSelectedArray((prev) => prev.filter((item) => item !== value));
    } else {
      setSelectedArray((prev) => [...prev, value]);
    }
  };

  return (
    <div className="border-b px-3 py-3 flex flex-wrap gap-3 items-center">
      {/* Top Row: Buy/Rent + Search + Mobile Filters */}
      <div className="flex flex-1 items-center gap-2">
        {/* Buy/Rent Dropdown */}
        <Menu>
          <MenuButton>
            <div className="flex border border-gray-300 py-2 rounded-l-md px-2 items-center text-sm">
              <span className="whitespace-nowrap">
                {selectedMode === "rent" ? "Rent" : "Buy"}
              </span>
              <ChevronDown size={20} />
            </div>
          </MenuButton>
          <MenuList className="text-sm">
            <MenuItem onClick={() => setSelectedMode("buy")}>Buy</MenuItem>
            <MenuItem onClick={() => setSelectedMode("rent")}>Rent</MenuItem>
          </MenuList>
        </Menu>

        {/* Search Bar */}
        <PropertySearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedMode={selectedMode}
        />

        {/* Search Button */}
        <div
          className="py-2 border border-gray-300 rounded-r-md px-3 cursor-pointer"
          onClick={handleSearch}
        >
          <Search size={20} className="text-gray-500" />
        </div>

        {/* Mobile-only Filters Button */}
       <div className="md:hidden">
       <Menu>
          <MenuButton className="block lg:hidden">
            <div className="flex items-center border border-gray-300 py-2 px-3 rounded-md cursor-pointer">
              <Sliders size={18} />
            </div>
          </MenuButton>
          <MenuList className="text-sm">
            <MenuItem onClick={() => openFilterModal('price')}>Price Range</MenuItem>
            <MenuItem onClick={() => openFilterModal('propertyType')}>Property Types</MenuItem>
            <MenuItem onClick={() => openFilterModal('propertyAge')}>Age of Property</MenuItem>
            <MenuItem onClick={() => openFilterModal('amenities')}>Amenities</MenuItem>
            <MenuItem onClick={() => openFilterModal('area')}>Built up Area</MenuItem>
            <MenuItem onClick={() => openFilterModal('bedBath')}>Bed and Bathrooms</MenuItem>
            <MenuItem onClick={clearFilters} className="text-red-500 font-semibold">
              Reset Filters
            </MenuItem>
          </MenuList>
        </Menu>
       </div>
      </div>

      {/* Desktop Filters (Only show on md+ screens) */}
      <div className="hidden md:flex gap-3 items-center">
        {/* Price Range Filter (Desktop) */}
        <PriceRange />

        {/* No. of Bedrooms (Desktop) */}
        <Menu>
          <MenuButton>
            <div className="flex border border-gray-300 py-2 rounded-md px-2 items-center text-sm">
              <span className="whitespace-nowrap">No. of Bedrooms</span>
              <ChevronDown size={20} />
            </div>
          </MenuButton>
          <MenuList className="text-sm">
            <MenuItem>1 BHK</MenuItem>
            <MenuItem>2 BHK</MenuItem>
            <MenuItem>3 BHK</MenuItem>
            <MenuItem>4 BHK</MenuItem>
            <MenuItem>5+ BHK</MenuItem>
          </MenuList>
        </Menu>

        {/* Property Age (Desktop) */}
        <Menu>
          <MenuButton>
            <div className="flex border border-gray-300 py-2 rounded-md px-2 items-center text-sm">
              <span className="whitespace-nowrap">Property Age</span>
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

        {/* Posted By (Desktop) */}
        <Menu>
          <MenuButton>
            <div className="flex border border-gray-300 py-2 rounded-md px-2 items-center text-sm">
              <span className="whitespace-nowrap">Posted By</span>
              <ChevronDown size={20} />
            </div>
          </MenuButton>
          <MenuList className="text-sm">
            <MenuItem>Owner</MenuItem>
            <MenuItem>Builder</MenuItem>
            <MenuItem>Dealer</MenuItem>
          </MenuList>
        </Menu>

        {/* Reset (Desktop) */}
        <div
          onClick={clearFilters}
          className="text-sm border rounded-md border-red-300 px-4 font-semibold cursor-pointer text-red-600 flex items-center hover:bg-red-500 hover:text-white hover:duration-200"
        >
          Reset
        </div>
      </div>

      {/* Mobile Filter Modal */}
      <Modal isOpen={isOpen} onClose={() => { setActiveFilter(null); onClose(); }} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {activeFilter === 'price' && 'Price Range'}
            {activeFilter === 'propertyType' && 'Property Types'}
            {activeFilter === 'propertyAge' && 'Age of Property'}
            {activeFilter === 'amenities' && 'Amenities'}
            {activeFilter === 'area' && 'Built Up Area'}
            {activeFilter === 'bedBath' && 'Bed and Bathrooms'}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {activeFilter === 'price' && (
              <div className="p-4">
                <PriceRange />
                <div className="flex justify-end gap-3 mt-4">
                  <button
                    className="px-4 py-2 text-sm text-gray-500 hover:bg-gray-100 rounded"
                    onClick={() => {
                      onClose();
                      setActiveFilter(null);
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded"
                    onClick={applyFilterChanges}
                  >
                    Apply
                  </button>
                </div>
              </div>
            )}

            {activeFilter === 'propertyType' && (
              <div className="p-4 flex flex-col gap-4">
                <p className="text-sm text-gray-700">Select your property types...</p>
                <div className="flex flex-col gap-2">
                  {["Apartment", "Villa", "Independent House", "Plot"].map((type) => (
                    <label key={type} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        value={type}
                        checked={selectedPropertyTypes.includes(type)}
                        onChange={(e) => toggleCheckbox(e.target.value, selectedPropertyTypes, setSelectedPropertyTypes)}
                      />
                      <span>{type}</span>
                    </label>
                  ))}
                </div>
                <div className="flex justify-end gap-3 mt-4">
                  <button
                    className="px-4 py-2 text-sm text-gray-500 hover:bg-gray-100 rounded"
                    onClick={() => {
                      onClose();
                      setActiveFilter(null);
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded"
                    onClick={applyFilterChanges}
                  >
                    Apply
                  </button>
                </div>
              </div>
            )}

            {activeFilter === 'propertyAge' && (
              <div className="p-4">
                <p className="text-sm text-gray-700 mb-2">Select property age:</p>
                {["Newly Constructed", "Coming Soon", "3+ Years", "5+ Years", "10+ Years"].map((age) => (
                  <label key={age} className="flex items-center gap-2 mb-2">
                    <input
                      type="radio"
                      name="propertyAge"
                      value={age}
                      checked={selectedPropertyAge === age}
                      onChange={() => setSelectedPropertyAge(age)}
                    />
                    <span>{age}</span>
                  </label>
                ))}
                <div className="flex justify-end gap-3 mt-4">
                  <button
                    className="px-4 py-2 text-sm text-gray-500 hover:bg-gray-100 rounded"
                    onClick={() => {
                      onClose();
                      setActiveFilter(null);
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded"
                    onClick={applyFilterChanges}
                  >
                    Apply
                  </button>
                </div>
              </div>
            )}

            {activeFilter === 'amenities' && (
              <div className="p-4">
                <p className="text-sm text-gray-700 mb-2">Select amenities:</p>
                {["Lift", "Parking", "24x7 Security", "Club House", "Park"].map((amenity) => (
                  <label key={amenity} className="flex items-center gap-2 mb-2">
                    <input
                      type="checkbox"
                      value={amenity}
                      checked={selectedAmenities.includes(amenity)}
                      onChange={(e) => toggleCheckbox(e.target.value, selectedAmenities, setSelectedAmenities)}
                    />
                    <span>{amenity}</span>
                  </label>
                ))}
                <div className="flex justify-end gap-3 mt-4">
                  <button
                    className="px-4 py-2 text-sm text-gray-500 hover:bg-gray-100 rounded"
                    onClick={() => {
                      onClose();
                      setActiveFilter(null);
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded"
                    onClick={applyFilterChanges}
                  >
                    Apply
                  </button>
                </div>
              </div>
            )}

            {activeFilter === 'area' && (
              <div className="p-4">
                <p className="text-sm text-gray-700 mb-2">Specify built up area (sq.ft.):</p>
                <input
                  type="number"
                  className="border px-2 py-1 rounded w-full"
                  placeholder="e.g. 1200"
                  value={builtUpArea}
                  onChange={(e) => setBuiltUpArea(e.target.value)}
                />
                <div className="flex justify-end gap-3 mt-4">
                  <button
                    className="px-4 py-2 text-sm text-gray-500 hover:bg-gray-100 rounded"
                    onClick={() => {
                      onClose();
                      setActiveFilter(null);
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded"
                    onClick={applyFilterChanges}
                  >
                    Apply
                  </button>
                </div>
              </div>
            )}

            {activeFilter === 'bedBath' && (
              <div className="p-4">
                <p className="text-sm text-gray-700 mb-2">Select bed and bathrooms:</p>
                {["1 BHK", "2 BHK", "3 BHK", "4 BHK", "5+ BHK"].map((bb) => (
                  <label key={bb} className="flex items-center gap-2 mb-2">
                    <input
                      type="checkbox"
                      value={bb}
                      checked={selectedBedBath.includes(bb)}
                      onChange={(e) => toggleCheckbox(e.target.value, selectedBedBath, setSelectedBedBath)}
                    />
                    <span>{bb}</span>
                  </label>
                ))}
                <div className="flex justify-end gap-3 mt-4">
                  <button
                    className="px-4 py-2 text-sm text-gray-500 hover:bg-gray-100 rounded"
                    onClick={() => {
                      onClose();
                      setActiveFilter(null);
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded"
                    onClick={applyFilterChanges}
                  >
                    Apply
                  </button>
                </div>
              </div>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default OptionsBar;
