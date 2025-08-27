import React from 'react'
import { useAuth } from '../../context/AuthContext'

function Navbar() {
    const {user}= useAuth()
  return (
    <div className='flex justify-between text-white h-12 bg-teal-600 px-5 py-1'>
        <p>Welcome {user.name}</p>
        <button className='bg-teal-700 hover:bg-teal-800 text-white font-bold py-1 px-2 rounded'
        >Logout</button>
    </div>
  )
}

export default Navbar