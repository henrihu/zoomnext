import API from 'src/api/auth';

export const SET_DATA = '[AUTH] SET DATA';

export const setType = (type) => (dispatch) => {
  dispatch({ type: SET_DATA, payload: { type } });
};

export const signInWithEmail = () => {
  return async (dispatch) => {
    try {
      // await API.signInWithEmail(data);
      dispatch({
        type: SET_DATA,
        payload: { authenticated: true, type: data.type },
      });
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

export const logOut = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: SET_DATA,
        payload: { authenticated: false },
      });
    } catch (err) {
      console.error(err);
    }
  };
};
