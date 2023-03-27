import { INCREMENT, DECREMENT } from '../constants';
import { HYDRATE } from 'next-redux-wrapper';

const initialState = {
  value: 1231,
  action: '123123',
  from: 'from',
  adsf: 'asjdklfa;jsdklf;',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
      return {
        ...state,
        ...action.payload,
      };
    case INCREMENT:
      return {
        ...state,
        value: state.value + 1,
        action: 'increment',
        from: action.from,
      };

    case DECREMENT:
      return {
        ...state,
        value: state.value - 1,
        action: 'decrement',
        from: action.from,
      };

    default:
      return { ...state };
  }
};
