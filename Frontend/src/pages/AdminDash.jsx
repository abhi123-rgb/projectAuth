import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosAPI';
import Navbar from '../components/Navbar';
import Modal from 'react-modal';
import { MdAdd } from 'react-icons/md';
import AddEmployees from './AddEmployees';
import DataTable from '../components/DataTable';
import { capitalise } from '../utils/capitalise';

const AdminDash = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [allEmployee, setAllEmployee] = useState([]);
  const [allAdmins, setAllAdmins] = useState([]);

  const allEmployees = allEmployee.data;
  const getUserInfo = async () => {

    try {
      const response = await axiosInstance.get("/getadminInfo");
      console.log(response.data);
      if (response.data.role !== "Admin") {
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

  const getAllEmployee = async () => {

    try {
      const response = await axiosInstance.get("/getallEmployees");
      console.log(response.data);

      if (response.data && response.data) {
        setAllEmployee(response.data);
      }
    } catch (error) {
      console.log(error);
      if (error.response.status === 403 || error.response.status === 401) {
        localStorage.clear();
        navigate("/unauthorize");
      }
    }
  };

  const getAllAdmins = async () => {

    try {
      const response = await axiosInstance.get("/getallAdmins");
      console.log(response.data);

      if (response.data && response.data) {
        setAllAdmins(response.data);
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
      const response = await axiosInstance.get("/getallAdminEmployee");

      if (response.data && response.data) {
        console.log(response.data.data);
        setEmployees(response.data.data);
      }
    } catch (error) {
      console.log(error);
      if (error.response.status === 403 || error.response.status === 401) {
        localStorage.clear();
        navigate("/unauthorize");
      }
    }
  };


  const handleDelete = async (id) => {
    try {
      const response = await axiosInstance.delete(`/deleteEmployee/${id}`);
      if (response) {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
      console.log("An unexpected error occured. Please try again.");
    }
  }

  useEffect(() => {
    getEmployees();
    getAllEmployee();
    getAllAdmins();


    return () => { };
  }, [allEmployee, employees]);

  useEffect(() => {
    getUserInfo();

    return () => { };
  }, []);

  const managerCount = allEmployee?.data?.filter(allEmployee => allEmployee.role == "Manager").length;
  const employeeCount = allEmployee?.data?.filter(allEmployee => allEmployee.role == "Employee").length;
  const adminCount = allAdmins?.data?.filter(allAdmin => allAdmin.role == "Admin").length;
  console.log(adminCount);

  return (
    <>
      <Navbar
        userInfo={userInfo}
      />


      <div className='p-6'>
        <h1 className='text-2xl font-semibold mb-3'>Welcome, {capitalise(userInfo?.fullName)}</h1>
        <div>
          <div className='grid grid-cols-3 gap-3 py-4 max-[600px]:grid-cols-1'>
            <div className='p-6 rounded-lg bg-linear-to-r from-cyan-200 via-blue-400 to-indigo-600'>
              <span className='text-6xl font-bold'>{managerCount}</span>
              <p className='text-lg'>Manager Users</p></div>
            <div className='p-6 rounded-lg bg-linear-to-r from-pink-200 via-purple-400 to-indigo-600 '>
              <span className='text-6xl font-bold'>{employeeCount}</span>
              <p className='text-lg'>Employee Users</p></div>
            <div className='p-6 rounded-lg bg-linear-to-r from-green-200 via-emerald-400 to-teal-600'>
              <span className='text-6xl font-bold'>{adminCount}</span>
              <p className='text-lg'>Admin Users</p></div>
          </div>
          <div className='grid grid-cols-2 gap-4 max-[900px]:grid-cols-1 mt-4'>
            <div>
              <h2 className='text-lg font-medium mb-3'>Admin's Employee</h2>
              <DataTable employees={employees} handleDelete={handleDelete} />
            </div>
            <div>
              <h2 className='text-lg font-medium mb-3'>All Employees</h2>
              <DataTable employees={allEmployees} handleDelete={handleDelete} />
            </div>
          </div>

        </div>
      </div>


      <button
        className='w-16 h-16 flex items-center justify-center rounded-full bg-blue-600  bg-primary hover:bg-blue-600  fixed right-10 bottom-10'
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
          userInfo={userInfo}
          onClose={() => {
            setOpenModal(false)
          }}
        />
      </Modal>
    </>
  )
}

export default AdminDash