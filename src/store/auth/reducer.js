import { TYPE_CUSTOMER, TYPE_HELPER } from 'src/utils/constants';
import { SET_DATA } from './actions';

const initialState = {
  authenticated: false,
  type: TYPE_CUSTOMER,
  progress: false,
  notification_drawer: false,
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
