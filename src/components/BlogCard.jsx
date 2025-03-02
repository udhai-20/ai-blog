import { 
  Box, 
  Heading, 
  Text, 
  Image, 
  Flex, 
  Badge, 
  useColorModeValue,
  LinkBox,
  LinkOverlay
} from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import React from"react"

const BlogCard = ({ post }) => {
  const { id, title, topic, author, date, readTime, imageUrl } = post
  
  return (
    <LinkBox 
      as="article"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      bg={useColorModeValue('white', 'gray.800')}
      transition="all 0.2s"
      _hover={{ 
        transform: 'translateY(-4px)', 
        boxShadow: 'lg',
        borderColor: 'brand.300'
      }}
      height="100%"
      display="flex"
      flexDirection="column"
    >
      <Image 
        src={imageUrl} 
        alt={title}
        height="200px"
        objectFit="cover"
        fallbackSrc="https://via.placeholder.com/800x400?text=Blog+Image"
      />
      
      <Box p={6} flex="1" display="flex" flexDirection="column">
        <Badge 
          colorScheme="purple" 
          alignSelf="flex-start" 
          mb={2}
          borderRadius="full"
          px={2}
        >
          {topic}
        </Badge>
        
        <Heading as="h3" size="md" mb={2} lineHeight="tight">
          <LinkOverlay as={RouterLink} to={`/post/${id}`}>
            {title}
          </LinkOverlay>
        </Heading>
        
        <Flex mt="auto" pt={4} fontSize="sm" color="gray.500" align="center" justify="space-between">
          <Text>{author}</Text>
          <Flex align="center">
            <Text>{date}</Text>
            <Text mx={2}>•</Text>
            <Text>{readTime}</Text>
          </Flex>
        </Flex>
      </Box>
    </LinkBox>
  )
}

export default BlogCard