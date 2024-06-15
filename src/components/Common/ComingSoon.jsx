import React from 'react'
import Maintenance from '../../assets/maintenance.png';
import NavbarDefault from '../NavbarDefault';

const ComingSoon = () => {
  return (
    <>   
    <NavbarDefault />  
    <div className="max-w-md mx-auto p-6 rounded-lg shadow-md mt-32">
            <div className="mx-auto mb-6 w-full sm:w-2/4 md:w-3/4 lg:w-2/4 xl:w-3/4 mt-20">
                <img src={Maintenance} alt="Under Maintenance" className="mt-20 w-full h-auto" />
            </div>
            <h2 className="text-center text-xl font-semibold text-gray-800 mb-2">Feature Under Development</h2>
            <p className="text-center text-gray-600">We apologize for the inconvenience. This feature is currently under development. Please check back later.</p>
        </div>
    </>
  )
}

export default ComingSoon