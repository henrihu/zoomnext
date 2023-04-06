import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://35.154.51.102/zoom-errands-test/public/api/v1/',
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
  instance.setAuthorization('Bearer ' + token);
};

export default instance;
