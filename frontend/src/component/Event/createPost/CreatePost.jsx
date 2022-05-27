import React, { useContext, useState } from 'react';
import './CreatePostCss.css';
import { createPost } from '../../auth/post';
import { ProviderPosts } from '../../contextAPI/ProviderPost';
import { Providers } from '../../contextAPI/Provider';

const CreatePost = () => {
    const [post, setPost] = useState({});
    const [result, setResult] = useState("");
    const [file, setFile] = useState()
    const { posts, setPosts } = useContext(ProviderPosts)
    const { user } = useContext(Providers)
    const phoneNumber = user?.data?.phoneNumber

    // lấy dữ liệu từ form tạo mới bài post
    const setPrams = (e) => {
        let name = e.target.name
        let value = e.target.value
        setPost({
            ...post,
            [name]: value
        })
    }

    // xem ảnh trước khi post. chưa gửi lên server
    const uploader = (e) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            setResult(e.target.result);
        };
        setFile(e.target.files[0])
        reader.readAsDataURL(e.target.files[0]);
    }

    // sự kiện tạo mới bài post
    const submit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('content', post.content)
        formData.append('postImg', file)
        createPost(formData);
        setPosts([
            {
                content: post.content,
                createAt: Date(),
                postID: null,
                likes: [],
                user: { phoneNumber },
                title: post.content,
                updateAt: ''
            },
            ...posts
        ])
        setPost({})
        setResult('')
    }

    return (
        <div className='createPostMain'>
            <div className='formCreatePost'>
                <div className='headerCreateFormPost'>
                    <h2>Tạo bài viết</h2>
                    <div className='headerCreateFormPostUser'>
                        <div className='headerCreateFormPostUserAvarta'>
                            <img src="https://thuvienplus.com/themes/cynoebook/public/images/default-user-image.png" alt="" />
                        </div>
                        <div className='headerCreateFormPostUser_' >
                            <p>user</p>
                            <select className='Private_'>
                                <option>Riêng tư</option>
                                <option>Công khai</option>
                            </select>
                        </div>
                    </div>
                </div>
                <form method='POST' onSubmit={submit}>
                    <div className='createContentPost'>
                        <textarea
                            type="text"
                            name='content'
                            value={post.content || ''}
                            placeholder='Nội dung'
                            onChange={setPrams}
                        />
                    </div>
                    <div className='createImgPost'>
                        <input
                            type="file"
                            id='browseImg'
                            onChange={(e) => uploader(e)}
                            name='postImg'
                        />
                        <label htmlFor="browseImg">browse</label>
                        {result && <img src={result} alt="" width='200px' height='200px' />}
                    </div>
                    <div className='createBTPost'>
                        <button>Đăng</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreatePost;
