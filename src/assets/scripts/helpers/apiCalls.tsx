import axios from "axios"
import { BlogPostType, BlogPostCommentType, commentPostData } from "./types";

// const baseURL = 'http://localhost:1337'
const baseURL = 'http://localhost:3004'

const host = axios.create({
    baseURL
});

export const getAllPosts = async () => {
    const { data } = await host<BlogPostType[]>('/posts?_sort=id&_order=desc');
    return data;
}

export const getPost = async (id: string) => {
    const { data } = await host<BlogPostType>(`/posts/${ id }`);
    return data;
}

export const getComments = async (id: string) => {
    const { data } = await host<BlogPostCommentType[]>(`/posts/${ id }/comments`);
    return data;
}

export const postComment = async (comment: commentPostData) => {
    const { data } = await host.post(`/comments`, comment);
    return data;
}

export const addPost = async (article: Omit<BlogPostType, 'id'>) => {
    const { data } = await host.post(`/posts`, article)
    return data
}

export const putPost = async ({id, title, content, image, author}: BlogPostType) => {
    const { data } = await host.put(`/posts/${ id }`, { 
        title, content, image, author
    })
    return data
}