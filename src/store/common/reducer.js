import {
  INIT_STORE,
  SET_DATA,
  SET_LOADING,
  SET_PENDING,
  SET_MESSENGER,
} from './actions';

const initialState = {
  service_list: { data: [], loading: false },
  faq_list: { data: [], loading: false },
  notification_list: {
    data: { notifications: [], hasMore: false },
    loading: false,
  },
  converstations: { data: [], loading: false },
  chats: { data: [], loading: false },
  messenger: null,
  pending: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_MESSENGER:
      return {
        ...state,
        messenger: action.data,
      };
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
    case INIT_STORE:
      return {
        ...state,
        [action.key]: initialState[action.key] && initialState[action.key],
      };
    default:
      return { ...state };
  }
};
