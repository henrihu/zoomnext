import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://10.97.5.49:8000/api/v1/',
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
