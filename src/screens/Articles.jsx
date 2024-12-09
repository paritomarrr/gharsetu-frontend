import React from 'react';
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
  Divider ,
  Container
} from '@chakra-ui/react';
import { FaSearch, FaHeart, FaRegComment, FaShareAlt, FaBookmark, FaStar } from 'react-icons/fa';
import ArticleCard from '../components/articles/ArticleCard';
import PropertyCard from '../components/common/PropertyCard';
import { Link } from 'lucide-react';


const Articles = () => {
  const articles = [
    {
      slug: "10-tips-for-first-time-home-buyers",
      title: "10 Tips for First-Time Home Buyers",
      excerpt: "Buying your first home can be overwhelming. Here are 10 essential tips to help you navigate the process and make informed decisions.",
      image: "https://via.placeholder.com/200x150"
    },
    {
      slug: "decorating-your-living-room",
      title: "Decorating Your Living Room: A Beginner's Guide",
      excerpt: "Learn how to transform your living space into a cozy sanctuary with simple yet effective decoration tips.",
      image: "https://via.placeholder.com/200x150"
    },
    {
      slug: "understanding-real-estate-markets",
      title: "Understanding Real Estate Markets",
      excerpt: "From suburban neighborhoods to urban lofts, gain insight into what drives property values and how to read market signals.",
      image: "https://via.placeholder.com/200x150"
    },
    {
      slug: "home-renovation-on-a-budget",
      title: "Home Renovation on a Budget",
      excerpt: "Discover cost-effective strategies for upgrading your kitchen, bathroom, or living area without breaking the bank.",
      image: "https://via.placeholder.com/200x150"
    },
    {
      slug: "investing-in-vacation-properties",
      title: "Investing in Vacation Properties",
      excerpt: "A guide to turning a second home into a profitable venture. Learn about location scouting, marketing, and rental management.",
      image: "https://via.placeholder.com/200x150"
    },
    {
      slug: "maximizing-storage-space",
      title: "Maximizing Storage Space in Small Homes",
      excerpt: "Clever solutions for making the most out of limited space, including built-in shelving, furniture hacks, and organizational tips.",
      image: "https://via.placeholder.com/200x150"
    },
    {
      slug: "navigating-mortgage-loans",
      title: "Navigating Mortgage Loans",
      excerpt: "From fixed-rate to adjustable-rate mortgages, understand the types of loans available and which is best suited for you.",
      image: "https://via.placeholder.com/200x150"
    },
    {
      slug: "curating-your-garden",
      title: "Curating Your Dream Garden",
      excerpt: "Learn the basics of landscape design, plant selection, and maintenance to create a green oasis in your backyard.",
      image: "https://via.placeholder.com/200x150"
    }
  ];
  
    return (
       <Box>
        {/* Top Filters */}
       <Container maxW="container.xl" py={2}>
       <Box as='section' px={[4, 8, 16]} py={6}>
       <Flex alignItems="center" justifyContent="space-between" mb={4}>
            <HStack spacing={6} mb={4} overflow="auto">
                <Text fontWeight="bold" cursor="pointer">For You</Text>
                <Text cursor="pointer">Trending</Text>
          <Text cursor="pointer">Latest</Text>
          <Text cursor="pointer">Real Estate</Text>
          <Text cursor="pointer">Interior</Text>
            </HStack>
            <InputGroup maxW="300px">
            <InputLeftElement pointerEvents="none">
            <Icon as={FaSearch} color="gray.500" />
            </InputLeftElement>
            <Input type="text" placeholder="Search articles" />
            </InputGroup>
            </Flex>
        </Box>
       </Container>

        <Divider />

        {/* Main Content */}
        <Container maxW="container.xl" py={6}>
        <Grid templateColumns={['1fr', '1fr', '2fr 1fr']} gap={8}>
            <GridItem>
                {/* Repeat the ArticleCard multiple times */}
              
                {articles.map(article => (
  <ArticleCard
    key={article.slug}
    slug={article.slug}
    title={article.title}
    excerpt={article.excerpt}
    image={article.image}
  />
))}


            </GridItem>
            <GridItem>
            <Text fontSize="lg" fontWeight="semibold" mb={4}>Properties around you</Text>
            {/* Repeat the PropertyCard multiple times */}
            <PropertyCard />
            <PropertyCard />
            <PropertyCard />
            <PropertyCard />
            
            <Button mt={4} width="full" colorScheme="blue">View More</Button>
          </GridItem>
        </Grid>
        </Container>
       

        {/* CTA Section */}
      <Box as="section" bgGradient="linear(to-r, blue.600, blue.400)" color="white" py={20} textAlign="center" px={4}>
      <Container maxW="container.md">
        <Text fontSize="3xl" fontWeight="bold" mb={4}>Ready to find your dream home?</Text>
        <Text fontSize="lg" mb={8}>Explore thousands of listings and get expert guidance on your home-buying journey.</Text>
       
        <Button size="lg" colorScheme="whiteAlpha">
        Get Started</Button>
    
        
        </Container>
      </Box>

       </Box>
    )
}

export default Articles