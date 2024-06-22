import React from 'react';
import Navbar from './Navbar';

const NotificationItem = () => {
  return (
    <div className="bg-[#EDF1F5] p-4 rounded-lg shadow-lg flex items-start space-x-4">
      <img
        src="https://via.placeholder.com/50"
        alt="User Avatar"
        className="w-12 h-12 rounded-full"
      />
      <div className="flex-1">
        <div className="text-gray-600 text-sm">
          <span className="font-bold">Earn money</span> · Posted in a Space you might like · Tue
        </div>
        <div className="text-gray-800 mt-1">
          Is the 94.1 LPA salary in Bangalore too low for a 32-year-old software engineer?
        </div>
      </div>
      <div className="text-gray-400 text-lg cursor-pointer">...</div>
    </div>
  );
};

const Notification = () => {
  return (
    <div>
      <Navbar />
      <div className="max-w-2xl mx-auto pt-16">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Notification</h2>
          <div className="flex items-center space-x-2">
            <button className="text-blue-500 hover:underline">Mark All As Read</button>
            <button className="text-blue-500 hover:underline">Settings</button>
          </div>
        </div>
        <NotificationItem />
      </div>
    </div>
  );
};

export default Notification;
