import axios from "axios";
const EMPLOYEE_API_BASE_URL = "http://localhost:8081/api/employees";

// Function to fetch the list of employees by sending a GET request to the backend API
export const listEmployees = () => axios.get(EMPLOYEE_API_BASE_URL);

// Function to create a new employee by sending a POST request to the backend API
export const createEmployee = (employee) => axios.post(EMPLOYEE_API_BASE_URL, employee);

// Function to get an employee by ID by sending a GET request to the backend API
export const getEmployeeById = (employeeId) => axios.get(EMPLOYEE_API_BASE_URL+'/' + employeeId);

// Function to update an existing employee by sending a PUT request to the backend API
export const updateEmployee = (employeeId, employee) => axios.put(EMPLOYEE_API_BASE_URL + '/' + employeeId, employee);

// Function to delete an employee by sending a DELETE request to the backend API
export const deleteEmployee = (employeeId) => axios.delete(EMPLOYEE_API_BASE_URL + '/' + employeeId);
