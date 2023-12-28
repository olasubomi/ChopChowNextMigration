import { ArrowDown2Icon, ArrowUp2Icon, ChatIcon, ShareIcon, StarIcon, UserIcon } from '../icons';
import styles from './reviews.module.css'
import axios from '../../util/Api';
import { StarRating } from '../star-rating';
import { useEffect, useState } from 'react';
import { RiDeleteBin5Line } from "react-icons/ri"
import Link from 'next/link';
import moment from 'moment'
import { elements } from 'chart.js';
import Image from 'next/image';
import profile_pic from "../../../public/assets/icons/user_icon.jpeg"
import { useSelector } from 'react-redux';

function Reviews({ itemId, callback }) {

    const [comments, setComments] = useState([]);
    const [commentVotes, setCommentVotes] = useState([]);
    const [page, setPage] = useState(1)
    const [message, setMessage] = useState('')
    const [showReply, setShowReply] = useState('');
    const [reply, setReply] = useState("")
    const [username, setUsername] = useState("")
    const [rating, setRating] = useState(0)
    const [isEditing, setIsEditing] = useState(false)
    const [commentId, setCommentId] = useState("")
    const {authUser} = useSelector(state => state.Auth)
    // const profileImage = JSON.parse(localStorage.getItem('user')).profile_picture


    useEffect(() => {
        getAllComments()
    }, [itemId])

    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem('user')) || {}
        if (currentUser.hasOwnProperty('first_name') && currentUser.hasOwnProperty('last_name')) {
            setUsername(currentUser.last_name.concat(' ', currentUser.first_name))
        }
    }, [])

    const getAllComments = async () => {
        try {
            const allComment = await axios.get(`/comment/get-all/${page}?item=${itemId}`)
            setComments(allComment.data.data.comments)
        } catch (e) {

        }
    }
    const deleteComment = async (id) => {
        try {
            const removeComment = await axios.delete(`/comment/delete/${id}`)

            getAllComments()
            callback()

        } catch (e) {

        }
    }

    console.log('comments', comments)
    const handleUpVote = async (commentId) => {
        try {
            const resp = await axios.patch(`/comment/upvote/${commentId}`)
            if (resp.status === 202) {
                setCommentVotes((prevVotes) => [...prevVotes, commentId]);
                getAllComments()
            }
        } catch (e) {
            console.log(e)
        }
    }

    const handleDownVote = async (commentId) => {
        try {
            const resp = await axios.patch(`/comment/downvote/${commentId}`)
            if (resp.status === 202) {
       
                getAllComments()
            }
        } catch (e) {
            console.log(e)
        }
    }


    const postNewComment = async () => {
        try {
            if (message) {
                const user = JSON.parse(localStorage.getItem('user'))
                const created_by = user?.first_name.concat(' ', user.last_name)
                const payload = { message, item: itemId, item_type: 'Item', rating };
                const resp = await axios.post(`/comment/create`, payload)
                setRating(0)
                setMessage('')
                getAllComments()

                callback()
            } else {
                alert('Enter a comment to proceed')
            }
        }
        catch (e) {
            console.log('error', e)
        }
    }

    const editComment = async () => {
        try {
            if (message) {
                const payload = { message, rating };
                const resp = await axios.post(`/comment/update/${commentId}`, payload)
                setRating(0)
                setMessage('')
                getAllComments()
                setIsEditing(false)
                callback()
            } else {
                alert('Enter a comment to proceed')
            }
        }
        catch (e) {
            console.log('error', e)
        }
    }

    const postNewReply = async () => {
        try {
            if (reply) {
                const user = JSON.parse(localStorage.getItem('user'))
                const created_by = user?.first_name.concat(' ', user.last_name)
                const payload = {
                    message: reply,
                    item: itemId,
                    item_type: 'Item',
                    parent_comment_id: showReply
                };
                const resp = await axios.post(`/comment/create-reply`, payload)
                setReply('')
                setShowReply('')
                getAllComments()
            } else {
                alert('Enter a reply to proceed')
            }
        }
        catch (e) {
            console.log('error', e)
        }
    }

    console.log(comments, "comments")
    console.log(isEditing, 'edit')
    return (
        <div id="reviews" className={styles.products_reviews_container}>
            <div className={styles.products_reviews_summary}>
                <div className={styles.product_review_col_1}>
                    <div className={styles.product_review_col_1_row}>
                        <div className={styles.product_review_name_ab}>

                        {authUser?.profile_picture !== "" && authUser?.profile_picture !== undefined ? 
                        <Image 
                        width={50} height={50}
                        style={{borderRadius: 30}}
                        alt={username}
                        src={authUser?.profile_picture}
                        className={styles.user_img}
                        /> : <UserIcon style={styles.user_img}/> }
                        </div>
                    </div>
                    <div className={styles.review_details}>
                        <div className={styles.review_details_top}>
                            <div className={styles.review_details_top1}>
                                <h3 className={styles.product_review_name}>{username}</h3>

                                <div>
                                    <StarRating rating={rating} setRating={setRating} />
                                </div>
                                <div className={styles.review_input_container} style={{ marginTop: '-8rem' }}>

                                    <textarea value={message} onChange={(e) => setMessage(e.target.value)} style={{ width: '100%', background: 'none', paddingLeft: '2rem', paddingTop: '1rem', border: 'none', outline: 'none' }}
                                        placeholder='Write Review'
                                    />
                                </div>
                                <div style={{ alignItems: 'flex-end', display: 'flex', justifyContent: 'flex-end' }}>
                                    <button onClickCapture={() => {
                                        if (isEditing) {
                                            editComment()
                                        } else {
                                            postNewComment()
                                        }
                                    }} className={styles.profile_button}>
                                        {
                                            isEditing ? 'Edit Review' : 'Add Review'
                                        }
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {
                comments.map((comment, idx) => (
                    <div key={comment._id} className={styles.product_reviews}>
                        <div className={styles.product_review}>
                            <div className={styles.product_review_col_1}>
                                <div className={styles.product_review_col_1_row}>
                                    
                                    <div className={styles.product_review_name_ab}>
                            {
                                comment.created_by.username !== "" && comment.created_by.username !== undefined ?  (<Image
                                    id="userImg"
                                    width={60}
                                    height={60}
                                    src={ comment?.created_by?.profile_picture}
                                    alt="User"
                                    className={styles.user_img}
                                    />): <UserIcon style={styles.user_img}/>
                            }
                            
                                        
                                        
                                        </div>
                                </div>
                                <div className={styles.review_details}>
                                    <div className={styles.review_details_top4}>
                                        <div className={styles.review_details_top1}>
                                            <h3 className={styles.product_review_name}>{comment?.created_by?.username}</h3>
                                            <div className={styles.product_review_rating_icons}>
                                                {
                                                    Array.from({ length: 5 }).map((i, j) => {
                                                        var rate = comment.rating;
                                                        if ((j + 1) <= rate) {
                                                            return (
                                                                <StarIcon key={j} style={styles.product_review_rating_icon} />
                                                            )
                                                        } else {
                                                            return (
                                                                <StarIcon key={j} style={styles.product_review_rating_icon2} />
                                                            )
                                                        }
                                                    })
                                                }
                                            </div>
                                        </div>
                                        <div className={styles.review_details_top2}>
                                            <div className={styles.review_votes}>
                                                <div onClick={() => handleUpVote(comment._id)} className={styles.review_vote}>
                                                    <ArrowUp2Icon style={commentVotes?.includes(comment._id) ? styles.review_vote_down : styles.review_vote_up} />
                                                    <p>{comment.up_votes}</p>
                                                </div>
                                                <div onClick={() => handleDownVote(comment._id)} className={styles.review_vote}>
                                                    <ArrowDown2Icon style={styles.review_vote_down} />
                                                    <p>{comment.down_votes}</p>
                                                </div>
                                            </div>
                                            <h4><ChatIcon /> {comment.replies.length}</h4>
                                            <h5><ShareIcon /> Share Comment</h5>

                                            {
                                                comment.created_by._id === JSON.parse(localStorage.getItem('user'))._id &&
                                                <p
                                                    onClick={() => {
                                                        const doc = document.querySelector('#review')
                                                        doc.scrollIntoView({ behavior: "smooth" });
                                                        setIsEditing(true)
                                                        setMessage(comment.message)
                                                        setRating(comment.rating)
                                                        setCommentId(comment._id)
                                                    }}
                                                    style={{ fontSize: '11px', fontFamily: 'Inter' }}>Edit</p>
                                            }
                                            <div onClick={() => deleteComment(comment._id)}>
                                                <RiDeleteBin5Line color='red' size={20} style={{ cursor: "pointer" }} />
                                            </div>
                                        </div>
                                    </div>
                                    <p className={styles.product_review_sub_message}>{comment.message}</p>
                                    <div style={{display: 'flex', alignItems: 'center'}}>
                                        <p style={{fontSize: '12px'}}>{moment(comment.createdAt).fromNow()}</p>
                                        <p onClick={() => setShowReply((prev) => Boolean(prev) ? '' : comment._id)} style={{ cursor: 'pointer', color: '#F47900', marginLeft: '1rem' }}>Reply</p>
                                        {new Date(comment.updatedAt).getTime() > new Date(comment.createdAt).getTime() && <p style={{fontSize: '10px', marginLeft: '1rem'}}>Edited</p>}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {
                            showReply === comment._id && <div className={styles.products_reviews_summary} style={{ paddingLeft: '8%' }}>
                                <div className={styles.product_review_col_1}>
                                    <div className={styles.product_review_col_1_row}>
                                        <div className={styles.product_review_name_ab}>T</div>
                                    </div>
                                    <div className={styles.review_details}>
                                        <div className={styles.review_details_top} >
                                            <div className={styles.review_details_top1}>
                                                <h3 className={styles.product_review_name}>{comment.created_by.username}</h3>

                                                <div className={styles.review_input_container}>
                                                    <textarea value={reply} onChange={(e) => setReply(e.target.value)} style={{ width: '90%', background: 'none', paddingLeft: '2rem', paddingTop: '1rem', border: 'none', outline: 'none' }}
                                                        placeholder='Write reply'
                                                    />
                                                </div>
                                                <div style={{ alignItems: 'flex-end', display: 'flex', justifyContent: 'flex-end', width: '90%' }}>
                                                    <button onClick={postNewReply} className={styles.profile_button}>Reply</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                        {
                            comment.replies.map((reply, idx) => (
                                <div key={reply._id} className={styles.product_review}>
                                    <div className={styles.product_review_col_1}>
                                        <div className={styles.product_review_col_1_row}>

                                        </div>
                                        <div className={styles.review_details}>
                                            <div className={styles.product_review_col_1}>
                                                <div className={styles.product_review_col_1_row}>
                                                    <div className={styles.product_review_name_ab}>{reply.created_by.username.charAt(0)}</div>
                                                </div>
                                                <div className={styles.review_details}>
                                                    <div className={styles.review_details_top}>
                                                        <div className={styles.review_details_top1}>
                                                            <h3 className={styles.product_review_name}>{reply.created_by.username}</h3>
                                                        </div>
                                                    </div>
                                                    <p className={styles.product_review_sub_message}>{reply.message}</p>
                                                    <div className={styles.review_votes}>
                                                        <div onClick={() => handleUpVote(reply._id)} className={styles.review_vote}>
                                                            <ArrowUp2Icon style={styles.review_vote_up} />
                                                            <p>{reply.up_votes}</p>
                                                        </div>
                                                        <div onClick={() => handleDownVote(reply._id)} className={styles.review_vote}>
                                                            <ArrowDown2Icon style={styles.review_vote_down} />
                                                            <p>{reply.down_votes}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                ))
            }
        </div>
    )
}

export default Reviews;