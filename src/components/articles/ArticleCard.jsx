import React from "react";
import { 
  Box, 
  Flex, 
  Text, 
  Image, 
  Tag, 
  HStack, 
  Icon, 
  useBreakpointValue 
} from "@chakra-ui/react";
import { FaHeart, FaRegComment, FaShareAlt, FaBookmark } from "react-icons/fa";
import { Link } from "react-router-dom";

const ArticleCard = ({ slug, title, excerpt, image, tags }) => {
  const showTags = useBreakpointValue({ base: false, md: true });
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Box borderWidth="1px" borderRadius="md" overflow="hidden" p={4} mb={6}>
      {/* Tags */}
      {showTags && (
        <HStack spacing={2} mb={2} wrap="wrap">
          {tags.map((tag, index) => (
            <Tag key={index} colorScheme="blue" mb={1}>
              {tag}
            </Tag>
          ))}
        </HStack>
      )}

      {isMobile ? (
        <>
          {/* Article Image */}
          <Link to={`/articles/${slug}`}>
            <Image
              src={image}
              alt={title}
              w="full"
              h="auto"
              objectFit="cover"
              borderRadius="md"
              mb={4}
              cursor="pointer"
            />
          </Link>

          {/* Article Content */}
          <Box>
            <Link to={`/articles/${slug}`}>
              <Text fontSize="xl" fontWeight="semibold" mb={2} color="blue.600">
                {title}
              </Text>
            </Link>
            <Text fontSize="md" color="gray.600" noOfLines={3}>
              {excerpt}
            </Text>
          </Box>
        </>
      ) : (
        <Flex align="center" mb={4}>
          {/* Article Image */}
          <Link to={`/articles/${slug}`}>
            <Image
              src={image}
              alt={title}
              w="150px"
              h="auto"
              objectFit="cover"
              borderRadius="md"
              mr={8}
              cursor="pointer"
            />
          </Link>

          {/* Article Content */}
          <Box className="pl-2">
            <Link to={`/articles/${slug}`}>
              <Text fontSize="xl" fontWeight="semibold" mb={2} color="blue.600">
                {title}
              </Text>
            </Link>
            <Text fontSize="md" color="gray.600" noOfLines={3}>
              {excerpt}
            </Text>
          </Box>
        </Flex>
      )}

      {/* Actions */}
      <HStack spacing={4} color="gray.500" mt={4}>
        <HStack>
          <Icon as={FaHeart} />
          <Text fontSize="sm">Likes</Text>
        </HStack>
        <HStack>
          <Icon as={FaRegComment} />
          <Text fontSize="sm">Comment</Text>
        </HStack>
        <HStack>
          <Icon as={FaShareAlt} />
          <Text fontSize="sm">Share</Text>
        </HStack>
        <HStack>
          <Icon as={FaBookmark} />
          <Text fontSize="sm">Save</Text>
        </HStack>
      </HStack>
    </Box>
  );
};

export default ArticleCard;
