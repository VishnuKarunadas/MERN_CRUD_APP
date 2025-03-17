import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className='bg-emerald-200'>
        <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
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
                <Link to={'/sign-in'} >
                   <li>Sign In</li>
                </Link>
                
                
                
            </ul>
        </div>
    </div>
  )
}

export default Header