import { Link} from 'react-router-dom'
import { BlogPost } from '../../assets/scripts/helpers/types';
import style from './CardBlog.module.scss'

const CardBlog = ({ id, title, author, image, content }: BlogPost) => {
  return (
    <div className={ style.card }>
        <div className={ style.imageWrap }>
            <Link to={ `/blog/${ id }` }>
                <img src={ image } alt={ title } className={ style.image } />
            </Link>
        </div>
        <div className={ style.content }>
            <div className={ style.header }>
                <h3 className={ style.heading }>
                    <Link to={ `/blog/${ id }` }>
                        { title }
                    </Link>
                </h3>
                <span className={ style.subHeading }>{ author }</span>
            </div>
            <p className={ style.text }>
                { content }
            </p>
            <div className={ style.footer }>
                <Link to={ `/blog/${ id }` }>
                    Read more
                </Link>
            </div>
        </div>
    </div>
  )
};

export default CardBlog;