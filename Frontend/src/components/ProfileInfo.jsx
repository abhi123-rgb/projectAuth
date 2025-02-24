import React from 'react'
import { capitalise } from '../utils/capitalise';

const ProfileInfo = ({userInfo, onLogout}) => {
    console.log(userInfo);
  
  return (
    <>
        {userInfo && (
            <div className='flex items-center gap-3'>
                <div>
                    <p className='text-sm font-medium'>{capitalise(userInfo.fullName)}{", "}{userInfo.role}</p>
                    <button
                        className='text-sm text-slate-700 underline cursor-pointer'
                        onClick={onLogout}
                    >Logout</button>
                </div>
            </div>
        )}
    </>
  )
}

export default ProfileInfo