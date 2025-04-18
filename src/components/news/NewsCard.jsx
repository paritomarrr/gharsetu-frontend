import React from "react";
import { Box, Image, Text, VStack, HStack, Tag } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const NewsCard = ({ slug, title, excerpt, image, tags }) => {
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      shadow="md"
      p={4}
    >
      <Link to={`/news/${slug}`}>
        <Image
          src={image || '/logo.png'}
          alt={title}
          onError={(e) => (e.target.src = '/logo.png')}
          borderRadius="md"
          mb={4}
          objectFit="cover"
          h="200px"
          w="full"
        />
      </Link>
      <VStack align="start" spacing={2}>
        <Link to={`/news/${slug}`}>
          <Text fontSize="lg" fontWeight="semibold" color="blue.500">
            {title}
          </Text>
        </Link>
        <Text fontSize="sm" color="gray.600" noOfLines={3}>
          {excerpt}
        </Text>
        <HStack spacing={2} mt={2} wrap="wrap">
          {tags.map((tag, index) => (
            <Tag key={index} colorScheme="blue">
              {tag}
            </Tag>
          ))}
        </HStack>
      </VStack>
    </Box>
  );
};

export default NewsCard;