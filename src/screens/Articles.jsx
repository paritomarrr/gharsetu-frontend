import React, {useState, useEffect} from 'react';
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
  Container,
  SimpleGrid
} from '@chakra-ui/react';
import { FaSearch, FaHeart, FaRegComment, FaShareAlt, FaBookmark, FaStar } from 'react-icons/fa';
import ArticleCard from '../components/articles/ArticleCard';
import PropertyCard from '../components/common/PropertyCard';
import { Link } from 'lucide-react';
import { backend_url } from '../config';


const Articles = () => {
 const [articles, setArticles] = useState([]);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState(null);

 useEffect(() => {
  fetch(`${backend_url}/api/v1/articles`)
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      setArticles(data.articles);
    } else {
      setError("Failed to fetch articles.")
    }
    setLoading(false)
  })
  .catch(err => {
    console.error(err);
    setError("Failed to fetch articles")
    setLoading(false)
  })
 }, [])

 if (loading) {
  return (
    <Container maxW="container.xl" py={6}>
      <Text>Loading articles...</Text>
    </Container>
  );
}

if (error) {
  return (
    <Container maxW="container.xl" py={6}>
      <Text color="red.500">{error}</Text>
    </Container>
  );
}
  
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
              <SimpleGrid columns={[1]} spacing={6} alignItems="start">
              {articles.map(article => (
  <ArticleCard
    key={article.slug}
    slug={article.slug}
    title={article.title}
    excerpt={article.excerpt}
    image={article.image}
  />
))}
              </SimpleGrid>
             


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