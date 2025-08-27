import React from 'react'
import { Link } from 'react-router-dom'

function Department() {
  return (
     <div div className="p-5">
    <div className='text-center'>
      <h3 className='text-2xl font-bold'>Manage Department</h3>
    </div>
    <div className='justify-between flex items-center'>
      <input type="text" placeholder='search by dep name' className='px-4 py-0.5 border border-teal-400' />
      <Link to="/admin-dashboard/add" className='px-4 py-1 bg-teal-600 rounded text-white'>Add Department</Link>
    </div>
   </div>
  )
}

export default Department