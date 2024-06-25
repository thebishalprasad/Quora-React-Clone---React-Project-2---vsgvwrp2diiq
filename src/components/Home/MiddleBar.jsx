import React, { useEffect, useState, useCallback } from 'react';
import Avatar from 'react-avatar';
import axios from 'axios';
import { RxDividerVertical } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import GetComments from '../AnswersAndComments/GetComments';
import { useUser } from '../Utils/UserProvider';
import 'react-toastify/dist/ReactToastify.css';
import { Ask, Answer, Post } from '../Common/Icons';
import { POST_API, PROJECT_ID } from '../Utils/Constant';
import AddQuestionPost from '../Post/AddQuestionPost';
import CreatePost from '../Post/CreatePost';

const MiddleBar = () => {
  const { theme, show, setShow } = useUser();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);
  const [initialApiCallMade, setInitialApiCallMade] = useState(false);

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

  const fetchPosts = useCallback(async () => {
    if (isFetching || (initialApiCallMade && page > 1)) {
      return;
    }

    const dataUser = localStorage.getItem("token");
    try {
      setIsFetching(true);
      const response = await axios.get(`${POST_API}?limit=100&page=${page}`, {
        headers: {
          'projectID': PROJECT_ID,
          'Authorization': `Bearer ${dataUser}`
        }
      });
      setPosts((prevPosts) => [...prevPosts, ...response.data.data]);
      setPage((prevPage) => prevPage + 1);

      if (!initialApiCallMade) {
        setInitialApiCallMade(true);
      }
    } catch (error) {
      console.error('Failed to fetch posts:', error);
      setError("Failed to fetch posts. Please try again.");
    } finally {
      setIsFetching(false);
    }
  }, [isFetching, initialApiCallMade, page]);

  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const debouncedFetchPosts = useCallback(debounce(fetchPosts, 500), [fetchPosts]);

  const handleScroll = useCallback(() => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight - 100) {
      debouncedFetchPosts();
    }
  }, [debouncedFetchPosts]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <div className="lg:ml-[21%] lg:w-[45%] md:w-full md:mx-[2%] mt-[4%] md:mt-[5%]">
      <div className="relative flex flex-col pt-3 text-gray-700 bg-white shadow-md bg-clip-border rounded-sm" style={colour}>
        <div className="relative flex text-gray-700 bg-clip-border rounded-sm" onClick={() => setShow(true)}>
          <Avatar round size="32" className="mt-0.5 ml-2" name="w" />
          <input
            placeholder="What do you want to ask or share?"
            className="p-1 ml-6 border border-spacing-1 rounded-full w-full mr-4" style={inputStyle}
          />
        </div>
        <div className="flex justify-around p-2 gap-2 xs:gap-5">
          <div className="flex items-center ml-4">
            <Ask />
            <h1 className="flex items-center">
              <AddQuestionPost />
            </h1>
          </div>
          <RxDividerVertical className='text-gray-300 h-3 lg:h-5 w-3 lg:w-5 hidden lg:flex' />
          <div className="flex items-center">
            <Answer />
            <h1 className="" onClick={() => navigate("/Answers")}>
              Answer
            </h1>
          </div>
          <RxDividerVertical className='text-gray-300 h-3 lg:h-5 w-3 lg:w-5 hidden lg:flex' />
          <div className="flex items-center mr-6">
            <Post />
            <h1 className="flex items-center">
              <CreatePost />
            </h1>
          </div>
        </div>
      </div>
      <div>
        {posts.map((post, index) => {
          const authorInitial = post.author?.name ? post.author?.name.charAt(0).toUpperCase() : '?';
          const postDate = new Date(post.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          });
          return (
            <div className="relative flex flex-col mt-2 text-gray-700 bg-white shadow-md bg-clip-border rounded-sm lg:w-52 md:w-[26rem] sm:w-[22rem] xl:w-[38rem]" key={index} style={postCardStyle}>
              <div className='flex items-center pl-2'>
                {post.author?.profileImage ? (
                  <img className="w-8 h-8 rounded-full" src={post.author?.profileImage} alt="Profile" />
                ) : (
                  <Avatar round size="32" className="ml-1" name={authorInitial} />
                )}
                <div className='ml-3 flex-col-2 pt-2'>
                  <h1 className='font-semibold'>{post.author?.name}</h1>
                  <span className="text-xs text-gray-500">{postDate}</span>
                </div>
              </div>
              <div className="pl-3 pt-2">
                <h5 className="block mb-2 font-sans text-md antialiased font-semibold leading-snug tracking-normal text-black">
                  {post?.title}
                </h5>
                <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
                  {post?.content}
                </p>
              </div>
              {post.images?.length > 0 && (
                <div className="relative h-80 overflow-hidden text-white shadow-lg bg-clip-border rounded-sm bg-blue-gray-500 shadow-blue-gray-500/40">
                  <img
                    src={post.images[0]}
                    alt="card-image"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <GetComments
                postId={post?._id}
                likeCount={post?.likeCount}
                commentCount={post?.commentCount}
                postTitle={post?.title}
                postContent={post?.content}
                postImage={post.images?.[0]}
                fetchPosts={fetchPosts}
              />
            </div>
          );
        })}
        {isFetching && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
};

export default MiddleBar;
