import base from './base';

export const getMyJobList = (data) =>
  base({ url: '/getMyJobLists/', data, method: 'POST' });
export const getJobDetail = (data) =>
  base({ url: '/jobDetails/', data, method: 'POST' });
export const approveBid = (data) =>
  base({ url: '/customerApproveBid/', data, method: 'POST' });
export const createJob = (data) =>
  base({ url: '/createJob/', data, method: 'POST' });
export const cancelJob = (data) =>
  base({ url: '/jobCancel/', data, method: 'POST' });
export const createJobMilestones = (data) =>
  base({ url: '/createJobMilestones/', data, method: 'POST' });
export const uploadImage = (data) =>
  base({ url: '/uploadImage/', data, method: 'POST' });
export const customerCompleteJob = (data) =>
  base({ url: '/customerCompleteJob/', data, method: 'POST' });

export default {
  getMyJobList,
  getJobDetail,
  approveBid,
  createJob,
  cancelJob,
  createJobMilestones,
  uploadImage,
  customerCompleteJob,
};
