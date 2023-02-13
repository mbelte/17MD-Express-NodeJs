import { Routes, Route, Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar'
import HomePage from './pages/Home'
import BlogIndexPage from './pages/BlogIndex'
import BlogPostPage from './pages/BlogPost'
import NotFoundPage from './pages/NotFound'
import BlogAddPost from '../components/BlogAddPost/BlogAddPost'
import { useState } from 'react'
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BlogPostType } from '../assets/scripts/helpers/types'
import { addPost } from '../assets/scripts/helpers/apiCalls'
import BlogEditPost from '../components/BlogEditPost/BlogEditPost'


const BlogApp = () => {
  const [modal, setModal] = useState(false)
  const [editable, setEditable] = useState(0)
  const [editContent, setEditContent] = useState({})
  const queryClient = useQueryClient()

  const mutation = useMutation<BlogPostType, Error, Omit<BlogPostType, 'id'>>({
    mutationFn: (newPost) => addPost(newPost),
    onError: (error) => {
      console.log(error)
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["blogPosts"]);
    }
  })

  const addNewPost = (formData: FormData) => {
    mutation.mutate({...formData})
    setModal(false)
  }

  const closeModal = () => {
    setModal(false)
    setEditable(0)
    setEditContent({})
  }

  return (
    <>
        <Navbar 
          onClick={() => {
            setModal(true)
          }}
        />
        <div className="content">
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="blog">
                    <Route index element={<BlogIndexPage />} />
                    <Route 
                      path=":postId" 
                      element={<BlogPostPage 
                        editModal={(post) => {
                          setEditable(post.id)
                          setEditContent(post)
                        }}
                      />} />
                </Route>
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </div>
        {
          modal && (
            <BlogAddPost 
              onSubmit={ addNewPost }
              onClose={() => {
                closeModal()
              }}
            />
          )
        }
        {          
          editable && (
            <BlogEditPost 
              onClose={() => {
                closeModal()
              }}
              formInitValues={ editContent }
            />
          )
        }
    </>
  )
};

export default BlogApp;
