import API from 'src/api/payment';

export const SET_DATA = '[COMMON] SET DATA]';
export const SET_LOADING = '[COMMON] SET LOADING';

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
  return async (dispatch) => {
    const key = 'payment_history';
    try {
      dispatch(setLoading(key, true));
      // await API.getPaymentHistory(data);
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

export const setData = (key, data) => {
  return { type: SET_DATA, key, data };
};

export const setLoading = (key, loading) => {
  return { type: SET_LOADING, key, loading };
};
