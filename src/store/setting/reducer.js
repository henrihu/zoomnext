import { TYPE_CUSTOMER, TYPE_HELPER } from 'src/utils/constants';
import { SET_DATA } from './actions';

const initialState = {
  progress: false,
  notification_drawer: false,
  menu_drawer: false,
  title: '',
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
