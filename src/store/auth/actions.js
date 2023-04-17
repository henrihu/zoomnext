import { setAuthorization } from '@/api/base';
import { useSelector } from 'react-redux';
import API from 'src/api/auth';
import {
  getStorageItem,
  removeStorageItem,
  setStorageItem,
} from 'src/utils/common';
import { TYPE_CUSTOMER } from 'src/utils/constants';
import { showError, showSuccess } from 'src/utils/messages';

export const SET_DATA = '[AUTH] SET DATA';

export const setData = (data) => (dispatch) => {
  dispatch({ type: SET_DATA, payload: data });
};

export const setType = (type) => (dispatch) => {
  dispatch({ type: SET_DATA, payload: { type: type ? type : TYPE_CUSTOMER } });
};

export const signInWithEmail = (signData, router) => {
  return async (dispatch) => {
    try {
      const { data } = await API.signInWithEmail({
        ...signData,
        platform: 'web',
      });
      if (data.status === 1) {
        const token = data.result.accessToken;
        await setAuthorization(token);
        const {
          data: { result },
        } = await API.getUserDetail();
        await router.push('/services');
        dispatch({
          type: SET_DATA,
          payload: {
            authenticated: true,
            type: signData.type,
            ...result,
          },
        });
        showSuccess(data.message);
        setStorageItem('user_type', signData.type);
        setStorageItem('access_token', token);
      } else {
        showError(data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };
};

export const signInWithToken = () => {
  return async (dispatch) => {
    await setAuthorization(getStorageItem('access_token'));
    const {
      data: { status, result, message },
    } = await API.getUserDetail();
    if (status === 1) {
      dispatch({
        type: SET_DATA,
        payload: {
          authenticated: true,
          type: getStorageItem('user_type'),
          ...result,
        },
      });
    } else {
      showError(data.message);
      removeStorageItem('user_type');
      removeStorageItem('acces_token');
      router.push('/auth/login');
    }
  };
};

export const signUp = (data) => {
  return async (dispatch) => {
    try {
      // await API.signUp(data);
    } catch (err) {
      console.error(err);
    }
  };
};

export const logOut = (router) => {
  return async (dispatch) => {
    try {
      await router.push('/');
      dispatch({
        type: SET_DATA,
        payload: { authenticated: false },
      });
      removeStorageItem('user_type');
      removeStorageItem('access_token');
    } catch (err) {
      console.error(err);
    }
  };
};

export const useAuth = () => {
  return useSelector(({ auth }) => auth);
};
