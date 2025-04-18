import React, { useState, useEffect } from "react";
import { Box, Text, Image, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useBreakpointValue } from "@chakra-ui/react";
import { backend_url } from "../config";

const ArticleCarousel = () => {
  const [articles, setArticles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleSlides = useBreakpointValue({ base: 1, md: 2, lg: 3 }); // Dynamically calculate visible slides
  const [isSliding, setIsSliding] = useState(false);

  useEffect(() => {
    // Fetch articles
    fetch(`${backend_url}/api/v1/articles`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setArticles(
            data.articles.sort(
              (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
            )
          ); // Sort by latest date
        }
      })
      .catch((err) => console.error("Error fetching articles:", err));
  }, []);

  const handlePrev = () => {
    if (!isSliding) {
      setIsSliding(true);
      setTimeout(() => setIsSliding(false), 300); // Prevent rapid clicks
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? articles.length - visibleSlides : prevIndex - 1
      );
    }
  };

  const handleNext = () => {
    if (!isSliding) {
      setIsSliding(true);
      setTimeout(() => setIsSliding(false), 300); // Prevent rapid clicks
      setCurrentIndex((prevIndex) =>
        prevIndex === articles.length - visibleSlides ? 0 : prevIndex + 1
      );
    }
  };

  if (articles.length === 0) {
    return <p>Loading articles...</p>; // Fallback for loading state
  }

  if (articles.length <= visibleSlides) {
    // If the number of articles is less than or equal to the visible slides, display them statically
    return (
      <Box>
        <Text fontSize="2xl" fontWeight="bold" mb={4}>
          Articles
        </Text>
        <Text fontSize="md" color="gray.600" mb={6}>
          Read the latest articles in Real Estate
        </Text>
        <Flex justify="space-between" gap={4}>
          {articles.map((article) => (
            <Box
              key={article.slug}
              flex="0 0 auto"
              w={{ base: "100%", md: "45%", lg: "30%" }}
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              shadow="md"
              p={4}
            >
              {/* Article Image */}
              <Link to={`/articles/${article.slug}`}>
                <Image
                  src={article.image}
                  alt={article.title}
                  borderRadius="md"
                  mb={4}
                  objectFit="cover"
                  h="200px"
                  w="full"
                />
              </Link>

              {/* Article Content */}
              <Box>
                <Link
                  to={`/articles/${article.slug}`}
                  fontSize="lg"
                  fontWeight="semibold"
                  mb={2}
                  color="blue.500"
                  _hover={{ textDecoration: "underline" }}
                >
                  {article.title}
                </Link>
                <Text fontSize="sm" color="gray.600" noOfLines={3}>
                  {article.excerpt}
                </Text>
                <Text fontSize="xs" color="gray.500" mt={2}>
                  {new Date(article.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                  })}
                </Text>
              </Box>
            </Box>
          ))}
        </Flex>
      </Box>
    );
  }

  return (
    <Box>
      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        Articles
      </Text>
      <Text fontSize="md" color="gray.600" mb={6}>
        Read the latest articles in Real Estate
      </Text>
      <Flex alignItems="center" position="relative" overflow="hidden">
        <button
          onClick={handlePrev}
          style={{
            position: "absolute",
            left: 0,
            zIndex: 10,
            background: "rgba(0, 0, 0, 0.5)",
            color: "white",
            border: "none",
            borderRadius: "50%",
            padding: "8px",
          }}
        >
          {"<"}
        </button>
        <Flex
          className="carousel-slides"
          style={{
            display: "flex",
            transition: "transform 0.3s ease-in-out",
            transform: `translateX(-${currentIndex * (100 / visibleSlides)}%)`,
          }}
        >
          {articles.map((article) => (
            <Box
              key={article.slug}
              flex="0 0 auto"
              w={{ base: "100%", md: "45%", lg: "30%" }}
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              shadow="md"
              p={4}
              mx={2}
            >
              {/* Article Image */}
              <Link to={`/articles/${article.slug}`}>
                <Image
                  src={article.image}
                  alt={article.title}
                  borderRadius="md"
                  mb={4}
                  objectFit="cover"
                  h="200px"
                  w="full"
                />
              </Link>

              {/* Article Content */}
              <Box>
                <Link
                  to={`/articles/${article.slug}`}
                  fontSize="lg"
                  fontWeight="semibold"
                  mb={2}
                  color="blue.500"
                  _hover={{ textDecoration: "underline" }}
                >
                  {article.title}
                </Link>
                <Text fontSize="sm" color="gray.600" noOfLines={3}>
                  {article.excerpt}
                </Text>
                <Text fontSize="xs" color="gray.500" mt={2}>
                  {new Date(article.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                  })}
                </Text>
              </Box>
            </Box>
          ))}
        </Flex>
        <button
          onClick={handleNext}
          style={{
            position: "absolute",
            right: 0,
            zIndex: 10,
            background: "rgba(0, 0, 0, 0.5)",
            color: "white",
            border: "none",
            borderRadius: "50%",
            padding: "8px",
          }}
        >
          {">"}
        </button>
      </Flex>
    </Box>
  );
};

export default ArticleCarousel;
