import style from './BlogComment.module.scss'
import { BlogPostCommentType } from '../../assets/scripts/helpers/types';


const BlogComment = ({ author, body }: Omit<BlogPostCommentType, 'id' | 'postId'>) => {
  return (
    <div className={ style.comment }>
        <span className={ style.author }>
            { author }
        </span>
        <p className={ style.text }>
            { body }
        </p>
    </div>
  )
};

export default BlogComment;
