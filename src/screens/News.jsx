import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  SimpleGrid,
  Divider,
  Skeleton,
  SkeletonText,
} from "@chakra-ui/react";
import NewsCard from "../components/news/NewsCard";
import { backend_url } from "../config";

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Gharsetu | News";

    // Fetch news
    fetch(`${backend_url}/api/v1/news`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          const sortedNews = data.news.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt) // Sort by latest date
          );
          setNews(sortedNews);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <Box>
      <Container maxW="container.xl" py={6}>
        <Divider mb={6} />
        <SimpleGrid columns={[1]} spacing={6}>
          {loading
            ? [...Array(4)].map((_, index) => (
                <Box key={index} borderWidth="1px" borderRadius="md" p={4}>
                  <Skeleton height="150px" mb={4} />
                  <SkeletonText noOfLines={3} spacing="4" />
                </Box>
              ))
            : news.map((item) => (
                <NewsCard
                  key={item.slug}
                  slug={item.slug}
                  title={item.title}
                  excerpt={item.excerpt}
                  image={item.image || '/logo.png'}
                  tags={item.tags}
                  onError={(e) => (e.target.src = '/logo.png')}
                />
              ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default News;