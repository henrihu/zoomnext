import API from 'src/api/common';
import { setData as setAuthData } from 'src/store/auth/actions';
import { getTimeZone } from 'src/utils/common';
import { showError, showSuccess } from 'src/utils/messages';

export const SET_MESSENGER = '[COMMON] SET MESSENGER]';
export const SET_DATA = '[COMMON] SET DATA]';
export const SET_LOADING = '[COMMON] SET LOADING';
export const SET_PENDING = '[COMMON] SET PENDING';
export const INIT_STORE = '[COMMON] INIT STORE';

export const uploadImage = (info) => {
  return async (dispatch) => {
    const key = 'upload_image';
    try {
      dispatch(setPending(key, true));
      const { data } = await API.uploadImage(info);
      if (data.status === 1) {
        return data.result;
      } else {
        showError(data.message);
      }
    } catch (err) {
      console.error(err);
    }
    console.log('uploadImage err');
    dispatch(setPending(key, false));
  };
};

export const getServiceList = () => {
  return async (dispatch) => {
    const key = 'service_list';
    try {
      dispatch(setLoading(key, true));
      const { data } = await API.getServiceList();
      dispatch(setLoading(key, false));
      if (data.status !== 1) {
        showError(data.message);
        return;
      }
      dispatch(setData(key, data.result.categories));
    } catch (err) {
      console.error(err);
      dispatch(setLoading(key, false));
    }
  };
};

export const getFaqList = () => {
  return async (dispatch) => {
    try {
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
    } catch (err) {
      console.error(err);
    }
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

export const getNotificationList = (pagination) => {
  return async (dispatch, getState) => {
    try {
      const key = 'notification_list';
      dispatch(setLoading(key, true));
      const { data } = await API.getNotificationList(pagination);
      dispatch(setLoading(key, false));
      if (data.status !== 1) {
        showError(data.message);
        return;
      }
      dispatch(
        setData(key, {
          ...data.result,
          notifications: [
            ...getState().common.notification_list.data.notifications,
            ...data.result.notifications,
          ],
        })
      );
    } catch (err) {
      console.error(err);
    }
  };
};

export const removeNotification = (notificationId) => {
  return async (dispatch, getState) => {
    try {
      const key = `removeNotification${notificationId}`;
      dispatch(setPending(key, true));
      const { data } = await API.removeNotification({ notificationId });
      dispatch(setPending(key, false));
      if (data.status === 1) {
        const notification = getState().common.notification_list.data;
        dispatch(
          setData('notification_list', {
            ...notification,
            notifications: notification.notifications.filter(
              ({ id }) => id !== notificationId
            ),
          })
        );
        return true;
      } else {
        showError(data.message);
        return false;
      }
    } catch (err) {
      return false;
    }
  };
};

export const emailNotificationUpdate = (info) => {
  return async (dispatch, getState) => {
    try {
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
    } catch (err) {
      console.error(err);
    }
  };
};

export const getConversations = () => {
  return async (dispatch) => {
    const key = 'converstations';
    try {
      // dispatch(setLoading(key, true));
      const { data } = await API.getConversations({ timeZone: getTimeZone() });
      if (data.status === 1) {
        dispatch(setData(key, data.result.conversations));
      } else {
        showError(data.message);
      }
    } catch (err) {
      console.error(err);
    }
    // dispatch(setLoading(key, false));
  };
};

export const getChats = (selected, loading = true) => {
  return async (dispatch) => {
    const key = 'chats';
    try {
      loading && dispatch(setLoading(key, true));
      const { data } = await API.getChats({
        indexId: 0,
        isGreater: 1,
        otherUserId: selected.userId,
        timeZone: getTimeZone(),
        jobId: selected.jobId,
      });
      if (data.status === 1) {
        dispatch(setData(key, data.result.data.reverse()));
      } else {
        showError(data.message);
      }
    } catch (err) {
      console.error(err);
    }
    dispatch(setLoading(key, false));
  };
};

export const sendMessage = (info) => {
  return async (dispatch, getState) => {
    const key = 'sendMessage';
    try {
      dispatch(setPending(key, true));
      const { data } = await API.sendMessage({
        timeZone: getTimeZone(),
        ...info,
      });
      dispatch(setPending(key, false));
      if (data.status === 1) {
        dispatch(
          setData('chats', [
            ...getState().common.chats.data,
            data.result.lastMessage,
          ])
        );
        dispatch(getConversations());
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

export const updateProfile = (info) => {
  return async (dispatch) => {
    const key = 'update_profile';
    try {
      dispatch(setPending(key, true));
      const { data } = await API.updateProfile(info);
      if (data.status === 1) {
        dispatch(
          setAuthData({
            userDetail: data.result.userDetail,
          })
        );
        showSuccess(data.message);
      } else {
        showError(data.message);
      }
    } catch (err) {
      console.error(err);
    }
    dispatch(setPending(key, false));
  };
};

export const uploadProfileImage = (info) => {
  return async (dispatch, getState) => {
    const key = 'upload_profile';
    try {
      dispatch(setPending(key, true));
      const { data } = await API.uploadProfileImage(info);
      if (data.status === 1) {
        dispatch(
          setAuthData({
            userDetail: {
              ...getState().auth.userDetail,
              avatarImage: data.result.profileImage,
            },
          })
        );
      } else {
        showError(data.message);
      }
    } catch (err) {
      console.error(err);
    }
    dispatch(setPending(key, false));
  };
};

export const changePassword = (info) => {
  return async (dispatch) => {
    const key = 'change_password';
    try {
      dispatch(setPending(key, true));
      const { data } = await API.changePassword(info);
      dispatch(setPending(key, false));
      if (data.status === 1) {
        showSuccess(data.message);
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

export const setMessenger = (data) => ({ type: SET_MESSENGER, data });
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
export const initStore = (key) => ({ type: INIT_STORE, key });
