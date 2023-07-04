import axios from "axios";
import { MockData, RequestParams } from "../types";

const API_URL = `${import.meta.env.VITE_API_ROUTE}/mock`;

const createMock = async (mockData: MockData, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, mockData, config);
  return response.data;
};

interface GetMocksByUser extends RequestParams {
  id: string;
}

const getMocksByUserId = async ({
  token,
  populate,
  excludePopulate,
  excludeLocal,
  id,
}: GetMocksByUser) => {
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

  const response = await axios.get(`${API_URL}/${id}/user`, config);
  return response.data;
};

interface GetMocksBySubject extends RequestParams {
  slug: string;
}

const getMocksBySubject = async ({
  token,
  populate,
  excludePopulate,
  excludeLocal,
  slug,
}: GetMocksBySubject) => {
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

  const response = await axios.get(`${API_URL}/${slug}/slug`, config);
  return response.data;
};

const getMocks = async ({
  token,
  populate,
  excludePopulate,
  excludeLocal,
}: RequestParams) => {
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

const deleteMock = async (id: string, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(`${API_URL}/${id}`, config);
  return response.data;
};

const mockService = {
  createMock,
  getMocks,
  deleteMock,
  getMocksBySubject,
  getMocksByUserId,
  getMockById,
};

export default mockService;
