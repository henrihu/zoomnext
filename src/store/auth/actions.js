import { setAuthorization } from '@/api/base';
import API from 'src/api/auth';
import { removeStorageItem, setStorageItem } from 'src/utils/common';
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
        await router.push('/services');
        dispatch({
          type: SET_DATA,
          payload: { authenticated: true, type: signData.type, ...data.result },
        });
        showSuccess(data.message);
        setStorageItem('user_type', signData.type);
        setStorageItem('authenticated', true);
        setStorageItem('access_token', data.result.accessToken);
        setAuthorization(data.result.accessToken);
      } else {
        console.error(data.message);
        showError(data.message);
      }
    } catch (err) {
      console.error(err);
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
      removeStorageItem('authenticated');
    } catch (err) {
      console.error(err);
    }
  };
};
