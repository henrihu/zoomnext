import API from 'src/api/bank';
import { showError, showSuccess } from 'src/utils/messages';

export const SET_DATA = '[BANK] SET DATA]';
export const SET_LOADING = '[BANK] SET LOADING';

export const getBank = () => {
  return async (dispatch) => {
    const key = 'bank';
    try {
      dispatch(setLoading(key, true));
      const { data } = await API.getBank();
      if (data.status === 1) {
        dispatch(setData(key, data.result.bank));
      }
    } catch (err) {
      console.error(err);
    }
    dispatch(setLoading(key, false));
  };
};

export const addBank = (params) => {
  return async (dispatch) => {
    try {
      const { data } = await API.addBank(params);
      if (data.status !== 1) {
        showError(data.message);
        return false;
      }
      showSuccess(data.message);
      await dispatch(getBank());
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };
};

export const stripeConnect = (id) => {
  return async (dispatch) => {
    const key = 'stripe_connect';
    try {
      dispatch(setLoading(key, true));
      const { data } = await API.stripeConnect();
      dispatch(setLoading(key, false));
      if (data.status !== 1) {
        showError(data.message);
        return false;
      }
      showSuccess(data.message);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };
};

export const setData = (key, data) => ({ type: SET_DATA, key, data });

export const setLoading = (key, loading) => ({
  type: SET_LOADING,
  key,
  loading,
});
