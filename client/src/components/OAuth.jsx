import React from 'react'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { app } from '../firebase'
import { signInSuccess } from '../redux/user/userSlice'
import { useDispatch } from 'react-redux'

const OAuth = () => {
    const dispatch = useDispatch()

    const handleGoogleClick = async () => {
        try {
            const auth = getAuth(app)
            const provider = new GoogleAuthProvider()
            const result = await signInWithPopup(auth, provider)

            // Check if result is as expected
            console.log('Google login result:', result)

            const res = await fetch('/server/auth/google', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: result.user.displayName,
                    email: result.user.email,
                    photo: result.user.photoURL,
                }),
            })
            
            // Check the response from server
            const data = await res.json()
            console.log('Server response:', data)

            // Dispatch Redux action
            dispatch(signInSuccess(data))

        } catch (error) {
            console.error('Google login error:', error)
        }
    }

    return (
        <button
            type='button'
            onClick={handleGoogleClick}
            className='bg-red-700 text-white rounded-lg p-3 mt-3 hover:opacity-75'
        >
            Google Sign In
        </button>
    )
}

export default OAuth
