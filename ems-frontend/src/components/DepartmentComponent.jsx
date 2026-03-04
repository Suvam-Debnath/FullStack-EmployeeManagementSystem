import React, { useEffect } from 'react'
import { useState } from 'react';
import { createDepartment, getDepartmentById } from '../services/DepartmentService';
import { useNavigate , useParams} from 'react-router-dom';
import { updateDepartment } from '../services/DepartmentService';

const DepartmentComponent = () => {

    // State variables for department name and description
    const [departmentName, setDepartmentName] = useState('');
    const [departmentDescription, setDepartmentDescription] = useState('');

    const { id } = useParams(); // Get the department ID from the URL parameters

    const navigate = useNavigate();

    // useEffect to fetch department details if an ID is provided (for update)
    useEffect(() => {
       getDepartmentById(id).then((response) => {
        setDepartmentName(response.data.departmentName);
        setDepartmentDescription(response.data.departmentDescription);
       }).catch((error) => {
        console.log(error);
       });
    }, [id]);

    // Function to handle form submission for creating or updating a department
    function saveOrUpdateDepartment(e) {
        e.preventDefault();
        const department = { departmentName, departmentDescription };
        console.log(department);

        if (id) {
            // If an ID is present, update the existing department
            updateDepartment(id, department).then((response) => {
                console.log(response.data);
                navigate('/departments');
            }).catch((error) => {
                console.log(error);
            });
        } else {
            // If no ID is present, create a new department
            createDepartment(department).then((response) => {
                console.log(response.data);
                navigate('/departments');
            }).catch((error) => {
                console.log(error);
            });
        }
    }

    function pageTitle() {
        if (id) {
            return <h2 className='text-center'>Update Department</h2>;
        } else {
            return <h2 className='text-center'>Add Department</h2>;
        }
    }

  return (
    <div className='container'>
        <br />
        <br />
        <div className='row'>
            <div className='card col-md-6 offset-md-3 offset-md-3'>
                {pageTitle()}
                <div className='card-body'>
                    <form>
                        <div className='form-group mb-2'>
                          <label className='form-label'>Department Name:</label>
                          <input
                            type='text'
                            name='departmentName'
                            placeholder='Enter Department Name'
                            className='form-control'
                            value={departmentName}
                            onChange={(e) => setDepartmentName(e.target.value)}

                          >
                          </input>
                      </div>
                        <div className='form-group mb-2'>
                          <label className='form-label'>Department Description:</label>
                          <input
                            type='text'
                            name='departmentDescription'
                            placeholder='Enter Department Description'
                            value={departmentDescription}
                            onChange={(e) => setDepartmentDescription(e.target.value)}
                            className='form-control'
                          >
                          </input>
                      </div>
                      <button className='btn btn-success mb-2' onClick={(e) => saveOrUpdateDepartment(e)}>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default DepartmentComponent