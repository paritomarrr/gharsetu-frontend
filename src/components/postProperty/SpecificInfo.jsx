import { Box, Text, VStack, HStack, Button, Input } from "@chakra-ui/react";
import Separator from "../../components/Separator";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Cable,
  Cctv,
  CircleParking,
  Dumbbell,
  Fence,
  HandPlatter,
  Phone,
  SquareChevronUp,
  Trash2,
  Volleyball,
  WashingMachine,
  Waves,
  Webcam,
  Wifi,
} from "lucide-react";
import DropZone from "../DropZone";
import PostPropertyMap from "./PostPropertyMap";
import { updatePropertyForm } from "../../store/slices/PropertyFormSlice";

const SpecificInfo = () => {
  const dispatch = useDispatch();
  const propertyForm = useSelector((state) => state.propertyForm);
  const [price, setPrice] = useState(propertyForm.askedPrice || "");
  const [latitude, setLatitude] = useState(
    propertyForm.coordinates.latitude || ""
  );
  const [longitude, setLongitude] = useState(
    propertyForm.coordinates.longitude || ""
  );
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (latitude && longitude) {
      dispatch(
        updatePropertyForm({
          coordinates: { latitude, longitude },
        })
      );
    }
  }, [latitude, longitude, dispatch]);

  useEffect(() => {
    if (images.length > 0) {
      dispatch(
        updatePropertyForm({
          images: images,
        })
      );
    }
  }, [images, dispatch]);

  const propertySubTypes = [
    "Apartment",
    "Independent Floor",
    "Independent House",
    "Villa",
    "Plot",
  ];
  const furnishTypes = ["Fully furnished", "Semi-furnished", "Unfurnished"];
  const bhkOptions = ["1 BHK", "2 BHK", "3 BHK", "4 BHK", "4+ BHK"];
  const constructionTypes = ["Ready to Move", "Under Construction"];

  const flatFurnishings = [
    { name: "Wi-Fi", icon: <Wifi size={18} />, value: "wifi" },
    {
      name: "Dining Table",
      icon: <WashingMachine size={18} />,
      value: "diningTable",
    },
    {
      name: "Washing Machine",
      icon: <HandPlatter size={18} />,
      value: "washingMachine",
    },
    { name: "Microwave", icon: <HandPlatter size={18} />, value: "microwave" },
    { name: "Stove", icon: <HandPlatter size={18} />, value: "stove" },
    {
      name: "Refrigerator",
      icon: <HandPlatter size={18} />,
      value: "refrigerator",
    },
    {
      name: "Water Purifier",
      icon: <HandPlatter size={18} />,
      value: "waterPurifier",
    },
    { name: "Bed", icon: <HandPlatter size={18} />, value: "bed" },
    { name: "AC", icon: <HandPlatter size={18} />, value: "ac" },
    { name: "TV", icon: <HandPlatter size={18} />, value: "tv" },
    { name: "Geyser", icon: <HandPlatter size={18} />, value: "geyser" },
  ];

  const societyAmenities = [
    { name: "Gym", icon: <Dumbbell size={18} />, value: "gym" },
    {
      name: "Car Parking",
      icon: <CircleParking size={18} />,
      value: "carParking",
    },
    { name: "Garden/Park", icon: <Fence size={18} />, value: "gardenPark" },
    {
      name: "Elevator",
      icon: <SquareChevronUp size={18} />,
      value: "elevator",
    },
    { name: "Security", icon: <Webcam size={18} />, value: "security" },
    { name: "Pet-Friendly", icon: <Wifi size={18} />, value: "petFriendly" },
    { name: "Swimming", icon: <Waves size={18} />, value: "swimming" },
    { name: "CCTV", icon: <Cctv size={18} />, value: "cctv" },
    { name: "Intercomm", icon: <Phone size={18} />, value: "intercomm" },
    {
      name: "Waste Management",
      icon: <Trash2 size={18} />,
      value: "wasteManagement",
    },
    { name: "Power Backup", icon: <Cable size={18} />, value: "powerBackup" },
    {
      name: "Sports facility",
      icon: <Volleyball size={18} />,
      value: "sportsFacility",
    },
  ];

  useEffect(() => {
    const reverseGeocode = async () => {
      const res = await fetch(
        `https://api.mapbox.com/search/geocode/v6/reverse?longitude=${longitude}&latitude=${latitude}&access_token=pk.eyJ1IjoicGFyaXRvbWFyciIsImEiOiJjbTJ5Zmw1aXYwMDl3MmxzaG91bWRnNXgxIn0.ukF28kdk13Vf2y1EOKQFWg`
      );
      const data = await res.json();

      const locality = data.features.find(
        (feature) => feature.properties.feature_type === "locality"
      )?.properties.name;
      const city = data.features.find(
        (feature) => feature.properties.feature_type === "place"
      )?.properties.name;
      const state = data.features.find(
        (feature) => feature.properties.feature_type === "region"
      )?.properties.name;
      const pincode = data.features.find(
        (feature) => feature.properties.feature_type === "postcode"
      )?.properties.name;

      console.log({
        locality,
        city,
        state,
        pincode,
      });

      dispatch(
        updatePropertyForm({
          address: {
            ...propertyForm.address,
            city: city,
            state: state,
            locality: locality,
            pincode: pincode,
          },
        })
      );
    };
    reverseGeocode();
  }, [latitude, longitude, dispatch]);

  const handlePriceChange = (e) => {
    const newPrice = e.target.value;
    setPrice(newPrice);
    dispatch(updatePropertyForm({ askedPrice: newPrice }));
  };

  const handleAddressChange = (field, value) => {
    dispatch(
      updatePropertyForm({
        address: {
          ...propertyForm.address,
          [field]: value,
        },
      })
    );
  };

  const handlePlotSizeChange = (field, value) => {
    dispatch(
      updatePropertyForm({
        plotSize: {
          ...propertyForm.plotSize,
          [field]: value,
        },
      })
    );
  };

  const toggleSelection = (item, category) => {
    const currentItems = propertyForm[category] || [];
    const newItems = currentItems.includes(item.value)
      ? currentItems.filter((val) => val !== item.value)
      : [...currentItems, item.value];

    dispatch(updatePropertyForm({ [category]: newItems }));
  };

  return (
    <Box h="calc(100vh - 158px)" px="20" py="6" overflowY="auto">
      <VStack spacing={9} align="start">
        <Box>
          <Text fontWeight="bold" fontSize="3xl">
            3. Property Specific Details
          </Text>
          <Text fontSize="2xl">
            Provide specific information to showcase your property's best
            attributes.
          </Text>
          <Separator />
        </Box>

        {/* Property Sub-Type */}
        <VStack align="start" spacing={4}>
          <Text fontSize="xl" fontWeight="semibold">
            Property Sub-Type:
          </Text>
          <HStack spacing={8}>
            {propertySubTypes.map((subType) => (
              <Button
                key={subType}
                size="sm"
                variant="outline"
                fontWeight="semibold"
                borderRadius="xl"
                onClick={() =>
                  dispatch(updatePropertyForm({ propertySubType: subType }))
                }
                colorScheme={
                  propertyForm.propertySubType === subType ? "teal" : "gray"
                }
              >
                {subType}
              </Button>
            ))}
          </HStack>
        </VStack>

        {/* Address Fields */}
        <VStack align="start" spacing={1}>
          <Input
            variant="outline"
            placeholder="House / Apartment No."
            value={propertyForm.address.houseNumber}
            onChange={(e) => handleAddressChange("houseNumber", e.target.value)}
          />
          <Text color="gray.500" fontSize="xs">
            This helps us display your listing to the right audience based on
            location.
          </Text>
        </VStack>

        {/* Building / Project / Society */}
        <VStack align="start" spacing={1}>
          <Input
            variant="outline"
            placeholder="Building / Project / Society"
            value={propertyForm.address.buildingProjectSociety}
            onChange={(e) =>
              handleAddressChange("buildingProjectSociety", e.target.value)
            }
          />
          <Text color="gray.500" fontSize="xs">
            This helps us display your listing to the right audience based on
            location.
          </Text>
        </VStack>

        
        {/* Locality */}
        <VStack align="start" spacing={1}>
          <Input
            variant="outline"
            placeholder="Locality"
            value={propertyForm.address.locality}
            onChange={(e) => handleAddressChange("locality", e.target.value)}
          />
          <Text color="gray.500" fontSize="xs">
            This helps us display your listing to the right audience based on
            location.
          </Text>
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
            Enter the asking price for your property in your local currency.
          </Text>
        </VStack>

        {propertyForm.propertySubType === "Plot" ? (
          <VStack align="start" spacing={1} className="w-full">
            <Input
              variant="outline"
              placeholder="Plot Area"
              value={propertyForm.plotSize.plotArea}
              onChange={(e) => handlePlotSizeChange("plotArea", e.target.value)}
            />
            <Text color="gray.500" fontSize="xs">
              Mention the area to give buyers an idea of the space
            </Text>
          </VStack>
        ) : (
          <>
            <VStack align="start" spacing={4}>
              <Text fontSize="xl" fontWeight="semibold">
                Furnish Type:
              </Text>
              <HStack spacing={8}>
                {furnishTypes.map((type) => (
                  <Button
                    key={type}
                    size="sm"
                    variant="outline"
                    fontWeight="semibold"
                    borderRadius="xl"
                    onClick={() =>
                      dispatch(updatePropertyForm({ furnishType: type }))
                    }
                    colorScheme={
                      propertyForm.furnishType === type ? "teal" : "gray"
                    }
                  >
                    {type}
                  </Button>
                ))}
              </HStack>
            </VStack>

            <VStack align="start" spacing={4}>
              <Text fontSize="xl" fontWeight="semibold">
                BHK Configuration:
              </Text>
              <HStack spacing={8}>
                {bhkOptions.map((option) => (
                  <Button
                    key={option}
                    size="sm"
                    variant="outline"
                    fontWeight="semibold"
                    borderRadius="xl"
                    onClick={() =>
                      dispatch(updatePropertyForm({ bhkConfig: option }))
                    }
                    colorScheme={
                      propertyForm.bhkConfig === option ? "teal" : "gray"
                    }
                  >
                    {option}
                  </Button>
                ))}
              </HStack>
            </VStack>
          </>
        )}

        {/* Flat Furnishings */}
        <VStack align="start" spacing={4}>
          <Text fontSize="lg" fontWeight="semibold">
            Flat Furnishings
          </Text>
          <div className="grid grid-cols-8 gap-8">
            {flatFurnishings.map((item) => (
              <div
                key={item.value}
                className={`w-24 h-24 border-[1px] border-[#DDD] cursor-pointer rounded-md flex flex-col items-center justify-center gap-2 ${
                  propertyForm.flatFurnishings?.includes(item.value)
                    ? "bg-teal-200"
                    : ""
                }`}
                onClick={() => toggleSelection(item, "flatFurnishings")}
              >
                {item.icon}
                <div className="text-xs text-center">{item.name}</div>
              </div>
            ))}
          </div>
        </VStack>

        {/* Society Amenities */}
        <VStack align="start" spacing={4}>
          <Text fontSize="lg" fontWeight="semibold">
            Society Amenities
          </Text>
          <div className="grid grid-cols-8 gap-8">
            {societyAmenities.map((item) => (
              <div
                key={item.value}
                className={`w-24 h-24 border-[1px] border-[#DDD] cursor-pointer rounded-md flex flex-col items-center justify-center gap-2 ${
                  propertyForm.societyAmenities?.includes(item.value)
                    ? "bg-teal-200"
                    : ""
                }`}
                onClick={() => toggleSelection(item, "societyAmenities")}
              >
                {item.icon}
                <div className="text-xs text-center">{item.name}</div>
              </div>
            ))}
          </div>
        </VStack>

        

        {/* Construction Type */}
        <VStack align="start" spacing={4}>
          <Text fontSize="xl" fontWeight="semibold">
            Construction Type:
          </Text>
          <HStack spacing={8}>
            {constructionTypes.map((type) => (
              <Button
                key={type}
                size="sm"
                variant="outline"
                fontWeight="semibold"
                borderRadius="xl"
                onClick={() =>
                  dispatch(updatePropertyForm({ propertyStatus: type }))
                }
                colorScheme={
                  propertyForm.propertyStatus === type ? "teal" : "gray"
                }
              >
                {type}
              </Button>
            ))}
          </HStack>
        </VStack>

        <DropZone setImages={setImages} images={images} />

        <VStack align="start" className="w-full">
          <Text fontSize="xl" fontWeight="semibold">
            Pin Your Property Location:
          </Text>
          <HStack className="flex">
          <Input disabled value={propertyForm.address.locality} placeholder="Locality" />
          <Input disabled value={propertyForm.address.city} placeholder="City" />
          <Input disabled value={propertyForm.address.state} placeholder="State" />
          <Input disabled value={propertyForm.address.pincode} placeholder="Pin Code" />
        </HStack>
          <div className="h-96 w-full max-w-[190vh]">
            <PostPropertyMap
              setLatitude={setLatitude}
              setLongitude={setLongitude}
            />
          </div>
        </VStack>
      </VStack>
    </Box>
  );
};

export default SpecificInfo;
