import React, { useState } from 'react';
import { MdClose } from 'react-icons/md';
import axiosInstance from '../utils/axiosAPI';

const AddEmployees = ({userInfo, onClose}) => {
    const [fullName, setFullName] =useState("");
    const [email, setEmail] =useState("");
    const [password, setPassword] =useState("");
    const [role, setRole] =useState("Employee");
    const [error, setError] =useState("");
    const [success, setSuccess] =useState("");
    
    const addNewEmployee = async () => {

        try {
            const response = await axiosInstance.post("/createEmployees",{
                fullName,
                email,
                password,
                role
            });

            if(response) {
                setError(""),setEmail(""),setPassword(""),setFullName("");
                setSuccess("Employee Added Successfully");
            }

        }catch(error) {
            if (
                error.response &&
                error.response.data &&
                error.response.data.message
            ) {
                setSuccess("");
                setError(error.response.data.message);
            }
        }
    }
    
  return (
    <div className='relative'>

    <button className='w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-50 cursor-pointer' 
    onClick={onClose}>
        <MdClose className='text-xl text-slate-400' />
    </button>
    <div className='flex flex-col gap-1 mt-4'>
        <label className='input-label'> Name </label>
        <input
            type="text"
            className=' rounded-md bg-white px-3 py-1.5 text-lg text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 sm:text-sm/6'
            placeholder=' Smith'
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
        />
    </div>

    <div className='flex flex-col gap-1 mt-4'>
        <label className='input-label'> Email </label>
        <input
            type="text"
            className='rounded-md bg-white px-3 py-1.5 text-lg text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 sm:text-sm/6'
            placeholder='example@gmail.com'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
        />
    </div>

    <div className='flex flex-col gap-1 mt-4' >
        <label className='input-label'> Password </label>
        <input
            type="text"
            className=' rounded-md bg-white px-3 py-1.5 text-lg text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 sm:text-sm/6'
            placeholder='**********'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
        />
    </div>

    <div className='flex flex-col gap-2 mt-4'>
        <label className='input-label'>Select Role</label>
        {userInfo?.role == "Admin" ? (
            <select 
            id="role" 
            className=" rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 sm:text-sm/6"
            value={role} 
            onChange={(e) => setRole(e.target.value)}>
                <option value="Manager">Manager</option>
                <option value="Employee">Employee</option>
            </select>
        ) : (
            <select 
            id="role" 
            className=" rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 sm:text-sm/6"
            value={role} 
            onChange={(e) => setRole(e.target.value)}>
                <option value="Employee">Employee</option>
            </select>
        )}
        
    </div>

    {error ? 
    <p className='text-red-500 text-xs pt-4'>{error}</p> : 
    success ? 
    <p className='text-green-500 text-xs pt-4'>{success}</p> :
    null }

    <button
        className='btn-primary font-medium mt-5 px-5 rounded-3xl py-1.5 bg-sky-400 text-white'
        onClick={addNewEmployee}
    > Add </button>
</div>
  )
}

export default AddEmployees