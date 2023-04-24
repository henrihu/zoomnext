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

export const jobBid = (data) => base({ url: '/jobBid/', data, method: 'POST' });
export const startJobPickUp = (data) =>
  base({ url: '/startJobPickUp/', data, method: 'POST' });
export const getHelperJoblist = (data) =>
  base({ url: '/getProviderJoblist/', data, method: 'POST' });
export const getHelperBrowseJoblist = (data) =>
  base({ url: '/getProviderBrowseJoblist/', data, method: 'POST' });
export const getHelperUserReview = (data) =>
  base({ url: '/getProviderUserReview/', data, method: 'POST' });

export default {
  getMyJobList,
  getJobDetail,
  approveBid,
  createJob,
  cancelJob,
  createJobMilestones,
  uploadImage,
  customerCompleteJob,
  jobBid,
  startJobPickUp,
  getHelperJoblist,
  getHelperBrowseJoblist,
  getHelperUserReview,
};
