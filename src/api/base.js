import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://35.154.51.102/zoom-errands-test/public/api/v1/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const setHeader = (key, value) => {
  instance.headers[key] = value;
};

export const removeHeader = (key) => {
  instance.headers[key] = '';
};

export default instance;
