import API from 'src/api/common';
import moment from 'moment';
import { setNotificationDrawer } from 'src/store/setting/actions';
import { setData as setAuthData } from 'src/store/auth/actions';
import { showError } from 'src/utils/messages';

export const SET_DATA = '[COMMON] SET DATA]';
export const SET_LOADING = '[COMMON] SET LOADING';
export const SET_PENDING = '[COMMON] SET PENDING';

export const getServiceList = () => {
  return async (dispatch) => {
    try {
      const key = 'service_list';
      dispatch(setLoading(key, true));
      const { data } = await API.getServiceList();
      dispatch(setLoading(key, false));
      if (data.status !== 1) {
        showError(data.message);
        return;
      }
      dispatch(setData(key, data.result.serviceList));
    } catch (err) {
      console.error(err);
    }
  };
};

export const getFaqList = () => {
  return async (dispatch) => {
    const key = 'faq_list';
    dispatch(setLoading(key, true));
    const {
      data: { message, status, result },
    } = await API.getFaqList();
    dispatch(setLoading(key, false));
    if (status !== 1) {
      showError(message);
      return;
    }
    dispatch(setData(key, result.faqs));
  };
};

export const contactUs = (data) => {
  return async (dispatch) => {
    try {
      const key = 'contactUs';
      dispatch(setPending(key, true));
      const {
        data: { message, status, result },
      } = await API.contactUs(data);
      dispatch(setPending(key, false));
      if (status !== 1) {
        showError(message);
        return false;
      }
      return true;
    } catch (err) {
      return false;
    }
  };
};

export const getNotificationList = (data) => {
  return async (dispatch) => {
    const key = 'notification_list';
    dispatch(setLoading(key, true));
    const { data } = await API.getNotificationList();
    dispatch(setLoading(key, false));
    if (data.status !== 1) {
      showError(data.message);
      return;
    }
    dispatch(setData(key, data.result.notificationList));
    dispatch(setNotificationDrawer(true));
  };
};

export const emailNotificationUpdate = (info) => {
  return async (dispatch, getState) => {
    const key = 'emailNotificationUpdate';
    dispatch(setLoading(key, true));
    const { data } = await API.emailNotificationUpdate(info);
    dispatch(setLoading(key, false));
    if (data.status !== 1) {
      showError(data.message);
      return;
    }
    dispatch(
      setAuthData({ userDetail: { ...getState().auth.userDetail, ...info } })
    );
  };
};

export const getMessageList = (data) => {
  return async (dispatch) => {
    const key = 'message_list';
    try {
      dispatch(setLoading(key, true));
      // await API.getNotificationList(data);
      const data = [
        {
          id: 1,
          message:
            'Hello! I have one question Hello! I have one questionHello! I have one questionHello! I have one questionHello! I have one questionHello! I have one question',
          isRead: 1,
          messageType: 'MESSAGE',
          state: 1,
        },
        {
          id: 2,
          message: "I'm on the job",
          isRead: 1,
          messageType: 'MESSAGE',
          state: 1,
        },
        {
          id: 3,
          message: "I'm on the job",
          isRead: 1,
          messageType: 'MESSAGE',
          state: 0,
        },
        {
          id: 4,
          message: '/images/service.png',
          isRead: 1,
          messageType: 'IMAGE',
          state: 0,
        },
        {
          id: 5,
          message: "I'm on the job",
          isRead: 1,
          messageType: 'MESSAGE',
          state: 1,
        },
        {
          id: 1,
          message:
            'Hello! I have one question Hello! I have one questionHello! I have one questionHello! I have one questionHello! I have one questionHello! I have one question',
          isRead: 1,
          messageType: 'MESSAGE',
          state: 1,
        },
        {
          id: 2,
          message: "I'm on the job",
          isRead: 1,
          messageType: 'MESSAGE',
          state: 1,
        },
        {
          id: 3,
          message: "I'm on the job",
          isRead: 1,
          messageType: 'MESSAGE',
          state: 0,
        },
        {
          id: 4,
          message: '/images/service.png',
          isRead: 1,
          messageType: 'IMAGE',
          state: 0,
        },
        {
          id: 5,
          message: "I'm on the job",
          isRead: 1,
          messageType: 'MESSAGE',
          state: 1,
        },
      ];
      dispatch(setData(key, data));
    } catch (err) {
      console.error(err);
    }
    dispatch(setLoading(key, false));
  };
};

export const updateProfile = (data) => {
  return async (dispatch) => {
    const key = 'update_profile';
    try {
      dispatch(setPending(key, true));
      // await API.updateProfile(data);
    } catch (err) {
      console.error(err);
    }
    dispatch(setPending(key, false));
  };
};

export const uploadProfileImage = (data) => {
  return async (dispatch) => {
    const key = 'upload_profile';
    try {
      dispatch(setPending(key, true));
      // await API.uploadProfileImage(data);
    } catch (err) {
      console.error(err);
    }
    dispatch(setPending(key, false));
  };
};

export const setData = (key, data) => ({ type: SET_DATA, key, data });
export const setLoading = (key, loading) => ({
  type: SET_LOADING,
  key,
  loading,
});
export const setPending = (key, pending) => ({
  type: SET_PENDING,
  key,
  pending,
});
