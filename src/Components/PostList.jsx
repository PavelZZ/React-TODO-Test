import React from 'react';
import PostItem from "./PostItem";
import '../styles/App.css'
import {CSSTransition, TransitionGroup} from "react-transition-group";

const PostList = ({posts, title, remove}) => {
    if (!posts.length) {
        return (
            <h1 style={{textAlign: "center"}}>
                Посты не найдены
            </h1>
        )
    }
    return (
        <div className="postList">
            <h1 style={{textAlign: 'center'}}>
                {title}
            </h1>
            <TransitionGroup>
                {posts.map((post, postIndex) =>
                    <CSSTransition key={post.id} timeout={1000} classNames="post">
                        <PostItem id={postIndex + 1} post={post} remove={remove}/>
                    </CSSTransition>
                )}
            </TransitionGroup>
        </div>
    );
};
PostList.defaultProps = {
    title: "Список постов про JS"
}

export default PostList;