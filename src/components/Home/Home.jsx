import React from 'react';
import Leftbar from './Leftbar';
import Adds from '../Common/Adds';
import { useUser } from '../Utils/UserProvider';
import NavbarDefault from '../Navbar/NavbarDefault';
import MiddleBar from './MiddleBar';

const Home = () => {
    const { theme } = useUser();
    const colour = {
        backgroundColor: theme === 'light' ? 'rgb(241, 242, 242)' : 'black'
    };
  
    return (
        <div style={colour}>
            <NavbarDefault  />
            <div className='flex'> 
                <Leftbar />
                <MiddleBar/>      
            </div>
            <Adds />
        </div>
    );
};

export default Home;
