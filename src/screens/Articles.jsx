import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Text,
  Grid,
  GridItem,
  InputGroup,
  InputLeftElement,
  Input,
  Icon,
  Divider,
  Container,
  SimpleGrid,
  Button,
  HStack,
  Skeleton,
  SkeletonText,
} from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import ArticleCard from "../components/articles/ArticleCard";
import PropertyCard from "../components/common/PropertyCard";
import { backend_url } from "../config";

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingProperties, setLoadingProperties] = useState(true);
  const [error, setError] = useState(null);
  const [errorProperties, setErrorProperties] = useState(null);

  useEffect(() => {
    // Fetch articles
    fetch(`${backend_url}/api/v1/articles`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setArticles(data.articles);
        } else {
          setError("Failed to fetch articles.");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch articles");
        setLoading(false);
      });

    // Fetch properties
    fetch(`${backend_url}/api/v1/properties/getRecentProperties`, {
      method: "POST", // Use POST instead of GET
      headers: {
        "Content-Type": "application/json", // Set appropriate headers
      },
      body: JSON.stringify({}), // Include body if required by the API
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setProperties(data.properties);
        } else {
          setErrorProperties("Failed to fetch properties.");
        }
        setLoadingProperties(false);
      })
      .catch((err) => {
        console.error(err);
        setErrorProperties("Failed to fetch properties");
        setLoadingProperties(false);
      });
  }, []);

  return (
    <Box>
      {/* Top Filters */}
      <Container maxW="container.xl" py={2}>
        <Box as="section" px={[4, 8, 16]} py={6}>
          <Flex alignItems="center" justifyContent="space-between" mb={4}>
            <HStack spacing={6} mb={4} overflow="auto">
              <Text fontWeight="bold" cursor="pointer">
                For You
              </Text>
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
        <Grid templateColumns={["1fr", "1fr", "2fr 1fr"]} gap={8}>
          <GridItem>
            <SimpleGrid columns={[1]} spacing={6} alignItems="start">
              {loading
                ? [...Array(4)].map((_, index) => (
                    <Box key={index} borderWidth="1px" borderRadius="lg" p={4}>
                      <Skeleton height="200px" mb={4} />
                      <SkeletonText noOfLines={3} spacing="4" />
                    </Box>
                  ))
                : articles.map((article) => (
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
            <Text fontSize="lg" fontWeight="semibold" mb={4}>
              Properties around you
            </Text>
            <SimpleGrid columns={[1]} spacing={4}>
              {loadingProperties
                ? [...Array(4)].map((_, index) => (
                    <Box key={index} borderWidth="1px" borderRadius="lg" p={4}>
                      <Skeleton height="150px" mb={4} />
                      <SkeletonText noOfLines={2} spacing="4" />
                    </Box>
                  ))
                : errorProperties ? (
                  <Text color="red.500">{errorProperties}</Text>
                ) : (
                  properties.map((property) => (
                    <PropertyCard key={property._id} property={property} />
                  ))
                )}
            </SimpleGrid>
          </GridItem>
        </Grid>
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
            Explore thousands of listings and get expert guidance on your home-buying journey.
          </Text>
          <Button size="lg" colorScheme="whiteAlpha">
            Get Started
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default Articles;
