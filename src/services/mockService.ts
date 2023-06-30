import axios from "axios";
import { MockData } from "../types";

const API_URL = "http://localhost:5000/api/mock";

const createMock = async (mockData: MockData, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, mockData, config);
  return response.data;
};

const getMocksByUserId = async (token: string, id: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${API_URL}/${id}/user`, config);
  return response.data;
};

const getMocksBySubject = async (token: string, subject: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${API_URL}/${subject}/slug`, config);
  return response.data;
};

interface GetMocks {
  token: string;
  populate?: string;
  excludePopulate?: string;
  excludeLocal?: string;
}

const getMocks = async ({
  token,
  populate,
  excludePopulate,
  excludeLocal,
}: GetMocks) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      populate: populate || "",
      excludePopulate: excludePopulate || "",
      excludeLocal: excludeLocal || "",
    },
  };

  const response = await axios.get(API_URL, config);
  return response.data;
};

const getMockById = async (token: string, id: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${API_URL}/${id}/mock`, config);
  return response.data;
};

const mockService = {
  createMock,
  getMocks,
  getMocksBySubject,
  getMocksByUserId,
  getMockById,
};

export default mockService;
