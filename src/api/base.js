import axios from 'axios';
// import { API_URL } from 'environment';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const setHeader = (key, value) => {
  instance.set(key, value);
};
export const deleteHeader = (key) => {
  instance.delete(key);
};

export const setAuthorization = (token) => {
  instance.defaults.headers.common['Authorization'] = 'Bearer ' + token;
};

export default instance;
