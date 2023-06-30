import axios from "axios";

const API_URL = "http://localhost:5000/api/users/";

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
