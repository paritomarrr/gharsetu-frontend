import React from "react";
import {
  Box,
  Container,
  Text,
  Flex,
  Image,
  Tag,
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
  Stack,
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

const comments = [
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

const relatedArticles = [
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

const nearbyProperties = [
  {
    price: "₹75 Lakhs",
    location: "Connaught Place, New Delhi",
    size: "1000 sqft",
    rating: 4.84,
    image: "https://via.placeholder.com/300x200",
  },
  {
    price: "₹75 Lakhs",
    location: "Connaught Place, New Delhi",
    size: "1000 sqft",
    rating: 4.84,
    image: "https://via.placeholder.com/300x200",
  },
  {
    price: "₹75 Lakhs",
    location: "Connaught Place, New Delhi",
    size: "1000 sqft",
    rating: 4.84,
    image: "https://via.placeholder.com/300x200",
  },
  {
    price: "₹75 Lakhs",
    location: "Connaught Place, New Delhi",
    size: "1000 sqft",
    rating: 4.84,
    image: "https://via.placeholder.com/300x200",
  },
];

const SingleArticle = () => {
  return (
    <Box>
      <Container maxW="container.md" py={6}>
        {/* Tags  */}
        <HStack spacing={2} mb={3}>
          <Tag colorScheme="blue">Real Estate</Tag>
          <Tag colorScheme="green">First time buyers</Tag>
          <Tag colorScheme="gray">Insights</Tag>
        </HStack>
        {/* Title, Meta */}
        <Text fontSize="3xl" fontWeight="bold" mb={2}>
          10 Tips for First-Time Home Buyers
        </Text>
        <HStack spacing={4} mb={4} color="gray.600">
          <HStack spacing={1}>
            <Icon as={FaEye} />
            <Text fontSize="sm">3K Views</Text>
          </HStack>
          <HStack spacing={1}>
            <Icon as={FaComment} />
            <Text fontSize="sm">32 Comments</Text>
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
        <Box mb={6}>
          <Image
            src="https://via.placeholder.com/800x400"
            alt="Article Cover"
            borderRadius="md"
            w="full"
            h="auto"
          />
        </Box>

        {/* Author Info */}
        <HStack mb={4}>
          <Avatar name="Sharma Jii" src="https://via.placeholder.com/50" />
          <Box>
            <Text fontWeight="bold">written by Sharma Jii</Text>
            <Text fontSize="sm" color="gray.600">
              5min read | Oct 5th, 2023
            </Text>
          </Box>
        </HStack>

        {/* Article Content */}
        <VStack align="start" spacing={4} mb={8}>
          <Text>
            Buying your first home is an exciting yet challenging milestone.
            It's a huge financial commitment and a significant life decision. To
            make the process smoother, here are 10 essential tips to help you
            navigate the journey.
          </Text>
          <Text>
            <strong>1. Determine Your Budget:</strong> Establish a realistic
            budget. Consider your monthly income, existing expenses, and how
            much you can comfortably set aside for your mortgage. This ensures
            you're looking at properties you can actually afford.
          </Text>
          <Text>
            <strong>2. Get Pre-Approved for a Mortgage:</strong> Before even
            starting house hunting, get pre-approved for a mortgage. This helps
            you understand how much you can borrow. It also makes you a more
            attractive buyer to sellers since your financial strength is
            verified.
          </Text>
          <Text>
            <strong>3. Prioritize Your Needs Over Wants:</strong> Make a list of
            what you truly need in your new home, such as a specific number of
            bedrooms. This will help you stay focused and avoid being swayed by
            non-essential features during the search.
          </Text>
          <Text>
            <strong>4. Research the Neighborhood:</strong> Look at different
            neighborhoods' crime rates, school districts, and what the vibe of
            the day-to-day is like. Feel the environment. Look for amenities,
            nearby hospitals, public transport, and future development plans.
          </Text>
          <Text>
            <strong>5. Factor in Closing Costs:</strong> In addition to the
            home's price, consider other fees—like closing costs, inspection
            fees, and legal paperwork. Make sure you have enough saved to cover
            these expenses.
          </Text>
          <Text>
            <strong>Final Thoughts:</strong> Buying a home is not just a
            purchase, but a long-term investment. It can also be an emotional
            experience. Take your time, do your research, and don't hesitate to
            ask for professional advice. Following these tips can help you avoid
            common pitfalls and make your home search a more rewarding journey.
          </Text>
        </VStack>

        {/* Social Stats Below Content */}
        <HStack spacing={6} mb={8} color="gray.600">
          <HStack spacing={1}>
            <Icon as={FaHeart} />
            <Text fontSize="sm">39 Likes</Text>
          </HStack>
          <HStack spacing={1}>
            <Icon as={FaComment} />
            <Text fontSize="sm">18 Commenters</Text>
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
            <Text fontSize="2xl" fontWeight="bold">
              5.0
            </Text>
            <HStack spacing={0}>
              <Icon as={FaStar} color="yellow.400" />
              <Icon as={FaStar} color="yellow.400" />
              <Icon as={FaStar} color="yellow.400" />
              <Icon as={FaStar} color="yellow.400" />
              <Icon as={FaStar} color="yellow.400" />
            </HStack>
            <Text fontSize="sm" color="gray.600">
              7 reviews
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
            Show all 18 reviews
          </Button>
        </Box>

        <Divider mb={8} />

        {/* Related Articles */}
        <Box mb={8}>
          <Text fontSize="xl" fontWeight="semibold" mb={4}>
            Read more articles
          </Text>
          <SimpleGrid columns={[1, 2]} spacing={6}>
            {relatedArticles.map((article, i) => (
              <Box
                key={i}
                borderWidth="1px"
                borderRadius="md"
                overflow="hidden"
                p={4}
              >
                <HStack spacing={2} mb={2}>
                  <Tag colorScheme="blue">Real Estate</Tag>
                  <Tag colorScheme="green">First time buyers</Tag>
                </HStack>
                <Flex align="center" mb={4}>
                  <Image
                    src={article.image}
                    alt="Article"
                    boxSize="100px"
                    borderRadius="md"
                    mr={4}
                  />
                  <Box>
                    <Text fontWeight="semibold">{article.title}</Text>
                    <Text fontSize="sm" color="gray.600">
                      {article.excerpt}
                    </Text>
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

        <Divider mb={8} />

        {/* Nearby Listing */}
        <Box mb={8}>
          <Text fontSize="xl" fontWeight="semibold" mb={4}>
            View nearby listing
          </Text>
          <SimpleGrid columns={[1, 2, 4]} spacing={6}>
            {nearbyProperties.map((property, idx) => (
              <Box
                key={idx}
                borderWidth="1px"
                borderRadius="md"
                overflow="hidden"
              >
                <Box position="relative">
                  {/* A label on the image */}
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
                  <Text fontWeight="semibold" mb={1}>
                    {property.price}
                  </Text>
                  <Text fontSize="sm" color="gray.600" mb={1}>
                    {property.location}
                  </Text>
                  <Text fontSize="sm" color="gray.500" mb={2}>
                    {property.size}
                  </Text>
                  <HStack spacing={1}>
                    <Icon as={FaStar} color="yellow.400" />
                    <Text fontSize="sm" color="gray.700">
                      {property.rating}
                    </Text>
                  </HStack>
                </Box>
              </Box>
            ))}
          </SimpleGrid>
        </Box>
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
