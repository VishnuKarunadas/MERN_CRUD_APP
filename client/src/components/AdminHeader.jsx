import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import  { signOut } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
export default function AdminHeader() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
    const handleSignOut = async () => {
      try {
        await fetch('/server/auth/signout');
        console.log('sign-out-Admin');
        
        dispatch(signOut());
        navigate('/sign-in');
      } catch (error) {
        console.log(error);
      }
    };
  return (
    <div className='bg-slate-200'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        <Link to='/'>
          <h1 className='font-bold'>Auth App</h1>
        </Link>
        <ul className='flex gap-12'>
          <Link to='/'>
            <li>Dashboard</li>
          </Link>
          {currentUser ? (
            <Link to='/profile'>
              <img
                src={currentUser.profilePicture || 'https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg'}
                alt='profile'
                className='h-7 w-7 rounded-full object-cover'
              />
            </Link>
          ) : (
            <Link to='/sign-in'>
              <li>Sign In</li>
            </Link>
          )}
          <button className='font-bold' onClick={handleSignOut}> signOut</button>
        </ul>
      </div>
    </div>
  );
}
