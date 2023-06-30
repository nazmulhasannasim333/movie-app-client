import React from 'react';
import { FaRegGrinAlt } from "react-icons/fa";
import { Link, useRouteError } from 'react-router-dom';

const ErrorPage = () => {
  const { error, status } = useRouteError()
  return (
    <div className='flex items-center p-16 '>
      <div className='container flex flex-col items-center justify-center px-5 mx-auto my-8'>
       
        <FaRegGrinAlt className='w-40 h-40 text-red-600' />
        <div className='max-w-md text-center'>
          <h2 className='mb-8 font-extrabold text-9xl text-indigo-500'>
            <span className='pe-5'>Error</span>
            {status || 404}
          </h2>
          <p className='text-2xl font-semibold md:text-3xl text-red-800 mb-8'>
            {error?.message}
          </p>
          <Link to='/' className=' text-white bg-blue-500 py-2 px-3 rounded-md'>
            Back to homepage
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ErrorPage;
