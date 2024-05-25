import React,{useState,useEffect} from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import '../PostComponentCSS/MyPostsCSS.css'
function MyPost(){
    const [post,setPost]=useState(null)
    const [loading,setLoding]=useState(false)
    const [user,setUser]=useState(JSON.parse(localStorage.getItem('user')))
    const id=useParams()
    const navigate=useNavigate()
    useEffect(()=>{
      (async ()=>{
        setLoding(true)
        const response=await fetch(`https://lensloop-server-1.onrender.com/api/posts/getmypost/${id.id}`,{
            method:'GET',
            headers:{
                'x-auth-token':localStorage.getItem('token'),
                'Content-Type':'application/json'
            }
        })
        const data=await response.json()
        console.log(data)
        setPost(data.post)
        setLoding(false)
      })()
    },[])
    async function deletePost(e){
        e.preventDefault()
        const response=await fetch(`https://lensloop-server-1.onrender.com/api/posts/deletepost/${post._id}`,{
            method:'DELETE',
            headers:{
                'x-auth-token':localStorage.getItem('token'),
                'Content-Type':'application/json'
            }
        })
        const data=await response.json()
        console.log(data)
        if(data.success){
            navigate("/myprofile")
        }
    }

    if(!post||loading){
        return (
            <h1>loding....</h1>
        )
    }

    return (
    <div>
    <div className="my-post">
        <div className="my-post-content">
        <div className="my-post-details">
             <img src={post.post} alt="Post" />
        </div>
        <div className="my-post-likes">
            <p>Total Likes: {post.likes ? post.likes.length : 0}</p>
            <p>Total Dislikes: {post.dislikes ? post.dislikes.length : 0}</p>
            <button className="delete-button" onClick={deletePost}>Delete</button>
        </div>
        </div>
        <div className="my-comments">
            {post.comments.length > 0 ? post.comments.map((comment,index) => (
                <div key={comment.id} className="my-comment">
                    <img src={comment.userId.image} alt="User Avatar"
                        onClick={() => comment.userId._id==user._id?navigate('/myprofile'):navigate(`/userprofile/${comment.userId._id}`)}
                    />
                    <div>
                        <p><strong>{comment.userId.username}</strong></p>
                        <p>{comment.comment}</p>
                    </div>
                </div>
            )) : <h4>No Comments</h4>}
        </div>
    </div>
</div>

    )
}

export default MyPost