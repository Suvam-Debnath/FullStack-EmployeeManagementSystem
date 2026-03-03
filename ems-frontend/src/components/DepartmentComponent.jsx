import React from 'react'
import { useState } from 'react';
import { createDepartment } from '../services/DepartmentService';
import { useNavigate } from 'react-router-dom';

const DepartmentComponent = () => {

    // State variables for department name and description
    const [departmentName, setDepartmentName] = useState('');
    const [departmentDescription, setDepartmentDescription] = useState('');

    const navigate = useNavigate();

    function saveOrUpdateDepartment(e) {
        e.preventDefault();
        const department = { departmentName, departmentDescription };
        console.log(department);

        createDepartment(department).then((response) => {
            console.log(response.data);
            navigate('/departments');
        }).catch((error) => {
            console.log(error);
        });
    }

  return (
    <div className='container'>
        <br />
        <br />
        <div className='row'>
            <div className='card col-md-6 offset-md-3 offset-md-3'>
                <h2 className='text-center'>Add Department</h2>
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