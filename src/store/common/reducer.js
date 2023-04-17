import { SET_DATA, SET_LOADING, SET_PENDING } from './actions';

const initialState = {
  service_list: { data: [], loading: false },
  faq_list: { data: [], loading: false },
  notification_list: { data: [], loading: false },
  message_list: { data: [], loading: false },
  loading: {},
  pending: {},
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
