import axios from "axios";

const DASHBOARD_API_BASE_URL = "https://fullstackems.onrender.com/api/dashboard";

export const dashboard = () => axios.get(DASHBOARD_API_BASE_URL);
