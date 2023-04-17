import { toFormData } from 'axios';
import base from './base';

export const getServiceList = () =>
  base({ url: '/getServiceList/', method: 'POST' });
export const getNotificationList = () =>
  base({ url: '/getNotificationlist/', method: 'POST' });
export const getFaqList = () => base({ url: '/getFAQs/', method: 'POST' });
export const contactUs = (data) =>
  base({ url: '/contactUs/', method: 'POST', data });

// Profile
export const updateProfile = (data) =>
  base({ url: '/editProfile/', method: 'POST', data });
export const uploadProfileImage = () =>
  base({ url: '/uploadProfile/', method: 'POST', data: toFormData(data) });

export default {
  getServiceList,
  getNotificationList,
  getFaqList,
  contactUs,

  updateProfile,
  uploadProfileImage,
};
