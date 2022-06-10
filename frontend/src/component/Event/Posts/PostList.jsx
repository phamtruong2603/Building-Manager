import React, { useContext, useEffect, useState } from 'react';
// import { Providers } from '../../contextAPI/Provider';
import { AiOutlineLike, AiOutlineComment } from "react-icons/ai";
import CommentPost from './CommentPost/CommentPost';
import { Like } from '../../auth/likeAndComment';
import { deletePost, postingTime } from '../../auth/post';
import { BsThreeDotsVertical } from "react-icons/bs";
import { ProviderPosts } from '../../contextAPI/ProviderPost';
import { getLike } from '../../auth/likeAndComment';
import { Providers } from '../../contextAPI/Provider';
import { ProviderSockets } from '../../contextAPI/ProviderSocket'

const PostList = ({ props }) => {
    const { setPosts } = useContext(ProviderPosts);
    const { socket } = useContext(ProviderSockets);

    const { user } = useContext(Providers);
    const [hiden, setHiden] = useState(false)
    const [comment, setComment] = useState(false)
    const [likes, setLikes] = useState([])
    let day = postingTime(new Date(props.createAt));
    let avatar = props.user.avatar
        ? props.user.avatar
        : 'https://thuvienplus.com/themes/cynoebook/public/images/default-user-image.png'

    //like hoặc unlike bài post
    const likeCLick = async (postID) => {

        socket.emit('notificationClientPush', {
            content: `${user.data.fullName} đã like`,
            postID,
            userID: props.user.userID
        })
        // await Like({
        //     postID,
        // });

        //lấy lại số like sau khi like hoặc unlike
        let like = await getLike(postID)
        setLikes(like)
    }
    const deletePostHinden = () => {
        setHiden(!hiden)
    }
    const hidenComment = () => {
        setComment(!comment)
    }

    // xóa bài post
    const deletePosts = (postID) => {
        setPosts((posts) => {
            return posts.filter(post => {
                return post.postID !== postID
            })
        })
        deletePost(postID)
    }

    //lấy số like của bài post khi load trang lần đầu
    useEffect(() => {
        (async function () {
            setLikes(await getLike(props.postID))
        })()
    }, [props.postID])

    return (
        <div className='post'>
            <div className='postUser'>
                <div className='postAvarta'>
                    <img src={avatar} alt="" />
                </div>
                <div className='postName'>{props.user.phoneNumber}</div>
            </div>
            <div className='deletePost'>
                <div>
                    <BsThreeDotsVertical onClick={() => deletePostHinden()} />
                    <ul className={!hiden ? 'hiden' : ''}>
                        <li onClick={() => deletePosts(props.postID)}>xóa bài viết</li>
                    </ul>
                </div>
            </div>
            <p className='day'>{day}</p>
            <p className='postContent'>{props.content}</p>
            {props.postImg ?
                <div className='postImg'>
                    <img src={props.postImg} alt="" />
                </div> :
                <span></span>
            }

            <div className='postLike'>
                <div to='' onClick={() => likeCLick(props.postID)}><AiOutlineLike />{likes.length}</div>
                <div to='' onClick={() => hidenComment()}><AiOutlineComment />Comment</div>
            </div>
            <div className={!comment ? 'hiden' : ''}>
                <CommentPost
                    postID={props.postID}
                    userID={props.user.userID}
                />
            </div>
        </div>
    )
}

export default PostList