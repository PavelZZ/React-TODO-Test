import React, {useState} from 'react';
import MyInput from "./UI/input/MyInput";
import MyButton from "./UI/button/MyButton";
import '../styles/App.css'

const Form = ({create}) => {

    const [post, setPost] = useState({title:'', body:''});
    const addNewPost = (event) => {
        event.preventDefault();
        const newPost ={
            ...post,
            id: Date.now()
        }
        create(newPost);
        setPost({title: '', body: ''});
    }
    return (
        <form className="flexbox-column">
            <MyInput
                value={post.title}
                onChange={(event) => {
                    setPost({...post, title: event.target.value})
                }}
                type="text"
                placeholder="Название поста"/>
            <MyInput
                type="text"
                value={post.body}
                onChange={(event) => {
                    setPost({...post, body: event.target.value})
                }}
                placeholder="Описание поста"
            />
            <MyButton onClick={addNewPost}> Создать пост </MyButton>
        </form>
    );
};

export default Form;