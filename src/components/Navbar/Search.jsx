import React, { useState } from 'react';
import axios from 'axios';
import { Input, Tooltip, Typography } from "@material-tailwind/react";
import { PROJECT_ID } from './Utils/constant';

const Search = ({ theme, searchResults, setSearchResults }) => {
    const [query, setQuery] = useState('');

    const handleSearch = async (e) => {
        const searchTerm = e.target.value;
        setQuery(searchTerm);

        if (searchTerm.length > 1) {
            try {
                const response = await axios.get(`https://academics.newtonschool.co/api/v1/quora/post?search={"content":"${searchTerm}"}`, {
                    headers: {
                        'projectID': PROJECT_ID
                    }
                });
                setSearchResults(response.data.data);
                console.log(response.data.data);
            } catch (error) {
                console.error("Error fetching search results:", error);
            }
        } else {
            setSearchResults([]);
        }
    };

    const searchBoxStyle = {
        backgroundColor: theme === 'light' ? 'white' : 'gray',
        color: theme === 'light' ? 'black' : 'white',
    };

    return (
        <div className="relative w-full md:w-max" style={searchBoxStyle}>
            <Input
                type="search"
                placeholder="Search Quora"
                value={query}
                onChange={handleSearch}
                containerProps={{
                    className: "lg:w-[300px] mr-2",
                }}
                className="!border-t-blue-gray-300 placeholder:text-blue-gray-300 focus:!border-blue-gray-300"
                labelProps={{
                    className: "before:content-none after:content-none",
                }}
            />
            <div className="!absolute top-[11px] right-[20px]">
                <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Zm10.45 2.95L16 16l4.95 4.95Z" className="icon_svg-stroke" stroke="#666" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
            </div>
            {query && searchResults.length > 0 && (
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
