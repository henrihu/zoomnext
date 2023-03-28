import base from './base';

export const signInWithEmail = (data) =>
  base({ url: '/login/', data, method: 'POST' });
export const signUp = (data) => base({ url: '/signUp/', data, method: 'POST' });

export const socialLogin = (data) =>
  base({ url: '/socialLogin/', data, method: 'POST' });
export const forgotPassword = (data) =>
  base({ url: '/forgotPassword/', data, method: 'POST' });
export const resetPassword = (data) =>
  base({ url: '/resetPassword/', data, method: 'POST' });
export const resendOtp = (data) =>
  base({ url: '/resendOtp/', data, method: 'POST' });
export const verifyOtp = (data) =>
  base({ url: '/verifyOtp/', data, method: 'POST' });

export default {
  signInWithEmail,
  signUp,
  socialLogin,
  forgotPassword,
  resetPassword,
  resendOtp,
  verifyOtp,
};
