import style from './BlogPost.module.scss'
import { BlogPostType } from '../../assets/scripts/helpers/types';

type BlogPostPageType = BlogPostType & {
    handleEdit: (post: BlogPostType) => void
}

const BlogPost = ({ id, title, author, image, content, handleEdit }: BlogPostPageType) => {
  return (
    <div key={ id } className={ style.post }>
        <div className={ style.imageWrap }>
            <img src={ image } alt={ title } className={ style.image } />
        </div>
        <div className={ style.header }>
            <div className={ style.text }>
                <h2 className={ style.heading }>
                    { title }
                </h2>
                <span className={ style.subheading }>
                    { author }
                </span>
            </div>
            <button
                className={ style.edit }
                onClick={() => {
                    handleEdit({ id, title, author, image, content})
                }}
            ></button>
        </div>

        <div className={ style.content }>
            { content }
        </div>
    </div>
  )
};

export default BlogPost;
