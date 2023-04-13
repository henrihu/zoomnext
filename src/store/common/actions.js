import API from 'src/api/common';
import moment from 'moment';
import { setNotificationDrawer } from 'src/store/setting/actions';
import { showError } from 'src/utils/messages';

export const SET_DATA = '[COMMON] SET DATA]';
export const SET_LOADING = '[COMMON] SET LOADING';
export const SET_PENDING = '[COMMON] SET PENDING';

export const getServiceList = () => {
  return async (dispatch) => {
    const key = 'service_list';
    dispatch(setLoading(key, true));
    const {
      data: { message, status, result },
    } = await API.getServiceList();
    if (status !== 1) {
      showError(message);
      return;
    }
    dispatch(setData(key, result.serviceList));
    dispatch(setLoading(key, false));
  };
};

export const getHelpList = (data) => {
  return async (dispatch) => {
    const key = 'help_list';
    try {
      dispatch(setLoading(key, true));
      // await API.getServiceList(data);
      const data = [
        {
          id: '1',
          question: 'How does Zoom Errands work?',
          answer:
            ' An open-source starter kit that will help you build full-stack multi-tenant SaaS platforms efficiently and help you focus on developing your core SaaS features. Built on top of popular and modern technologies such as Next JS, Tailwind, Prisma, and Stripe',
        },
        {
          id: '2',
          question: 'How does Zoom Errands work?',
          answer:
            ' An open-source starter kit that will help you build full-stack multi-tenant SaaS platforms efficiently and help you focus on developing your core SaaS features. Built on top of popular and modern technologies such as Next JS, Tailwind, Prisma, and Stripe',
        },
        {
          id: '3',
          question: 'How does Zoom Errands work?',
          answer:
            ' An open-source starter kit that will help you build full-stack multi-tenant SaaS platforms efficiently and help you focus on developing your core SaaS features. Built on top of popular and modern technologies such as Next JS, Tailwind, Prisma, and Stripe',
        },
        {
          id: '4',
          question: 'How does Zoom Errands work?',
          answer:
            ' An open-source starter kit that will help you build full-stack multi-tenant SaaS platforms efficiently and help you focus on developing your core SaaS features. Built on top of popular and modern technologies such as Next JS, Tailwind, Prisma, and Stripe',
        },
        {
          id: '5',
          question: 'How does Zoom Errands work?',
          answer:
            ' An open-source starter kit that will help you build full-stack multi-tenant SaaS platforms efficiently and help you focus on developing your core SaaS features. Built on top of popular and modern technologies such as Next JS, Tailwind, Prisma, and Stripe',
        },
      ];
      dispatch(setData(key, data));
    } catch (err) {
      console.error(err);
    }
    dispatch(setLoading(key, false));
  };
};

export const getNotificationList = (data) => {
  return async (dispatch) => {
    const key = 'notification_list';
    try {
      dispatch(setLoading(key, true));
      // await API.getNotificationList(data);
      const data = [
        { id: '1', title: 'Post Updated', date: moment(), status: 1 },
        { id: '2', title: 'Post Updated', date: moment(), status: 1 },
        { id: '3', title: 'Post Updated', date: moment(), status: 0 },
        { id: '4', title: 'Post Updated', date: moment(), status: 0 },
      ];
      dispatch(setData(key, data));
      dispatch(setNotificationDrawer(true));
    } catch (err) {
      console.error(err);
    }
    dispatch(setLoading(key, false));
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
