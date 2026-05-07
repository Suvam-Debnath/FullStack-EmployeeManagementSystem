import axios from "axios";

const API_BASE_URL = "https://fullstackems.onrender.com/api";

// Dashboard Service
export const dashboardService = {
  getStats: () => axios.get(`${API_BASE_URL}/dashboard`),
};

// Employee Service
export const employeeService = {
  listEmployees: () => axios.get(`${API_BASE_URL}/employees`),
  createEmployee: (employee: any) => axios.post(`${API_BASE_URL}/employees`, employee),
  getEmployeeById: (id: string | number) => axios.get(`${API_BASE_URL}/employees/${id}`),
  updateEmployee: (id: string | number, employee: any) => axios.put(`${API_BASE_URL}/employees/${id}`, employee),
  deleteEmployee: (id: string | number) => axios.delete(`${API_BASE_URL}/employees/${id}`),
  searchEmployees: (keyword: string) => axios.get(`${API_BASE_URL}/employees/search?keyword=${keyword}`),
};

// Department Service
export const departmentService = {
  listDepartments: () => axios.get(`${API_BASE_URL}/departments`),
  createDepartment: (department: any) => axios.post(`${API_BASE_URL}/departments`, department),
  getDepartmentById: (id: string | number) => axios.get(`${API_BASE_URL}/departments/${id}`),
  updateDepartment: (id: string | number, department: any) => axios.put(`${API_BASE_URL}/departments/${id}`, department),
  deleteDepartment: (id: string | number) => axios.delete(`${API_BASE_URL}/departments/${id}`),
};
