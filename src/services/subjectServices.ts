import axios from "axios";
import { SubjectData } from "../types";

const API_URL = `${import.meta.env.VITE_API_ROUTE}/subjects`;

const getSubjectById = async (id: string, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${API_URL}/${id}`, config);

  return response.data;
};

const getSubjectBySlug = async (slug: string, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${API_URL}/${slug}/slug`, config);

  return response.data;
};

const getSubjects = async (token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${API_URL}`, config);

  return response.data;
};

const getSubjectByUserId = async (user_id: string, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${API_URL}/user`, config);

  return response.data;
};

const createSubject = async (data: SubjectData, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(`${API_URL}`, data, config);

  return response.data;
};

const subjectService = {
  getSubjectById,
  getSubjectByUserId,
  getSubjects,
  getSubjectBySlug,
  createSubject,
};

export default subjectService;
