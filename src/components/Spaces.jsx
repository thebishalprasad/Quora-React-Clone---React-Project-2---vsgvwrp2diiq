import React, { useEffect, useState } from 'react'
import Avatar from 'react-avatar';
import question from '../assets/Question.jpg'
import pen from '../assets/Pen.jpg'
import edit from '../assets/Edit.jpg'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import GetComments from './GetComments';

const Spaces = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const dataUser = localStorage.getItem("token");
    // console.log(dataUser)
    try {
      const response = await axios.get('https://academics.newtonschool.co/api/v1/quora/post?limit=', {
        headers: {
          'projectID': 'tpibj7ie8i1w',
          'Authorization': `Bearer ${dataUser}`
        }
      });
      setPosts(response.data.data)
      // console.log(response.data.data)
      //   return response.data; 
    } catch (error) {
      console.error('Failed to fetch posts:', error);
      return [];
    }
  };

  useEffect(() => {
    fetchPosts()
  }, [])

  const handlePostOpen = (postId) => {
    navigate(`/question/${postId}`)
  }

  return (
    <div className='ml-25px'>
      <div className='mt-20 rounded-sm'>
        <div className='bg-white p-2 h-20 border border-spacing-1'>
          <div className='flex'>
            <Avatar round size="25" className="mt-0.5 ml-2" name="w" />
            <input placeholder='What do you want to ask for share?' className='bg-gray-100 p-1 ml-4 placeholder-gray-600 border border-spacing-1 rounded-full w-full' />
          </div>
          <div className='flex pt-2'>
            <div className='ml-16 flex'>
              <img src={question} className='w-5 h-5' />
              <h1 className='ml-2'>Ask</h1>
            </div>
            <h1 className='ml-20'>|</h1>
            <div className='ml-16 flex'>
              <img src={edit} className='w-5 h-5' />
              <h1 className='ml-2'>Answer</h1>
            </div>
            <h1 className='ml-20'>|</h1>
            <div className='ml-16 flex'>
              <img src={pen} className='w-5 h-5' />
              <h1 className='ml-2'>Post</h1>
            </div>
          </div>
        </div>
        {/* PostCard */}
        {posts.map((post, index) => {
          return (
            <div className='bg-white mt-2 p-2' key={index} onClick={() => handlePostOpen(post._id)}>
              <div className='flex items-center'>
                <img className="w-10 h-10 rounded-full" src={post.channel.image} />
                <h1 className='ml-5 font-semibold'>{post.channel.name}</h1>
              </div>
              <h1 className='font-semibold mt-3'>{post.title}</h1>
              <h1 className='mt-2'>{post.content}</h1>
              <img src={post.images[0]} className='mt-3 w-full' />
              <GetComments/>
            </div> 
          )
        })}
      </div> 
      </div>
  )
}

export default Spaces