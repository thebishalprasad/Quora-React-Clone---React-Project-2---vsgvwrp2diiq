import React, { useState, useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom'; 
import { RxDividerVertical } from "react-icons/rx";
import quora from '../../assets/Quora.jpg';
import { useUser } from '../Utils/UserProvider';
import { Tooltip } from '@material-tailwind/react';
import CreatePost from '../Post/CreatePost';
import { ProfileMenu } from './ProfileMenu';
import LanguageMenu from './LanguageMenu';
import Subscription from './Subscription';
import Search from './Search';
import { Answers, Following, Home, Notify, Spaces } from '../Icons';

const Navbar = () => {
    const { theme } = useUser();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
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
                setIsMenuOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="w-full fixed z-10 h-12 xs:flex" style={postCardStyle}>
            <div className="w-full justify-center text-gray-900 items-center hidden lg:flex shadow-md">
                <div className="flex w-full md:w-max xs:flex-wrap justify-between">
                    <NavLink to="/home" activeClassName="text-red-800" className="mr-5 cursor-pointer font-medium ">
                        <img src={quora} className="w-40 h-6 cursor-pointer xs:w-20" onClick={() => navigate('/home')} alt="Quora" />
                    </NavLink>
                    <div className='flex'>
                        <NavLink to="/home" activeClassName="text" className="mr-5 cursor-pointer font-medium">
                            <Tooltip title="Home">
                                <Home className="w-8 h-8 md:w-6 md:h-6" />
                            </Tooltip>
                        </NavLink>
                        <NavLink to="/ComingSoon" activeClassName="text-red-800" className="mr-5 cursor-pointer font-medium">
                            <Tooltip title="Post">
                                <Following className="w-7 h-7 md:w-6 md:h-6" />
                            </Tooltip>
                        </NavLink>
                        <NavLink to="/Answers" activeClassName="text-red-800" className="mr-5 cursor-pointer font-medium">
                            <Tooltip title="Answers">
                                <Answers className="w-7 h-7 md:w-6 md:h-6" />
                            </Tooltip>
                        </NavLink>
                        <NavLink to="/ComingSoon" activeClassName="text-red-800" className="mr-5 cursor-pointer font-medium">
                            <Tooltip title="Spaces">
                                <Spaces className="w-7 h-7 md:w-6 md:h-6" />
                            </Tooltip>
                        </NavLink>
                        <NavLink to="/notification" activeClassName="text-red-800" className="mr-5 cursor-pointer font-medium">
                            <h1 className="lg:pr-2"><Notify/></h1>
                        </NavLink>
                    </div>
                    <div className="flex mr-5">
                        <Search theme={theme} searchResults={searchResults} setSearchResults={setSearchResults} />
                    </div>
                    <div className="h-7 w-24 cursor-pointer font-medium text-sm border border-[#575757] rounded-full flex items-center">
                        <Tooltip title="Try Quora">
                            <Subscription />
                        </Tooltip>
                    </div>
                    <div className="cursor-pointer font-medium rounded-full">
                        <ProfileMenu />
                    </div>
                    <div className="cursor-pointer font-medium mr-4 ">
                        <LanguageMenu />
                    </div>
                    <div class="flex items-center rounded-full bg-red-800">
                        <button class="relative flex items-center justify-center h-7 text-white rounded-l-full pl-3 cursor-pointer">
                            <span class="text-sm">Add question</span>
                        </button>
                        <RxDividerVertical className='text-gray-300 h-3 lg:h-5 w-3 lg:w-5 hidden lg:flex' />
                        <button class="relative flex items-center justify-center h-7 text-white rounded-r-full pr-2 cursor-pointer">
                            <svg class="w-4 h-4 stroke-current text-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 8.5l7 7 7.005-7" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" fill="none" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            {/* for small screens */}
            <div className="container lg:mx-auto flex flex-wrap justify-center text-gray-900 mb-4 lg:ml-32 lg:gap-2 lg:hidden md:hidden">
                <div className="relative flex w-full md:w-max xs:flex-wrap justify-between">
                    <NavLink to="/home" activeClassName="text-red-800" className="mr-4 cursor-pointer py-1.5 font-medium">
                        <img src={quora} className="w-36 h-6 cursor-pointer xs:w-20" onClick={() => navigate('/home')} alt="Quora" />
                    </NavLink>
                    <div className="relative flex-1">
                        <Search theme={theme} searchResults={searchResults} setSearchResults={setSearchResults} />
                    </div>
                    <div className="hidden items-center xs:block">
                        <button onClick={toggleMenu} className="p-2 focus:outline-none">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                            </svg>
                        </button>
                    </div>
                    {isMenuOpen && (
                        <div className="absolute top-12 left-0 w-full bg-white shadow-lg rounded-lg lg:hidden flex flex-col">
                            <NavLink to="/home" activeClassName="text-red-800" className="block px-1 py-2 text-gray-900 cursor-pointer">
                                <Tooltip title="Home">
                                    <Home className="w-7 h-7 md:w-6 md:h-6" />
                                </Tooltip>
                            </NavLink>
                            <NavLink to="/ComingSoon" activeClassName="text-red-800" className="block px-1 py-2 text-gray-900 cursor-pointer">
                                <Tooltip title="Post">
                                    <Post className="w-7 h-7 md:w-6 md:h-6" />
                                </Tooltip>
                            </NavLink>
                            <NavLink to="/Answers" activeClassName="text-red-800" className="block px-1 py-2 text-gray-900 cursor-pointer">
                                <Tooltip title="Answers">
                                    <Icons className="w-7 h-7 md:w-6 md:h-6" />
                                </Tooltip>
                            </NavLink>
                            <NavLink to="/ComingSoon" activeClassName="text-red-800" className="block px-1 py-2 text-gray-900 cursor-pointer">
                                <Tooltip title="Spaces">
                                    <Spaces className="w-7 h-7 md:w-6 md:h-6" />
                                </Tooltip>
                            </NavLink>
                            <NavLink to="/ComingSoon" activeClassName="text-red-800" className="block px-1 py-2 text-gray-900 cursor-pointer">
                                <Tooltip title="Notification">
                                    <Notification className="w-7 h-7" />
                                </Tooltip>
                            </NavLink>
                            <div className="block px-1 py-2 text-gray-900 cursor-pointer">
                                <ProfileMenu />
                            </div>
                            <div className="block px-1 py-2 text-gray-900 cursor-pointer">
                                <h1 className="bg-red-800 rounded-full text-md text-white w-36 pl-6 h-8">
                                    <CreatePost />
                                </h1>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
