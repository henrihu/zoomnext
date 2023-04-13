import { message } from 'antd';

export const showSuccess = (msg) => {
  message.success(msg);
};

export const showError = (msg) => {
  message.error(msg);
};
