import React from 'react';
import PostItem from "./PostItem";
import '../styles/App.css'
const PostList = ({posts, title, remove}) => {
    return (
        <div className="postList">
            <h1 style={{textAlign: 'center'}}>
                {title}
            </h1>
            {posts.map((post, postIndex)=>
                <PostItem number={postIndex + 1} post={post} key={post.id} remove={remove}/>
            )}
        </div>
    );
};

export default PostList;