import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';
import { ProfileMenu } from './ProfileMenu';
import LanguageMenu from './LanguageMenu';
import Subscription from './Subscription';
import { Notification } from './Notification';
import CreateSpaceComponent from './CreateSpace';
import { Icons, Post, Home, Spaces } from './Icons';
import { useUser } from './Utils/UserProvider';
import quora from '../assets/Quora.jpg';
import {
    Navbar,
    Typography,
    Input,
    Tooltip,
} from "@material-tailwind/react";
import CreatePost from './Post/CreatePost';


const NavbarDefault = () => {
    const { theme } = useUser();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    const [openNav, setOpenNav] = useState(false);
    const [query, setQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const postCardStyle = {
        backgroundColor: theme === 'light' ? 'white' : 'gray',
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

        if (searchTerm.length > 1) {
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

    const nav = () => {
        navigate('/ComingSoon');
    };

    return (
        <>
            <Navbar className="max-w-screen-xl lg:max-w-full fixed top-0 left-0 right-0 z-20 h-16 xs:flex" style={postCardStyle}>
                <div className="lg:mx-auto flex-wrap justify-center text-gray-900 mb-4 lg:ml-64 lg:gap-2 items-center hidden lg:block">
                    <div className="relative flex w-full md:w-max xs:flex-wrap justify-between">
                        <Typography as="a" href="#" className="mr-4 cursor-pointer py-1.5 font-medium">
                            <img src={quora} className="w-40 h-8 cursor-pointer xs:w-20" onClick={() => navigate('/home')} alt="Quora" />
                        </Typography>
                        <Typography as="a" href="#" className="mr-5 cursor-pointer py-1.5 font-medium">
                            <Link to="/home">
                                <Tooltip title="Home">
                                    <Home className="w-8 h-8 md:w-6 md:h-6" />
                                </Tooltip>
                            </Link>
                        </Typography>
                        <Typography as="a" href="#" className="mr-5 cursor-pointer py-1.5 font-medium">
                            <Link to="/ComingSoon">
                                <Post className="w-7 h-7 md:w-6 md:h-6" />
                            </Link>
                        </Typography>
                        <Typography as="a" href="#" className="mr-5 cursor-pointer py-1.5 font-medium">
                            <Link to="/Answers">
                                <Icons className="w-7 h-7 md:w-6 md:h-6" />
                            </Link>
                        </Typography>
                        <Typography as="a" href="#" className="mr-5 cursor-pointer py-1.5 font-medium">
                            <Link to="/ComingSoon">
                                <Spaces className="w-7 h-7 md:w-6 md:h-6" />
                            </Link>
                        </Typography>
                        <Link to="/ComingSoon">
                            <Typography as="span" className="mr-5 cursor-pointer font-medium">
                                <Notification className="w-7 h-7 md:w-6 md:h-6" />
                            </Typography>
                        </Link>
                        <Input
                            type="search"
                            placeholder="Search Quora(content based)"
                            value={query}
                            onChange={handleSearch}
                            containerProps={{
                                className: "lg:w-[280px]",
                            }}
                            className="!border-t-blue-gray-300 pl-9 placeholder:text-blue-gray-300 focus:!border-blue-gray-300"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                        />
                        <div className="!absolute ml-[350px] top-[11px]">
                            <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Zm10.45 2.95L16 16l4.95 4.95Z" className="icon_svg-stroke" stroke="#666" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"></path>
                            </svg>
                        </div>
                        <Typography className="ml-3 h-10 w-28 cursor-pointer py-1.5 font-medium text-md px-1.5 border border-[#575757] rounded-full flex items-center">
                            <Tooltip title="Try Quora">
                                <Subscription />
                            </Tooltip>
                        </Typography>
                        <Typography as="a" href="#" className="cursor-pointer font-medium rounded-full">
                            <ProfileMenu />
                        </Typography>
                        <Typography as="a" href="#" className="cursor-pointer font-medium">
                            <LanguageMenu />
                        </Typography>
                        <Typography className="cursor-pointer font-medium">
                            <h1 className="bg-red-800 rounded-full text-md text-white w-36 pl-2 pt-1 ml-5 h-9 text-center">
                                <CreatePost />
                            </h1>
                        </Typography>
                    </div>
                    {query && searchResults.length > 0 && (
                        <div className="top-12 bg-white shadow-lg rounded-lg mt-2 p-4 max-h-72 overflow-scroll z-20">
                            {searchResults.map((result, index) => (
                                <div key={index} className="p-2 border-b last:border-b-0">
                                    <h2 className='font-bold'>{result?.title}</h2>
                                    <p>{result?.content.length > 90 ? `${result.content.slice(0, 90)}...` : result.content}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                {/* for small screens */}
                <div className="container lg:mx-auto flex flex-wrap justify-center text-gray-900 mb-4 lg:ml-32 lg:gap-2 lg:hidden md:hidden">
                    <div className="relative flex w-full md:w-max xs:flex-wrap justify-between">
                        <Typography as="a" href="#" className="mr-4 cursor-pointer py-1.5 font-medium">
                            <img src={quora} className="w-36 h-6 cursor-pointer xs:w-20" onClick={() => navigate('/home')} alt="Quora" />
                        </Typography>
                        <Input
                            type="search"
                            placeholder="Search Quora"
                            value={query}
                            onChange={handleSearch}
                            containerProps={{
                                className: "xs:w-[30px] h-8",
                            }}
                            className="!border-t-blue-gray-300 pl-9 placeholder:text-blue-gray-300 focus:!border-blue-gray-300"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                        />
                        <div className="xs:block lg:hidden items-center">
                            <button onClick={toggleMenu} className="p-2 focus:outline-none">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                                </svg>
                            </button>
                        </div>
                        {isMenuOpen && (
                            <div className="absolute top-12 left-0 w-full bg-white shadow-lg rounded-lg lg:hidden flex">
                                <Typography as="a" href="#" className="block px-1 py-2 text-gray-900 cursor-pointer">
                                    <Link to="/home">
                                        <Tooltip title="Home">
                                            <Home className="w-7 h-7 md:w-6 md:h-6" />
                                        </Tooltip>
                                    </Link>
                                </Typography>
                                <Typography as="a" href="#" className="block px-1 py-2 text-gray-900 cursor-pointer">
                                    <Link to="/ComingSoon">
                                        <Post className="w-7 h-7 md:w-6 md:h-6" />
                                    </Link>
                                </Typography>
                                <Typography as="a" href="#" className="block px-1 py-2 text-gray-900 cursor-pointer">
                                    <Link to="/Answers">
                                        <Icons className="w-7 h-7 md:w-6 md:h-6" />
                                    </Link>
                                </Typography>
                                <Typography as="a" href="#" className="block px-1 py-2 text-gray-900 cursor-pointer">
                                    <Link to="/ComingSoon">
                                        <Spaces className="w-7 h-7 md:w-6 md:h-6" />
                                    </Link>
                                </Typography>
                                <Link to="/ComingSoon">
                                    <Typography as="span" className="block px-1 py-2 text-gray-900 cursor-pointer">
                                        <Notification className="w-7 h-7" />
                                    </Typography>
                                </Link>
                                <Typography as="a" href="#" className="block px-1 py-2 text-gray-900 cursor-pointer">
                                    <ProfileMenu />
                                </Typography>
                                <Typography className="block px-1 py-2 text-gray-900 cursor-pointer">
                                    <h1 className="bg-red-800 rounded-full text-md text-white w-36 pl-6 h-8">
                                        <CreatePost />
                                    </h1>
                                </Typography>
                            </div>
                        )}
                    </div>
                    {query && searchResults.length > 0 && (
                        <div className="absolute top-12 left-32 bg-white shadow-lg rounded-lg mt-2 p-4 max-h-72 overflow-scroll">
                            {searchResults.map((result, index) => (
                                <div key={index} className="p-2 border-b last:border-b-0">
                                    <h2 className='font-bold'>{result?.title}</h2>
                                    <p>{result?.content.length > 90 ? `${result.content.slice(0, 90)}...` : result.content}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </Navbar>
        </>
    );
};

export default NavbarDefault;
