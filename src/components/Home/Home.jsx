import React from 'react';
import Rightbar from '../Rightbar';
import Leftbar from '../Leftbar';
import Adds from '../Common/Adds';
import { useUser } from '../Utils/UserProvider';
import NavbarDefault from '../NavbarDefault';

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
                <Rightbar/>      
            </div>
            <Adds />
        </div>
    );
};

export default Home;
