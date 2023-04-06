import { SET_DATA, SET_LOADING, SET_PENDING } from './actions';

const initialState = {
  service_list: { data: [], loading: false },
  help_list: { data: [], loading: false },
  notification_list: { data: [], loading: false },
  message_list: { data: [], loading: false },
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
          [action.key]: pending,
        },
      };
    default:
      return { ...state };
  }
};
