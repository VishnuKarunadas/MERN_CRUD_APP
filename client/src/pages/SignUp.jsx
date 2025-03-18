import React from 'react'
import {Link} from 'react-router-dom'
const SignUp = () => {
  return (
    <div className='p-3 max-w-lg mx-auto '>
      <h1 className='text-3xl text-center font-semibold  my-7'>Sign Up</h1>
      <form action="" className='flex flex-col gap-4'>
        <input type='text' placeholder='User Name' id='userName' className='bg-slate-100 p-3 rounded-lg'/>
        <input type='text' placeholder='email' id='email' className='bg-slate-100 p-3 rounded-lg'/>
        <input type='password' placeholder='password' id='password' className='bg-slate-100 p-3 rounded-lg'/>
        <button type="submit" className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>Sign Up</button>
      </form>
      <div className='flex mt-3 gap-3'>
        <p>Have an Account ?</p>
        <Link to='/sign-in'>
        <span className='text-blue-500'>Sign in</span></Link>
        
      </div>
    </div>
  )
}

export default SignUp