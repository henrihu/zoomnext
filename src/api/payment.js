import base from './base';

export const getCardList = () => base({ url: '/getCard/', method: 'POST' });
export const addCard = () => base({ url: '/addCard/', method: 'POST' });
export const deleteCard = () => base({ url: '/deleteCard/', method: 'POST' });
export const setDefaultCard = () =>
  base({ url: '/defaultCard/', method: 'POST' });
export const getPaymentHistory = () =>
  base({ url: '/paymentHistory/', method: 'POST' });

export default {
  getCardList,
  addCard,
  deleteCard,
  setDefaultCard,
  getPaymentHistory,
};
