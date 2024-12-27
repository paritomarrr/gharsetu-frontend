// AboutUs.jsx
import React from "react";
import { Box, Text, Heading, VStack, Flex, useColorModeValue } from "@chakra-ui/react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const testimonials = [
  {
    name: "Rohit Sharma",
    feedback: "GharSetu made my house-hunting journey smooth and stress-free. I found my dream home in just a few clicks!",
    location: "Ghaziabad, India",
  },
  {
    name: "Priya Singh",
    feedback: "The verified listings and 360-degree virtual tours saved me so much time. Highly recommend GharSetu!",
    location: "Ghaziabad, India",
  },
  {
    name: "Amit Verma",
    feedback: "Connecting with interior designers and architects was never this easy. GharSetu is a game changer!",
    location: "Ghaziabad, India",
  },
];

const AboutUs = () => {
  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.700", "gray.300");

  return (
    <Box p={8} fontFamily="'Roboto', sans-serif" bg={bgColor}>
      <VStack spacing={10} align="stretch">
        <Box textAlign="center">
          <Heading as="h1" size="lg" mb={4} color={textColor} fontWeight="bold">
            About Us
          </Heading>
          <Text fontSize="md" color={textColor} mb={6} maxW="700px" mx="auto">
            Welcome to <strong>GharSetu</strong>! Established in 2024, our mission is to reduce the stress and challenges faced by homebuyers during their property journey. We are dedicated to simplifying the process of buying, selling, and renting properties in Ghaziabad, India.
          </Text>
          <Text fontSize="md" color={textColor} mb={6} maxW="700px" mx="auto">
            Our platform is designed to create a trustworthy and affordable experience, ensuring every user can find their dream home without unnecessary hassle. Whether you are a first-time buyer or an experienced investor, GharSetu offers verified listings, virtual tours, and a robust network of professionals like interior designers, architects, and builders.
          </Text>
          <Text fontSize="md" color={textColor} maxW="700px" mx="auto">
            GharSetu is more than just a real estate platform—it’s your trusted partner in navigating the property market with ease and confidence.
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="md" mb={4} color={textColor} textAlign="center" fontWeight="semibold">
            What Our Users Say
          </Heading>
          <Box maxW="700px" mx="auto" shadow="md" borderRadius="md" overflow="hidden" bg={useColorModeValue("gray.50", "gray.700")}>
            <Carousel
              showThumbs={false}
              showStatus={false}
              infiniteLoop
              autoPlay
              interval={4000}
              useKeyboardArrows
            >
              {testimonials.map((testimonial, index) => (
                <Box
                  key={index}
                  p={6}
                  textAlign="center"
                  color={textColor}
                >
                  <Text fontStyle="italic" fontSize="md" mb={4}>
                    &quot;{testimonial.feedback}&quot;
                  </Text>
                  <Text fontWeight="bold" fontSize="lg" mb={2}>
                    {testimonial.name}
                  </Text>
                  <Text fontSize="sm" color={useColorModeValue("gray.500", "gray.400")}> 
                    {testimonial.location}
                  </Text>
                </Box>
              ))}
            </Carousel>
          </Box>
        </Box>
      </VStack>
    </Box>
  );
};

export default AboutUs;