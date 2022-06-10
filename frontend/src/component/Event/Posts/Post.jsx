import React, { useContext } from 'react';
import './PostCss.css';
import { ProviderPosts } from '../../contextAPI/ProviderPost';
import CreatePost from '../createPost/CreatePost';
import PostList from './PostList';
import { getAllPost } from '../../auth/post';

const Post = () => {
    const { posts, page, setPosts } = useContext(ProviderPosts);

    // xem thêm bài post. mỗi lần chỉ đc số bài quy định trước
    const view = async () => {
        page.current++;
        let data = await getAllPost(page.current)
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
            <div onClick={view}>
                view
            </div>
        </div>
    )
}

export default Post;
