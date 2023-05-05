import base from './base';

export const getBank = () => base({ url: '/getBank/', method: 'POST' });
export const addBank = (data) =>
  base({ url: '/addBank/', method: 'POST', data });
export const stripeConnect = () =>
  base({ url: '/stripeConnect/', method: 'POST' });

export default {
  getBank,
  addBank,
  stripeConnect,
};
