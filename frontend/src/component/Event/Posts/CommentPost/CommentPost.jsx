import React, { useEffect, useState } from 'react';
import './CommentPostCss.css';
import { createComment } from '../../../auth/likeAndComment';
import { getComment } from '../../../auth/likeAndComment';
import { postingTime } from '../../../auth/post';
import { socket } from '../../../contextAPI/ProviderSocket';
import { useSelector } from 'react-redux';
import { userSlector } from '../../../../redux/reducer/userReducer';

const CommentPost = (props) => {
    const [newComment, setNewComment] = useState({ postID: props.postID })
    const [comment, setComment] = useState([])
    const user = useSelector(userSlector);

    // lấy toàn bộ comment của bài post
    useEffect(() => {
        (async function () {
            let data = await getComment(props.postID)
            setComment(data)
        })()
    }, [props.postID])

    //lấy dữ liệu khi tạo mới comment
    const setPrams = (e) => {
        let name = e.target.name
        let value = e.target.value
        setNewComment({
            ...newComment,
            [name]: value
        })
    }

    //tạo comment mới
    const submit = (e) => {
        e.preventDefault();
        setComment([{
            content: newComment.content,
            user: { phoneNumber: user?.data?.phoneNumber },
            createAt: Date(),
        },
        ...comment
        ])
        createComment(newComment)
        socket.emit('notificationClientPush', {
            interactive: `comment`,
            interactiveUser: user.data.userID,
            postID: props.postID,
            userID: props.userID
        })
        setNewComment({ postID: props.postID })
    }

    return (
        <div className='CommentPost'>
            <form action="" method='POST' onSubmit={submit}>
                <label htmlFor="commentPost">Comment:</label>
                <input type="text" name='content' id='commentPost' value={newComment.content || ''} placeholder='Comment' onChange={setPrams} />
            </form>
            <div>
                {comment.map((list, index) => {
                    let avatar = list.user.avatar
                        ? list.user.avatar
                        : 'https://thuvienplus.com/themes/cynoebook/public/images/default-user-image.png'

                    let day = postingTime(new Date(list.createAt));
                    return (
                        <div key={index}>
                            <div className='CommentUser'>
                                <div className='CommentUserAvatar'>
                                    <img src={avatar} alt="" />
                                </div>
                                <div className='CommentUserContent'>
                                    <p className='CommentUserContentPhone'>{list.user.phoneNumber}</p>
                                    <p>{list.content}</p>
                                </div>
                            </div>
                            <p className='dayComment'>{day}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default CommentPost