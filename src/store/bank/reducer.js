import { SET_DATA, SET_LOADING } from './actions';

const initialState = {
  bank: { data: {}, loading: false },
  stripe_connect: { loading: false },
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
    default:
      return { ...state };
  }
};
