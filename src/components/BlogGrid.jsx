import { 
  SimpleGrid, 
  Text, 
  Box, 
  Heading, 
  Flex,
  Spinner,
  Center,
  Skeleton,
  SkeletonText
} from '@chakra-ui/react'
import BlogCard from './BlogCard'
import { useBlog } from '../context/BlogContext'
import React from"react"

const BlogGrid = () => {
  const { blogPosts, isLoading, searchTerm ,initialLoading} = useBlog()
  
  if (isLoading) {
    return (
      <Center py={10}>
        <Flex direction="column" align="center">
          <Spinner 
            size="xl" 
            thickness="4px"
            speed="0.65s"
            color="brand.500"
            mb={4}
          />
          <Text color="gray.600">Generating your blog post...</Text>
        </Flex>
      </Center>
    )
  }
  
  if ((!initialLoading)&&(blogPosts.length) === 0) {
    return (
      <Box textAlign="center" py={10}>
        <Heading as="h3" size="lg" mb={3}>
          {searchTerm ? 'No matching posts found' : 'No blog posts yet'}
        </Heading>
        <Text color="gray.600">
          {searchTerm 
            ? `We couldn't find any posts matching "${searchTerm}". Try a different search term.` 
            : 'Generate your first blog post using the form above!'}
        </Text>
      </Box>
    )
  }
  
  return (
    <Box>
      {searchTerm && (
        <Heading as="h3" size="md" mb={6}>
          {blogPosts.length} {blogPosts.length === 1 ? "result" : "results"} for "{searchTerm}"
        </Heading>
      )}

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
        {initialLoading
          ? // Show Skeletons while loading
            Array.from({ length: 6 }).map((_, index) => (
              <Box key={index} p={5} shadow="md" borderWidth="1px" borderRadius="lg">
                <Skeleton height="150px" mb={4} />
                <SkeletonText noOfLines={3} spacing={4} />
              </Box>
            ))
          : // Show Blog Cards when data is ready
            blogPosts.map((post) => <BlogCard key={post.id} post={post} />)}
      </SimpleGrid>
    </Box>
  )
}

export default BlogGrid