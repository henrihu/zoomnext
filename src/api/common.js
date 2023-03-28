import base from './base';

export const getServiceList = () =>
  base({ url: '/getServiceList/', method: 'POST' });

export const getNotificationlist = () =>
  base({ url: '/getNotificationlist/', method: 'POST' });

export default {
  getServiceList,
  getNotificationlist,
};
