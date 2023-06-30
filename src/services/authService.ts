import axios from "axios";

const API_URL = "http://localhost:5000/api/users";

export interface RegisterData {
  fname: string;
  lname: string;
  email: string;
  tupid: string;
  pwd: string;
  gender: 1 | 0;
}

export interface LoginData {
  email: string;
  password: string;
}

const register = async (userData: RegisterData) => {
  const response = await axios.post(`${API_URL}/register`, userData);

  if (response.data) {
    localStorage.setItem("token", JSON.stringify(response.data));
  }

  return response.data;
};

const login = async (userData: LoginData) => {
  const response = await axios.post(`${API_URL}/login`, userData);

  if (response.data) {
    localStorage.setItem("token", JSON.stringify(response.data.token));
  }
  return response.data.token ? response.data.token : response.data;
};

const logout = () => {
  localStorage.removeItem("token");
};

const authService = {
  register,
  logout,
  login,
};

export default authService;
