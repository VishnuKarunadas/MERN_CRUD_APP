import { useSelector } from 'react-redux';
import { useRef, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signOut,
} from '../redux/user/userSlice';
import Popup from './Popup';

export default function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const { currentUser, loading, error } = useSelector((state) => state.user);


  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [popupType, setPopupType] = useState('');

  // Trigger the popup for success or error message
 useEffect(() => {
    if (updateSuccess) {
      setPopupMessage('User is updated successfully!');
      setPopupType('success');
      setShowPopup(true);
    } else if (error) {
      setPopupMessage('Something went wrong!');
      setPopupType('error');
      setShowPopup(true);
    }
  }, [updateSuccess, error]);

  const handlePopupClose = () => {
    setShowPopup(false); // Close the popup
  };

  
  useEffect(() => {
    if (!currentUser) {
      navigate('/sign-in');
    }
  }, [currentUser, navigate]);

  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);

  const handleFileUpload = async (image) => {
    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', import.meta.env.VITE_CLOUD_PRESET);
    try {
      setImagePercent(30);
      const cloudName = import.meta.env.VITE_CLOUD_NAME;

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );
      const data = await res.json();
      if (data.secure_url) {
        setImagePercent(100);
        setFormData((prev) => ({ ...prev, profilePicture: data.secure_url }));
      } else {
        throw new Error('Upload failed');
      }
    } catch (error) {
      setImageError(true);
      setImagePercent(0);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/server/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log('---------------');
      
      console.log(data);
      
      if (data.success === false) {
        dispatch(updateUserFailure(data));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error));
    }
  };

  const handleDeleteAccount = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/server/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error));
    }
  };

  const handleSignOut = async () => {
    try {
      await fetch('/server/auth/signout');
      dispatch(signOut());
      navigate('/sign-in');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-20 mt-20 max-w-lg mx-auto bg-gray-100">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      {currentUser && (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="file"
            ref={fileRef}
            hidden
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                if (!file.type.startsWith("image/")) {
                  setImageError(true);
                  return;
                }
                if (file.size > 2 * 1024 * 1024) {
                  setImageError(true);
                  return;
                }
                setImageError(false);
                setImage(file);
              }
            }}
          />
          <img
            src={formData.profilePicture || currentUser.profilePicture || 'https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg'}
            alt="profile"
            className="h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2"
            onClick={() => fileRef.current.click()}
          />
          <p className="text-sm self-center">
            {imageError ? (
              <span className="text-red-700">Error uploading image (file size must be less than 2 MB)</span>
            ) : imagePercent > 0 && imagePercent < 100 ? (
              <span className="text-slate-700">{`Uploading: ${imagePercent} %`}</span>
            ) : imagePercent === 100 ? (
              <span className="text-green-700">Image uploaded successfully</span>
            ) : (
              ''
            )}
          </p>
          <input
            defaultValue={currentUser.userName}
            type="text"
            id="username"
            placeholder="Username"
            className="bg-slate-300 rounded-lg p-3"
            onChange={handleChange}
          />
          <input
            defaultValue={currentUser.email}
            type="email"
            id="email"
            placeholder="Email"
            className="bg-slate-300 rounded-lg p-3"
            onChange={handleChange}
          />
          <input
            type="password"
            id="password"
            placeholder="Password"
            className="bg-slate-300 rounded-lg p-3"
            onChange={handleChange}
          />
          <button className="bg-black text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
            {loading ? 'Loading...' : 'Update'}
          </button>
        </form>
      )}
      <div className="flex justify-between mt-5">
        <button onClick={handleDeleteAccount} className="p-1 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 cursor-pointer bg-red-400">
          Delete Account
        </button>
        <span onClick={handleSignOut} className="text-red-700 cursor-pointer">
          Log out
        </span>
      </div>
      <p className="text-red-700 mt-5">{error && 'Something went wrong!'}</p>
      <p className="text-green-700 mt-5">{updateSuccess && 'User is updated successfully!'}</p>

      {/* Popup Modal */}
      {showPopup && (
        <Popup message={popupMessage} onClose={handlePopupClose} type={popupType} />
      )}
    </div>
  );
};