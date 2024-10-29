import { Box, Text, VStack, HStack, Button, Input } from '@chakra-ui/react';
import Separator from '../../components/Separator';
import { useState } from 'react';
import { Cable, Cctv, CircleParking, Dumbbell, Fence, HandPlatter, Phone, SquareChevronUp, Trash2, Volleyball, WashingMachine, Waves, Webcam, Wifi } from 'lucide-react';

const SpecificInfo = ({ propertyForm, setPropertyForm }) => {
  const [selectedSubType, setSelectedSubType] = useState('');
  const [selectedFurnishType, setSelectedFurnishType] = useState('');
  const [selectedBHK, setSelectedBHK] = useState('');
  const [price, setPrice] = useState('');

  const propertySubTypes = ['Apartment', 'Independent Floor', 'Independent House', 'Villa', 'Plot'];
  const furnishTypes = ['Fully furnished', 'Semi-furnished', 'Unfurnished'];
  const bhkOptions = ['1 BHK', '2 BHK', '3 BHK', '4 BHK', '4+ BHK'];
  const constructionTypes = ['Ready to Move', 'Under Construction'];


  const flatFurnishings = [
    {
      name: 'Wi-Fi',
      icon: <Wifi size={18} />,
      value: 'wifi'
    },
    {
      name: 'Dining Table',
      icon: <WashingMachine size={18} />,
      value: 'diningTable'
    },
    {
      name: 'Washing Machine',
      icon: <HandPlatter size={18} />,
      value: 'washingMachine'
    },
    {
      name: 'Microwave',
      icon: <HandPlatter size={18} />,
      value: 'microwave'
    },
    {
      name: 'Stove',
      icon: <HandPlatter size={18} />,
      value: 'stove'
    },
    {
      name: 'Refrigerator',
      icon: <HandPlatter size={18} />,
      value: 'refrigerator'
    }, {
      name: 'Water Purifier',
      icon: <HandPlatter size={18} />,
      value: 'waterPurifier'
    },
    {
      name: 'Bed',
      icon: <HandPlatter size={18} />,
      value: 'bed'
    },
    {
      name: 'AC',
      icon: <HandPlatter size={18} />,
      value: 'ac'
    },
    {
      name: 'TV',
      icon: <HandPlatter size={18} />,
      value: 'tv'
    },
    {
      name: 'Geyser',
      icon: <HandPlatter size={18} />,
      value: 'geyser'
    }
  ]

  const SocietyAmenities = [
    {
      name: 'Gym',
      icon: <Dumbbell size={18} />,
      value: 'gym'
    },
    {
      name: 'Car Parking',
      icon: <CircleParking size={18} />,
      value: 'carParking'
    },
    {
      name: 'Garden/Park',
      icon: <Fence size={18} />,
      value: 'gardenPark'
    },
    {
      name: 'Elevator',
      icon: <SquareChevronUp size={18} />,
      value: 'elevator'
    },

    {
      name: 'Security',
      icon: <Webcam size={18} />,
      value: 'security'
    },
    {
      name: 'Pet-Friendly',
      icon: <Wifi size={18} />,
      value: 'petFriendly'
    },
    {
      name: 'Swimming',
      icon: <Waves size={18} />,
      value: 'swimming'
    },
    {
      name: 'CCTV',
      icon: <Cctv size={18} />,
      value: 'cctv'
    },
    {
      name: 'Intercomm',
      icon: <Phone size={18} />,
      value: 'intercomm'
    },
    {
      name: 'Waste Management',
      icon: <Trash2 size={18} />,
      value: 'wasteManagement'
    },
    {
      name: 'Power Backup',
      icon: <Cable size={18} />,
      value: 'powerBackup'
    },
    {
      name: 'Sports facility',
      icon: <Volleyball size={18} />,
      value: 'sportsFacility'
    },
  ]

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
    setPropertyForm((prev) => ({ ...prev, askedPrice: e.target.value }));
  };

  const toggleSelection = (item, category) => {
    setPropertyForm((prev) => ({
      ...prev,
      [category]: prev[category].includes(item.value)
        ? prev[category].filter((val) => val !== item.value)
        : [...prev[category], item.value],
    }));
  };



  return (
    <Box h="calc(100vh - 158px)" px="20" py="6" overflowY="auto">
      <VStack spacing={9} align="start">
        <Box>
          <Text fontWeight="bold" fontSize="3xl">3. Property Specific Details</Text>
          <Text fontSize="2xl">Provide specific information to showcase your property’s best attributes.</Text>
          <Separator />
        </Box>

        {/* Property Sub-Type */}
        <VStack align="start" spacing={4}>
          <Text fontSize="xl" fontWeight="semibold">Property Sub-Type:</Text>
          <HStack spacing={8}>
            {propertySubTypes.map((subType) => (
              <Button
                key={subType}
                size="sm"
                variant="outline"
                fontWeight="semibold"
                borderRadius="xl"
                onClick={() => setPropertyForm((prev) => ({ ...prev, propertySubType: subType }))}
                colorScheme={propertyForm.propertySubType === subType ? 'teal' : 'gray'}
              >
                {subType}
              </Button>
            ))}
          </HStack>
        </VStack>

        {/* Price Input */}
        <VStack align="start" spacing={1}>
          <Input
            variant="outline"
            placeholder="Building / Project / Society"
            value={price}
            // onChange={handlePriceChange}
          />
          <Text color="gray.500" fontSize="xs">
            This helps us display your listing to the right audience based on location.
          </Text>
        </VStack>

        {/* Flat Furnishings */}
        <VStack align="start" spacing={4}>
          <Text fontSize="lg" fontWeight="semibold">Flat Furnishings</Text>
          <div className="grid grid-cols-8 gap-8">
            {flatFurnishings.map((item, index) => (
              <div
                key={index}
                className={`w-24 h-24 border-[1px] border-[#DDD] cursor-pointer rounded-md flex flex-col items-center justify-center gap-2 ${propertyForm.flatFurnishings.includes(item.value) ? 'bg-teal-200' : ''}`}
                onClick={() => toggleSelection(item, 'flatFurnishings')}
              >
                {item.icon}
                <div className="text-xs text-center">{item.name}</div>
              </div>
            ))}
          </div>
        </VStack>

        {/* Society Amenities */}
        <VStack align="start" spacing={4}>
          <Text fontSize="lg" fontWeight="semibold">Society Amenities</Text>
          <div className="grid grid-cols-8 gap-8">
            {SocietyAmenities.map((item, index) => (
              <div
                key={index}
                className={`w-24 h-24 border-[1px] border-[#DDD] cursor-pointer rounded-md flex flex-col items-center justify-center gap-2 ${propertyForm.societyAmenities.includes(item.value) ? 'bg-teal-200' : ''}`}
                onClick={() => toggleSelection(item, 'societyAmenities')}
              >
                {item.icon}
                <div className="text-xs text-center">{item.name}</div>
              </div>
            ))}
          </div>
        </VStack>

        {/* Price Input */}
        <VStack align="start" spacing={1}>
          <Input
            variant="outline"
            placeholder="Price"
            value={price}
            onChange={handlePriceChange}
          />
          <Text color="gray.500" fontSize="xs">
            Enter the asking price for your property in your local currency. Make sure to set a competitive price to attract potential buyers or renters.
          </Text>
        </VStack>
      </VStack>
    </Box>
  );
};

export default SpecificInfo;
