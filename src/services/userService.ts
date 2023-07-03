import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_ROUTE}/users`;

const getCurrentUser = async (token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};

const userService = { getCurrentUser };

export default userService;
