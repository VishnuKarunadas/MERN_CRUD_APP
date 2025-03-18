import React, { useState } from 'react'
import {Link} from 'react-router-dom'
const SignUp = () => {
  const [formData,setFormData] = useState({});
  const [error,setError]= useState(false);
  const [errorMessage,setErrorMessage]= useState(null);
  const [loading,setLoading] = useState(false)
  const handleChange =(e)=>{
    setFormData({...formData, [e.target.id]: e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      setLoading(true)
      const res = await fetch('/server/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  

      if (!res.ok) {
        const responseData = await res.json();
        throw new Error(responseData.message || "An Error Occured");
      }
      const responseData = await res.json();
      setLoading(true)
      setError(false)
      console.log(responseData);
      
    } catch (error) {
      setLoading(false);
      setError(true);

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
      <h1 className='text-3xl text-center font-semibold  my-7'>Sign Up</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type='text' placeholder='User Name' id='userName' className='bg-slate-100 p-3 rounded-lg' 
        onChange={handleChange}  />
        <input type='text' placeholder='email' id='email' className='bg-slate-100 p-3 rounded-lg'
        onChange={handleChange}  />
        <input type='password' placeholder='password' id='password' className='bg-slate-100 p-3 rounded-lg'
        onChange={handleChange}  />
        <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>{loading ? "loading..." :"Sign Un"}</button>
      </form>
      <div className='flex mt-3 gap-3'>
        <p>Have an Account ?</p>
        <Link to='/sign-in'>
        <span className='text-blue-500'>Sign in</span></Link>
      </div>
      <p className='text-red-500'>{errorMessage ? errorMessage :""}</p>
    </div>
  )
}

export default SignUp