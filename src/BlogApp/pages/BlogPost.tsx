import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import BlogPost from '../../components/BlogPost/BlogPost';
import { getPost } from '../../assets/scripts/helpers/apiCalls';
import CommentsSection from '../../components/CommentsSection/CommentsSection';
import { BlogPostType } from '../../assets/scripts/helpers/types';

type EditPostProp = {
  editModal: (post: BlogPostType) => void
}

const BlogPostPage = ({ editModal }: EditPostProp) => {
  const { postId } = useParams()

  if (!postId) {
    return <h3>Occurred some error!</h3>
  }

  const { isLoading, isError, data } = useQuery({
    queryKey: ['article', postId],
    queryFn: () => getPost(postId)
  });

  if (isLoading) {
    return <h3>Loading article ...</h3>;
  }
  if (isError) {
    return <h3>Request error!</h3>;
  }

  const handleEdit = (post: BlogPostType) => {
    editModal(post)
  }

  const { id, title, author, image, content } = data

  return (
    <div className='post-wrap'>
      <BlogPost 
        key={ id }
        id={ id }
        title={ title }
        author={ author }
        image={ image }
        content={ content }
        handleEdit={ handleEdit }
      />
      <CommentsSection postId={ postId } />
    </div>
  )
};



export default BlogPostPage;
