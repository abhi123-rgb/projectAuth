import React from 'react'
import { useNavigate } from 'react-router-dom';
import ProfileInfo from './ProfileInfo';

const Navbar = ({userInfo}) => {

  const navigate = useNavigate();
  const onLogout = () => {
    localStorage.clear();
    navigate("/signin");
  }

  return (
    <div className='bg-white flex items-center justify-between px-6 py-2 drop-shadow'>
      <h2 className='text-xl font-medium text-black py-2'>Dashboard</h2>

      <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
    </div>
  )
}

export default Navbar