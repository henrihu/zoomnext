import moment from 'moment';
import API from 'src/api/payment';

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

export const getPaymentHistory = (data) => {
  return async (dispatch, getState) => {
    const key = 'payment_history';
    try {
      dispatch(setLoading(key, true));
      const { page } = getState().payment.payment_history_filter;
      const { type } = getState().auth;
      console.log('Payment History: ', page, type);
      // await API.getPaymentHistory(data);
      const total_data = [
        {
          id: '1',
          date: moment(),
          title: 'Job title info',
          description: 'Job Details',
          price: 945,
        },
        {
          id: '2',
          date: moment(),
          title: 'Job title info',
          description: 'Job Details',
          price: 945,
        },
        {
          id: '3',
          date: moment(),
          title: 'Job title info',
          description: 'Job Details',
          price: 945,
        },
        {
          id: '4',
          date: moment(),
          title: 'Job title info',
          description: 'Job Details',
          price: 945,
        },
        {
          id: '5',
          date: moment(),
          title: 'Job title info',
          description: 'Job Details',
          price: 945,
        },
        {
          id: '6',
          date: moment(),
          title: 'Job title info',
          description: 'Job Details',
          price: 945,
        },
        {
          id: '7',
          date: moment(),
          title: 'Job title info',
          description: 'Job Details',
          price: 945,
        },
        {
          id: '8',
          date: moment(),
          title: 'Job title info',
          description: 'Job Details',
          price: 945,
        },
        {
          id: '9',
          date: moment(),
          title: 'Job title info',
          description: 'Job Details',
          price: 945,
        },
        {
          id: '10',
          date: moment(),
          title: 'Job title info',
          description: 'Job Details',
          price: 945,
        },
        {
          id: '11',
          date: moment(),
          title: 'Job title info',
          description: 'Job Details',
          price: 945,
        },
      ];
      const data = {
        total: total_data.length,
        data: total_data.slice((page - 1) * 5, page * 5),
      };
      dispatch(setData(key, data));
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
