import React from 'react'
import Maintenance from '../../assets/maintenance.png';
import Navbar from '../Navbar/Navbar';

const ComingSoon = () => {
  return (
    <>   
    <Navbar />  
    <div className="max-w-md mx-auto p-6 rounded-lg shadow-md ">
            <div className="mx-auto w-full sm:w-2/4 md:w-3/4 lg:w-2/4 xl:w-3/4 mt-20">
                <img src={Maintenance} alt="Under Maintenance" className="mt-20 w-full " />
            </div>
            <h2 className="text-center text-xl font-semibold text-gray-800 mb-2">Feature Under Development</h2>
            <p className="text-center text-gray-600">We apologize for the inconvenience. This feature is currently under development. Please check back later.</p>
        </div>
    </>
  )
}

export default ComingSoon