import base from './base';

export const getCardList = () => base({ url: '/getCard/', method: 'POST' });
export const addCard = (data) => {
  console.log('api', data);
  return base({ url: '/addCard/', method: 'POST', data });
};
export const deleteCard = (id) =>
  base({ url: '/deleteCard/', method: 'POST', data: { id } });
export const setDefaultCard = (id) =>
  base({ url: '/defaultCard/', method: 'POST', data: { id } });
export const getPaymentHistory = (data) =>
  base({ url: '/paymentHistory/', method: 'POST', data });

export default {
  getCardList,
  addCard,
  deleteCard,
  setDefaultCard,
  getPaymentHistory,
};
