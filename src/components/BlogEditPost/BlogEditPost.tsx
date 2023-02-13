import { BlogPostType } from "../../assets/scripts/helpers/types";
import BlogAddPost from "../BlogAddPost/BlogAddPost";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { putPost } from "../../assets/scripts/helpers/apiCalls";

type BlogEditPostType = {
    onClose: () => void,
    formInitValues: BlogPostType
};

const BlogEditPost = ({onClose, formInitValues}: BlogEditPostType) => {
    const queryClient = useQueryClient()
    const postId = formInitValues.id

    const mutation = useMutation<BlogPostType, Error>({
        mutationFn: (editedPost) => putPost(editedPost),
        onSuccess: () => {
          queryClient.invalidateQueries({ 
            queryKey: ["article", postId],
          })
          onClose()
        }
    })

    const editPost = (formData: BlogPostType) => {
        mutation.mutate({ ...formData })
    }
    
  return (
    <BlogAddPost 
        formInitValues={ formInitValues }
        onClose={ onClose }
        onSubmit={ editPost }
    />
  )
};

export default BlogEditPost;
