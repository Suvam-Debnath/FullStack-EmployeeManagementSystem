import React, { useEffect } from 'react'
import { useState } from 'react';
import { createDepartment, getDepartmentById, updateDepartment } from '../services/DepartmentService';
import { useNavigate , useParams} from 'react-router-dom';

const DepartmentComponent = () => {

    // State variables for department name and description
    const [departmentName, setDepartmentName] = useState('');
    const [departmentDescription, setDepartmentDescription] = useState('');

    // validation errors
    const [errors, setErrors] = useState({
        departmentName: '',
        departmentDescription: ''
    });

    const { id } = useParams(); // Get the department ID from the URL parameters

    const navigate = useNavigate();

    // useEffect to fetch department details if an ID is provided (for update)
    useEffect(() => {
       if (id) {
           getDepartmentById(id).then((response) => {
            setDepartmentName(response.data.departmentName);
            setDepartmentDescription(response.data.departmentDescription);
           }).catch((error) => {
            console.log(error);
           });
       }
    }, [id]);

    // Function to handle form submission for creating or updating a department
    function saveOrUpdateDepartment(e) {
        e.preventDefault();
        if (!validateForm()) return;
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
            return <h2 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#333' }}>🏷️ Update Department</h2>;
        } else {
            return <h2 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#333' }}>➕ Add Department</h2>;
        }
    }

    // Function to validate form inputs before submission
    function validateForm(){
        let valid = true;
        const errorCopy = { ...errors };

        if(!departmentName){
            errorCopy.departmentName = 'Department Name is required';
            valid = false;
        } else {
            errorCopy.departmentName = '';
        }

        if(!departmentDescription){
            errorCopy.departmentDescription = 'Description is required';
            valid = false;
        } else {
            errorCopy.departmentDescription = '';
        }

        setErrors(errorCopy);
        return valid;
    }

    // styles
    const containerStyle = {
        minHeight: 'calc(100vh - 200px)',
        paddingTop: '40px',
        paddingBottom: '40px',
        background: 'linear-gradient(135deg, #f3e7e9 0%, #e3eeff 100%)'
    };

    const headerStyle = {
        background: 'linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)',
        padding: '25px 20px',
        borderRadius: '12px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
        marginBottom: '30px',
        textAlign: 'center',
        color: '#333'
    };

    const cardStyle = {
        borderRadius: '15px',
        boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
        border: 'none',
        background: 'white'
    };

    const inputStyle = {
        width: '100%',
        padding: '12px 15px',
        border: '2px solid #e0e0e0',
        borderRadius: '8px',
        fontSize: '1rem',
        transition: 'all 0.3s ease',
        backgroundColor: '#fafafa'
    };

    const inputFocusStyle = {
        outline: 'none',
        borderColor: '#ff6a88',
        boxShadow: '0 0 0 3px rgba(255, 106, 136, 0.1)',
        backgroundColor: 'white'
    };

    const buttonStyle = {
        padding: '12px 25px',
        fontSize: '1.1rem',
        fontWeight: '600',
        borderRadius: '8px',
        border: 'none',
        background: 'linear-gradient(135deg, #ff7e5f 0%, #feb47b 100%)',
        color: 'white',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        boxShadow: '0 5px 15px rgba(255,126,95,0.3)'
    };

    const cancelButtonStyle = {
        ...buttonStyle,
        background: 'white',
        color: '#333',
        border: '2px solid #e0e0e0',
        boxShadow: '0 3px 10px rgba(0,0,0,0.05)'
    };

  return (
    <div style={containerStyle}>
        <div className='container'>
            <div style={headerStyle}>
                <h1 style={{ margin: 0 }}>Department Management</h1>
                <p style={{ margin: 0, opacity: 0.9 }}>{id ? 'Edit the selected department' : 'Create a new department'}</p>
            </div>
            <div className='row'>
                <div className='col-md-6 offset-md-3'>
                    <div style={cardStyle}>
                        <div style={{ padding: '30px' }}>
                            {pageTitle()}
                            <form>
                                <div className='form-group mb-3'>
                                    <label style={{ fontWeight: '600', marginBottom: '6px', display: 'block' }}>Department Name</label>
                                    <input
                                        type='text'
                                        value={departmentName}
                                        onChange={(e) => setDepartmentName(e.target.value)}
                                        style={{
                                            ...inputStyle,
                                            ...(errors.departmentName ? { borderColor: '#dc3545', backgroundColor: '#fff5f5' } : {})
                                        }}
                                        onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                                        onBlur={(e) => Object.assign(e.target.style, inputStyle)}
                                        placeholder='Enter Department Name'
                                    />
                                    {errors.departmentName && <span style={{ color: '#dc3545', fontSize: '0.85rem', marginTop: '4px', display: 'block' }}>✗ {errors.departmentName}</span>}
                                </div>
                                <div className='form-group mb-3'>
                                    <label style={{ fontWeight: '600', marginBottom: '6px', display: 'block' }}>Description</label>
                                    <input
                                        type='text'
                                        value={departmentDescription}
                                        onChange={(e) => setDepartmentDescription(e.target.value)}
                                        style={{
                                            ...inputStyle,
                                            ...(errors.departmentDescription ? { borderColor: '#dc3545', backgroundColor: '#fff5f5' } : {})
                                        }}
                                        onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                                        onBlur={(e) => Object.assign(e.target.style, inputStyle)}
                                        placeholder='Enter Department Description'
                                    />
                                    {errors.departmentDescription && <span style={{ color: '#dc3545', fontSize: '0.85rem', marginTop: '4px', display: 'block' }}>✗ {errors.departmentDescription}</span>}
                                </div>
                                <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
                                    <button
                                        style={buttonStyle}
                                        onClick={saveOrUpdateDepartment}
                                        onMouseOver={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                                        onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
                                    >
                                        {id ? 'Update Dept' : 'Create Dept'}
                                    </button>
                                    <button
                                        type='button'
                                        style={cancelButtonStyle}
                                        onClick={() => navigate('/departments')}
                                        onMouseOver={e => {
                                            e.currentTarget.style.background = '#f9f9f9';
                                            e.currentTarget.style.borderColor = '#ff7e5f';
                                        }}
                                        onMouseOut={e => {
                                            e.currentTarget.style.background = 'white';
                                            e.currentTarget.style.borderColor = '#e0e0e0';
                                        }}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default DepartmentComponent