import { Box } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import React from"react"

const Layout = () => {
  return (
    <Box minH="100vh" display="flex" flexDirection="column">
      <Navbar />
      <Box flex="1" as="main" py={{md:8,sm:2}} px={{md:4,sm:2}}>
        <Outlet />
      </Box>
      <Footer />
    </Box>
  )
}

export default Layout