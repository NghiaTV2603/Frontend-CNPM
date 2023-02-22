import axios from 'axios';

export const apiRequest = axios.create({
  baseURL: 'https://different-mite-robe.cyclic.app/'
  // baseURL: 'http://localhost:3000/'
  }
)

export const axiosMethod = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
};

export const axiosRequest = (
  url,
  method = axiosMethod.GET,
  token = '',
  params = null,
  data = null
) => {
  const axiosConfig = {
    url,
    method,
    headers: {},
    params,
  };

  if (token) {
    axiosConfig.headers.Authorization = `Bearer ${token}`;
  }
  axiosConfig.data = data;
  return axios(axiosConfig);
};
