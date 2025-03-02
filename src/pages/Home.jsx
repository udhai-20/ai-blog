import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Divider
} from '@chakra-ui/react'
import BlogForm from '../components/BlogForm'
import BlogGrid from '../components/BlogGrid'
import React from "react"

const Home = () => {
  return (
    <Container  maxW="100%">
      <VStack spacing={{ md: 8, base: 3 }} align="stretch">
        <Box textAlign="center">
          <Heading
            as="h1"
            size={{ base: "md", md: "2xl" }}
            mb={4}
            bgGradient="linear(to-r, brand.500, purple.500, blue.500)"
            bgClip="text"
            fontWeight="bold"
          >
            AI-Powered Blog Generator
          </Heading>
          <Text
            fontSize={{ base: "md", md: "xl" }}
            color="gray.600"
            maxW="800px"
            mx="auto"
          >
            Create professional, engaging blog posts in seconds with our AI technology.
            Just enter a topic and let our AI do the writing for you.
          </Text>
        </Box>

        <BlogForm />

        <Divider />

        <Box>
          <Heading as="h2" size={{ base: "md", md: "xl" }} mb={8}>
            Latest Blog Posts
          </Heading>
          <BlogGrid />
        </Box>
      </VStack>
    </Container>
  )
}

export default Home