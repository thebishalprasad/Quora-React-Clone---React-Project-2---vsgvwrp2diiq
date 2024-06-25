import React, { useState, useEffect } from 'react';
import axios from 'axios';
import cooking from "../../assets/Cooking.jpg";
import CreateSpace from '../Spaces/CreateSpace';
import { Link } from 'react-router-dom';
import { useUser } from '../Utils/UserProvider';
import { Typography,List } from "@material-tailwind/react";
import { CHANNEL_API, PROJECT_ID } from '../Utils/Constant';

const Leftbar = () => {
    const { theme } = useUser();
    const token = localStorage.getItem("token");
    const [communities, setCommunities] = useState([]);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const postCardStyle = {
        backgroundColor: theme === 'light' ? 'rgb(240, 240, 240)' : 'black',
        color: theme === 'light' ? 'black' : 'white',
    };

    const fetchCommunities = async () => {
        try {
            const res = await axios.get(`${CHANNEL_API}?limit=6`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'projectID': PROJECT_ID,
                }
            });
            const data = res.data;
            setCommunities(data.data);
        } catch (error) {
            console.error("Error fetching data:", error.message);
        }
    };

    useEffect(() => {
        fetchCommunities();
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleNewCommunity = () => {
        fetchCommunities(); 
    };


    if (windowWidth < 1024) {
        return null;
    }

    return (
        <div className="fixed mt-[5%] ml-[17%] w-[12%] lg:w-[10%] lg:ml-[11%]" style={postCardStyle}>
        <div variant="h5" className="text-black mb-4">
            <CreateSpace onNewCommunity={handleNewCommunity} />
        </div>
        <div className='' >
            {communities.map((comm, idx) => (
                <Link to="/ComingSoon" key={idx} className="text-sm hover:bg-gray-300 hover:rounded-md p-2 flex gap-2 bg-gray-300 " style={postCardStyle}>
                    <img src={cooking} className="h-4 w-4" />
                    <div className="break-words">{comm.name}</div>
                </Link>
            ))}
        </div>
        <div className="mt-4">
            <hr className="bg-blue-gray-400" />
            <h1 className="mt-3 text-gray-500 text-sm">About . Careers .</h1>
            <h1 className="text-gray-500 text-sm">Terms . Privacy .</h1>
            <h1 className="text-gray-500 text-sm">Acceptable Use</h1>
            <h1 className="text-gray-500 text-sm">Terms . Privacy .</h1>
        </div>
    </div>
    );
}

export default Leftbar;
