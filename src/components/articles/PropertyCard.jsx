import { 
    Box, 
    Flex, 
    Text, 
    Grid, 
    GridItem, 
    Image, 
    Tag, 
    HStack, 
    Stack, 
    Button, 
    InputGroup, 
    InputLeftElement, 
    Input, 
    Icon, 
    Divider 
  } from '@chakra-ui/react';


  const PropertyCard = () => {
    return (
      <Box borderWidth="1px" borderRadius="md" overflow="hidden" mb={4}>
        <Image src="https://via.placeholder.com/300x200" alt="Property Image" />
        <Box p={4}>
          <Text fontWeight="semibold" mb={1}>₹75 Lakhs</Text>
          <Text fontSize="sm" color="gray.600" mb={1}>Connaught Place, New Delhi</Text>
          <Text fontSize="sm" color="gray.500" mb={2}>1000 sqft</Text>
          <HStack spacing={1}>
            <Icon as={FaStar} color="yellow.400"/>
            <Text fontSize="sm" color="gray.700">4.84</Text>
          </HStack>
        </Box>
      </Box>
    );
  };

  
  export default PropertyCard;