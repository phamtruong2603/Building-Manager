import React, { useContext, useEffect } from 'react';
import './PostCss.css';
import { ProviderPosts } from '../../contextAPI/ProviderPost';
import CreatePost from '../createPost/CreatePost';
import PostList from './PostList';
import { callApi } from '../../../API/callAPI';

const Post = () => {
    const { posts, page, setPosts } = useContext(ProviderPosts);
    console.log(11111)
    useEffect(() => {
        (async () => {
            const data = await callApi('post/getAllPost', 'POST', {
                take: 5,
                page: page.current
            })
            console.log(data)
            setPosts(data)
        })()
    }, [])

    const view = async () => {
        console.log(55)
        page.current++;
        const data = await callApi('post/getAllPost', 'POST', {
            take: 5,
            page: page.current
        })
        console.log(data)
        setPosts([
            ...posts,
            ...data
        ])
    }
    return (
        <div className='mainPost'>
            <CreatePost />
            {posts?.map((post, index) => {
                return (
                    <div key={index}>
                        <PostList props={post} />
                    </div>
                )
            })}
            <div className='button viewPost' onClick={view}>
                view
            </div>
        </div>
    )
}

export default Post;
