import { SET_DATA } from './actions';

const initialState = {
  progress: false,
  notification_drawer: false,
  menu_drawer: false,
  title: '',
  otp_modal: { open: false },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_DATA:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return { ...state };
  }
};
