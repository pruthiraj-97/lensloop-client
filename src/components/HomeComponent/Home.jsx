import './home.css'
import React,{useState,useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import StoryCompo from "../StoryComponent/story";
import Post from "../PostComponent/posts";
import MyStory from "../StoryComponent/mystory";
import MyProfile from "../ProfileComponent/myprofile";
import { BsBellFill } from 'react-icons/bs';
import { BsSearch } from "react-icons/bs";
import socket from '../socket/socket';
function Home(){
  const navigate=useNavigate()
  const [user,setUser]=useState(JSON.parse(localStorage.getItem('user')))
  const [hasNotification,setHasNotification]=useState()
  useEffect(()=>{
    (async ()=>{
      const response=await fetch("https://lensloop-server-1.onrender.com/api/auth/profile",{
        method:'GET',
        headers:{
          'x-auth-token':localStorage.getItem('token'),
          'Content-Type':'application/json'
        }
      })
      const data=await response.json()
      setHasNotification(data.profile.notification.length+data.profile.followRequests.length)
      if(!data.success){
        navigate("/login")
      }else{
      }
    })()
  },[])

   useState(()=>{
    socket.on('newNotification',(data)=>{
      if(data.user._id!=user._id){
      setHasNotification((prev)=>{
        return prev+1
      })
    }
    })
   },[socket])

    return (
      <>
        <div className="All-story-div">
          <MyStory/>
          <StoryCompo/>
          <div style={{ position: 'relative', display: 'inline-block' }}>
       <BsBellFill style={{ color: 'red', cursor: 'pointer', fontSize: '24px', marginTop: '20px',marginLeft: '5px' }} 
               onClick={() => navigate('/myprofile/notification')}
       />
    {hasNotification > 0 && (
    <span style={{
      left: '50%',
      transform: 'translateX(-50%)',
      borderRadius: '50%',
      backgroundColor: 'yellow',
      color: 'black',
      padding: '2px 6px',
      fontSize: '12px',
      fontWeight: 'bold',
      border: '1px solid black',
      marginLeft: '5px',
    }}>
      {hasNotification}
    </span>
  )}
  <BsSearch
    onClick={() => navigate('/searchuser')}
    className="search-icon"
  />
</div>
        <MyProfile/>
        </div>
        <Post/>
      </>
    )
}

export default Home
