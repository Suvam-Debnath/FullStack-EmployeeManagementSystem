import React, { use, useEffect, useState } from 'react'
import { getAllDepartments } from '../services/DepartmentService';
import { Link } from 'react-router-dom';

const ListDepartmentComponent = () => {

  

  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    getAllDepartments().then((response) => {
      setDepartments(response.data);
    }).catch((error) => {
      console.log(error);
    });
  }, []);

  return (
    <div className='container'>
        <h2 className='text-center'>List of Departments</h2>
        <Link to="/add-department" className='btn btn-primary mb-2'>Add Department</Link>
        <table className='table table-striped table-bordered'>
            <thead>
                <tr>
                    <th>Department ID</th>
                    <th>Department Name</th>
                    <th>Department Description</th>
                </tr>
            </thead>
            <tbody>
                {departments.map(department => (
                    <tr key={department.id}>
                        <td>{department.id}</td>
                        <td>{department.departmentName}</td>
                        <td>{department.departmentDescription}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}

export default ListDepartmentComponent