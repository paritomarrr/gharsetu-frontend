import React, {useState, useEffect} from "react";
import {
  Box,
  Container,
  Text,
  HStack,
  VStack,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Icon,
  Divider,
  Avatar,
  SimpleGrid,
  Tag,
  Flex,
  Image
} from "@chakra-ui/react";
import {
  FaComment,
  FaHeart,
  FaShareAlt,
  FaBookmark,
  FaSearch,
  FaStar,
  FaEye,
} from "react-icons/fa";
import ReactMarkdown from 'react-markdown';
import { useParams } from "react-router-dom";
import { backend_url } from "../../config";

// Rename these arrays to avoid name conflicts
const defaultComments = [
  {
    name: "Jose",
    date: "December 2023",
    text: "Thanks for the great tips! I am planning to buy my first home next year and these tips about closing costs definitely going to help me fix my budget now",
  },
  {
    name: "Shreyan",
    date: "December 2023",
    text: "This article is a lifesaver for first-time buyers like me! The advice about getting pre-approved made me more prepared for the buying process. Thanks, GharSetu!",
  },
  {
    name: "Vatsko",
    date: "November 2023",
    text: "I love how straightforward this is. We’re just starting our home-buy journey, and we already feel more confident with these tips in mind. Will definitely share this with friends!",
  },
  {
    name: "Luke",
    date: "November 2023",
    text: "Tip #2 is so important! I skipped the inspection on my first purchase and ended up with a major plumbing issue later. Never again!",
  },
  {
    name: "Jash",
    date: "November 2023",
    text: "I’ve been torn between a few neighborhoods, so the tip about researching the area really helped narrow it down. It’s easy to forget that location can make or break your investment.",
  },
  {
    name: "Jennifer",
    date: "October 2023",
    text: "The part about staying detached emotionally is tough! I fell in love with a house recently, but the inspection revealed major issues. Your advice made me feel better about walking away.",
  },
];

const defaultRelatedArticles = [
  {
    title: "10 Tips for First-Time Home Buyers",
    excerpt: "Buying your first home can be overwhelming...",
    image: "https://via.placeholder.com/200x150",
  },
  {
    title: "10 Tips for First-Time Home Buyers",
    excerpt: "Buying your first home can be overwhelming...",
    image: "https://via.placeholder.com/200x150",
  },
];

// const defaultNearbyProperties = [
//   {
//     price: "750000",
//     location: "Connaught Place, New Delhi",
//     size: "1000 sqft",
//     rating: 4.84,
//     image: "https://via.placeholder.com/300x200",
//   },
//   {
//     price: "₹75 Lakhs",
//     location: "Connaught Place, New Delhi",
//     size: "1000 sqft",
//     rating: 4.84,
//     image: "https://via.placeholder.com/300x200",
//   },
//   {
//     price: "₹75 Lakhs",
//     location: "Connaught Place, New Delhi",
//     size: "1000 sqft",
//     rating: 4.84,
//     image: "https://via.placeholder.com/300x200",
//   },
//   {
//     price: "₹75 Lakhs",
//     location: "Connaught Place, New Delhi",
//     size: "1000 sqft",
//     rating: 4.84,
//     image: "https://via.placeholder.com/300x200",
//   },
// ];

