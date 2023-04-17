import moment from 'moment';
import API from 'src/api/payment';
import { showError } from 'src/utils/messages';

export const SET_DATA = '[PAYMENT] SET DATA]';
export const SET_LOADING = '[PAYMENT] SET LOADING';
export const SET_FILTER = '[PAYMENT] SET FILTER]';

export const getCardList = (data) => {
  return async (dispatch) => {
    const key = 'card_list';
    try {
      dispatch(setLoading(key, true));
      // await API.getCardList(data);
      const data = [
        {
          cardholderName: 'Roman Range',
          cardNumber: '4242424242424242',
          expDate: '12/2022',
          cvv: '123',
          default: true,
        },
        {
          cardholderName: 'Roman Range',
          cardNumber: '4242424242424242',
          expDate: '12/2022',
          cvv: '123',
          default: false,
        },
        {
          cardholderName: 'Roman Range',
          cardNumber: '4242424242424242',
          expDate: '12/2022',
          cvv: '123',
          default: false,
        },
      ];
      dispatch(setData(key, data));
    } catch (err) {
      console.error(err);
    }
    dispatch(setLoading(key, false));
  };
};

export const getPaymentHistory = () => {
  return async (dispatch, getState) => {
    const key = 'payment_history';
    try {
      const { page } = getState().payment.payment_history_filter;
      const { type } = getState().auth;
      const { data } = await API.getPaymentHistory({ page, type });
      if (data.status === 1) {
        dispatch(setData(key, data.result));
      } else {
        showError(data.message);
      }
      dispatch(setLoading(key, true));
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
