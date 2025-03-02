import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  useColorModeValue,
  VStack,
  Text,
  useToast,
  FormHelperText,
  Stack
} from '@chakra-ui/react';
import { useState } from 'react';
import { useBlog } from '../context/BlogContext';
import { useNavigate } from 'react-router-dom';
import React from 'react';

const BlogForm = () => {
  const [topic, setTopic] = useState('');
  const { createPost, isLoading } = useBlog();
  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!topic.trim()) {
      toast({
        title: 'Topic is required',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      const postId = await createPost(topic);
      toast({
        title: 'Blog post created!',
        description: 'Your AI-generated blog post is ready.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      setTopic('');
      navigate(`/post/${postId}`);
    } catch (error) {
      toast({
        title: 'Error creating post',
        description: error.message || 'Something went wrong',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box    w="full" >
      <Box
        bg={useColorModeValue('white', 'gray.800')}
        borderRadius="xl"
        boxShadow="xl"
        p={{ base: 3, md: 8 }}
        w={{ base: '100%', md: '90%', lg: '800px' }}
        mx="auto"
        borderWidth="1px"
        borderColor={useColorModeValue('gray.200', 'gray.700')}
      >
        <VStack spacing={{md:6,base:3}} as="form" onSubmit={handleSubmit} w="full">
          <Text
            fontSize={{ base: 'md', md: '2xl', lg: '3xl' }}
            fontWeight="bold"
            textAlign="center"
            color={useColorModeValue('purple.600', 'purple.300')}
          >
            Generate a Blog Post with AI
          </Text>

          <Text textAlign="center" color={useColorModeValue('gray.600', 'gray.400')} fontSize={{ base: 'sm', md: 'md' }}>
            Enter a topic and our AI will create a high-quality blog post for you in seconds.
          </Text>

          <FormControl>
            <FormLabel fontSize={{ base: 'sm', md: 'lg' }}>What would you like to write about?</FormLabel>
            <Stack direction={{ base: 'column', md: 'row' }}  spacing={4} w="full">
              <Input
                placeholder="Enter a topic (e.g., Future of AI, Space Exploration)"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                borderRadius="full"
                bg={useColorModeValue('gray.50', 'gray.700')}
                _focus={{
                  borderColor: 'purple.400',
                  boxShadow: '0 0 0 1px var(--chakra-colors-purple-400)',
                }}
                fontSize={{ base: 'sm', md: 'md' }}
              />
              <Button
                type="submit"
                colorScheme="purple"
                isLoading={isLoading}
                loadingText="Generating"
                borderRadius="full"
                size={{ base: 'sm', md: 'lg' }}
                px={6}
              >
                Generate
              </Button>
            </Stack>
            <FormHelperText fontSize={{ base: 'xs', md: 'sm' }}>
              Be specific for better results. Try topics like "Mindfulness Techniques for Busy Professionals".
            </FormHelperText>
          </FormControl>
        </VStack>
      </Box>
    </Box>
  );
};

export default BlogForm;
