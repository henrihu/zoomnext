import base from './base';

const signInWithEmail = (data) =>
  base({ url: '/login/', data, method: 'POST' });
const signUp = (data) => base({ url: '/signUp/', data, method: 'POST' });
const getUserDetail = () => base({ url: '/getUserDetail/', method: 'POST' });

const socialLogin = (data) =>
  base({ url: '/socialLogin/', data, method: 'POST' });
const forgotPassword = (data) =>
  base({ url: '/forgotPassword/', data, method: 'POST' });
const resetPassword = (data) =>
  base({ url: '/resetPassword/', data, method: 'POST' });
const resendOtp = (data) => base({ url: '/resendOtp/', data, method: 'POST' });
const verifyOtp = (data) => base({ url: '/verifyOtp/', data, method: 'POST' });

export default {
  signInWithEmail,
  signUp,
  getUserDetail,
  socialLogin,
  forgotPassword,
  resetPassword,
  resendOtp,
  verifyOtp,
};
