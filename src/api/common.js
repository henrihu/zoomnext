import { toFormData } from 'axios';
import base from './base';

// Services
export const getServiceList = () =>
  base({ url: '/getServiceList/', method: 'POST' });

// Notification
export const getNotificationList = (data) =>
  base({
    url: '/getNotificationList/',
    method: 'POST',
    data: { page: 1, perPage: 10 },
  });
export const removeNotification = () =>
  base({ url: '/removeNotification/', method: 'POST' });
export const emailNotificationUpdate = (data) =>
  base({ url: '/emailNotificationUpdate/', method: 'POST', data });

// FAQ's
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
  removeNotification,
  emailNotificationUpdate,
  getFaqList,
  contactUs,

  updateProfile,
  uploadProfileImage,
};
