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
  FaShareAlt,
  FaBookmark,
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
  p: (props) => {
    const { children } = props;
    return (
      <Text fontSize="md" lineHeight="1.4" mb={4}>
        {children}
      </Text>
    );
  },
};

const SingleNews = () => {
  const { slug } = useParams();
  const { user } = useContext(UserContext);
  const [news, setNews] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const toast = useToast();

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
          `${backend_url}/api/v1/news/${slug}/comments`,
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
    fetch(`${backend_url}/api/v1/news/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setNews(data.news);
          setComments(data.news.comments || []);
          window.scrollTo(0, 0);
        }
      })
      .catch(console.error);
  }, [slug]);

  useEffect(() => {
    if (news) {
      document.title = `${news.title} | Gharsetu`;
    }
  }, [news]);

  if (!news) {
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
    createdAt,
  } = news;

  const formattedDate = createdAt
    ? format(new Date(createdAt), "dd MMMM yyyy")
    : "";

  return (
    <Box>
      <Container maxW="container.md" py={6}>
        <Text fontSize="3xl" fontWeight="bold" mb={2}>
          {title}
        </Text>
        <HStack spacing={4} mb={4} color="gray.600">
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

        <HStack mb={4}>
          <Avatar name={author?.name || "Author"} src={LOGO} />
          <Box>
            <Text fontWeight="bold">
              Written by {author?.name || "Gharsetu Team"}
            </Text>
            <Text fontSize="sm" color="gray.600">
              {formattedDate}
            </Text>
          </Box>
        </HStack>

        <VStack align="start" spacing={4} mb={8}>
          <ReactMarkdown components={ChakraUIRenderer(markdownTheme)} remarkPlugins={[remarkGfm]}>
            {content}
          </ReactMarkdown>
        </VStack>

        <Wrap spacing={2} mb={3} justify="center">
          {tags.map((tag, index) => (
            <WrapItem key={index}>
              <Tag size={{ base: "sm", md: "md" }} colorScheme="blue">
                {tag}
              </Tag>
            </WrapItem>
          ))}
        </Wrap>

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
    </Box>
  );
};

export default SingleNews;