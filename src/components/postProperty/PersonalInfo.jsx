import { Button, Input, Box, Text, VStack, HStack } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { updatePropertyForm } from "../../store/slices/PropertyFormSlice";
import { useSelector } from "react-redux";

const PersonalInfo = () => {
  const dispatch = useDispatch();
  const propertyForm = useSelector((state) => state.propertyForm);
  const userTypes = ["Owner", "Builder", "Agent", "Flatmate"];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(updatePropertyForm({ [name]: value }));
  };

  return (
    <Box h="calc(100vh - 158px)" px="20" py="6" overflowY="auto">
      <VStack spacing={9} align="start">
        <Box>
          <Text fontWeight="bold" fontSize="3xl">
            1. Personal Information
          </Text>
          <Text fontSize="2xl">Let’s get started with the basics.</Text>
        </Box>

        <VStack align="start" spacing={6}>
          <Text fontSize="xl">Who’s listing this property?</Text>
          <HStack spacing={8}>
            {userTypes.map((type) => (
              <Button
                key={type}
                size="sm"
                variant="outline"
                fontWeight="semibold"
                borderRadius="xl"
                onClick={() => {
                  dispatch(updatePropertyForm({ listedBy: type })); // Update the listedBy field
                }}
                colorScheme={propertyForm?.listedBy === type ? "teal" : "gray"}
              >
                {type}
              </Button>
            ))}
          </HStack>
        </VStack>

        <VStack spacing={1} align="start" className="w-full">
          <Input
            name="firstName"
            variant="outline"
            placeholder="First Name"
            value={propertyForm?.firstName}
            onChange={handleInputChange}
          />
          <Text color="gray.500" fontSize="xs">
            Make sure it matches the name on your government ID.
          </Text>
          <Input
            name="lastName"
            variant="outline"
            placeholder="Last Name"
            value={propertyForm?.lastName}
            onChange={handleInputChange}
          />
          <Text color="gray.500" fontSize="xs">
            Make sure it matches the name on your government ID.
          </Text>
        </VStack>

        <Input
          name="phoneNumber"
          variant="outline"
          placeholder="Phone Number"
          value={propertyForm?.phoneNumber}
          onChange={handleInputChange}
        />

        <VStack spacing={1} align="start" className="w-full">
          <Input
            name="email"
            variant="outline"
            placeholder="Email"
            value={propertyForm?.email}
            onChange={handleInputChange}
          />
          <Text color="gray.500" fontSize="xs">
            We’ll send you important updates and notifications.
          </Text>
        </VStack>

        <VStack spacing={1} align="start" className="w-full">
          <Input
            name="firmName"
            variant="outline"
            placeholder="Firm Name"
            value={propertyForm?.firmName}
            onChange={handleInputChange}
          />
          <Text color="gray.500" fontSize="xs">
            Name of the firm you are associated with.
          </Text>
        </VStack>
      </VStack>
    </Box>
  );
};

export default PersonalInfo;
