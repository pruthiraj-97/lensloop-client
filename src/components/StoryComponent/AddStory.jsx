import React,{useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import '../StoryComponenetCSS/AddStory.css'
function AddStory(){
    const navigate=useNavigate()
    const [story,setStory]=useState(null)
    const [title,setTitle]=useState(null)
    const [loding,setLoding]=useState(false)
    async function handleSubmit(e){
        e.preventDefault()
        setLoding(true)
        const formData=new FormData()
        formData.append('story',story)
        formData.append('title',title)
        const response=await fetch("http://localhost:4000/api/story/addstory",{
            method:'POST',
            headers:{
                'x-auth-token':localStorage.getItem('token')
            },
            body:formData
        })
        const data=await response.json()
        setLoding(false)
        if(data.success){
            navigate('/')
        }
        
    }
    if(loding){
      return (
        <h1>loding...</h1>
      )
    }

    return (
        <div className="add-story-container">
        <h2>Add a New Story</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter title"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="file">File:</label>
            <input type="file" id="file" onChange={(e) => setStory(e.target.files[0])} required />
          </div>
          <button type="submit" className="submit-btn">Submit</button>
        </form>
      </div>
    )
}

export default AddStory