import React, { useEffect, useState } from 'react'
import { createEmployee, getEmployeeById, updateEmployee } from '../services/EmployeeService';
import { useNavigate , useParams} from 'react-router-dom';

const EmployeeComponent = () => {

    // State variables for employee details
    const[firstName, setFirstName] = useState('');
    const[lastName, setLastName] = useState('');
    const[email, setEmail] = useState('');

    // Get the employee ID from the URL parameters
    const { id } = useParams();

    // State to hold validation errors
    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        email: ''
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
            }).catch(error => {
                console.log(error);
            })
        }
    }, [id]);

    // Function to handle form submission for both creating and updating an employee
    function saveOrUpdateEmployee(e){
        e.preventDefault();
        if(validateForm()){

            const employee = { firstName, lastName, email };
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
        setErrors(errorCopy);
        return valid;
    }

    // Function to render the page title based on whether it's an update or add operation
    function pageTitle(){
        if(id){
            return <h2 className='text-center'>Update Employee</h2>
        }
        return <h2 className='text-center'>Add Employee</h2>
    }

  return (
    <div className='container'>
        <br />
        <div className="row">
            <div className='card col-md-6 offset-md-3 offset-md-3'>
                { pageTitle() }
                <div className='card-body'>
                    <form>
                        <div className='form-group mb-2'>
                            <label className='form-label'>First Name:</label>
                            <input
                                type='text'
                                placeholder='Enter First Name'
                                name='firstName'
                                value={firstName}
                                className={`form-control ${ errors.firstName ? 'is-invalid': '' }`}
                                onChange={(e) => setFirstName(e.target.value)}
                            >
                            </input>
                            { errors.firstName && <div className='invalid-feedback'> { errors.firstName} </div> }
                        </div>

                        <div className='form-group mb-2'>
                            <label className='form-label'>Last Name:</label>
                            <input
                                type='text'
                                placeholder='Enter Last Name'
                                name='lastName'
                                value={lastName}
                                className={`form-control ${ errors.lastName ? 'is-invalid': '' }`}
                                onChange={(e) => setLastName(e.target.value)}
                            >
                            </input>
                            { errors.lastName && <div className='invalid-feedback'> { errors.lastName} </div> }
                        </div>

                        <div className='form-group mb-2'>
                            <label className='form-label'>Email:</label>
                            <input
                                type='text'
                                placeholder='Enter Email'
                                name='email'
                                value={email}
                                className={`form-control ${ errors.email ? 'is-invalid': '' }`}
                                onChange={(e) => setEmail(e.target.value)}
                            >
                            </input>
                            { errors.email && <div className='invalid-feedback'> { errors.email} </div> }
                        </div>

                        <button className='btn btn-success' onClick={saveOrUpdateEmployee} >Submit</button>
                    </form>

                </div>

            </div>

        </div>

    </div>
  )
}

export default EmployeeComponent