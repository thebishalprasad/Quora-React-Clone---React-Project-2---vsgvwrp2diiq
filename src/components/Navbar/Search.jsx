import React, { useState } from 'react';
import axios from 'axios';
import { IoIosSearch } from "react-icons/io";   
import { PROJECT_ID } from '../Utils/Constant';

const Search = ({ theme, searchResults, setSearchResults }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = async (e) => {
        const searchTerm = e.target.value;
        setSearchQuery(searchTerm);

        if (searchTerm.length > 1) {
            try {
                const response = await axios.get(`https://academics.newtonschool.co/api/v1/quora/post?search={"content":"${searchTerm}"}`, {
                    headers: {
                        'projectID': PROJECT_ID, 
                    }
                });
                setSearchResults(response.data.data || []);
            } catch (error) {
                console.error("Error fetching search results:", error);
            }
        } else {
            setSearchResults([]);
        }
    };

    const searchBoxStyle = {
        backgroundColor: theme === 'light' ? 'white' : 'transparent',
        color: theme === 'light' ? 'black' : 'white',
    };

    return (
        <div style={searchBoxStyle}>
            <div className='flex items-center px-2 border border-[#DEE0E1] h-5 lg:h-8  w-60 lg:w-80 rounded-md '>
                <div className='flex gap-1 ml-2 items-center'>
                    <IoIosSearch className='text-gray-600 h-5 w-5 cursor-pointer' />
                    <input
                        type='search'
                        id='searchInput'
                        placeholder='Search Quora'
                        className='bg-transparent focus:outline-none lg:w-[320px] text-gray-600 font-light text-base lg:text-base'
                        value={searchQuery}
                        onChange={handleSearch}
                    />
                </div>
            </div>
            {searchQuery && searchResults.length > 0 && (
                <div className="absolute top-12 bg-white shadow-lg rounded-lg mt-2 p-4 max-h-72 overflow-scroll z-20">
                    {searchResults.map((result, index) => (
                        <div key={index} className="p-2 border-b last:border-b-0">
                            <h2 className='font-bold'>{result?.title}</h2>
                            <p>{result?.content.length > 90 ? `${result.content.slice(0, 90)}...` : result.content}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Search;
