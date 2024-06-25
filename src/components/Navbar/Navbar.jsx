import React, { useState, useEffect } from 'react';
import { useNavigate, Link, NavLink } from "react-router-dom";
import axios from 'axios';
import { ProfileMenu } from './ProfileMenu';
import LanguageMenu from './LanguageMenu';
import Subscription from './Subscription';
import { Answers, Following, Home, Notify, Spaces, Post, Answer } from '../Common/Icons';
import { useUser } from '../Utils/UserProvider';
import quora from '../../assets/Quora.jpg';
import { Tooltip } from "@material-tailwind/react";
import Search from './Search';
import { RxDividerVertical } from "react-icons/rx";
import CreatePost from '../Post/CreatePost'
import { IoIosArrowDown } from "react-icons/io";


const Navbar = () => {
    const { theme, show, setShow } = useUser();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [openNav, setOpenNav] = useState(false);
    const [query, setQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const postCardStyle = {
        backgroundColor: theme === 'light' ? 'white' : 'black',
        color: theme === 'light' ? 'black' : 'white',
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 960) {
                setOpenNav(false);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleSearch = async (e) => {
        const searchTerm = e.target.value;
        setQuery(searchTerm);

        if (searchTerm.length > 0) {
            try {
                const response = await axios.get(`https://academics.newtonschool.co/api/v1/quora/post?search={"content":"${searchTerm}"}`, {
                    headers: {
                        'projectID': 'tpibj7ie8i1w'
                    }
                });
                setSearchResults(response.data.data);
                console.log(response.data.data)
            } catch (error) {
                console.error("Error fetching search results:", error);
            }
        } else {
            setSearchResults([]);
        }
    };

    const handlePostClick = () => {
        navigate(`/ComingSoon`);
    };

    return (
        <div className="w-full fixed z-10 h-[8%] flex" style={postCardStyle}>
            <div className="w-full justify-center text-gray-900 items-center hidden lg:flex shadow-md">
                <div className="flex w-full md:w-max xs:flex-wrap justify-between">
                    <NavLink to="/home" className={({ isActive }) => `mr-5 cursor-pointer font-medium ${isActive ? 'text-red-800' : ''}`}>
                        <img src={quora} className="w-40 h-6 cursor-pointer xs:w-20" onClick={() => navigate('/home')} alt="Quora" />
                    </NavLink>
                    <div className='flex gap-5'>
                        <NavLink to="/home" className={({ isActive }) => `cursor-pointer font-medium ${isActive ? 'text-red-800' : ''}`}>
                            <Tooltip title="Home">
                                <Home className="w-8 h-8 md:w-6 md:h-6" />
                            </Tooltip>
                        </NavLink>
                        <NavLink to="/ComingSoon" className={({ isActive }) => `cursor-pointer font-medium ${isActive ? 'text-red-800' : ''}`}>
                            <Tooltip title="Post">
                                <Following className="w-7 h-7 md:w-6 md:h-6" />
                            </Tooltip>
                        </NavLink>
                        <NavLink to="/Answers" className={({ isActive }) => `cursor-pointer font-medium ${isActive ? 'text-red-800' : ''}`}>
                            <Tooltip title="Answers">
                                <Answers className="w-7 h-7 md:w-6 md:h-6" />
                            </Tooltip>
                        </NavLink>
                        <NavLink to="/ComingSoon" className={({ isActive }) => `cursor-pointer font-medium ${isActive ? 'text-red-800' : ''}`}>
                            <Tooltip title="Spaces">
                                <Spaces className="w-7 h-7 md:w-6 md:h-6" />
                            </Tooltip>
                        </NavLink>
                        <NavLink to="/notification" className={({ isActive }) => `cursor-pointer font-medium ${isActive ? 'text-red-800' : ''}`}>
                            <h1 className="lg:pr-2"><Notify /></h1>
                        </NavLink>
                    </div>
                    <div className="flex">
                        <Search theme={theme} searchResults={searchResults} setSearchResults={setSearchResults} />
                    </div>
                    <div className="h-7 w-24 ml-2 cursor-pointer font-medium text-sm border border-[#575757] rounded-full flex items-center">
                        <Tooltip title="Try Quora">
                            <Subscription />
                        </Tooltip>
                    </div>
                    <div className="cursor-pointer font-medium rounded-full">
                        <ProfileMenu />
                    </div>
                    <div className="cursor-pointer font-medium mr-4">
                        <LanguageMenu />
                    </div>
                    <div className="flex items-center rounded-full bg-red-800">
                        <button className="relative flex items-center justify-center h-7 text-white rounded-l-full pl-3 cursor-pointer">
                            <span className="text-sm">
                                <CreatePost />
                            </span>
                        </button>
                        <RxDividerVertical className='text-gray-300 h-3 lg:h-5 w-3 lg:w-5 hidden lg:flex' />
                        <button className="relative flex items-center justify-center h-7 text-white rounded-r-full pr-2 cursor-pointer">
                            <IoIosArrowDown />
                        </button>
                    </div>
                </div>
            </div>
            {/* for small screens */}
            <div className="fixed z-20 lg:mx-auto flex xs:flex-col-2 text-gray-900 mb-4 lg:ml-32 lg:gap-2 lg:hidden w-full">
                <div className="flex w-full xs:flex-wrap">
                    <NavLink to="/home" className={({ isActive }) => `mx-4 cursor-pointer py-1.5 font-medium ${isActive ? 'text-red-800' : ''}`}>
                        <img src={quora} className="w-36 h-6 cursor-pointer xs:w-20" onClick={() => navigate('/home')} alt="Quora" />
                    </NavLink>
                    <div className="w-[40%] my-[3%] xs:my-auto md:w-[80%]">
                        <Search theme={theme} searchResults={searchResults} setSearchResults={setSearchResults} />
                    </div>
                    <div className="xs:block lg:hidden md:hidden">
                        <button onClick={toggleMenu} className="p-2 focus:outline-none">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                            </svg>
                        </button>
                    </div>
                </div>

                {isMenuOpen && (
                    <div className="absolute top-12 left-0 w-full bg-white shadow-lg rounded-lg flex flex-col">
                        <NavLink to="/home" className={({ isActive }) => `block px-4 py-2 text-gray-900 cursor-pointer ${isActive ? 'text-red-800' : ''}`}>
                            <Tooltip title="Home">
                                <Home className="w-7 h-7 md:w-6 md:h-6" />
                            </Tooltip>
                        </NavLink>
                        <NavLink to="/ComingSoon" className={({ isActive }) => `block px-4 py-2 text-gray-900 cursor-pointer ${isActive ? 'text-red-800' : ''}`}>
                            <Tooltip title="Post">
                                <Post className="w-7 h-7 md:w-6 md:h-6" />
                            </Tooltip>
                        </NavLink>
                        <NavLink to="/Answers" className={({ isActive }) => `block px-4 py-2 text-gray-900 cursor-pointer ${isActive ? 'text-red-800' : ''}`}>
                            <Tooltip title="Answers">
                                <Answer className="w-7 h-7 md:w-6 md:h-6" />
                            </Tooltip>
                        </NavLink>
                        <NavLink to="/ComingSoon" className={({ isActive }) => `block px-4 py-2 text-gray-900 cursor-pointer ${isActive ? 'text-red-800' : ''}`}>
                            <Tooltip title="Spaces">
                                <Spaces className="w-7 h-7 md:w-6 md:h-6" />
                            </Tooltip>
                        </NavLink>
                        <div className="block px-4 py-2 text-gray-900 cursor-pointer">
                            <ProfileMenu />
                        </div>
                        <div className="block px-4 py-2 text-gray-900 cursor-pointer">
                            <h1 className="bg-red-800 rounded-full text-md text-white w-36 pl-6 h-8 lg:hidden">
                                <CreatePost />
                            </h1>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
