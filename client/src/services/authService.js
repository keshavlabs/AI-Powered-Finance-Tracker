import api from "./api";

const setToken = (token) => {
  localStorage.setItem("token", token);
};

const getToken = () => {
  return localStorage.getItem("token");
};

const removeToken = () => {
  localStorage.removeItem("token");
};

const register = async (userData) => {
  const response = await api.post("/auth/register", userData);
  return response.data;
};

const login = async (credentials) => {
  const response = await api.post("/auth/login", credentials);

  if (response.data.token) {
    setToken(response.data.token);
  }

  return response.data;
};

const logout = () => {
  removeToken();
};

const isAuthenticated = () => {
  return !!getToken();
};

const authService = {
  register,
  login,
  logout,
  getToken,
  isAuthenticated,
};

export default authService;
