import React, { use, useEffect, useState } from 'react'
import { getAllDepartments, deleteDepartment } from '../services/DepartmentService';
import { Link ,useNavigate} from 'react-router-dom';

const ListDepartmentComponent = () => {

  const [departments, setDepartments] = useState([]);
  const navigate = useNavigate();

  // fetch departments
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

  function updateDepartment(id) {
    navigate(`/edit-department/${id}`);
  }

  function removeDepartment(id) {
    deleteDepartment(id).then((response) => {
      console.log(response.data);
      listOfDepartments();
    }).catch((error) => {
      console.log(error);
    });
  }

  // styles
  const headerStyle = {
    background: 'linear-gradient(135deg, #ff8a00 0%, #e52e71 100%)',
    color: 'white',
    padding: '25px 20px',
    borderRadius: '12px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
    marginBottom: '30px',
    textAlign: 'center'
  };

  const addBtnStyle = {
    background: 'linear-gradient(135deg, #28a745 0%, #218838 100%)',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '8px',
    fontWeight: '600',
    boxShadow: '0 4px 15px rgba(40,167,69,0.3)',
    transition: 'transform 0.2s',
    cursor: 'pointer'
  };

  const tableContainerStyle = {
    overflowX: 'auto',
    borderRadius: '12px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
    background: 'white'
  };

  const tableStyle = {
    width: '100%',
    minWidth: 0
  };

  const actionButtonCommon = {
    fontSize: '0.85rem',
    padding: '6px 12px',
    borderRadius: '6px',
    transition: 'all 0.2s',
  };

  const updateBtnStyle = {
    ...actionButtonCommon,
    background: '#17a2b8',
    color: 'white',
    border: 'none',
    marginRight: '6px'
  };

  const deleteBtnStyle = {
    ...actionButtonCommon,
    background: '#dc3545',
    color: 'white',
    border: 'none'
  };

  return (
    <div className='container' style={{ paddingBottom: '40px' }}>
        <div style={headerStyle}>
            <h2 style={{ margin: 0, fontSize: '2rem' }}>🏢 Department Directory</h2>
            <p style={{ margin: 0, opacity: 0.9 }}>Manage company departments</p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '15px' }}>
            <Link to="/add-department"
                style={addBtnStyle}
                onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
            >
                ➕ Add Department
            </Link>
        </div>
        
        <div style={tableContainerStyle}>
            <table className='table table-hover responsive-table' style={tableStyle}>
                <thead>
                    <tr style={{ background: '#f1f5f9' }}>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        departments.length === 0 ? (
                            <tr>
                                <td colSpan='4' style={{ textAlign: 'center', padding: '30px', color: '#666' }}>
                                    No departments found.
                                </td>
                            </tr>
                        ) : (
                            departments.map(department => (
                                <tr key={department.id}>
                                    <td data-label="ID">{department.id}</td>
                                    <td data-label="Name">{department.departmentName}</td>
                                    <td data-label="Description">{department.departmentDescription}</td>
                                    <td data-label="Actions">
                                        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                            <button
                                                style={updateBtnStyle}
                                                onClick={()=> updateDepartment(department.id)}
                                                onMouseOver={e => e.currentTarget.style.opacity = 0.85}
                                                onMouseOut={e => e.currentTarget.style.opacity = 1}
                                            >✏️ Update</button>
                                            <button
                                                style={deleteBtnStyle}
                                                onClick={()=> removeDepartment(department.id)}
                                                onMouseOver={e => e.currentTarget.style.opacity = 0.85}
                                                onMouseOut={e => e.currentTarget.style.opacity = 1}
                                            >🗑️ Delete</button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )
                    }
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default ListDepartmentComponent