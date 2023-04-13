import API from 'src/api/jobs';
import moment from 'moment';
import { JOB_STATUS_ASSIGNED } from 'src/utils/constants';

export const SET_DATA = '[CUSTOMER JOBS] SET DATA]';
export const SET_LOADING = '[CUSTOMER JOBS] SET LOADING';
export const SET_FILTER = '[CUSTOMER JOBS] SET FILTER]';

export const getMyJobList = () => {
  return async (dispatch, getState) => {
    const key = 'job_list';
    try {
      dispatch(setLoading(key, true));
      const filter = getState().c_jobs.job_list_filter;
      console.log('Job Filter', filter);
      await API.getMyJobList(filter);
      const total_data = [
        {
          title: 'Cleaning',
          status: 'assigned',
          date: moment(),
          price: 5000.232,
          description: 'Job Details',
        },
        {
          title: 'Plumber',
          status: 'assigned',
          date: moment(),
          price: 500,
          description: 'Job Details',
        },
        {
          title: 'Mechanic',
          status: 'pending',
          date: moment(),
          price: 100,
          description: 'Job Details',
        },
        {
          title: 'Plumber',
          status: 'pending',
          date: moment(),
          price: 200,
          description: 'Job Details',
        },
        {
          title: 'Mechanic',
          status: 'pending',
          date: moment(),
          price: 200,
          description: 'Job Details',
        },
        {
          title: 'Cleaning',
          status: 'pending',
          date: moment(),
          price: 200,
          description: 'Job Details',
        },
        {
          title: 'Plumber',
          status: 'pending',
          date: moment(),
          price: 200,
          description: 'Job Details',
        },
        {
          title: 'Mechanic',
          status: 'assigned',
          date: moment(),
          price: 200,
          description: 'Job Details',
        },
        {
          title: 'Plumber',
          status: 'pending',
          date: moment(),
          price: 200,
          description: 'Job Details',
        },
      ];
      const data = {
        total: total_data.length,
        data: total_data.slice((filter.page - 1) * 3, filter.page * 3),
      };
      dispatch(setData(key, data));
    } catch (err) {
      console.error(err);
    }
    dispatch(setLoading(key, false));
  };
};

export const getJobDetail = (params) => {
  return async (dispatch) => {
    const key = 'job_detail';
    try {
      dispatch(setLoading(key, true));
      // await API.getJobDetail(params);
      const data = {
        title: 'Cleaning',
        status: JOB_STATUS_ASSIGNED,
        date: moment(),
        location: '#12, Ahmedabad, GJ, Ahmedabad, India, 380006',
        price: 200,
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
