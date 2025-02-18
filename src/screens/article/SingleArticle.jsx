import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Text,
  HStack,
  VStack,
  Button,
  Avatar,
  SimpleGrid,
  Tag,
  Flex,
  Image,
  Divider,
  Icon
} from "@chakra-ui/react";
import {
  FaComment,
  FaHeart,
  FaShareAlt,
  FaBookmark,
  FaStar,
  FaEye,
} from "react-icons/fa";
import ReactMarkdown from "react-markdown";
import LOGO from '../../../src/assets/logo.png';
import ChakraUIRenderer from "chakra-ui-markdown-renderer";
import { useParams } from "react-router-dom";
import { backend_url } from "../../config";
import { format } from 'date-fns';

// Custom styles for Markdown
const markdownTheme = {
  h1: (props) => {
    const { children } = props;
    return <Text fontSize="2xl" fontWeight="bold" mb={4}>{children}</Text>;
  },
  h2: (props) => {
    const { children } = props;
    return <Text fontSize="xl" fontWeight="semibold" mb={3}>{children}</Text>;
  },
  h3: (props) => {
    const { children } = props;
    return <Text fontSize="lg" fontWeight="semibold" mb={2}>{children}</Text>;
  },
  p: (props) => {
    const { children } = props;
    return <Text fontSize="md" lineHeight="1.4" mb={4}>{children}</Text>;
  },
  strong: (props) => {
    const { children } = props;
    return <Text as="strong" fontWeight="bold">{children}</Text>;
  },
  em: (props) => {
    const { children } = props;
    return <Text as="em" fontStyle="italic">{children}</Text>;
  },
  ul: (props) => {
    const { children } = props;
    return <Box as="ul" pl={6} mb={2}>{children}</Box>;
  },
  li: (props) => {
    const { children } = props;
    return <Box as="li" listStyleType="disc" mb={2}>{children}</Box>;
  },
  a: (props) => {
    const { href, children } = props;
    return (
      <Text
        as="a"
        href={href}
        color="blue.500"
        textDecoration="underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </Text>
    );
  },
};

const SingleArticle = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch(`${backend_url}/api/v1/articles/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setArticle(data.article);
          setRelatedArticles(data.relatedArticles || []);
          setComments(data.comments || []);
        }
      })
      .catch(console.error);
  }, [slug]);

  useEffect(() => {
    if (article) {
      document.title = `${article.title} | Gharsetu`;
    }
  }, [article]);

  if (!article) return <Box py={10} textAlign="center">Loading...</Box>;

  const {
    title,
    image,
    tags = [],
    content,
    author,
    views,
    commentsCount,
    likesCount,
    createdAt,
    readTime,
  } = article;

  const formattedDate = createdAt
  ? format(new Date(createdAt), 'dd MMMM yyyy')
  : '';
  return (
    <Box>
      <Container maxW="container.md" py={6}>
        {/* Tags */}
        <HStack spacing={2} mb={3}>
          {tags.map((tag, index) => (
            <Tag key={index} colorScheme="blue">
              {tag}
            </Tag>
          ))}
        </HStack>
        {/* Title and Meta */}
        <Text fontSize="3xl" fontWeight="bold" mb={2}>
          {title}
        </Text>
        <HStack spacing={4} mb={4} color="gray.600">
          {/* <HStack spacing={1}>
            <Icon as={FaEye} />
            <Text fontSize="sm">
              {views ? `${views.toLocaleString()} Views` : "Views"}
            </Text>
          </HStack> */}
          {/* <HStack spacing={1}>
            <Icon as={FaComment} />
            <Text fontSize="sm">
              {commentsCount ? `${commentsCount} Comments` : "Comments"}
            </Text>
          </HStack> */}
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
          <Avatar name={author?.name || "Author"} src={LOGO} />
          <Box>
            <Text fontWeight="bold">
              Written by {author?.name || "Gharsetu Team"}
            </Text>
            <Text fontSize="sm" color="gray.600">
              {readTime || "A few minutes read"} | {formattedDate}
            </Text>
          </Box>
        </HStack>

        {/* Article Content */}
        <VStack align="start" spacing={4} mb={8}>
          <ReactMarkdown components={ChakraUIRenderer(markdownTheme)}>
            {content}
          </ReactMarkdown>
        </VStack>

        {/* Comments Section */}
        {/* <Box mb={8}>
          <Text fontWeight="bold" fontSize="lg" mb={4}>
            Comments
          </Text>
          <VStack spacing={4}>
            {comments.map((comment, idx) => (
              <Box
                key={idx}
                borderWidth="1px"
                borderRadius="md"
                p={4}
                w="full"
              >
                <HStack>
                  <Avatar name={comment.name} size="sm" />
                  <Box>
                    <Text fontWeight="bold">{comment.name}</Text>
                    <Text fontSize="xs" color="gray.500">
                      {comment.date}
                    </Text>
                  </Box>
                </HStack>
                <Text mt={2}>{comment.text}</Text>
              </Box>
            ))}
          </VStack>
        </Box> */}

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <Box mb={8}>
            <Text fontWeight="bold" fontSize="xl" mb={4}>
              Related Articles
            </Text>
            <SimpleGrid columns={[1, 2]} spacing={6}>
              {relatedArticles.map((ra, i) => (
                <Box
                  key={i}
                  borderWidth="1px"
                  borderRadius="md"
                  overflow="hidden"
                  p={4}
                >
                  <Image
                    src={ra.image}
                    alt={ra.title}
                    borderRadius="md"
                    mb={4}
                  />
                  <Text fontWeight="bold">{ra.title}</Text>
                  <Text fontSize="sm" color="gray.600">
                    {ra.excerpt}
                  </Text>
                </Box>
              ))}
            </SimpleGrid>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default SingleArticle;
