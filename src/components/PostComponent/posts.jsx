import React,{useState,useEffect} from "react";
import AllPost from "./AllPost";
import '../PostComponentCSS/posts.css'
import socket from "../socket/socket";
import { useNavigate } from "react-router-dom";
function Post(){
    const [posts,setPosts]=useState([])
    const [user,setUser]=useState(JSON.parse(localStorage.getItem('user')))
    const navigate=useNavigate()
    useEffect(()=>{
      (async ()=>{
        const response=await fetch("https://lensloop-server-1.onrender.com/api/posts/getposts",{
          method:'GET',
          headers:{
            'Content-Type':'application/json'
          }
        })
        const data=await response.json()
        if(data.success){
        setPosts(data.posts)
        socket.connect()
        socket.emit('setUserId',user._id)
        }else{
          navigate('/login')
        }
      })()
    },[])
    return (
       <div className="post-main-container">
       {
         posts.length>0&&posts.map((post,index)=>{
            return <AllPost key={index} post={post}/>
         })
         
       }
     </div>
    )
}

export default Post
