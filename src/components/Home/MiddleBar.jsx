import React, { useEffect, useState } from 'react';
import Avatar from 'react-avatar';
import axios from 'axios';
import { RxDividerVertical } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import GetComments from '../GetComments';
import { useUser } from '../Utils/UserProvider';
import 'react-toastify/dist/ReactToastify.css';
import { Ask, Answer, PostImage } from '../Icons';
import AddPost from '../Post/AddPost';
import { POST_API, PROJECT_ID } from '../Utils/Constant';
import CreatePost from '../Post/CreatePost';

const MiddleBar = () => {
  const { theme } = useUser();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);

  const colour = {
    backgroundColor: theme === 'light' ? '#FFFFFF' : 'black',
    color: theme === 'light' ? 'black' : 'white'
  };

  const inputStyle = {
    backgroundColor: theme === 'light' ? '#F7F7F8' : '#202020',
    color: theme === 'light' ? 'black' : 'white',
  };
  
  const postCardStyle = {
    backgroundColor: theme === 'light' ? 'white' : 'gray',
    color: theme === 'light' ? 'black' : 'white',
  };

  const fetchPosts = async () => {
    const dataUser = localStorage.getItem("token");
    try {
      const response = await axios.get(POST_API, {
        headers: {
          'projectID': PROJECT_ID,
          'Authorization': `Bearer ${dataUser}`
        }
      });
      setPosts(response.data.data);
      console.log(response.data.data)
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handlePostOpen = (postId) => {
    // navigate(`/question/${postId}`);
  };

  return (
    <div>
      <div className='ml-72'>
        <div className='mt-2.5 rounded-sm md:left-96'>
          <div className='border border-spacing-1 mt-16 pt-2 ' style={colour}>
            <div className="relative flex text-gray-700 bg-clip-border rounded-sm ">
              <Avatar round size="28" className="mt-1 ml-2" name="w" />
              <input
                Placeholder='What do you want to ask or share?'
                className='p-2 mx-4 border border-color: rgb(222,224,225) border-spacing-1 rounded-full w-full h-8 '
                style={inputStyle}
                onClick={() => setIsCreatePostOpen(true)}
              />
            </div>
            <div className='flex justify-around p-2 xs:gap-5 text-xs'>
              <div className='flex items-center justify-center ml-4 border border-transparent rounded-3xl w-1/3 hover:border-gray-300 hover:bg-gray-100 cursor-pointer'>
                <Ask />
                <h1 className='flex items-center'><CreatePost /></h1>
              </div>
              <RxDividerVertical className='text-gray-300 h-3 lg:h-5 w-3 lg:w-5 hidden lg:flex' />
              <div className='flex items-center justify-center border border-transparent rounded-3xl w-1/3 hover:border-gray-300 hover:bg-gray-100 cursor-pointer'>
                <Answer />
                <h1 className='' onClick={() => navigate('/Answers')}>Answer</h1>
              </div>
              <RxDividerVertical className='text-gray-300 h-3 lg:h-5 w-3 lg:w-5 hidden lg:flex' />
              <div className='flex items-center justify-center mr-6 border border-transparent rounded-3xl w-1/3 hover:border-gray-300 hover:bg-gray-100 cursor-pointer'>
                <PostImage />
                <div className='' ><AddPost /></div>
              </div>
            </div>
          </div>
          <div>
            {posts.map((post, index) => {
              const authorInitial = post.author?.name ? post.author?.name.charAt(0).toUpperCase() : '?';
              return (
                <div className="relative flex flex-col mt-2 text-gray-700 bg-white shadow-md bg-clip-border rounded-sm lg:w-52 md:w-[26rem] sm:w-[22rem] xl:w-[38rem]" key={index} style={postCardStyle}>
                  <div className='flex items-center p-2'>
                    {post.channel?.image ? (
                      <img className="w-8 h-8 rounded-full" src={post.channel?.image} />
                    ) : (
                      <Avatar round size="25" className="mt-0.5 ml-2" name={authorInitial} />
                    )}
                    <h1 className='ml-5 font-semibold'>{post.author?.name}</h1>
                  </div>
                  <div className="p-6">
                    <h5 className="block mb-2 font-sans text-md antialiased font-semibold leading-snug tracking-normal text-black" onClick={handlePostOpen}>
                      {post?.title}
                    </h5>
                    <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
                      {post?.content}
                    </p>
                  </div>
                  {post.images.length > 0 ? (
                    <div className="relative h-80 mx-4 -mt-6 overflow-hidden text-white shadow-lg bg-clip-border rounded-sm bg-blue-gray-500 shadow-blue-gray-500/40">
                      <img
                        src={post.images[0]}
                        alt="card-image"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    ""
                  )}
                  <GetComments postId={post?._id} likeCount={post?.likeCount} commentCount={post?.commentCount} postTitle={post?.title} postContent={post?.content} postImage={post.images[0]} />
                </div>
              )
            })}
          </div>
        </div>
      </div>
      {isCreatePostOpen && <CreatePost />}
    </div>
  );
};

export default MiddleBar;
