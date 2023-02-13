import { replaceWithBr } from '../../assets/scripts/helpers/helpers';
import style from './TextContent.module.scss'

type TextContent = {
    heading: string;
    children: string | unknown;
};

const TextContent = ({ heading, children}: TextContent) => {
    return (
    <div className={ style.textContent }>
      <h2 className={ style.heading }>
        { heading }
      </h2>
      <p 
        className={ style.description }
        dangerouslySetInnerHTML={{__html: setText(children)}}
      />
    </div>
  )
};

const setText = (text: string | unknown) => {
  if (typeof text === 'string') {
    return replaceWithBr(text)
  }

  return ''
}

export default TextContent;
