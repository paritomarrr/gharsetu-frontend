import React, { useState, useEffect, useContext } from "react";
import { Box, Container, Input, Textarea, Button, FormControl, FormLabel, useToast, Heading, VStack, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { backend_url } from "../config";
import { UserContext } from "../context/UserContext";
import axios from "axios";

const WriteArticle = () => {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [image, setImage] = useState("");
  const [tags, setTags] = useState("");
  const [content, setContent] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const toast = useToast();
  const navigate = useNavigate();
  const { user, loading: userLoading } = useContext(UserContext);

  useEffect(() => {
    // Fetch user data to check if the user is an admin
    const fetchUserData = async () => {
      if (!user?._id) {
        toast({
          title: "Unauthorized",
          description: "You are not authorized to view this page.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        navigate("/"); // Redirect to home if user is not logged in
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
          navigate("/"); // Redirect to home if not admin
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "An error occurred while fetching user data.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        navigate("/"); // Redirect to home on error
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
        navigate("/"); // Redirect to home if user is not logged in
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
      body: JSON.stringify({ title, slug, excerpt, image, tags: tags.split(","), content }),
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
    return null; // Render nothing if not admin
  }

  return (
    <Box>
      <Container maxW="container.md" py={6}>
        <VStack spacing={6} align="stretch">
          <Heading as="h1" size="xl" textAlign="center">
            Write Article
          </Heading>
          <form onSubmit={handleSubmit}>
            <FormControl id="title" mb={4}>
              <FormLabel>Title</FormLabel>
              <Input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </FormControl>
            <FormControl id="slug" mb={4}>
              <FormLabel>Slug</FormLabel>
              <Input type="text" value={slug} onChange={(e) => setSlug(e.target.value)} required />
            </FormControl>
            <FormControl id="excerpt" mb={4}>
              <FormLabel>Excerpt</FormLabel>
              <Textarea value={excerpt} onChange={(e) => setExcerpt(e.target.value)} />
            </FormControl>
            <FormControl id="image" mb={4}>
              <FormLabel>Image URL</FormLabel>
              <Input type="text" value={image} onChange={(e) => setImage(e.target.value)} />
            </FormControl>
            <FormControl id="tags" mb={4}>
              <FormLabel>Tags (comma separated)</FormLabel>
              <Input type="text" value={tags} onChange={(e) => setTags(e.target.value)} />
            </FormControl>
            <FormControl id="content" mb={4}>
              <FormLabel>Content</FormLabel>
              <Textarea value={content} onChange={(e) => setContent(e.target.value)} required />
            </FormControl>
            <Button type="submit" colorScheme="blue" width="full">
              Submit
            </Button>
          </form>
        </VStack>
      </Container>
    </Box>
  );
};

export default WriteArticle;
