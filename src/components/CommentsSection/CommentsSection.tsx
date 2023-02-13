import BlogComment from "../BlogComment/BlogComment";
import CommentsForm from "../CommentsForm/CommentsForm";
import style from './CommentsSection.module.scss'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { postComment, getComments } from "../../assets/scripts/helpers/apiCalls";
import { BlogPostCommentType, commentFormData } from "../../assets/scripts/helpers/types";

export type CommentsSection = {};

const CommentsSection = ({ postId }: { postId: string }) => {
  const queryClient = useQueryClient()

    const {isLoading, isError, error, data} = useQuery<BlogPostCommentType, Error>({
        queryKey: ['comments', postId],
        queryFn: () => getComments(postId)
    });

    const mutation = useMutation<BlogPostCommentType, Error, Omit<BlogPostCommentType, 'id'>>({
        mutationFn: (postedComment) => postComment(postedComment),
        // onError: () => {
        // },
        onSuccess: () => {
          queryClient.invalidateQueries({ 
            queryKey: ["comments", postId]
          })
        }
    })

    const addComment = (formData: commentFormData) => {
        mutation.mutate({ ...formData, postId })
    }


    if (isLoading || mutation.isLoading) {
        return <h3>Loading comments ...</h3>;
    }
    if (isError || mutation.isError) {
        return <h3>Request error!</h3>;
    }

  return (
    <div className={ style.commentsSection }>
        <h3 className={ style.heading }>
            Add your comment
        </h3>
        <CommentsForm 
            onSubmit={ addComment }
        />
        <div className={ style.comments }>
            <h3 className={ style.heading }>
            Comments
            </h3>
            { data.length ? renderComments(data) : <p>There are no comments yet ...</p> }
        </div>
    </div>
  )
};

const renderComments = (comments: BlogPostCommentType[]) => {
    return (
      comments.map(({ id, author, body }) => (
        <BlogComment
          key={ id }
          author={ author }
          body={ body }
        />
      ))
    )
  }

export default CommentsSection;
