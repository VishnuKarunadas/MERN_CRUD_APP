import React, { useState } from 'react'
import {data, Link, useNavigate} from 'react-router-dom'
import { signInFailure, signInStart, signInSuccess } from '../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';






const SignIn = () => {
  const [formData,setFormData] = useState({});
  // const [error,setError]= useState(false);
  const [errorMessage,setErrorMessage]= useState(null);
  // const [loading,setLoading] = useState(false)

  const {loading,error} = useSelector((state)=> state.user);




  const navigate = useNavigate();
  const dispatch = useDispatch()


  const handleChange =(e)=>{
    setFormData({...formData, [e.target.id]: e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {

      dispatch(signInStart());

      // setLoading(true)
      const res = await fetch('/server/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  

      if (!res.ok) {
        const responseData = await res.json();
        dispatch(signInFailure(responseData.message))
        throw new Error(responseData.message || "An Error Occured");
      }
      const responseData = await res.json();
      // setLoading(true)
      dispatch(signInSuccess(responseData))
      // setError(false)
      console.log(responseData);

      // navigate to home page
      navigate('/')
      
    } catch (error) {
      // setLoading(false);
      // setError(true);
      dispatch(signInFailure(error))

      if (error.response) {
        // Error object from fetch with response
        console.error('Error response:', error.response);
        setErrorMessage(error.response)
      } else if (error.message) {
        // Error message from the server (e.g., from throw new Error())
        console.error('Error message:', error.message);
        setErrorMessage(error.message)
      } else {
        console.error('Unknown error occurred');
        setErrorMessage('Unknown error occurred')

      }
    }
  };
  
  
  return (
    <div className='p-3 max-w-lg mx-auto '>
      <h1 className='text-3xl text-center font-semibold  my-7'>Sign In</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        
        <input type='text' placeholder='email' id='email' className='bg-slate-100 p-3 rounded-lg'
        onChange={handleChange}  />
        <input type='password' placeholder='password' id='password' className='bg-slate-100 p-3 rounded-lg'
        onChange={handleChange}  />
        <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>{loading ? "loading..." :"Sign In"}</button>
      </form>
      <div className='flex mt-3 gap-3'>
        <p>Create an Account</p>
        <Link to='/sign-up'>
        <span className='text-blue-500'>Sign up</span></Link>
      </div>
      <p className='text-red-500'>{errorMessage ? errorMessage :""}</p>
    </div>
  )
}

export default SignIn