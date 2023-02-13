import { useState } from 'react';
import { commentFormData } from '../../assets/scripts/helpers/types';
import style from './CommentsForm.module.scss'


type CommentsForm = {
    onSubmit: (formData: commentFormData) => void;
};

const formInitData = {
    author: '',
    body: ''
}

const CommentsForm = ({ onSubmit }: CommentsForm) => {
    const [formData, setFormData] = useState(formInitData)

    const submitHandler = () => {
        onSubmit(formData)
        setFormData(formInitData)
    }

  return (
    <form 
        className={ style.form }
        onSubmit={
            (event) => {
                event.preventDefault()
                submitHandler()
            }
        }
    >
        <input 
            type="text" 
            className={ style.input }
            placeholder='Your name ...'
            required={ true }
            value={ formData.author }
            onChange={ (e) => {
            setFormData({ ...formData, author: e.currentTarget.value })
          }}
        />
        <textarea
            className={ style.textarea }
            placeholder='Your comment ...'
            required={true}
            value={ formData.body }
            onChange={(e) => {
            setFormData({...formData, body: e.currentTarget.value})
          }}
        ></textarea>
        <button
            className={ style.button }
        >
            Submit
        </button>
    </form>
  )
};

export default CommentsForm;
