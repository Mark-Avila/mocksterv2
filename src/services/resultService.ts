import axios from "axios";
import { RequestParams, ResultData } from "../types";

const API_URL = `${import.meta.env.VITE_API_ROUTE}/result`;

const createResult = async (result: ResultData, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, result, config);

  return response.data;
};

interface GetResultById extends RequestParams {
  result_id: string;
}

const getResultById = async ({
  token,
  populate,
  excludePopulate,
  excludeLocal,
  result_id,
}: GetResultById) => {
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

  const response = await axios.get(`${API_URL}/${result_id}`, config);

  return response.data;
};

interface GetResultByUser extends RequestParams {
  user_id: string;
}

const getResultByUser = async ({
  token,
  populate,
  excludePopulate,
  excludeLocal,
  user_id,
}: GetResultByUser) => {
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

  const response = await axios.get(`${API_URL}/${user_id}/user`, config);

  return response.data;
};

const deleteResultsByMockId = async (mock_id: string, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(`${API_URL}/${mock_id}`, config);
  return response.data;
};

const resultService = {
  createResult,
  getResultById,
  getResultByUser,
  deleteResultsByMockId,
};

export default resultService;
