import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'

const Header = () => {
  // useSelector
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className='bg-emerald-200'>
        <div className="flex justify-between items-center max-w-6xl mx-auto p-1">
            <Link to={'/'}>
               <img alt='logo' src='../../public/enteGraam_log.png'
                className=' w-20' />
                <h1 className=' font-bold'>EnteGraam</h1> 
            </Link>

            <ul className='flex gap-4'>
                
                <Link to={'/'} >
                  <li>Home</li>
                </Link>
                <Link to={'/'} >
                    <li>About</li>
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
                
                
                
            </ul>
        </div>
    </div>
  )
}

export default Header