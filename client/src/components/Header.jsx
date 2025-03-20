import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaHome, FaUserFriends, FaComment, FaSearch, FaRegUserCircle } from 'react-icons/fa'; // React icons

const Header = () => {
  // useSelector to get current user data
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className=" bg-green-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-4">
        <Link to={'/'} className="flex items-center space-x-2">
          <img
            alt="logo"
            src="/enteGraam_log.png" // Ensure correct path for the image
            className="w-20"
          />
          <h1 className="font-bold text-2xl text-gray-800">EnteGraam</h1>
        </Link>

        {/* Search Bar */}
        <div className="flex items-center border border-gray-300 rounded-full p-2 w-1/3">
          <input
            type="text"
            placeholder="Search"
            className="outline-none pl-2 w-full"
          />
          <FaSearch className="text-gray-600" />
        </div>

        <ul className="flex gap-6 items-center">
          <Link to={'/'} className="text-gray-600 hover:text-black">
            <FaHome size={24} />
          </Link>
          <Link to={'/friends'} className="text-gray-600 hover:text-black">
            <FaUserFriends size={24} />
          </Link>
          <Link to={'/chat'} className="text-gray-600 hover:text-black">
            <FaComment size={24} />
          </Link>
          
          {currentUser ? (
            <Link to="/profile" className="relative">
              <img
                src={currentUser.profilePicture || 'https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg'}
                alt="profile"
                className="h-8 w-8 rounded-full object-cover"
                onError={(e) => e.target.src = 'https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg'} // Fallback image
              />
            </Link>
          ) : (
            <Link to="/sign-in" className="text-gray-600 hover:text-black">
              <FaRegUserCircle size={24} />
            </Link>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Header;
