import React, { useState, useEffect } from 'react';
import adds from "../../assets/Adds.jpg";
import adds1 from "../../assets/Adds1.jpg";

const Adds = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    if (windowWidth < 1024) { 
        return null;
    }

    return (
        <div className='border bg-gray-300 absolute top-16 right-28 lg:w-80 '>
            <div>
                <img src={adds} className='p-2' />
                <img src={adds1} className='p-2' />
            </div>
            <div className='text-center border bg-blue-gray-50'>
                Advertisement
            </div>
        </div>
    );
}

export default Adds;
