import React, { useContext, useEffect, useState } from 'react';
import { AiOutlineLike, AiOutlineComment } from "react-icons/ai";
import CommentPost from './CommentPost/CommentPost';
import { Like } from '../../auth/likeAndComment';
import { postingTime } from '../../auth/post';
import { getLike } from '../../auth/likeAndComment';
import { Providers } from '../../contextAPI/Provider';
import { ProviderSockets } from '../../contextAPI/ProviderSocket'

const PostList = ({ props }) => {
    const { socket } = useContext(ProviderSockets);
    const { user } = useContext(Providers);
    const [comment, setComment] = useState(false)
    const [likes, setLikes] = useState([])
    let day = postingTime(new Date(props.createAt));
    let avatar = props.user.avatar
        ? props.user.avatar
        : 'https://thuvienplus.com/themes/cynoebook/public/images/default-user-image.png'

    const hiddenComment = () => {
        setComment(!comment)
    }

    //lấy số like của bài post khi load trang lần đầu
    useEffect(() => {
        (async function () {
            setLikes(await getLike(props.postID))
        })()
    }, [props.postID])

    const checkLike = likes && likes.find((like) => {
        const checked = like.user.userID
        return user?.data?.userID === checked
    })

    //like hoặc unlike bài post
    const likeCLick = async (postID) => {

        if (!checkLike) {
            socket.emit('notificationClientPush', {
                interactive: `like`,
                interactiveUser: user.data.userID,
                postID,
                userID: props.user.userID
            })
        }
        await Like({
            postID,
        });

        //lấy lại số like sau khi like hoặc unlike
        let like = await getLike(postID)
        setLikes(like)
    }
    return (
        <div className='post'>
            <div className='postUser'>
                <div className='postAvarta'>
                    <img src={avatar} alt="" />
                </div>
                <div className='postName'>{props.user.phoneNumber}</div>
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
                <div className={checkLike ? 'checkLike' : ''} onClick={() => likeCLick(props.postID)}>
                    <AiOutlineLike />{likes.length}
                </div>
                <div onClick={() => hiddenComment()}><AiOutlineComment />Comment</div>
            </div>
            <div className={!comment ? 'hidden' : ''}>
                <CommentPost
                    postID={props.postID}
                    userID={props.user.userID}
                />
            </div>
        </div>
    )
}

export default PostList