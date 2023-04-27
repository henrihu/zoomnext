import { useSelector } from 'react-redux';
import { getNotificationList } from '../common/actions';

export const SET_DATA = '[SETTING] SET DATA';

export const setData = (data) => (dispatch) => {
  dispatch({ type: SET_DATA, payload: data });
};

export const setNotificationDrawer = (notification_drawer) => (dispatch) => {
  dispatch({ type: SET_DATA, payload: { notification_drawer } });
};
export const setMenuDrawer = (menu_drawer) => (dispatch) => {
  dispatch({ type: SET_DATA, payload: { menu_drawer } });
};
export const setProgress = (progress) => (dispatch) => {
  dispatch({ type: SET_DATA, payload: { progress } });
};
export const setTitle = (title) => (dispatch) => {
  dispatch({ type: SET_DATA, payload: { title } });
};

export const setOtpModal = (otp_modal) => {
  return (dispatch) => {
    dispatch({ type: SET_DATA, payload: { otp_modal } });
  };
};

export const setProfileModal = (profile_modal) => {
  return (dispatch) => {
    dispatch({ type: SET_DATA, payload: { profile_modal } });
  };
};

export const useSetting = () => {
  const setting = useSelector(({ setting }) => setting);
  return setting;
};
