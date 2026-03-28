import React, { useEffect, useState } from 'react'
import { deleteEmployee, listEmployees, searchEmployees } from '../services/EmployeeService';
import { useNavigate } from 'react-router-dom';

const ListEmployeeComponent = () => {

    // State variables for employees list, search keyword, and loading state
    const [employees, setEmployees] = useState([]);
    const [keyword, setKeyword] = useState('');
    const [loading, setLoading] = useState(false);

    const navigator = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            const trimmedKeyword = keyword.trim();
            setLoading(true);
            const request = trimmedKeyword ? searchEmployees(trimmedKeyword) : listEmployees();

            request
                .then(response => {
                    setEmployees(response.data);
                })
                .catch(error => {
                    console.log(error);
                    setEmployees([]);
                })
                .finally(() => {
                    setLoading(false);
                });
        }, 450);

        return () => clearTimeout(timer);
    }, [keyword]);

    function getAllEmployees() {
        setLoading(true);
        listEmployees()
            .then(response => {
                setEmployees(response.data);
            })
            .catch(error => {
                console.log(error);
                setEmployees([]);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    function addNewEmployee(){
        navigator('/add-employee');
    }

    function updateEmployee(id){
        navigator(`/edit-employee/${id}`);
    }

    function removeEmployee(id){
        deleteEmployee(id).then(response => {
           getAllEmployees();
        }).catch(error => {
            console.log(error);
        })
    }

    // Styles
    const headerStyle = {
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '25px 20px',
        borderRadius: '12px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
        marginBottom: '30px',
        textAlign: 'center'
    };

    const addBtnStyle = {
        background: 'linear-gradient(135deg, #00c6ff 0%, #0072ff 100%)',
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '8px',
        fontWeight: '600',
        boxShadow: '0 4px 15px rgba(0,118,255,0.3)',
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
            <h2 style={{ margin: 0, fontSize: '2rem' }}>👥 Employee Directory</h2>
            <p style={{ margin: 0, opacity: 0.9 }}>Manage your workforce from here</p>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '12px', marginBottom: '20px' }}>
            <input
                type='text'
                placeholder='Search by ID or name'
                value={keyword}
                onChange={e => setKeyword(e.target.value)}
                style={{
                    flex: '1 1 320px',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    border: '1px solid #d1d5db',
                    fontSize: '1rem',
                    outline: 'none'
                }}
            />

            <button
                style={addBtnStyle}
                onClick={addNewEmployee}
                onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
            >
                ➕ Add Employee
            </button>
        </div>

        {loading && (
            <div style={{ marginBottom: '18px', color: '#2563eb', fontWeight: 600 }}>
                Loading employees...
            </div>
        )}

        <div style={tableContainerStyle}>
            <table className='table table-hover responsive-table' style={tableStyle}>
                <thead>
                    <tr style={{ background: '#f1f5f9' }}>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        employees.length === 0 ? (
                            <tr>
                                <td colSpan='5' style={{ textAlign: 'center', padding: '30px', color: '#666' }}>
                                    {loading ? 'Loading employees...' : 'No employees found.'}
                                </td>
                            </tr>
                        ) : (
                            employees.map(employee => 
                                <tr key={employee.id}>
                                    <td data-label="ID">{employee.id}</td>
                                    <td data-label="First Name">{employee.firstName}</td>
                                    <td data-label="Last Name">{employee.lastName}</td>
                                    <td data-label="Email">{employee.email}</td>
                                    <td data-label="Actions">
                                        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                            <button
                                                style={updateBtnStyle}
                                                onClick={()=> updateEmployee(employee.id)}
                                                onMouseOver={e => e.currentTarget.style.opacity = 0.85}
                                                onMouseOut={e => e.currentTarget.style.opacity = 1}
                                            >✏️ Update</button>
                                            <button
                                                style={deleteBtnStyle}
                                                onClick={()=> removeEmployee(employee.id)}
                                                onMouseOver={e => e.currentTarget.style.opacity = 0.85}
                                                onMouseOut={e => e.currentTarget.style.opacity = 1}
                                            >🗑️ Delete</button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        )
                    }
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default ListEmployeeComponent
