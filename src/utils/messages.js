import { notification } from 'antd';

export const showSuccess = (msg) => {
  notification.success(msg);
};

export const showError = (msg) => {
  notification.error(msg);
};
