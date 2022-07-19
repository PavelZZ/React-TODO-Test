import React, {useMemo, useState} from "react";
import './styles/App.css'
import PostList from "./Components/PostList";
import Form from "./Components/Form";
import PostFilter from "./Components/PostFilter";

function App() {
    const [posts, setPosts] = useState([
        {id: 1, title: "аа", body: "аукып 2"},
        {id: 2, title: "ббб", body: "аквпвпк"},
        {id: 3, title: "вв", body: "тест 2"},
    ])

    const [filter, setFilter] = useState({sort: '', query: ''});
    const sortedPosts = useMemo(() => {
        console.log("Use memo in sorted posts has worked");
        if (filter.sort) {
            return [...posts].sort( (firstItem, secondItem) =>
                firstItem[filter.sort].localeCompare(secondItem[filter.sort]));
        } else {
            return posts;
        }
    }, [filter.sort, posts]);

    const sortedAndSearchedPosts = useMemo(()=>{
        console.log("Searched and sorted posts has worked");
        return sortedPosts.filter((post)=>{
            return post.title.toLowerCase().includes(filter.query.toLowerCase());
        });
    },[filter.query, sortedPosts]);

    function createPost(newPost) {
        setPosts([...posts, newPost]);
    }

    function removePost(post) {
        setPosts(posts.filter((item) => post.id !== item.id))
    }
    return (
        <div className="App">
            <Form create={createPost}/>
            <hr style={{margin: "15px 0"}}/>
            <PostFilter filter={filter} setFilter={setFilter}/>
            {sortedAndSearchedPosts.length !== 0
                ? <PostList posts={sortedAndSearchedPosts} title="Посты про JS" remove={removePost}/>
                : <h1 style={{textAlign: "center"}}>
                    Посты не найдены
                </h1>
            }
        </div>
    );
}

export default App;
