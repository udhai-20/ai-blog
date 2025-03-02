import { Routes, Route } from 'react-router-dom'
import React from "react"
import Layout from './components/Layout'
import Home from './pages/Home'
import BlogPost from './pages/BlogPost'
import { BlogProvider } from './context/BlogContext'

function App() {
  return (
    <BlogProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/post/:id" element={<BlogPost />} />
        </Route>
      </Routes>
    </BlogProvider>
  )
}

export default App