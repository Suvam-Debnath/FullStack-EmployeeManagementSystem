import axios from "axios";
const EMPLOYEE_API_BASE_URL = "http://localhost:8081/api/employees";

export const listEmployees = () => {
    return axios.get(EMPLOYEE_API_BASE_URL);
}
