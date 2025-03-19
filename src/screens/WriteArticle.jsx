import React, { useState, useEffect, useContext } from "react";
import { Box, Container, Input, Textarea, Button, FormControl, FormLabel, useToast, Heading, VStack, Text, SimpleGrid, Divider, HStack, Avatar, Tag, Image, Icon } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { backend_url } from "../config";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import ChakraUIRenderer from "chakra-ui-markdown-renderer";
import { FaShareAlt, FaBookmark } from "react-icons/fa";
import { format } from 'date-fns';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";

const WriteArticle = () => {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [image, setImage] = useState("");
  const [tags, setTags] = useState("");
  const [content, setContent] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [scheduleDate, setScheduleDate] = useState(null);
  const toast = useToast();
  const navigate = useNavigate();
  const { user, loading: userLoading } = useContext(UserContext);

  useEffect(() => {
    document.title = "Gharsetu | Write Article";
    const fetchUserData = async () => {
      if (!user?._id) {
        toast({
          title: "Unauthorized",
          description: "You are not authorized to view this page.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        navigate("/");
        return;
      }
      try {
        const response = await axios.post(`${backend_url}/api/v1/auth/getUser`, {
          token: localStorage.getItem("token"),
        });
        const data = response.data;
        if (data.success && data.user.isAdmin) {
          setIsAdmin(true);
        } else {
          toast({
            title: "Unauthorized",
            description: "You are not authorized to view this page.",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
          navigate("/"); 
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "An error occurred while fetching user data.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    if (!userLoading) {
      if (user) {
        fetchUserData();
      } else {
        toast({
          title: "Unauthorized",
          description: "You are not authorized to view this page.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        navigate("/");
      }
    }
  }, [navigate, toast, user, userLoading]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`${backend_url}/api/v1/articles`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, slug, excerpt, image, tags: tags.split(","), content, scheduleDate }),
    });

    const data = await response.json();

    if (data.success) {
      toast({
        title: "Article created.",
        description: "Your article has been created successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate("/articles");
    } else {
      toast({
        title: "Error.",
        description: data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  if (loading || userLoading) {
    return <Text>Loading...</Text>;
  }

  if (!isAdmin) {
    return null;
  }

  const formattedDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const hasPreviewContent = title || slug || excerpt || image || tags || content;

  return (
    <Box>
      <Container maxW="container.xl" py={6}>
        <Heading as="h1" size="xl" textAlign="center" mb={6}>
          Write Article
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
          <Box p={4} borderWidth="1px" borderRadius="lg" position="sticky" top="6">
            <form onSubmit={handleSubmit}>
              <VStack spacing={4} align="stretch">
                <FormControl id="title">
                  <FormLabel>Title</FormLabel>
                  <Input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </FormControl>
                <FormControl id="slug">
                  <FormLabel>Slug</FormLabel>
                  <Input type="text" value={slug} onChange={(e) => setSlug(e.target.value)} required />
                </FormControl>
                <FormControl id="excerpt">
                  <FormLabel>Excerpt</FormLabel>
                  <Textarea value={excerpt} onChange={(e) => setExcerpt(e.target.value)} />
                </FormControl>
                <FormControl id="image">
                  <FormLabel>Image URL</FormLabel>
                  <Input type="text" value={image} onChange={(e) => setImage(e.target.value)} />
                </FormControl>
                <FormControl id="content">
                  <FormLabel>Content</FormLabel>
                  <Textarea value={content} onChange={(e) => setContent(e.target.value)} required />
                </FormControl>
                <FormControl id="tags">
                  <FormLabel>Tags (comma separated)</FormLabel>
                  <Input type="text" value={tags} onChange={(e) => setTags(e.target.value)} />
                </FormControl>
                <FormControl id="scheduleDate">
                  <FormLabel>Schedule Date</FormLabel>
                  <DatePicker
                    selected={scheduleDate}
                    onChange={(date) => setScheduleDate(date)}
                    showTimeSelect
                    timeIntervals={30}
                    timeCaption="Time"
                    dateFormat="MMMM d, yyyy h:mm aa"
                    placeholderText="Select a date and time"
                  />
                </FormControl>
                <Button type="submit" colorScheme="blue" width="full">
                  Submit
                </Button>
              </VStack>
            </form>
          </Box>
          {hasPreviewContent && (
            <Box p={4} borderWidth="1px" borderRadius="lg" overflowY="auto" maxH="80vh">
              <Heading as="h2" size="lg" mb={4}>
                Preview
              </Heading>
              <Divider mb={4} />
              <Box>
                <Text fontSize="3xl" fontWeight="bold" mb={2}>
                  {title}
                </Text>
                <HStack spacing={4} mb={4} color="gray.600">
                  <HStack spacing={1}>
                    <Icon as={FaShareAlt} />
                    <Text fontSize="sm">Share</Text>
                  </HStack>
                  <HStack spacing={1}>
                    <Icon as={FaBookmark} />
                    <Text fontSize="sm">Save</Text>
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
                  <Avatar name="Author" src="" />
                  <Box>
                    <Text fontWeight="bold">Written by Gharsetu Team</Text>
                    <Text fontSize="sm" color="gray.600">
                      A few minutes read | {formattedDate}
                    </Text>
                  </Box>
                </HStack>
                <VStack align="start" spacing={4} mb={8}>
                  <ReactMarkdown components={ChakraUIRenderer()}>
                    {content}
                  </ReactMarkdown>
                </VStack>
                {tags && (
                  <HStack spacing={2} mb={3}>
                    {tags.split(",").map((tag, index) => (
                      <Tag key={index} colorScheme="blue">
                        {tag}
                      </Tag>
                    ))}
                  </HStack>
                )}
              </Box>
            </Box>
          )}
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default WriteArticle;
