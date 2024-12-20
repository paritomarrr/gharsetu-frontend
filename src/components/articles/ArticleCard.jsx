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
  import { FaSearch, FaHeart, FaRegComment, FaShareAlt, FaBookmark, FaStar } from 'react-icons/fa';
  import { Link } from 'react-router-dom';


  const ArticleCard = ({ slug, title, excerpt, image }) => {
    return (
        <Box borderWidth="1px" borderRadius="md" overflow="hidden" p={4} mb={6}>
        <HStack spacing={2} mb={2}>
          <Tag colorScheme="blue">Real Estate</Tag>
          <Tag colorScheme="green">First time buyers</Tag>
        </HStack>
        <Flex align="center" mb={4}>
          <Link to={`/articles/${slug}`}>
            <Image 
              src={image}
              alt={title}
              w="200px"
              h="150px"
              objectFit="cover"
              borderRadius="md"
              mr={4}
              cursor="pointer"
            />
          </Link>
          <Box>
            <Link to={`/articles/${slug}`}>
              <Text fontSize="xl" fontWeight="semibold" mb={2} w="500px" color="blue.600">
                {title}
              </Text>
            </Link>
            <Text fontSize="md" color="gray.600" noOfLines={3} w="500px">
              {excerpt}
            </Text>
          </Box>
        </Flex>
        <HStack spacing={4} color="gray.500">
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