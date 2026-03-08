import React, { use, useEffect, useState } from 'react'
import { createEmployee, getEmployeeById, updateEmployee } from '../services/EmployeeService';
import { useNavigate , useParams} from 'react-router-dom';
import { getAllDepartments } from '../services/DepartmentService';

const EmployeeComponent = () => {

    // State variables for employee details
    const[firstName, setFirstName] = useState('');
    const[lastName, setLastName] = useState('');
    const[email, setEmail] = useState('');
    const[departmentId, setDepartmentId] = useState('');  
    const[departments, setDepartments] = useState([]); // State to hold list of departments

    // useEffect to fetch all departments when the component mounts
    useEffect(() => {
        getAllDepartments().then(response => {
            setDepartments(response.data);
        }).catch(error => {
            console.log(error);
        });
    }, []);

    // Get the employee ID from the URL parameters
    const { id } = useParams();

    // State to hold validation errors
    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        email: '',
        department: ''
    })

    // useNavigate hook to navigate programmatically
    const navigator = useNavigate();

    // useEffect to fetch employee data if id is present (for update)
    useEffect(() => {
        if(id){
            getEmployeeById(id).then(response => {  
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
                setEmail(response.data.email);
                setDepartmentId(response.data.departmentId);
            }).catch(error => {
                console.log(error);
            })
        }
    }, [id]);

    // Function to handle form submission for both creating and updating an employee
    function saveOrUpdateEmployee(e){
        e.preventDefault();
        if(validateForm()){

            const employee = { firstName, lastName, email, departmentId };
            console.log(employee);

            if(id){
                // Update employee logic 
                updateEmployee(id, employee).then(response => {
                    console.log(response.data);
                    navigator('/employees');
                }).catch(error => {
                    console.log(error);
                })
            } else {
                // Create new employee
                createEmployee(employee).then(response => {
                console.log(response.data);
                navigator('/employees');
            }).catch(error => {
                console.log(error);
            })
        }            
        }
    }

    // Function to validate form inputs before submission
    function validateForm(){
        let valid = true;
        const errorCopy = { ...errors };

        if(!firstName){
            errorCopy.firstName = 'First Name is required';
            valid = false;
        } else {
            errorCopy.firstName = '';
        }

        if(!lastName){
            errorCopy.lastName = 'Last Name is required';
            valid = false;
        } else {
            errorCopy.lastName = '';
        }
         if(!email){
            errorCopy.email = 'Email is required';
            valid = false;
        } else {
            errorCopy.email = '';
        }
        if(!departmentId || departmentId === 'Select Department'){
            errorCopy.department = 'Please select a department';
            valid = false;
        } else {
            errorCopy.department = '';
        }
        setErrors(errorCopy);
        return valid;
    }

    // Function to render the page title based on whether it's an update or add operation
    function pageTitle(){
        if(id){
            return <h2 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#333', marginBottom: '10px' }}>
                ✏️ Update Employee Details
            </h2>
        }
        return <h2 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#333', marginBottom: '10px' }}>
            ➕ Add New Employee
        </h2>
    }

    // Inline styles
    const containerStyle = {
        minHeight: 'calc(100vh - 200px)',
        paddingTop: '40px',
        paddingBottom: '40px',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
    }

    const headerBannerStyle = {
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '30px 20px',
        borderRadius: '15px',
        marginBottom: '30px',
        color: 'white',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
        textAlign: 'center'
    }

    const headerTitleStyle = {
        fontSize: '2.5rem',
        fontWeight: 'bold',
        margin: '0',
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)'
    }

    const cardStyle = {
        borderRadius: '15px',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
        border: 'none',
        background: 'white',
        overflow: 'hidden'
    }

    const formGroupStyle = {
        marginBottom: '25px'
    }

    const labelStyle = {
        fontWeight: '600',
        color: '#333',
        marginBottom: '8px',
        fontSize: '1rem',
        display: 'block'
    }

    const inputStyle = {
        padding: '12px 15px',
        border: '2px solid #e0e0e0',
        borderRadius: '8px',
        fontSize: '1rem',
        transition: 'all 0.3s ease',
        fontFamily: 'inherit',
        backgroundColor: '#f8f9fa'
    }

    const inputFocusStyle = {
        outline: 'none',
        borderColor: '#667eea',
        boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.1)',
        backgroundColor: 'white'
    }

    const selectStyle = {
        ...inputStyle,
        cursor: 'pointer'
    }

    const errorStyle = {
        color: '#dc3545',
        fontSize: '0.85rem',
        marginTop: '6px',
        fontWeight: '500',
        display: 'block'
    }

    const errorInputStyle = {
        borderColor: '#dc3545',
        backgroundColor: '#fff5f5'
    }

    const buttonContainerStyle = {
        display: 'flex',
        gap: '12px',
        marginTop: '30px',
        paddingTop: '20px',
        borderTop: '1px solid #e0e0e0'
    }

    const submitButtonStyle = {
        flex: 1,
        padding: '12px 30px',
        fontSize: '1.1rem',
        fontWeight: '600',
        borderRadius: '8px',
        border: 'none',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        boxShadow: '0 5px 15px rgba(102, 126, 234, 0.3)'
    }

    const cancelButtonStyle = {
        flex: 1,
        padding: '12px 30px',
        fontSize: '1.1rem',
        fontWeight: '600',
        borderRadius: '8px',
        border: '2px solid #e0e0e0',
        background: 'white',
        color: '#333',
        cursor: 'pointer',
        transition: 'all 0.3s ease'
    }

  return (
    <div style={containerStyle}>
        <div className='container'>
            {/* Header Banner */}
            <div style={headerBannerStyle}>
                <h1 style={headerTitleStyle}>Employee Management</h1>
                <p style={{ margin: '10px 0 0 0', opacity: 0.95, fontSize: '1.1rem' }}>
                    {id ? 'Update employee information' : 'Create a new employee record'}
                </p>
            </div>

            <div className="row">
                <div className='col-md-8 offset-md-2 col-lg-6 offset-lg-3'>
                    <div style={cardStyle}>
                        <div style={{ padding: '40px' }}>
                            { pageTitle() }
                            <form>
                                {/* First Name */}
                                <div style={formGroupStyle}>
                                    <label style={labelStyle}>👤 First Name</label>
                                    <input
                                        type='text'
                                        placeholder='Enter first name'
                                        name='firstName'
                                        value={firstName}
                                        style={{
                                            ...inputStyle,
                                            ...(errors.firstName ? errorInputStyle : {})
                                        }}
                                        onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                                        onBlur={(e) => {
                                            if (!errors.firstName) {
                                                Object.assign(e.target.style, inputStyle);
                                            }
                                        }}
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />
                                    { errors.firstName && <span style={errorStyle}>✗ { errors.firstName}</span> }
                                </div>

                                {/* Last Name */}
                                <div style={formGroupStyle}>
                                    <label style={labelStyle}>👤 Last Name</label>
                                    <input
                                        type='text'
                                        placeholder='Enter last name'
                                        name='lastName'
                                        value={lastName}
                                        style={{
                                            ...inputStyle,
                                            ...(errors.lastName ? errorInputStyle : {})
                                        }}
                                        onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                                        onBlur={(e) => {
                                            if (!errors.lastName) {
                                                Object.assign(e.target.style, inputStyle);
                                            }
                                        }}
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                    { errors.lastName && <span style={errorStyle}>✗ { errors.lastName}</span> }
                                </div>

                                {/* Email */}
                                <div style={formGroupStyle}>
                                    <label style={labelStyle}>📧 Email Address</label>
                                    <input
                                        type='email'
                                        placeholder='Enter email address'
                                        name='email'
                                        value={email}
                                        style={{
                                            ...inputStyle,
                                            ...(errors.email ? errorInputStyle : {})
                                        }}
                                        onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                                        onBlur={(e) => {
                                            if (!errors.email) {
                                                Object.assign(e.target.style, inputStyle);
                                            }
                                        }}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    { errors.email && <span style={errorStyle}>✗ { errors.email}</span> }
                                </div>

                                {/* Department */}
                                <div style={formGroupStyle}>
                                    <label style={labelStyle}>🏢 Department</label>
                                    <select
                                       style={{
                                           ...selectStyle,
                                           ...(errors.department ? errorInputStyle : {})
                                       }}
                                       value={departmentId}
                                       onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                                       onBlur={(e) => {
                                           if (!errors.department) {
                                               Object.assign(e.target.style, selectStyle);
                                           }
                                       }}
                                       onChange={(e) => setDepartmentId(e.target.value)}
                                    >
                                       <option value="Select Department">Select a department</option>
                                        {
                                            departments.map( department => 
                                                <option key={department.id} value={department.id}>{department.departmentName}</option>
                                            )
                                        }
                                    </select>
                                    { errors.department && <span style={errorStyle}>✗ { errors.department}</span> }
                                </div>

                                {/* Buttons */}
                                <div style={buttonContainerStyle}>
                                    <button 
                                        type='submit'
                                        style={submitButtonStyle}
                                        onClick={saveOrUpdateEmployee}
                                        onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
                                        onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
                                    >
                                        {id ? '💾 Update Employee' : '➕ Create Employee'}
                                    </button>
                                    <button 
                                        type='button'
                                        style={cancelButtonStyle}
                                        onClick={() => navigator('/employees')}
                                        onMouseOver={(e) => {
                                            e.target.style.background = '#f0f0f0';
                                            e.target.style.borderColor = '#667eea';
                                        }}
                                        onMouseOut={(e) => {
                                            e.target.style.background = 'white';
                                            e.target.style.borderColor = '#e0e0e0';
                                        }}
                                    >
                                        ❌ Cancel
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

export default EmployeeComponent