import {
  Box,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  useColorMode,
  useColorModeValue,
  Container,
  IconButton,
  useDisclosure,
  Stack,
  HStack,
  Collapse,
  InputRightElement
} from '@chakra-ui/react';
import { SearchIcon, HamburgerIcon, CloseIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { useBlog } from '../context/BlogContext';
import React from "react";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { searchTerm, setSearchTerm } = useBlog();
  const { isOpen, onToggle } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (location.pathname.startsWith("/post/")) {
      navigate("/");
    }
  };

  // Dynamic Colors for Dark & Light Mode
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const inputBg = useColorModeValue('gray.50', 'gray.700');

  return (
    <Box
      as="nav"
      bg={bgColor}
      borderBottom="1px"
      borderColor={borderColor}
      position="sticky"
      top={0}
      zIndex={10}
      boxShadow="sm"
    >
      <Container maxW="container.xl" py={4}>
        <Flex align="center" justify="space-between" wrap="wrap">
          {/* Logo */}
          <Flex align="center">
            <Heading
              as={RouterLink}
              to="/"
              size={{ base: "md", md: "lg" }}
              fontWeight="bold"
              color="brand.600"
              _hover={{ textDecoration: 'none', color: 'brand.700' }}
            >
              BlogGen AI
            </Heading>
          </Flex>

          {/* Search Bar (Desktop) */}
          <HStack spacing={4} display={{ base: 'none', md: 'flex' }}>
            <InputGroup maxW="400px">
              <InputLeftElement pointerEvents="none">
                <SearchIcon color="gray.400" />
              </InputLeftElement>
              <Input
                placeholder="Search blog posts..."
                value={searchTerm}
                onChange={handleSearch}
                borderRadius="full"
                bg={inputBg}
                _focus={{
                  borderColor: 'brand.400',
                  boxShadow: '0 0 0 1px var(--chakra-colors-brand-400)'
                }}
              />
              {searchTerm && (
                <InputRightElement
                  cursor="pointer"
                  onClick={() => setSearchTerm("")}
                  color="gray.400"
                  _hover={{ color: "gray.600" }}
                >
                  <CloseIcon boxSize={3} />
                </InputRightElement>
              )}
            </InputGroup>
          </HStack>

          {/* Dark Mode Toggle & Mobile Menu Button */}
          <HStack spacing={2}>
            {/* Dark Mode Toggle Button */}
            <IconButton
              icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              onClick={toggleColorMode}
              variant="ghost"
              aria-label="Toggle Dark Mode"
            />

            {/* Mobile Menu Button */}
            <IconButton
              display={{ base: 'flex', md: 'none' }}
              onClick={onToggle}
              icon={isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />}
              variant="ghost"
              aria-label="Toggle Navigation"
            />
          </HStack>
        </Flex>

        {/* Mobile Search Bar */}
        <Collapse in={isOpen} animateOpacity>
          <Stack mt={4} display={{ md: 'none' }}>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <SearchIcon color="gray.400" />
              </InputLeftElement>
              <Input
                placeholder="Search blog posts..."
                value={searchTerm}
                onChange={handleSearch}
                borderRadius="full"
                bg={inputBg}
              />
              {searchTerm && (
                <InputRightElement
                  cursor="pointer"
                  onClick={() => setSearchTerm("")}
                  color="gray.400"
                  _hover={{ color: "gray.600" }}
                >
                  <CloseIcon boxSize={3} />
                </InputRightElement>
              )}
            </InputGroup>
          </Stack>
        </Collapse>
      </Container>
    </Box>
  );
};

export default Navbar;
