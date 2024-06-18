import React from 'react';
import Leftbar from './Sidebar';
import Adds from '../Advertising/Advertising';
import { useUser } from '../Utils/UserProvider';
import MiddleBar from './MiddleBar';
import Navbar from '../Navbar/Navbar';

const Home = () => {
    const { theme } = useUser();
    const colour = {
        backgroundColor: theme === 'light' ? 'rgb(241, 242, 242)' : 'black'
    };
  
    return (
        <div style={colour}>
            <Navbar  />
            <div className='flex '> 
                <Leftbar />
                <MiddleBar/>      
            </div>
            <Adds />
        </div>
    );
};

export default Home;
