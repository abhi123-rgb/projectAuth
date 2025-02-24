import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import axiosInstance from '../utils/axiosAPI';
import { useNavigate } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';
import Modal from 'react-modal';
import AddEmployees from './AddEmployees';
import { capitalise } from '../utils/capitalise';
import DataTable from '../components/DataTable';


const ManagerDash = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();
  
  const getUserInfo = async () => {
    
    try {
      const response = await axiosInstance.get("/getmanagerInfo");
      console.log(response.data.role);
      if (response.data.role !== "Manager") {
        navigate("/signin");
        return;
      }

      if (response.data && response.data) {
        setUserInfo(response.data);
      }
    } catch (error) {
      console.log(error);
      if (error.response.status === 403 || error.response.status === 401) {
        localStorage.clear();
        navigate("/unauthorize");
      }
    }
  };

  const getEmployees = async () => {
    try {
      const response = await axiosInstance.get("/getallManagerEmployee");
      console.log(response.data.data);
      if (response.data && response.data) {
        setEmployees(response.data.data);
      }
    } catch (error) {
      console.log("An unexpected error occured. Please try again.")
    }
  };

  const handleDelete = async(id) => {
    try {
      const response = await axiosInstance.delete(`/deleteEmployee/${id}`);
      if(response) {
        console.log(response);
      }
    }catch(error) {
      console.log(error);
      console.log("An unexpected error occured. Please try again.");
    }
  }


  useEffect(() => {
    getUserInfo();
   
    return () => {}
  }, []);

  useEffect(() => {
    getEmployees();
    
  },[employees]);

  const employeeCount = employees?.filter(allEmployee => allEmployee.role == "Employee").length;
  console.log(employeeCount)

  return (
    <>
      <Navbar 
      userInfo={userInfo}
      />
      
      <div className='p-6'>
        <h1 className='text-2xl font-semibold mb-3'>Welcome, {capitalise(userInfo?.fullName)}</h1>
        <div className='py-3'>
        <div className='grid grid-cols-3 gap-3 py-4 max-[600px]:grid-cols-1'>
            <div className='p-6 rounded-lg bg-linear-to-r from-cyan-200 via-blue-400 to-indigo-600'>
              <span className='text-6xl font-bold'>{employeeCount}</span>
              <p className='text-lg'>Manager Users</p></div>
          </div>
          <div className='grid grid-cols-1 gap-4 mt-4'>
            <div>
              <h2 className='text-lg font-medium mb-3'>Manager's Employee</h2>
              <DataTable employees={employees} handleDelete={handleDelete} />
            </div>
            
          </div>

        </div>
      </div>

      <button
        className='w-16 h-16 flex items-center justify-center rounded-full bg-blue-600 bg-primary hover:bg-blue-600 absolute right-10 bottom-10'
        onClick={() => setOpenModal(true)}
      >
        <MdAdd className='text-[32px] text-white' />
      </button>

      <Modal
        isOpen={openModal}
        onRequestClose={() => { }}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)"
          },
        }}
        contentLabel=""
        className="max-w-[80%] sm:max-w-[50%] max-h-3/4 bg-white rounded-md mx-auto mt-14 px-8 py-5 overflow-scroll no-scrollbar"
      >
        <AddEmployees
          userInfo= {userInfo}
          onClose={() => {
            setOpenModal(false)
          }}
        />
      </Modal>

    </>
  )
}

export default ManagerDash;