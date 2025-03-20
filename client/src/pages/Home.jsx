import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const Home = ({ data }) => {
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
const { currentUser } = useSelector((state) => state.user);
  const handleLike = () => {
    setLikes(likes + 1);
  };

  const handleCommentChange = (e) => {
    setCommentText(e.target.value);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (commentText.trim() !== '') {
      setComments([...comments, commentText]);
      setCommentText('');
    }
  };

  return (
    <div className="bg-[url('/Aesthetic-Black-Wallpaper-4K-Background.jpg')] bg-cover bg-center min-h-screen p-4">
      <div className="max-w-xl mx-auto bg-white p-4 rounded-lg shadow-lg">
        <div className="flex items-center mb-4">
          <img
            src="https://www.w3schools.com/w3images/avatar2.png"
            alt="Profile"
            className="w-10 h-10 rounded-full mr-3"
          />
          <div>
            <div className="font-semibold">User Name</div>
            <div className="text-gray-500 text-sm">2 hours ago</div>
          </div>
        </div>

        <div className="mb-4">
          <p>{data ? data.message : "Loading..."}</p>
        </div>

        <div className="flex justify-between items-center text-gray-600">
          <div className="flex items-center space-x-4">
            <button onClick={handleLike} className="flex items-center">
              <svg
                className="w-5 h-5 fill-current text-red-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
              </svg>
              <span className="ml-2">{likes} Likes</span>
            </button>
            <button className="flex items-center">
              <svg
                className="w-5 h-5 text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 2H8c-1.104 0-2 .896-2 2v16c0 1.104.896 2 2 2h13c1.104 0 2-.896 2-2V4c0-1.104-.896-2-2-2zM8 20V4h13v16H8z"></path>
              </svg>
              <span className="ml-2">Share</span>
            </button>
          </div>
          <button className="flex items-center">
            <svg
              className="w-5 h-5 text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 10V3H8v2H6V1h15v9h-2zm-1 8v3H9v-3H7v5h13v-5h-1z"></path>
            </svg>
            <span className="ml-2">Comment</span>
          </button>
        </div>

        <div className="mt-4">
          <form onSubmit={handleCommentSubmit} className="flex">
            <input
              type="text"
              placeholder="Add a comment..."
              value={commentText}
              onChange={handleCommentChange}
              className="flex-1 p-2 border border-gray-300 rounded-l-lg"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-r-lg"
            >
              Post
            </button>
          </form>

          <div className="mt-4">
            {comments.map((comment, index) => (
              <div key={index} className="flex items-center mb-2">
                <img
                  src= {currentUser.profilePicture ||  "https://www.w3schools.com/w3images/avatar2.png"}
                  alt="Profile"
                  className="w-6 h-6 rounded-full mr-2"
                />
                <div className="text-gray-700">{comment}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
