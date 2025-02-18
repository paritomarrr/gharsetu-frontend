import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  SimpleGrid,
  Grid,
  GridItem,
  Divider,
  Text,
  Skeleton,
  SkeletonText,
} from "@chakra-ui/react";
import ArticleCard from "../components/articles/ArticleCard";
import PropertyCard from "../components/common/PropertyCard";
import { backend_url } from "../config";

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingProperties, setLoadingProperties] = useState(true);

  useEffect(() => {
    document.title = "Articles | Gharsetu";

    // Fetch articles
    fetch(`${backend_url}/api/v1/articles`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          const sortedArticles = data.articles.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt) // Sort by latest date
          );
          setArticles(sortedArticles);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });

    // Fetch properties
    fetch(`${backend_url}/api/v1/properties/getRecentProperties`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setProperties(data.properties);
        }
        setLoadingProperties(false);
      })
      .catch((err) => {
        console.error(err);
        setLoadingProperties(false);
      });
  }, []);

  return (
    <Box>
      <Container maxW="container.xl" py={6}>
        <Divider mb={6} />
        <Grid templateColumns={["1fr", "1fr", "2fr 1fr"]} gap={8}>
          {/* Articles */}
          <GridItem>
            <SimpleGrid columns={[1]} spacing={6}>
              {loading
                ? [...Array(4)].map((_, index) => (
                    <Box key={index} borderWidth="1px" borderRadius="md" p={4}>
                      <Skeleton height="150px" mb={4} />
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
                      tags={article.tags}
                    />
                  ))}
            </SimpleGrid>
          </GridItem>

          {/* Properties */}
          <GridItem>
            <Text fontSize="lg" fontWeight="semibold" mb={4}>
              Properties around you
            </Text>
            <SimpleGrid columns={[1]} spacing={4}>
              {loadingProperties
                ? [...Array(4)].map((_, index) => (
                    <Box key={index} borderWidth="1px" borderRadius="md" p={4}>
                      <Skeleton height="150px" mb={4} />
                      <SkeletonText noOfLines={2} spacing="4" />
                    </Box>
                  ))
                : properties.map((property) => (
                    <PropertyCard key={property._id} property={property} />
                  ))}
            </SimpleGrid>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
};

export default Articles;
