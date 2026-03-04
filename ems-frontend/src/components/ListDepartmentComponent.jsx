import React, { use, useEffect, useState } from 'react'
import { getAllDepartments } from '../services/DepartmentService';
import { Link ,useNavigate} from 'react-router-dom';
import { deleteDepartment } from '../services/DepartmentService';

const ListDepartmentComponent = () => {

  

  const [departments, setDepartments] = useState([]);

  const navigate = useNavigate();

  // useEffect to fetch all departments when the component mounts
  useEffect(() => {
    listOfDepartments();
  }, []);

  function listOfDepartments() {
    getAllDepartments().then((response) => {
      setDepartments(response.data);
    }).catch((error) => {
      console.log(error);
    });
  }

  // Function to navigate to the update department page
  function updateDepartment(id) {
    navigate(`/edit-department/${id}`); 
  }

  function removeDepartment(id) {
    deleteDepartment(id).then((response) => {
      console.log(response.data);
      listOfDepartments(); // Refresh the list of departments after deletionf
    }).catch((error) => {
      console.log(error);
    });
  }

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
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {departments.map(department => (
                    <tr key={department.id}>
                        <td>{department.id}</td>
                        <td>{department.departmentName}</td>
                        <td>{department.departmentDescription}</td>
                        <td>
                            <button onClick={() => updateDepartment(department.id)} className='btn btn-info'>Update</button>
                            <button onClick={() => removeDepartment(department.id)} className='btn btn-danger'
                              style={{marginLeft: "10px"}}
                            >Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}

export default ListDepartmentComponent