// ContactUs.jsx
import React from "react";
import { Box, Text, Heading, VStack, HStack, Icon, useColorModeValue, Divider } from "@chakra-ui/react";
import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";

const ContactUs = () => {
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const textColor = useColorModeValue("gray.700", "gray.200");
  const cardBg = useColorModeValue("white", "gray.800");
  const iconColor = useColorModeValue("blue.500", "blue.300");

  return (
    <Box p={8} fontFamily="'Roboto', sans-serif" bg={bgColor}>
      <VStack spacing={10} align="stretch">
        <Box textAlign="center" mb={6}>
          <Heading as="h1" size="lg" color={textColor} fontWeight="bold" mb={4}>
            Contact Us
          </Heading>
          <Text fontSize="md" color={textColor} maxW="600px" mx="auto">
            We are here to help! Reach out to us for any queries or assistance. Our team at <strong>GharSetu</strong> is dedicated to providing you with the best support possible.
          </Text>
        </Box>

        <Box maxW="500px" mx="auto" p={6} borderRadius="md" bg={cardBg} shadow="lg">
          <VStack spacing={6}>
            <HStack spacing={4} align="center">
              <Icon as={FaPhoneAlt} color={iconColor} boxSize={6} />
              <Text fontSize="lg" fontWeight="medium" color={textColor}>
                +91 97172 52292
              </Text>
            </HStack>
            <Divider borderColor={useColorModeValue("gray.200", "gray.600")} />
            <HStack spacing={4} align="center">
              <Icon as={FaEnvelope} color={iconColor} boxSize={6} />
              <Text fontSize="lg" fontWeight="medium" color={textColor}>
                team@gharsetu.com
              </Text>
            </HStack>
          </VStack>
        </Box>
      </VStack>
    </Box>
  );
};

export default ContactUs;
