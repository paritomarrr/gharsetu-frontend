import React, { useState, useEffect, useContext } from "react";
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
  Icon,
  Skeleton,
  Wrap,
  WrapItem,
  useToast,
  Input,
  Textarea,
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
import LOGO from "../../../src/assets/logo.png";
import ChakraUIRenderer from "chakra-ui-markdown-renderer";
import { useParams, Link } from "react-router-dom";
import { backend_url } from "../../config";
import { format } from "date-fns";
import { UserContext } from "../../context/UserContext";
import axios from "axios";
import remarkGfm from "remark-gfm";

// Custom styles for Markdown
const markdownTheme = {
  h1: (props) => {
    const { children } = props;
    return (
      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        {children}
      </Text>
    );
  },
  h2: (props) => {
    const { children } = props;
    return (
      <Text fontSize="xl" fontWeight="semibold" mb={3}>
        {children}
      </Text>
    );
  },
  h3: (props) => {
    const { children } = props;
    return (
      <Text fontSize="lg" fontWeight="semibold" mb={2}>
        {children}
      </Text>
    );
  },
  p: (props) => {
    const { children } = props;
    return (
      <Text fontSize="md" lineHeight="1.4" mb={4}>
        {children}
      </Text>
    );
  },
  strong: (props) => {
    const { children } = props;
    return (
      <Text as="strong" fontWeight="bold">
        {children}
      </Text>
    );
  },
  em: (props) => {
    const { children } = props;
    return (
      <Text as="em" fontStyle="italic">
        {children}
      </Text>
    );
  },
  ul: (props) => {
    const { children } = props;
    return (
      <Box as="ul" pl={6} mb={2}>
        {children}
      </Box>
    );
  },
  li: (props) => {
    const { children } = props;
    return (
      <Box as="li" listStyleType="disc" mb={2}>
        {children}
      </Box>
    );
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
  const { user } = useContext(UserContext);
  const [article, setArticle] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [comments, setComments] = useState([]);
  const [randomArticles, setRandomArticles] = useState([]);
  const [commentText, setCommentText] = useState("");
  const toast = useToast();

  const shareText = `Check out this article: ${window.location.href}`;

  const handleShareClick = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      toast({
        title: "Link copied to clipboard.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    });
  };

  const handleCommentSubmit = async () => {
    if (!user) {
      toast({
        title: "User not found.",
        description: "Please log in to add a comment.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    if (commentText) {
      try {
        const response = await axios.post(
          `${backend_url}/api/v1/articles/${slug}/comments`,
          {
            userId: user._id,
            text: commentText,
          }
        );
        setComments(response.data.comments);
        setCommentText("");
        toast({
          title: "Comment added.",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      } catch (error) {
        toast({
          title: "Failed to add comment.",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      }
    } else {
      toast({
        title: "Please fill in the comment field.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    fetch(`${backend_url}/api/v1/articles/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setArticle(data.article);
          setRelatedArticles(data.relatedArticles || []);
          setComments(data.article.comments || []);
          window.scrollTo(0, 0); // Scroll to top
        }
      })
      .catch(console.error);
  }, [slug]);

  useEffect(() => {
    if (article) {
      document.title = `${article.title} | Gharsetu`;
    }
  }, [article]);

  useEffect(() => {
    if (slug) {
      fetch(`${backend_url}/api/v1/articles/random?excludeSlug=${slug}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setRandomArticles(data.articles);
          }
        })
        .catch(console.error);
    }
  }, [slug]);

  if (!article) {
    return (
      <Box py={10} textAlign="center">
        <Skeleton height="40px" mb={4} />
        <Skeleton height="20px" mb={4} />
        <Skeleton height="20px" mb={4} />
        <Skeleton height="20px" mb={4} />
      </Box>
    );
  }

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
    ? format(new Date(createdAt), "dd MMMM yyyy")
    : "";
  return (
    <Box>
      <Container maxW="container.md" py={6}>
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
          <HStack spacing={1}>
            <Icon as={FaShareAlt} />
            <Text fontSize="sm" onClick={handleShareClick} cursor="pointer">
              Share
            </Text>
          </HStack>
          <HStack spacing={1}>
            <Icon as={FaComment} />
            <Text
              fontSize="sm"
              cursor="pointer"
              onClick={() =>
                document.getElementById("comments-section").scrollIntoView()
              }
            >
              Comments
            </Text>
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
          <ReactMarkdown components={ChakraUIRenderer(markdownTheme)} remarkPlugins={[remarkGfm]}>
            {content}
          </ReactMarkdown>
        </VStack>

        {/* Subscribe to Whatsapp Channel */}
        <Box textAlign="center" mb={4}>
          <Text
            as="a"
            href="https://chat.whatsapp.com/EJOLE6fvgYj3QNrAmZm7S3"
            target="_blank"
            rel="noopener noreferrer"
            color="#15528f"
            textDecoration="underline"
            fontSize="lg"
            fontStyle="italic"
          >
            Subscribe to our Whatsapp Channel
          </Text>
        </Box>

        {/* Tags */}
        <Wrap spacing={2} mb={3} justify="center">
          {tags.map((tag, index) => (
            <WrapItem key={index}>
              <Tag size={{ base: "sm", md: "md" }} colorScheme="blue">
                {tag}
              </Tag>
            </WrapItem>
          ))}
        </Wrap>

        {/* Comments Section */}
        <Box mb={8} id="comments-section">
          <Text fontWeight="bold" fontSize="lg" mb={4}>
            Comments
          </Text>
          <VStack spacing={4}>
            {comments.map((comment, idx) => (
              <Box key={idx} borderWidth="1px" borderRadius="md" p={4} w="full">
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
          <VStack spacing={4} mt={4}>
            <Textarea
              placeholder="Your Comment"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <Button colorScheme="blue" onClick={handleCommentSubmit}>
              Add Comment
            </Button>
          </VStack>
        </Box>
      </Container>

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
                <Image src={ra.image} alt={ra.title} borderRadius="md" mb={4} />
                <Text fontWeight="bold">{ra.title}</Text>
                <Text fontSize="sm" color="gray.600">
                  {ra.excerpt}
                </Text>
              </Box>
            ))}
          </SimpleGrid>
        </Box>
      )}
      
      <Divider my={4}/>

      {/* Read More Articles */}
      <Box width="100%" maxW="100vw" px={10} py={8} bg="white" my={4}> {/* Adjusted margin */}
        <Text fontWeight="bold" fontSize="xl" mb={8} textAlign="center"> {/* Adjusted margin */}
          Read More Articles
        </Text>
        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 4 }}
          spacing={6}
          width="100%"
        >
          {randomArticles.map((article, index) => (
            <Link key={index} to={`/articles/${article.slug}`}>
              <Box
                borderWidth="1px"
                borderRadius="md"
                overflow="hidden"
                p={4}
                bg="white"
                boxShadow="md"
                minW="250px"
                width="100%"
                height="350px" // Set a fixed height for the card
              >
                <Image
                  src={article.image}
                  alt={article.title}
                  borderRadius="md"
                  mb={4}
                  w="100%"
                  h="200px"
                  objectFit="cover"
                />
                <Text fontWeight="bold" noOfLines={2}>
                  {article.title}
                </Text>
                <Text fontSize="sm" color="gray.600" noOfLines={3}>
                  {article.excerpt}
                </Text>
              </Box>
            </Link>
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default SingleArticle;
