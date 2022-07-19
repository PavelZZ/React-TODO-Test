import React from 'react';
import MyInput from "./UI/input/MyInput";
import MySelect from "./UI/select/MySelect";

const PostFilter = ({filter,setFilter}) => {
    return (
        <div>
            <MyInput
                value={filter.query}
                onChange={event => {
                    setFilter({...filter, query: event.target.value})
                }}
            />
            <MySelect
                value={filter.sort}
                onChange={(selectedSort)=>{ setFilter({...filter, sort: selectedSort})}}
                defaultValue="Сортировка"
                option={[
                    {value: 'title', name: 'По заголовку'},
                    {value: 'body', name: 'По описанию'}
                ]}
            />
        </div>
    );
};

export default PostFilter;