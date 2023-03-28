import API from 'src/api/auth';
import { useRouter } from 'next/router';

export const SET_DATA = '[AUTH] SET DATA]';

export const setType = (type) => (dispatch) => {
  dispatch({ type: SET_DATA, payload: { type } });
};

export const signInWithEmail = (data) => {
  return async (dispatch) => {
    try {
      // await API.signInWithEmail(data);
      dispatch({ type: SET_DATA, payload: { authenticated: true } });
    } catch (err) {
      console.error(err);
    }
  };
};

export const signUp = (data) => {
  return async (dispatch) => {
    try {
      // await API.signUp(data);
    } catch (err) {
      console.error(err);
    }
  };
};
