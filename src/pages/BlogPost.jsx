import { 
  Box, 
  Container, 
  Heading, 
  Text, 
  Image, 
  Flex, 
  Badge, 
  Button,
  useColorModeValue,
  useToast,
  IconButton,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Divider,
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay
} from '@chakra-ui/react'
import { ChevronRightIcon, DeleteIcon, ArrowBackIcon } from '@chakra-ui/icons'
import { useParams, useNavigate, Link as RouterLink } from 'react-router-dom'
import { useBlog } from '../context/BlogContext'
import { useRef, useState } from 'react'
import React from"react"

// This is a simple markdown renderer component
const MarkdownRenderer = ({ content }) => {

  const paragraphs = content.split('\n\n')
  
  return (
    <Box className="markdown-content">
      {paragraphs.map((paragraph, index) => {
        if (paragraph.startsWith('# ')) {
          return <Heading as="h1" size={{md:"xl",base:"md"}} mt={6} mb={4} key={index}>{paragraph.substring(2)}</Heading>
        } else if (paragraph.startsWith('## ')) {
          return <Text as="h2" size={{md:"xl",base:"md"}} mt={{base:2,md:2}} key={index}>{paragraph.substring(3)}</Text>
        } else if (paragraph.startsWith('### ')) {
          return <Text as="h3" size="md" mt={4} mb={2} key={index}>{paragraph.substring(4)}</Text>
        } else if (paragraph.startsWith('- ')) {
          return (
            <Box as="ul" pl={5} mt={2} mb={2} key={index}>
              {paragraph.split('\n').map((item, i) => (
                <Box as="li" ml={4} key={i}>{item.substring(2)}</Box>
              ))}
            </Box>
          )
        } else if (paragraph.match(/^\d\./)) {
          return (
            <Box as="ol" pl={5} mt={2} mb={2} key={index}>
              {paragraph.split('\n').map((item, i) => {
                const content = item.replace(/^\d\./, '')
                return <Box as="li" ml={4} key={i}>{content}</Box>
              })}
            </Box>
          )
        } else {
          return <Text mt={3} mb={3} key={index}>{paragraph}</Text>
        }
      })}
    </Box>
  )
}

const BlogPost = () => {
  const { id } = useParams()
  const { getPostById, deletePost } = useBlog()
  const navigate = useNavigate()
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef()
  const [isDeleting, setIsDeleting] = useState(false)
  
  const post = getPostById(id)
  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      deletePost(id)
      toast({
        title: 'Blog post deleted',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
      navigate('/')
    } catch (error) {
      toast({
        title: 'Error deleting post',
        description: error.message || 'Something went wrong',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    } finally {
      setIsDeleting(false)
      onClose()
    }
  }
  if (!post) {
    return (
      <Container maxW="container.xl" py={10}>
        <Box textAlign="center">
          <Heading as="h2" size={{base:"md",md:"xl"}} mb={4}>Blog Post Not Found</Heading>
          <Text mb={6}>The blog post you're looking for doesn't exist or has been removed.</Text>
          <Button 
            as={RouterLink} 
            to="/" 
            colorScheme="purple" 
            leftIcon={<ArrowBackIcon />}
          >
            Back to Home
          </Button>
        </Box>
      </Container>
    )
  }
  
  
  
  return (
    <Container maxW="container.lg">
      <Breadcrumb 
        spacing="4px" 
        separator={<ChevronRightIcon color="gray.500" />}
        mb={{md: 6, base: 3}}
      >
        <BreadcrumbItem>
          <BreadcrumbLink as={RouterLink} to="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink >{post.title}</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      
      <Box 
        bg={useColorModeValue('white', 'gray.800')}
        borderRadius="lg"
        overflow="hidden"
        boxShadow="md"
        mb={8}
      >
        <Image 
          src={post.imageUrl} 
          alt={post.title}
          w="full"
          h={{ base: "200px", md: "400px" }}
          objectFit="cover"
        
        />
        
        <Box p={{ base: 6, md: 8 }}  fontFamily="Georgia, Times New Roman, serif">
          <Flex 
            direction={{ base: 'column', md: 'row' }}
            justify="space-between"
            align={{ base: 'flex-start', md: 'center' }}
            mb={{ base: 4, md: 6 }}
          >
            <Box>
              <Badge 
                colorScheme="purple" 
                mb={2}
                borderRadius="full"
                px={2}
              >
                {post.topic}
              </Badge>
              <Heading as="h1" size={{base:"md",md:"xl"}} mb={{base: 2, md: 4}}>
                {post.title}
              </Heading>
              <Flex 
                color="gray.500" 
                fontSize={{ base: 'sm', md: 'md' }}
                align="center"
                flexWrap="wrap"
                gap={{ base: 1, md: 2 }}
              >
                <Text >{post.author}</Text>
                <Text>•</Text>
                <Text>{post.date}</Text>
                <Text>•</Text>
                <Text>{post.readTime}</Text>
              </Flex>
            </Box>
            
            <IconButton
              aria-label="Delete post"
              icon={<DeleteIcon />}
              colorScheme="red"
              variant="outline"
              onClick={onOpen}
          
              alignSelf={{ base: 'flex-end', md: 'center' }}
            />
          </Flex>
          
          <Divider mb={{md:6,sm:2}} />
          
          <Box className="blog-content">
            <MarkdownRenderer content={post.content} />
          </Box>
        </Box>
      </Box>
      
      <Flex justify="center" mb={{md: 6, base: 3}}>
        <Button 
          as={RouterLink} 
          to="/" 
          colorScheme="purple" 
          leftIcon={<ArrowBackIcon />}
          size={{ base: "sm", md: "md" }}
        >
          Back to All Posts
        </Button>
      </Flex>
      
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Blog Post
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete this blog post? This action cannot be undone.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button 
                colorScheme="red" 
                onClick={handleDelete} 
                ml={3}
                isLoading={isDeleting}
                loadingText="Deleting"
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Container>
  )
}

export default BlogPost