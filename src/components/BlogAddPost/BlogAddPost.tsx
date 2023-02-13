import { useState } from 'react';
import style from './BlogAddPost.module.scss'
import { BlogPostType } from '../../assets/scripts/helpers/types';

type FormData = Omit<BlogPostType, 'id'>

type BlogAddPost = {
    onSubmit: (formData: FormData) => void
    onClose: () => void,
    formInitValues?: FormData
};

const formInitData = {
    author: '',
    content: '',
    image: '',
    title: ''
}

const BlogAddPost = ({ onClose, formInitValues, onSubmit }: BlogAddPost) => {
    const [formData, setFormData] = useState(formInitValues ? formInitValues : formInitData)

    const submitHandler = () => {
        onSubmit(formData)
        setFormData(formInitData)
    }
    
  return (
    <div 
      className={ style.modal }
    >
      <form 
        className={ style.form }
        onSubmit={(event) => {
          event.preventDefault()
          submitHandler()
        }}
      >
        <input 
          type="text" 
          placeholder='Title ...'
          className={ style.input } 
          required={ true } 
          value={ formData.title}
          onChange={(e) => {
            setFormData({...formData, title: e.currentTarget.value})
          }}
        />
        <textarea
          placeholder='Article contents ...'
          className={ style.textarea }
          required={ true }
          value={ formData.content}
          onChange={(e) => {
            setFormData({...formData, content: e.currentTarget.value})
          }}
        ></textarea>
        <input 
          type='text' 
          placeholder='Image link ...'
          className={ style.input }
          required={ true }
          value={ formData.image}
          onChange={(e) => {
            setFormData({...formData, image: e.currentTarget.value})
          }}
        />
        <input 
          type='text'
          placeholder='Author name ...'
          className={ style.input }
          required={ true }
          value={ formData.author}
          onChange={(e) => {
            setFormData({...formData, author: e.currentTarget.value})
          }}
        />
        <button
          className={ style.button }
        >
          Publish
        </button>
        <button 
          className={ style.close }
          onClick={ onClose }
        >x</button>
      </form>
    </div>
  )
};

export default BlogAddPost;
