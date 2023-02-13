export type BlogPostType = {
    id: number;
    title: string;
    author: string;
    image: string;
    content: string;
};

export type BlogPostCommentType = {
    id: number;
    author: string;
    body: string;
    postId: number;
}

export type commentFormData = {
    author: string;
    body: string;
}

export type commentPostData = commentFormData & {
    postId: string;
}