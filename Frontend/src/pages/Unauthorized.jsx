import React, { useEffect } from 'react'
import AccessDenied from '../assets/AccessDenied.webp';
import { useNavigate } from 'react-router-dom';

const Unauthorized = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const timeSlice = setTimeout(() => {
            navigate('/signin');
        }, 3000)

        return () => {
            clearTimeout(timeSlice);
        }
    }, [])
    return (
        <div className='flex flex-col items-center justify-center mt-20'>
            <img src={AccessDenied} alt="no-notes" className='w-60' />

            <p className='w-1/2 text-md font-medium text-slate-700 text-center leading-7 mt-5'>
                Unauthorized! Access Denied
            </p>
        </div>
    )
}

export default Unauthorized