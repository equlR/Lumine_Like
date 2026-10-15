import axios from 'axios';
import {BASE_URL, METHODS} from '../utils/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  timeout: 10000,
});

// Update the request interceptor to handle async token
api.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      // Don't override Content-Type if it's already set
      if (!config.headers['Content-Type']) {
        config.headers['Content-Type'] = 'application/json';
      }
      console.log('-----------Config-----------', config);
      return config;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  response => {
    console.log('Response:', response);
    return response.data;
  },
  error => {
    return Promise.reject(error);
  },
);

export const setHeaders = (key = '', value) => {
  api.defaults.headers[key] = value;
};

const client = ({
  method = METHODS.GET,
  url = '',
  withCredentials = false,
  auth,
  data,
  ...otherParams
}) => {
  return api({
    method,
    url,
    withCredentials,
    auth,
    data,
    ...otherParams,
  });
};

export default client;
