import {
  Box,
  Text,
  VStack,
  HStack,
  Button,
  Input,
  SimpleGrid
} from "@chakra-ui/react";
import Separator from "../../components/Separator";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AirVent,
  Bed,
  Cable,
  Cctv,
  CircleParking,
  Droplets,
  Dumbbell,
  Fence,
  HandPlatter,
  Heater,
  Microwave,
  Phone,
  Refrigerator,
  SquareChevronUp,
  ThermometerSun,
  Trash2,
  Tv,
  Volleyball,
  WashingMachine,
  Waves,
  Webcam,
  Wifi,
} from "lucide-react";
import DropZone from "../DropZone";
import PostPropertyMap from "./PostPropertyMap";
import { updatePropertyForm } from "../../store/slices/PropertyFormSlice";
import LocalityDropDown from "./LocalityDropDown";

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

  console.log('propertyForm', propertyForm)

  useEffect(() => {
    if (latitude && longitude) {
      dispatch(
        updatePropertyForm({
          coordinates: {
            latitude: latitude,
            longitude: longitude,
          },
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
    { name: "Dining Table", icon: <HandPlatter size={18} />, value: "diningTable" },
    { name: "Washing Machine", icon: <WashingMachine size={18} />, value: "washingMachine" },
    { name: "Microwave", icon: <Microwave size={18} />, value: "microwave" },
    { name: "Stove", icon: <Heater size={18} />, value: "stove" },
    { name: "Refrigerator", icon: <Refrigerator size={18} />, value: "refrigerator" },
    { name: "Water Purifier", icon: <Droplets size={18} />, value: "waterPurifier" },
    { name: "Bed", icon: <Bed size={18} />, value: "bed" },
    { name: "AC", icon: <AirVent size={18} />, value: "ac" },
    { name: "TV", icon: <Tv size={18} />, value: "tv" },
    { name: "Geyser", icon: <ThermometerSun size={18} />, value: "geyser" },
  ];

  const societyAmenities = [
    { name: "Gym", icon: <Dumbbell size={18} />, value: "gym" },
    { name: "Car Parking", icon: <CircleParking size={18} />, value: "carParking" },
    { name: "Garden/Park", icon: <Fence size={18} />, value: "gardenPark" },
    { name: "Elevator", icon: <SquareChevronUp size={18} />, value: "elevator" },
    { name: "Security", icon: <Webcam size={18} />, value: "security" },
    { name: "Pet-Friendly", icon: <Wifi size={18} />, value: "petFriendly" },
    { name: "Swimming", icon: <Waves size={18} />, value: "swimming" },
    { name: "CCTV", icon: <Cctv size={18} />, value: "cctv" },
    { name: "Intercomm", icon: <Phone size={18} />, value: "intercomm" },
    { name: "Waste Management", icon: <Trash2 size={18} />, value: "wasteManagement" },
    { name: "Power Backup", icon: <Cable size={18} />, value: "powerBackup" },
    { name: "Sports facility", icon: <Volleyball size={18} />, value: "sportsFacility" },
  ];

  useEffect(() => {
    const reverseGeocode = async () => {
      if (!latitude || !longitude) return;
      const res = await fetch(
        `https://api.mapbox.com/search/geocode/v6/reverse?longitude=${longitude}&latitude=${latitude}&access_token=pk.eyJ1IjoicGFyaXRvbWFyciIsImEiOiJjbTJ5Zmw1aXYwMDl3MmxzaG91bWRnNXgxIn0.ukF28kdk13Vf2y1EOKQFWg`
      );
      const data = await res.json();

      const locality = data.features?.find(
        (feature) => feature.properties.feature_type === "locality"
      )?.properties.name;
      const city = data.features?.find(
        (feature) => feature.properties.feature_type === "place"
      )?.properties.name;
      const state = data.features?.find(
        (feature) => feature.properties.feature_type === "region"
      )?.properties.name;
      const pincode = data.features?.find(
        (feature) => feature.properties.feature_type === "postcode"
      )?.properties.name;

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

  const handleAreaChange = (e) => {
    dispatch(updatePropertyForm({ area: e.target.value }));
  }

  const inputWidth = { base: "100%", md: "300px" };

  return (
    <Box
      h="calc(100vh - 158px)"
      px={{ base: 4, md: 20 }}
      py={6}
      overflowY="auto"
    >
      <VStack spacing={9} align="start">
        <Box>
          <Text fontWeight="bold" fontSize={{ base: "xl", md: "2xl" }}>
            3. Property Specific Details
          </Text>
          <Text fontSize={{ base: "lg", md: "xl" }}>
            Provide specific information to showcase your property's best attributes.
          </Text>
          <Separator />
        </Box>

        {/* Property Sub-Type */}
        <VStack align="start" spacing={4}>
          <Text fontSize={{ base: "lg", md: "xl" }} fontWeight="semibold">
            Property Sub-Type:
          </Text>
          <HStack spacing={{ base: 4, md: 8 }} wrap="wrap">
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
          {propertyForm.showError && propertyForm.propertySubType === '' && (
            <Text color="red.500" fontSize="sm">
              Property subType is required
            </Text>
          )}
        </VStack>

        {/* House Number */}
        <VStack align="start" spacing={1}>
          <Input
            variant="outline"
            placeholder="House / Apartment No."
            value={propertyForm.address.houseNumber}
            onChange={(e) => handleAddressChange("houseNumber", e.target.value)}
            width={inputWidth}
          />
          {propertyForm.showError && propertyForm.address.houseNumber === '' && (
            <Text color="red.500" fontSize="sm">
              House / Apartment No. is required
            </Text>
          )}
          <Text color="gray.500" fontSize="xs">
            This helps us display your listing to the right audience based on location.
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
            width={inputWidth}
          />
          {propertyForm.showError && propertyForm.address.buildingProjectSociety === '' && (
            <Text color="red.500" fontSize="sm">
              Building / Project / Society is required
            </Text>
          )}
          <Text color="gray.500" fontSize="xs">
            This helps us display your listing to the right audience based on location.
          </Text>
        </VStack>

        {/* Locality */}
        <LocalityDropDown
          propertyForm={propertyForm}
          handleAddressChange={handleAddressChange}
          setLatitude={setLatitude}
          setLongitude={setLongitude}
        />

        {/* City & State */}
        <HStack spacing={4} flexWrap="wrap">
          <VStack align="start" spacing={1}>
            <Input
              variant="outline"
              placeholder="City"
              value={propertyForm.address.city}
              onChange={(e) => handleAddressChange("city", e.target.value)}
              width={inputWidth}
            />
            {propertyForm.showError && propertyForm.address.city === '' && (
              <Text color="red.500" fontSize="sm">
                City is required
              </Text>
            )}
          </VStack>
          <VStack align="start" spacing={1}>
            <Input
              variant="outline"
              placeholder="State"
              value={propertyForm.address.state}
              onChange={(e) => handleAddressChange("state", e.target.value)}
              width={inputWidth}
            />
            {propertyForm.showError && propertyForm.address.state === '' && (
              <Text color="red.500" fontSize="sm">
                State is required
              </Text>
            )}
          </VStack>
        </HStack>

        {/* Price Input */}
        <VStack align="start" spacing={1}>
          <Input
            variant="outline"
            placeholder="Price"
            value={price}
            onChange={handlePriceChange}
            width={inputWidth}
          />
          {propertyForm.showError && propertyForm.askedPrice === '' && (
            <Text color="red.500" fontSize="sm">
              Price is required
            </Text>
          )}
          <Text color="gray.500" fontSize="xs">
            Enter the asking price for your property in your local currency.
          </Text>
        </VStack>

        {propertyForm.propertySubType === "Plot" ? (
          <VStack align="start" spacing={1}>
            <Input
              variant="outline"
              placeholder="Plot Area"
              value={propertyForm.plotSize.plotArea}
              onChange={(e) => handlePlotSizeChange("plotArea", e.target.value)}
              width={inputWidth}
            />
            {propertyForm.showError && propertyForm.plotSize.plotArea === '' && (
              <Text color="red.500" fontSize="sm">
                Plot area is required
              </Text>
            )}
            <Text color="gray.500" fontSize="xs">
              Mention the area to give buyers an idea of the space
            </Text>
          </VStack>
        ) : (
          <>
            {/* Property Area */}
            <VStack align="start" spacing={1}>
              <Input
                variant="outline"
                placeholder="Property Area"
                value={propertyForm.area}
                onChange={handleAreaChange}
                width={inputWidth}
              />
              {propertyForm.showError && propertyForm.area === '' && (
                <Text color="red.500" fontSize="sm">
                  Property area is required
                </Text>
              )}
              <Text color="gray.500" fontSize="xs">
                Enter the area of your property in square feet.
              </Text>
            </VStack>

            {/* Furnish Type */}
            <VStack align="start" spacing={4}>
              <Text fontSize={{ base: "lg", md: "xl" }} fontWeight="semibold">
                Furnish Type:
              </Text>
              <HStack spacing={{ base: 4, md: 8 }} wrap="wrap">
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
              {propertyForm.showError && propertyForm.furnishType === '' && (
                <Text color="red.500" fontSize="sm">
                  Property furnish type is required
                </Text>
              )}
            </VStack>

            {/* BHK Configuration */}
            <VStack align="start" spacing={4}>
              <Text fontSize={{ base: "lg", md: "xl" }} fontWeight="semibold">
                BHK Configuration:
              </Text>
              <HStack spacing={{ base: 4, md: 8 }} wrap="wrap">
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
              {propertyForm.showError && propertyForm.bhkConfig === '' && (
                <Text color="red.500" fontSize="sm">
                  BHK configuration is required
                </Text>
              )}
            </VStack>
          </>
        )}

        {/* Flat Furnishings */}
        <VStack align="start" spacing={4}>
          <Text fontSize={{ base: "lg", md: "xl" }} fontWeight="semibold">
            Flat Furnishings
          </Text>
          <SimpleGrid columns={{ base: 2, sm: 4, md: 8 }} gap={4}>
            {flatFurnishings.map((item) => (
              <Box
                key={item.value}
                w="24"
                h="24"
                borderWidth="1px"
                borderColor={propertyForm.flatFurnishings?.includes(item.value) ? "gray.400" : "gray.200"}
                cursor="pointer"
                rounded="md"
                display="flex"
                flexDir="column"
                alignItems="center"
                justifyContent="center"
                gap={2}
                bg={propertyForm.flatFurnishings?.includes(item.value) ? "gray.50" : "white"}
                onClick={() => toggleSelection(item, "flatFurnishings")}
              >
                {item.icon}
                <Text fontSize="xs" textAlign="center">{item.name}</Text>
              </Box>
            ))}
          </SimpleGrid>
        </VStack>

        {/* Society Amenities */}
        <VStack align="start" spacing={4}>
          <Text fontSize={{ base: "lg", md: "xl" }} fontWeight="semibold">
            Society Amenities
          </Text>
          <SimpleGrid columns={{ base: 2, sm: 4, md: 8 }} gap={4}>
            {societyAmenities.map((item) => (
              <Box
                key={item.value}
                w="24"
                h="24"
                borderWidth="1px"
                borderColor="#DDD"
                cursor="pointer"
                rounded="md"
                display="flex"
                flexDir="column"
                alignItems="center"
                justifyContent="center"
                gap={2}
                bg={propertyForm.societyAmenities?.includes(item.value) ? "teal.200" : "white"}
                onClick={() => toggleSelection(item, "societyAmenities")}
              >
                {item.icon}
                <Text fontSize="xs" textAlign="center">{item.name}</Text>
              </Box>
            ))}
          </SimpleGrid>
        </VStack>

        {/* Construction Type */}
        {propertyForm.propertySubType !== "Rent" && (
          <VStack align="start" spacing={4}>
            <Text fontSize={{ base: "lg", md: "xl" }} fontWeight="semibold">
              Construction Type:
            </Text>
            <HStack spacing={{ base: 4, md: 8 }} wrap="wrap">
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
            {propertyForm.showError && propertyForm.propertyStatus === '' && (
              <Text color="red.500" fontSize="sm">
                Property status is required
              </Text>
            )}
          </VStack>
        )}

        <DropZone setImages={setImages} images={images} />

        <VStack align="start" spacing={4} w="full">
          <Text fontSize={{ base: "lg", md: "xl" }} fontWeight="semibold">
            Pin Your Property Location:
          </Text>
          <HStack wrap="wrap" spacing={4}>
            <Input
              disabled
              value={propertyForm.address.locality}
              placeholder="Locality"
              width={inputWidth}
            />
            <Input
              disabled
              value={propertyForm.address.city}
              placeholder="City"
              width={inputWidth}
            />
            <Input
              disabled
              value={propertyForm.address.state}
              placeholder="State"
              width={inputWidth}
            />
            <Input
              disabled
              value={propertyForm.address.pincode}
              placeholder="Pin Code"
              width={inputWidth}
            />
          </HStack>
          <Box h="96" w="full" maxW="100%">
            <PostPropertyMap
              setLatitude={setLatitude}
              setLongitude={setLongitude}
              latitude={latitude}
              longitude={longitude}
            />
          </Box>
        </VStack>
      </VStack>
    </Box>
  );
};

export default SpecificInfo;
