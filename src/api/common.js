import { toFormData } from 'axios';
import base from './base';

export const getServiceList = () =>
  base({ url: '/getServiceList/', method: 'POST' });

export const getNotificationList = () =>
  base({ url: '/getNotificationlist/', method: 'POST' });

// Profile
export const updateProfile = (data) =>
  base({ url: '/editProfile/', method: 'POST', data });
export const uploadProfileImage = () =>
  base({ url: '/uploadProfile/', method: 'POST', data: toFormData(data) });

export default {
  getServiceList,
  getNotificationList,
  updateProfile,
  uploadProfileImage,
};