const SingleArticle = () => {
  const {slug} = useParams();
  const [article, setArticle] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState(defaultRelatedArticles);
  const [nearbyProperties, setNearbyProperties] = useState([]);
  const [comments, setComments] = useState(defaultComments);

  useEffect(() => {
    fetch(`${backend_url}/api/v1/articles/${slug}`)
      .then(res => res.json())
      .then(data => {
        console.log("data", data)
        if (data.success) {
          setArticle(data.article);

          if (data.relatedArticles) {
            setRelatedArticles(data.relatedArticles);
          }

          if (data.nearbyProperties) {
            setNearbyProperties(data.nearbyProperties);
          }

          if (data.comments) {
            setComments(data.comments);
          }
        }
      })
      .catch(console.error);
  }, [slug]);

  useEffect(() => {
    fetch(`${backend_url}/api/v1/properties/getAllProperties`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({}) // If your endpoint needs a body, adjust accordingly
    })
    .then(res => res.json())
    .then(data => {
      if (data.success && data.properties) {
        const top4 = data.properties.slice(0, 4);
        setNearbyProperties(top4);
      }
    })
    .catch(console.error);
  }, []);

  if (!article) return <Box py={10} textAlign="center">Loading...</Box>

  const {
    title,
    excerpt,
    image,
    tags = [],
    content,
    author,
    views,
    commentsCount,
    likesCount,
    createdAt,
    readTime
  } = article;

  const formattedDate = createdAt ? new Date(createdAt).toLocaleDateString() : '';

  return (
    <Box>
      <Container maxW="container.md" py={6}>
        {/* Tags  */}
        <HStack spacing={2} mb={3}>
          {tags.map((tag, index) => (
            <Tag key={index} colorScheme="blue">{tag}</Tag>
          ))}
        </HStack>
        {/* Title, Meta */}
        <Text fontSize="3xl" fontWeight="bold" mb={2}>{title}</Text>
        <HStack spacing={4} mb={4} color="gray.600">
          <HStack spacing={1}>
            <Icon as={FaEye} />
            <Text fontSize="sm">{views ? `${views.toLocaleString()} Views` : "Views"}</Text>
          </HStack>
          <HStack spacing={1}>
            <Icon as={FaComment} />
            <Text fontSize="sm">{commentsCount ? `${commentsCount} Comments` : "Comments"}</Text>
          </HStack>
          <HStack spacing={1}>
            <Icon as={FaShareAlt} />
            <Text fontSize="sm">Share</Text>
          </HStack>
          <HStack spacing={1}>
            <Icon as={FaBookmark} />
            <Text fontSize="sm">Save</Text>
          </HStack>
        </HStack>


        {/* Article Image */}
        {image && (
          <Box mb={6}>
            <Image
              src={image}
              alt={title}
              borderRadius="md"
              w="full"
              h="auto"
            />
          </Box>
        )}

        {/* Author Info */}
        <HStack mb={4}>
          <Avatar name={author?.name || "Author"} src={author?.avatar} />
          <Box>
            <Text fontWeight="bold">Written by {author?.name || "Gharsetu Team"}</Text>
            <Text fontSize="sm" color="gray.600">
              {readTime || 'A few minutes read'} | {formattedDate}
            </Text>
          </Box>
        </HStack>

        {/* Article Content */}
        <VStack align="start" spacing={4} mb={8}>
          <ReactMarkdown>{content}</ReactMarkdown>
        </VStack>

        {/* Social Stats Below Content */}
        <HStack spacing={6} mb={8} color="gray.600">
          <HStack spacing={1}>
            <Icon as={FaHeart} />
            <Text fontSize="sm">{likesCount ? `${likesCount} Likes` : "Likes"}</Text>
          </HStack>
          <HStack spacing={1}>
            <Icon as={FaComment} />
            <Text fontSize="sm">{comments.length > 0 ? `${comments.length} Commenters` : "Commenters"}</Text>
          </HStack>
          <HStack spacing={1}>
            <Icon as={FaShareAlt} />
            <Text fontSize="sm">Share</Text>
          </HStack>
          <HStack spacing={1}>
            <Icon as={FaBookmark} />
            <Text fontSize="sm">Save</Text>
          </HStack>
        </HStack>

        {/* Comment Input Section */}
        <Box mb={8}>
          <Text mb={2} fontWeight="semibold">
            Write your comments here...
          </Text>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <Icon as={FaComment} color="gray.500" />
            </InputLeftElement>
            <Input type="text" placeholder="Add a comment..." />
          </InputGroup>
        </Box>

        {/* Reviews */}
        <Box mb={8}>
          <HStack mb={4} align="center" spacing={2}>
            <Text fontSize="2xl" fontWeight="bold">5.0</Text>
            <HStack spacing={0}>
              {Array(5).fill('').map((_, i) => (
                <Icon key={i} as={FaStar} color="yellow.400" />
              ))}
            </HStack>
            <Text fontSize="sm" color="gray.600">
              {comments.length} reviews
            </Text>
          </HStack>
          <VStack align="start" spacing={6}>
            {comments.map((comment, idx) => (
              <Box key={idx} borderWidth="1px" borderRadius="md" p={4} w="full">
                <HStack mb={1}>
                  <Avatar name={comment.name} size="sm" />
                  <Box>
                    <Text fontWeight="bold">{comment.name}</Text>
                    <Text fontSize="xs" color="gray.500">
                      {comment.date}
                    </Text>
                  </Box>
                </HStack>
                <Text>{comment.text}</Text>
              </Box>
            ))}
          </VStack>
          <Button mt={4} variant="outline" colorScheme="blue">
            Show all {comments.length} reviews
          </Button>
        </Box>

        <Divider mb={8} />

        {/* Related Articles */}
               {/* Related Articles */}
               {relatedArticles.length > 0 && (
          <Box mb={8}>
            <Text fontSize="xl" fontWeight="semibold" mb={4}>Read more articles</Text>
            <SimpleGrid columns={[1, 2]} spacing={6}>
              {relatedArticles.map((ra, i) => (
                <Box key={i} borderWidth="1px" borderRadius="md" overflow="hidden" p={4}>
                  <HStack spacing={2} mb={2}>
                    {ra.tags && ra.tags.map((t, idx) => (
                      <Tag key={idx} colorScheme="blue">{t}</Tag>
                    ))}
                  </HStack>
                  <Flex align="center" mb={4}>
                    <Image
                      src={ra.image}
                      alt={ra.title}
                      boxSize="100px"
                      borderRadius="md"
                      mr={4}
                    />
                    <Box>
                      <Text fontWeight="semibold">{ra.title}</Text>
                      <Text fontSize="sm" color="gray.600">{ra.excerpt}</Text>
                    </Box>
                  </Flex>
                  <HStack spacing={4} color="gray.500" fontSize="sm">
                    <HStack>
                      <Icon as={FaHeart} />
                      <Text>Likes</Text>
                    </HStack>
                    <HStack>
                      <Icon as={FaComment} />
                      <Text>Comment</Text>
                    </HStack>
                    <HStack>
                      <Icon as={FaShareAlt} />
                      <Text>Share</Text>
                    </HStack>
                    <HStack>
                      <Icon as={FaBookmark} />
                      <Text>Save</Text>
                    </HStack>
                  </HStack>
                </Box>
              ))}
            </SimpleGrid>
          </Box>
        )}


        <Divider mb={8} />

        {/* Nearby Listing */}
        {nearbyProperties.length > 0 && (
          <Box mb={8}>
            <Text fontSize="xl" fontWeight="semibold" mb={4}>View nearby listing</Text>
            <SimpleGrid columns={[1, 2, 4]} spacing={6}>
              {nearbyProperties.map((property, idx) => (
                <Box key={idx} borderWidth="1px" borderRadius="md" overflow="hidden">
                  <Box position="relative">
                    <Box
                      position="absolute"
                      top="2"
                      left="2"
                      bg="white"
                      px={2}
                      py={1}
                      borderRadius="md"
                      boxShadow="md"
                      fontSize="xs"
                      fontWeight="semibold"
                    >
                      Guest favourite
                    </Box>
                    <Image
                      src={property.image}
                      alt="Property Image"
                      w="full"
                      h="auto"
                    />
                  </Box>
                  <Box p={4}>
                    <Text fontWeight="semibold" mb={1}>{property.price}</Text>
                    <Text fontSize="sm" color="gray.600" mb={1}>{property.location}</Text>
                    <Text fontSize="sm" color="gray.500" mb={2}>{property.size}</Text>
                    <HStack spacing={1}>
                      <Icon as={FaStar} color="yellow.400" />
                      <Text fontSize="sm" color="gray.700">{property.rating}</Text>
                    </HStack>
                  </Box>
                </Box>
              ))}
            </SimpleGrid>
          </Box>
        )}
      </Container>

      {/* CTA Section */}
      <Box
        as="section"
        bgGradient="linear(to-r, blue.600, blue.400)"
        color="white"
        py={20}
        textAlign="center"
        px={4}
      >
        <Container maxW="container.md">
          <Text fontSize="3xl" fontWeight="bold" mb={4}>
            Ready to find your dream home?
          </Text>
          <Text fontSize="lg" mb={8}>
            Explore thousands of listings and get expert guidance on your
            home-buying journey.
          </Text>
          <Button size="lg" colorScheme="whiteAlpha">
            Get Started
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default SingleArticle;
