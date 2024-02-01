import axios from 'axios';
import { BASE_URL } from '../constants/UserConstant';

export const axiosClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'content-type': 'application/json',
    Accept: 'application/json',
  },
  paramsSerializer: params => {
    let queryString = '';
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        if (queryString.length > 0) {
          queryString += '&';
        }
        queryString += `${key}=${encodeURIComponent(params[key])}`;
      }
    }
    return queryString;
  },
});

// axiosClient.interceptors.request.use(async config => {
//   const token = localStorage.getItem('tokens');
//   config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

axiosClient.interceptors.response.use(
  response => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  error => {
    throw error;
  },
);