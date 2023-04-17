import { message } from 'antd';

export const showSuccess = (msg) => {
  msg && message.success(msg);
};

export const showError = (msg) => {
  msg && message.error(msg);
};
