import API from 'src/api/auth';
import { removeStorageItem, setStorageItem } from 'src/utils/common';
import { TYPE_CUSTOMER } from 'src/utils/constants';

export const SET_DATA = '[AUTH] SET DATA';

export const setData = (data) => (dispatch) => {
  dispatch({ type: SET_DATA, payload: data });
};

export const setNotificationDrawer = (notification_drawer) => (dispatch) => {
  dispatch({ type: SET_DATA, payload: { notification_drawer } });
};

export const setType = (type) => (dispatch) => {
  dispatch({ type: SET_DATA, payload: { type: type ? type : TYPE_CUSTOMER } });
};

export const setProgress = (progress) => (dispatch) => {
  dispatch({ type: SET_DATA, payload: { progress } });
};

export const signInWithEmail = (data, router) => {
  return async (dispatch) => {
    try {
      // await API.signInWithEmail(data);
      await router.push(`/${data.type}/services/`);
      dispatch({
        type: SET_DATA,
        payload: { authenticated: true, type: data.type },
      });
      setStorageItem('user_type', data.type);
      setStorageItem('authenticated', true);
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
