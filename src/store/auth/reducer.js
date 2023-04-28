import { TYPE_CUSTOMER, TYPE_HELPER } from 'src/utils/constants';
import { SET_DATA, SET_PENDING } from './actions';

const initialState = {
  authenticated: false,
  type: TYPE_CUSTOMER,
  pending: {},
  pageLoading: true,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_DATA:
      return {
        ...state,
        ...action.payload,
      };
    case SET_PENDING:
      return {
        ...state,
        pending: {
          ...state.pending,
          [action.key]: action.pending,
        },
      };
    default:
      return { ...state };
  }
};
