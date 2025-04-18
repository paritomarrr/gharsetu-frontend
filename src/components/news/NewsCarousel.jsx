import React, { useState, useEffect } from "react";
import { Box, Text, Image, VStack, HStack, Button, useBreakpointValue, IconButton, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { backend_url } from "../../config";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

const NewsCarousel = () => {
  const [news, setNews] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const isMobile = useBreakpointValue({ base: true, md: false });

  useEffect(() => {
    fetch(`${backend_url}/api/v1/news`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setNews(data.news);
        }
      })
      .catch((err) => console.error("Error fetching news:", err));
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? news.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === news.length - 1 ? 0 : prevIndex + 1
    );
  };

  if (news.length === 0) {
    return (
      <Box textAlign="center" py={10}>
        <Text>No news available at the moment.</Text>
      </Box>
    );
  }

  return (
    <Box position="relative" py={10} px={{ base: 4, md: 8 }}>
      <Text fontSize="4xl" fontWeight="bold" mb={4} textAlign="center">
        Trending News
      </Text>
      <Text fontSize="lg" textAlign="center" color="gray.500" mb={6}>
        Stay updated with the latest and most popular news stories.
      </Text>
      <Flex
        position="relative"
        overflow="hidden"
        borderWidth="1px"
        borderRadius="xl"
        shadow="2xl"
        w="100%"
        h={isMobile ? "350px" : "550px"}
        mx="auto"
        bg="gray.50"
        alignItems="center"
      >
        <IconButton
          position="absolute"
          top="50%"
          left="5px"
          transform="translateY(-50%)"
          zIndex={2}
          bg="white"
          borderRadius="full"
          boxShadow="lg"
          icon={<ChevronLeftIcon boxSize={8} />}
          onClick={handlePrev}
          aria-label="Previous"
        />
        <Image
          src={news[currentIndex].image || "/logo.png"}
          alt={news[currentIndex].title}
          onError={(e) => (e.target.src = "/logo.png")}
          objectFit="cover"
          w="100%"
          h="100%"
          onClick={() => window.location.href = `/news/${news[currentIndex].slug}`}
          cursor="pointer"
          borderRadius="xl"
        />
        <IconButton
          position="absolute"
          top="50%"
          right="5px"
          transform="translateY(-50%)"
          zIndex={2}
          bg="white"
          borderRadius="full"
          boxShadow="lg"
          icon={<ChevronRightIcon boxSize={8} />}
          onClick={handleNext}
          aria-label="Next"
        />
        <Box
          position="absolute"
          bottom={0}
          left={0}
          right={0}
          bgGradient="linear(to-t, blackAlpha.800, transparent)"
          color="white"
          p={6}
          borderBottomRadius="xl"
          onClick={() => window.location.href = `/news/${news[currentIndex].slug}`}
          cursor="pointer"
        >
          <Text fontSize="2xl" fontWeight="bold" noOfLines={2} textShadow="0px 0px 10px rgba(0, 0, 0, 0.8)">
            {news[currentIndex].title}
          </Text>
          <Text fontSize="md" noOfLines={3} mt={2} textShadow="0px 0px 5px rgba(0, 0, 0, 0.6)">
            {news[currentIndex].excerpt}
          </Text>
        </Box>
      </Flex>
      <HStack justifyContent="center" mt={4} spacing={3}>
        {news.map((_, index) => (
          <Box
            key={index}
            w={4}
            h={4}
            borderRadius="full"
            bg={index === currentIndex ? "blue.500" : "gray.300"}
            cursor="pointer"
            onClick={() => setCurrentIndex(index)}
            transition="background-color 0.3s"
          />
        ))}
      </HStack>
    </Box>
  );
};

export default NewsCarousel;
