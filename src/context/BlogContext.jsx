import React, { createContext, useContext, useState, useEffect } from 'react'
import {  generateBlogPost, getAllBlogPosts } from '../api/blogApi'
import { useToast } from '@chakra-ui/react'

const BlogContext = createContext()

export const useBlog = () => useContext(BlogContext)

export const BlogProvider = ({ children }) => {
  const toast = useToast();
  const [blogPosts, setBlogPosts] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  
  useEffect(() => {
    // mounting initial blog posts//    

    getAllBlogs();
  }, [])

  const getAllBlogs = async () => {
    setInitialLoading(true)
    try {
      const posts = await getAllBlogPosts()
      setBlogPosts(posts)
    } catch (error) {
      toast({
        title: 'Some Technical issue in Fetching Blog Try Again Later',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setInitialLoading(false)
    }
  }
  
  const filteredPosts = blogPosts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.topic.toLowerCase().includes(searchTerm.toLowerCase())
  );  
  const createPost = async (topic) => {
    setIsLoading(true)
    try {
      const newPost = await generateBlogPost(topic)
      setBlogPosts(prev => [newPost, ...prev])
      return newPost.id
    } catch (error) {
      toast({
        title: 'Some Technical issue in Creating Blog Try Again Later',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
     throw error
    } finally {
      setIsLoading(false)
    }
  }
  
  const deletePost = (id) => {
    setBlogPosts(prev => prev.filter(post => post.id !== id))
  }
  
  const getPostById = (id) => {
    return blogPosts.find(post => post.id === id)
  }
  
  const value = {
    blogPosts: filteredPosts,
    isLoading,
    searchTerm,
    setSearchTerm,
    createPost,
    deletePost,
    getPostById,
    initialLoading
  }
  
  return (
    <BlogContext.Provider value={value}>
      {children}
    </BlogContext.Provider>
  )
}