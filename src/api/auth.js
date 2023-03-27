import base from './base';

export const signInWithEmail = (data) =>
  base({ url: '/login/', data, method: 'POST' });

export const signUp = (data) => base({ url: '/signUp/', data, method: 'POST' });
