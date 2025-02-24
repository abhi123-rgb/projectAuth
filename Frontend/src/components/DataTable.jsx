import React from 'react'

const DataTable = ({ employees, handleDelete }) => {
    let count = 1;
    console.log(employees);
    return (
        <>
            <div className="relative  overflow-x-auto overflow-y-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-center rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Employee Id
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Role
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Email
                            </th>
                            <th scope="col" className="px-6 py-3">
                                <span className="sr-only">Edit</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees?.length !== 0 ?
                         employees?.map(employee =>

                            <tr 
                            key={count}
                            className="bg-white border-b border-gray-200 hover:bg-gray-50 text-gray-900 ">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                    {count++}
                                </th>
                                <td className="px-6 py-4">
                                    {employee.fullName}
                                </td>
                                <td className="px-6 py-4">
                                    {employee.role}
                                </td>
                                <td className="px-6 py-4">
                                    {employee.email}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <a
                                        onClick={() => handleDelete(employee._id)}
                                        className="font-medium text-blue-600 cursor-pointer hover:underline">Delete</a>
                                </td>
                            </tr>
                        ) : (
                            <tr className="bg-white border-b border-gray-200 hover:bg-gray-50 text-gray-900 text-center">
                                <td colSpan={5} className='py-5 text-xl'>No Data Available</td>
                            </tr>
                        )} 
                        
                         
                    </tbody>
                </table>
            </div>

        </>
    )
}

export default DataTable