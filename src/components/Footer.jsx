import { 
  Box, 
  Container, 
  Stack, 
  Text, 
  Link, 
  useColorModeValue,
  Flex,
  Heading
} from '@chakra-ui/react'
import { FaTwitter, FaGithub, FaLinkedin } from 'react-icons/fa'
import React from"react"

const Footer = () => {
  return (
    <Box
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}
      borderTop="1px"
      borderColor={useColorModeValue('gray.200', 'gray.700')}
    >
      <Container
        as={Stack}
        maxW="container.xl"
        py={10}
        spacing={8}
      >
        <Flex 
          direction={{ base: 'column', md: 'row' }}
          justify="space-between"
          align={{ base: 'center', md: 'flex-start' }}
          textAlign={{ base: 'center', md: 'left' }}
          gap={{ base: 4, md: 8 }}
        >
          <Box maxW="300px">
            <Heading 
              as={Link}
              href="/"
              size={{ base: "md", md: "lg" }}
              fontWeight="bold"
              color="brand.600"
              mb={2}
              _hover={{ textDecoration: 'none' }}
            >
              BlogGen AI
            </Heading>
            <Text fontSize={{ md:"md",base:"sm"}}mt={2}>
              Generate high-quality blog posts with AI. Just enter a topic and get a professionally written article in seconds.
            </Text>
          </Box>
          
          <Stack align={{ base: 'center', md: 'flex-start' }} spacing={{ base: 2, md: 8 }}>
            <Text fontWeight="600" fontSize={{base:"md",md:"lg"}}>Quick Links</Text>
            <Link href="/">Home</Link>
            <Link href="#">About</Link>
            <Link href="#">Contact</Link>
            <Link href="#">Privacy Policy</Link>
          </Stack>
          
          <Stack align={{ base: 'center', md: 'flex-start' }} spacing={{ base: 2, md: 8 }}>
            <Text fontWeight="600" fontSize={{base:"md",md:"lg"}}>Connect</Text>
            <Flex gap={4}>
              <Link href="#" aria-label="Twitter">
                <FaTwitter size={20} />
              </Link>
              <Link href="https://github.com/udhai-20" aria-label="GitHub">
                <FaGithub size={20} />
              </Link>
              <Link href="https://www.linkedin.com/in/udhayaprakash-1898upa/" aria-label="LinkedIn">
                <FaLinkedin size={20} />
              </Link>
            </Flex>
          </Stack>
        </Flex>
        
        <Text pt={{md:6,base:2}} fontSize="sm" textAlign="center">
          © {new Date().getFullYear()} BlogGen AI. All rights reserved.
        </Text>
      </Container>
    </Box>
  )
}

export default Footer