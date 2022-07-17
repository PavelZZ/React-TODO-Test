import React, {useMemo, useState} from "react";
import './styles/App.css'
import PostList from "./Components/PostList";
import Form from "./Components/Form";
import MySelect from "./Components/UI/select/MySelect";
import MyInput from "./Components/UI/input/MyInput";

function App() {
    const [posts, setPosts] = useState([
        {id: 1, title: "аа", body: "аукып 2"},
        {id: 2, title: "ббб", body: "аквпвпк"},
        {id: 3, title: "вв", body: "тест 2"},
    ])

    const [selectedSort, setSelectedSort] = useState("");
    const [searchQuery, setSeacrhQuery] = useState("");
    const sortedPosts = useMemo(() => {
        console.log("Use memo in sorted posts has worked");
        if (selectedSort) {
            return [...posts].sort( (firstItem, secondItem) =>
                firstItem[selectedSort].localeCompare(secondItem[selectedSort]));
        } else {
            return posts;
        }
    }, [selectedSort, posts]);

    const sortedAndSearchedPosts = useMemo(()=>{
        return sortedPosts.filter((post)=>{
            return post.title.includes(searchQuery.toLowerCase());
        });
    },[searchQuery, sortedPosts]);

    function createPost(newPost) {
        setPosts([...posts, newPost]);
    }

    function removePost(post) {
        setPosts(posts.filter((item) => post.id !== item.id))
    }

    const sortPosts = (sort) => {
        setSelectedSort(sort);
        let sortedArr = [...posts].sort((firstItem, secondItem) =>
            firstItem[sort].localeCompare(secondItem[sort]));
        setPosts(sortedArr);
    }

    return (
        <div className="App">
            <Form create={createPost}/>
            <hr style={{margin: "15px 0"}}/>
            <div>
                <MyInput
                    value={searchQuery}
                    onChange={event => {
                        setSeacrhQuery(event.target.value)
                    }}
                />
                <MySelect
                    value={selectedSort}
                    onChange={sortPosts}
                    defaultValue="Сортировка"
                    option={[
                        {value: 'title', name: 'По заголовку'},
                        {value: 'body', name: 'По описанию'}
                    ]}
                />
            </div>
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
