import API from 'src/api/common';

export const SET_DATA = '[COMMON] SET DATA]';
export const SET_LOADING = '[COMMON] SET LOADING';

export const getServiceList = (data) => {
  return async (dispatch) => {
    const key = 'service_list';
    try {
      dispatch(setLoading(key, true));
      // await API.getServiceList(data);
      const data = [
        { label: 'Cleaning' },
        { label: 'Plumber' },
        { label: 'Mechanic' },
        { label: 'Plumber' },
        { label: 'Mechanic' },
        { label: 'Cleaning' },
        { label: 'Plumber' },
        { label: 'Mechanic' },
        { label: 'Plumber' },
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
