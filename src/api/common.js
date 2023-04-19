import { toFormData } from 'axios';
import base from './base';

// Services
const getServiceList = () => base({ url: '/getServiceList/', method: 'POST' });

// Notification
const getNotificationList = (data) =>
  base({
    url: '/getNotificationList/',
    method: 'POST',
    data,
  });
const removeNotification = (data) =>
  base({ url: '/removeNotification/', method: 'POST', data });
const emailNotificationUpdate = (data) =>
  base({ url: '/emailNotificationUpdate/', method: 'POST', data });

// FAQ's
const getFaqList = () => base({ url: '/getFAQs/', method: 'POST' });
const contactUs = (data) => base({ url: '/contactUs/', method: 'POST', data });

// Profile
const updateProfile = (data) =>
  base({ url: '/editProfile/', method: 'POST', data });
const uploadProfileImage = (data) =>
  base({
    url: '/uploadProfile/',
    method: 'POST',
    data: toFormData(data),
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
const changePassword = (data) =>
  base({ url: '/changePassword/', data, method: 'POST' });

// Converstaion
const getConversations = (data) =>
  base({ url: '/getConversations/', method: 'POST', data });
const getChats = (data) => base({ url: '/getChats/', method: 'POST', data });
const sendMessage = (data) =>
  base({ url: '/sendMessage/', method: 'POST', data });

export default {
  getServiceList,
  getNotificationList,
  removeNotification,
  emailNotificationUpdate,
  getFaqList,
  contactUs,
  updateProfile,
  uploadProfileImage,
  changePassword,
  getConversations,
  getChats,
  sendMessage,
};
