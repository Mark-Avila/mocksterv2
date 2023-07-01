import axios from "axios";
import { RequestParams, ResultData } from "../types";

const API_URL = "http://localhost:5000/api/result/";

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

  const response = await axios.get(API_URL + result_id, config);

  return response.data;
};

const getResultByUser = async (user_id: string, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${API_URL + user_id}/user`, config);

  return response.data;
};

const resultService = {
  createResult,
  getResultById,
  getResultByUser,
};

export default resultService;
