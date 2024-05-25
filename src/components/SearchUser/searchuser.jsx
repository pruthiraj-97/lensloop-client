import React,{useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import './searchuserCSS.css'
function SearchUser() {
  const navigate=useNavigate()
  const [username,setUserName]=useState(null)
  const [users,setUsers]=useState([])
  async function searchUser(e){
      e.preventDefault()
      setUserName(e.target.value)
      const response=await fetch(`https://lensloop-server-1.onrender.com/api/auth/searchuser?username=${username}`,{
          method:'GET',
          headers:{
              'x-auth-token':localStorage.getItem('token')
          },
          query:{
            username
          }
      })
      const data=await response.json()
      if(!data.success){
        navigate("/login")
      }
      setUsers(data.users)
      console.log(data)
   }


    return (
    <div className="search-user">
      <input
        type="text"
        placeholder="Search users..."
        onChange={searchUser}
      />
      <div className="user-list">
        {users && users.map((user) => (
          <div key={user._id} className="user">
            <img src={user.image} alt={user.image} 
               onClick={()=>{navigate(`/userprofile/${user._id}`)}}
            />
            <div className="user-details">
              <h3>{user.username}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
    );
}
export default SearchUser