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
import { setOtpModal } from '../setting/actions';

export const SET_DATA = '[AUTH] SET DATA';
export const SET_PENDING = '[AUTH] SET PENDING';

export const setData = (data) => (dispatch) => {
  dispatch({ type: SET_DATA, payload: data });
};

export const setPageLoading = (pageLoading) => (dispatch) => {
  dispatch({ type: SET_DATA, payload: { pageLoading } });
};

export const setType = (type) => (dispatch) => {
  setStorageItem('user_type', type);
  dispatch({ type: SET_DATA, payload: { type: type ? type : TYPE_CUSTOMER } });
};

export const setUserDetail = (userDetail) => (dispatch) => {
  dispatch({ type: SET_DATA, payload: { userDetail } });
};

export const getUserDetail = () => {
  return async (dispatch, getState) => {
    try {
      const { data } = await API.getUserDetail();
      if (data.status === 1) {
        dispatch({
          type: SET_DATA,
          payload: {
            ...getState().auth,
            authenticated: true,
            userDetail: data.result.userDetail,
          },
        });
        showSuccess(data.message);
      } else {
        showError(data.message);
      }
    } catch (err) {
      console.error(err);
      return false;
    }
  };
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
          dispatch(setPageLoading(true));
          const token = data.result.accessToken;
          await setAuthorization(token);
          setStorageItem('user_type', signData.type);
          setStorageItem('access_token', token);
          await dispatch(getUserDetail());
          await router.push('/services');
          showSuccess(data.message);
          dispatch(setPageLoading(false));
        } else {
          await dispatch({
            type: SET_DATA,
            payload: {
              authenticated: false,
              type: signData.type,
              ...data.result,
            },
          });
          await dispatch(
            setOtpModal({ open: true, onOk: () => router.push('/services') })
          );
        }
        return true;
      } else {
        showError(data.message);
        dispatch(setPageLoading(false));
        return false;
      }
    } catch (err) {
      console.error(err);
      dispatch(setPageLoading(false));
      return false;
    }
  };
};

export const signInWithToken = (router) => {
  return async (dispatch) => {
    try {
      if (!getStorageItem('access_token')) {
        router.push('/');
        dispatch(setPageLoading(false));
        return;
      }
      dispatch(setPageLoading(true));
      await setAuthorization(getStorageItem('access_token'));
      const {
        data: { status, result, message },
      } = await API.getUserDetail();
      if (status === 1) {
        await dispatch({
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
      dispatch(setPageLoading(false));
    } catch (err) {
      dispatch(setPageLoading(false));
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
      dispatch(setPageLoading(true));
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
    dispatch(setPageLoading(false));
  };
};

export const useAuth = () => {
  return useSelector(({ auth }) => auth);
};

export const verifyOtp = (info) => {
  return async (dispatch, getState) => {
    const key = 'verify_otp';
    try {
      dispatch(setPending(key, true));
      const { userDetail, type } = getState().auth;
      const { data } = await API.verifyOtp({
        type,
        email: userDetail && userDetail.email,
        platform: PLATFORM,
        fcmToken: userDetail && userDetail.fcmToken,
        deviceToken: userDetail && userDetail.deviceToken,
        ...info,
      });
      dispatch(setPending(key, false));
      if (data.status === 1) {
        await setAuthorization(data.result.accessToken);
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
      dispatch(setPending(key, false));
      return false;
    }
  };
};

export const resetVerifyOtp = (info) => {
  return async (dispatch, getState) => {
    const key = 'verify_otp';
    try {
      dispatch(setPending(key, true));
      const { type } = getState().auth;
      const { data } = await API.verifyOtp({
        type,
        platform: PLATFORM,
        ...info,
      });
      dispatch(setPending(key, false));
      if (data.status === 1) {
        return true;
      } else {
        showError(data.message);
        return false;
      }
    } catch (err) {
      console.error(err);
      dispatch(setPending(key, false));
      return false;
    }
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

export const forgotPassword = (info) => {
  return async (dispatch) => {
    const key = 'forgotPassword';
    try {
      dispatch(setPending(key, true));
      const { data } = await API.forgotPassword(info);
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

export const resetPassword = (info) => {
  return async (dispatch) => {
    const key = 'resetPassword';
    try {
      dispatch(setPending(key, true));
      const { data } = await API.resetPassword(info);
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

export const providerUpdateProfile = (info) => {
  return async (dispatch, getState) => {
    try {
      const { data } = await API.providerUpdateProfile(info);
      if (data.status !== 1) {
        showError(data.message);
        return;
      }
      dispatch({
        type: SET_DATA,
        payload: {
          ...getState().auth,
          userDetail: data.result.user,
        },
      });
    } catch (err) {
      console.error(err);
    }
  };
};

export const payNowFree = (info) => {
  return async (dispatch, getState) => {
    const key = 'payNow';
    try {
      dispatch(setPending(key, true));
      const { data } = await API.payNowFree(info);
      dispatch(setPending(key, false));
      if (data.status !== 1) {
        showError(data.message);
        return false;
      }
      dispatch({
        type: SET_DATA,
        payload: {
          ...getState().auth,
          userDetail: data.result.user,
        },
      });
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };
};

export const becomeProviderCustomer = (becomeType) => {
  return async (dispatch, getState) => {
    const key = 'become';
    try {
      dispatch(setPending(key, true));
      const { data } = await API.becomeProviderCustomer({ becomeType });
      dispatch(setPending(key, false));
      if (data.status !== 1) {
        showError(data.message);
        return false;
      }
      dispatch(setUserDetail(data.result.user));
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };
};

export const deleteAccount = (router) => {
  return async (dispatch) => {
    const key = 'deleteAccount';
    try {
      dispatch(setPending(key, true));
      const { data } = await API.deleteAccount();
      dispatch(setPending(key, false));
      if (data.status !== 1) {
        showError(data.message);
        return false;
      }
      dispatch(logOut(router));
      return true;
    } catch (err) {
      console.error(err);
      dispatch(setPending(key, false));
      return false;
    }
  };
};
