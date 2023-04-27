import { setAuthorization } from '@/api/base';
import { useSelector } from 'react-redux';
import API from 'src/api/auth';
import {
  getStorageItem,
  removeStorageItem,
  setStorageItem,
} from 'src/utils/common';
import { PLATFORM, TYPE_CUSTOMER } from 'src/utils/constants';
import { showError, showSuccess } from 'src/utils/messages';

export const SET_DATA = '[AUTH] SET DATA';
export const SET_PENDING = '[AUTH] SET PENDING';

export const setData = (data) => (dispatch) => {
  dispatch({ type: SET_DATA, payload: data });
};

export const setType = (type) => (dispatch) => {
  setStorageItem('user_type', type);
  dispatch({ type: SET_DATA, payload: { type: type ? type : TYPE_CUSTOMER } });
};

export const signInWithEmail = (signData, router) => {
  return async (dispatch) => {
    try {
      const { data } = await API.signInWithEmail({
        ...signData,
        platform: PLATFORM,
      });
      if (data.status === 1) {
        if (
          data.result.userDetail.isActive &&
          data.result.userDetail.isMobileVerified
        ) {
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
          await dispatch({
            type: SET_DATA,
            payload: {
              authenticated: false,
              type: signData.type,
              ...data.result,
            },
          });
          await router.push('/auth/otp_verify');
        }

        return true;
      } else {
        showError(data.message);
        return false;
      }
    } catch (err) {
      console.error(err);
      return false;
    }
  };
};

export const signInWithToken = (router) => {
  return async (dispatch) => {
    try {
      if (!getStorageItem('access_token')) {
        return;
      }
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
        dispatch(logOut(router));
      }
    } catch (err) {
      dispatch(logOut(router));
    }
  };
};

export const signUp = (info) => {
  return async () => {
    try {
      const { data } = await API.signUp(info);
      if (data.status === 1) {
        showSuccess(data.message);
        return true;
      } else {
        showError(data.message);
        return false;
      }
    } catch (err) {
      console.error(err);
      return false;
    }
  };
};

export const logOut = (router) => {
  return async (dispatch) => {
    try {
      await dispatch({
        type: SET_DATA,
        payload: { authenticated: false },
      });
      await router.push('/');
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

export const verifyOtp = (info) => {
  return async (dispatch) => {
    const key = 'verify_otp';
    try {
      dispatch(setPending(key, true));
      const { data } = await API.verifyOtp(info);
      if (data.status === 1) {
        dispatch({
          type: SET_DATA,
          payload: {
            authenticated: true,
            ...data.result,
          },
        });
        return true;
      } else {
        showError(data.message);
        return false;
      }
    } catch (err) {
      console.error(err);
      return false;
    }
    dispatch(setPending(key, false));
  };
};

export const resendOtp = (info) => {
  return async (dispatch) => {
    const key = 'resendOtp';
    try {
      dispatch(setPending(key, true));
      const { data } = await API.resendOtp(info);
      if (data.status === 1) {
        dispatch(setPending(key, false));
        showSuccess(data.message);
        return true;
      } else {
        showError(data.message);
        dispatch(setPending(key, false));
        return false;
      }
    } catch (err) {
      console.error(err);
      dispatch(setPending(key, false));
      return false;
    }
  };
};

export const setPending = (key, pending) => ({
  type: SET_PENDING,
  key,
  pending,
});
