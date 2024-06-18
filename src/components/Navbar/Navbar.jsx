import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";
import quora from '../../assets/Quora.jpg';
import { Icons, Post, Home, Spaces } from '../Icons';
import { useUser } from '../Utils/UserProvider';
import { Typography, Tooltip } from "@material-tailwind/react";
import CreatePost from '../Post/CreatePost';
import { Notification } from './Notification';
import { ProfileMenu } from './ProfileMenu';
import LanguageMenu from './LanguageMenu';
import Subscription from './Subscription';
import Search from './Search';

const Navbar = () => {
    const { theme } = useUser();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [openNav, setOpenNav] = useState(false);
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

    return (
        <div className="w-full fixed z-10 h-12 xs:flex" style={postCardStyle}>
            <div className="w-full justify-center text-gray-900 mt-2 lg:gap-2 items-center hidden lg:flex">
                <div className="relative flex w-full md:w-max xs:flex-wrap justify-between">
                    <Typography as="a" href="/home" className="mr-6 cursor-pointer font-medium">
                        <img src={quora} className="w-40 h-6 cursor-pointer xs:w-20" onClick={() => navigate('/home')} alt="Quora" />
                    </Typography>
                    <Typography as="a" href="/home" className="mr-5 cursor-pointer font-medium">
                        <Link to="/home">
                            <Tooltip title="Home">
                                <Home className="w-8 h-8 md:w-6 md:h-6" />
                            </Tooltip>
                        </Link>
                    </Typography>
                    <Typography as="a" href="#" className="mr-5 cursor-pointer font-medium">
                        <Link to="/ComingSoon">
                            <Post className="w-7 h-7 md:w-6 md:h-6" />
                        </Link>
                    </Typography>
                    <Typography as="a" href="#" className="mr-5 cursor-pointer font-medium">
                        <Link to="/Answers">
                            <Icons className="w-7 h-7 md:w-6 md:h-6" />
                        </Link>
                    </Typography>
                    <Typography as="a" href="#" className="mr-5 cursor-pointer font-medium">
                        <Link to="/ComingSoon">
                            <Spaces className="w-7 h-7 md:w-6 md:h-6" />
                        </Link>
                    </Typography>
                    <Typography as="a" href="#" className="mr-5 cursor-pointer font-medium">
                        <Link to="/ComingSoon">
                            <Notification className="w-7 h-7 md:w-6 md:h-6" />
                        </Link>
                    </Typography>
                    <div className="flex">
                        <Search theme={theme} searchResults={searchResults} setSearchResults={setSearchResults} />
                    </div>
                    <Typography className="ml-3 mt-1 h-7 w-24 cursor-pointer font-medium text-sm border border-[#575757] rounded-full flex items-center">
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
            </div>
            {/* for small screens */}
            <div className="container lg:mx-auto flex flex-wrap justify-center text-gray-900 mb-4 lg:ml-32 lg:gap-2 lg:hidden md:hidden">
                <div className="relative flex w-full md:w-max xs:flex-wrap justify-between">
                    <Typography as="a" href="#" className="mr-4 cursor-pointer py-1.5 font-medium">
                        <img src={quora} className="w-36 h-6 cursor-pointer xs:w-20" onClick={() => navigate('/home')} alt="Quora" />
                    </Typography>
                    <div className="relative flex-1">
                        <Search theme={theme} searchResults={searchResults} setSearchResults={setSearchResults} />
                    </div>
                    <div className="hidden items-center xs:block ">
                        <button onClick={toggleMenu} className="p-2 focus:outline-none">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                            </svg>
                        </button>
                    </div>
                    {isMenuOpen && (
                        <div className="absolute top-12 left-0 w-full bg-white shadow-lg rounded-lg lg:hidden flex flex-col">
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
            </div>
        </div>
    );
};

export default Navbar;
