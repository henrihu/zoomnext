import { SET_DATA, SET_FILTER, SET_LOADING } from './actions';

const initialState = {
  card_list: { data: [], loading: false },
  payment_history: {
    data: { hasMore: 0, paymentHistory: [], totalPrice: 0 },
    loading: false,
  },
  payment_history_filter: { page: 1 },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_DATA:
      return {
        ...state,
        [action.key]: {
          ...state[action.key],
          data: action.data,
        },
      };
    case SET_LOADING:
      return {
        ...state,
        [action.key]: {
          ...state[action.key],
          loading: action.loading,
        },
      };
    case SET_FILTER:
      return {
        ...state,
        [action.key]: {
          ...state[action.key],
          ...action.filter,
        },
      };
    default:
      return { ...state };
  }
};
