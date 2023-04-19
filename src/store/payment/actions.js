import moment from 'moment';
import API from 'src/api/payment';
import { showError } from 'src/utils/messages';

export const SET_DATA = '[PAYMENT] SET DATA]';
export const SET_LOADING = '[PAYMENT] SET LOADING';
export const SET_FILTER = '[PAYMENT] SET FILTER]';

export const getCardList = () => {
  return async (dispatch) => {
    const key = 'card_list';
    try {
      dispatch(setLoading(key, true));
      const { data } = await API.getCardList();
      if (data.status === 1) {
        dispatch(setData(key, data.result.userCardList));
      }
    } catch (err) {
      console.error(err);
    }
    dispatch(setLoading(key, false));
  };
};

export const addCard = (info) => {
  return async () => {
    try {
      const { data } = await API.addCard({
        ...info,
        expDate: `${info.month}/${info.year}`,
      });
      if (data.status !== 1) {
        showError(data.message);
        return false;
      }
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };
};

export const setDefaultCard = (id) => {
  return async () => {
    try {
      const { data } = await API.setDefaultCard(id);
      if (data.status !== 1) {
        showError(data.message);
        return false;
      }
      dispatch(getCardList());
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };
};

export const deleteCard = (id) => {
  return async () => {
    try {
      const { data } = await API.deleteCard(id);
      if (data.status !== 1) {
        showError(data.message);
        return false;
      }
      dispatch(getCardList());
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };
};

export const getPaymentHistory = () => {
  return async (dispatch, getState) => {
    const key = 'payment_history';
    try {
      const { page } = getState().payment.payment_history_filter;
      const { type } = getState().auth;
      dispatch(setLoading(key, true));
      const { data } = await API.getPaymentHistory({ page, type });
      if (data.status === 1) {
        dispatch(setData(key, data.result));
      } else {
        showError(data.message);
      }
    } catch (err) {
      console.error(err);
    }
    dispatch(setLoading(key, false));
  };
};

export const setData = (key, data) => ({ type: SET_DATA, key, data });
export const setLoading = (key, loading) => ({
  type: SET_LOADING,
  key,
  loading,
});
export const setFilter = (key, filter) => ({
  type: SET_FILTER,
  key,
  filter,
});
