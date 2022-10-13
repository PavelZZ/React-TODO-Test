import React, {useEffect, useState} from "react";
import './styles/App.css'
import PostList from "./Components/PostList";
import Form from "./Components/Form";
import PostFilter from "./Components/PostFilter";
import MyModal from "./Components/UI/MyModal/MyModal";
import MyButton from "./Components/UI/button/MyButton";
import {usePost} from "./Components/hooks/usePost";
import {useFetching} from "./Components/hooks/useFetching";
import PostService from "./API/PostService";
import Loader from "./Components/UI/Loader/Loader";

function App() {
    const [posts, setPosts] = useState([
        {id: 1, title: 'JavaSrcipt', body: "Description first"},
        {id: 2, title: 'JavaSrcipt 2', body: "abc"},
        {id: 3, title: 'Python 3', body: "Description third"}
    ]);
    const [filter, setFilter] = useState({sort: '', query: ''});
    const [modal, setModal] = useState(false);
    const createPost = (newPost) => {
        setPosts([...posts, newPost]);
        setModal(false);
    }
    const [fetchPosts, isPostLoading, postError] = useFetching(async () => {
        const posts = await PostService.getALl();
        setPosts(posts);
    });

    useEffect(() => {
        fetchPosts();
    }, []);

    // function fetchPosts() {
    //     setPostsLoading(true);
    //     PostService.getALl().then(res => {
    //         setPosts(res);
    //         setPostsLoading(false);
    //     });
    // }

    const removePost = (deletedPost) => {
        setPosts(posts.filter((item) => item.id !== deletedPost.id));
    }
    const searchedAndSortedPosts = usePost(posts, filter.sort, filter.query);
    return (
        <div className="App">
            <button onClick={fetchPosts}>
                FETCH POSTS
            </button>
            <MyButton onClick={() => setModal(true)}>
                Создать новый пост
            </MyButton>
            <MyModal visible={modal} setVisible={setModal}>
                <Form create={createPost}/>
            </MyModal>
            <PostFilter filter={filter} setFilter={setFilter}/>
            {postError && <h1> Произошла ошибка ${postError}</h1>}
            {isPostLoading
                ? <div style={{display: 'flex', justifyContent: 'center', marginTop: 50}}><Loader/></div>
                : <PostList posts={searchedAndSortedPosts} remove={removePost}/>
            }
        </div>
    );
}

export default App;
