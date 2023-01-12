import React, { useContext, useState } from 'react';
import './CreatePostCss.css';

import { HiOutlinePhotograph } from "react-icons/hi";
import { MdOutlineSlowMotionVideo } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { CgCalendarDates } from "react-icons/cg";
import { RiCloseFill } from "react-icons/ri";

// import { createPost } from '../../auth/post';
import { callApi } from '../../../API/callAPI';
import { ProviderPosts } from '../../contextAPI/ProviderPost';
import { useSelector } from 'react-redux';
import { userSlector } from '../../../redux/reducer/userReducer';

const CreatePost = () => {
    const [post, setPost] = useState({});
    const [result, setResult] = useState("");
    const [file, setFile] = useState()
    const { posts, setPosts } = useContext(ProviderPosts)
    const user = useSelector(userSlector);
    let avatar = user?.data?.avatar
        ? user.data.avatar
        : 'https://thuvienplus.com/themes/cynoebook/public/images/default-user-image.png'
    const setPrams = (e) => {
        let name = e.target.name
        let value = e.target.value
        setPost({
            ...post,
            [name]: value
        })
    }
    const uploader = (e) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            setResult(e.target.result);
        };
        setFile(e.target.files[0])
        reader.readAsDataURL(e.target.files[0]);
    }
    const submit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('content', post.content)
        formData.append('postImg', file)
        // let data = await createPost(formData);
        let data = await callApi('/post/createPost', 'POST', formData)
        setPosts([
            data.data,
            ...posts
        ])
        setPost({})
        setResult('')
    }
    return (
        <div className='formCreatePost'>
            <div className='headerCreateFormPost'>
                <div className='createPostAvatar'>
                    <img src={avatar} alt="" />
                </div>
            </div>
            <div className='createContentPost'>
                <input
                    type="text"
                    name='content'
                    value={post.content || ''}
                    placeholder='What is happening???'
                    onChange={setPrams}
                />
                <div className='importFilePost'>
                    <div className='createImgPost' style={{ color: "var(--photo)" }}>
                        <input
                            type="file"
                            id='browseImg'
                            onChange={(e) => uploader(e)}
                            name='postImg'
                        />
                        <label htmlFor="browseImg">
                            <HiOutlinePhotograph />Photo
                        </label>
                    </div>
                    <div style={{ color: "var(--video)" }}>
                        <label htmlFor="">
                            <MdOutlineSlowMotionVideo />video
                        </label>

                    </div>
                    <div style={{ color: "var(--location)" }}>
                        <label htmlFor="">
                            <IoLocationOutline />Location
                        </label>
                    </div>
                    <div style={{ color: "var(--shedule)" }}>
                        <label htmlFor="">
                            <CgCalendarDates />Shedule
                        </label>
                    </div>
                    <button className='button if-button' onClick={submit}>Share</button>
                </div>
                <div className='dataFile'>

                    {result &&
                        <div className='previewImg'>
                            <RiCloseFill onClick={() => setResult('')} />
                            <img src={result} alt="" />
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default CreatePost;
