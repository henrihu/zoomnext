import API from 'src/api/jobs';
import moment from 'moment';
import { JOB_STATUS_ASSIGNED } from 'src/utils/constants';
import { showError } from 'src/utils/messages';

export const SET_DATA = '[CUSTOMER JOBS] SET DATA]';
export const SET_LOADING = '[CUSTOMER JOBS] SET LOADING';
export const SET_FILTER = '[CUSTOMER JOBS] SET FILTER]';

export const getMyJobList = () => {
  return async (dispatch, getState) => {
    const key = 'job_list';
    try {
      dispatch(setLoading(key, true));
      const filter = getState().c_jobs.job_list_filter;
      const {
        data: {
          message,
          result: { getMyJob, hasMore },
          status,
        },
      } = await API.getMyJobList(filter);
      if (status !== 1) {
        showError(message);
        return;
      }
      const data = {
        total: (filter.page + hasMore) * 10,
        data: getMyJob,
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
      const {
        data: {
          status,
          message,
          result: { job },
        },
      } = await API.getJobDetail(params);
      if (status !== 1) {
        showError(message);
        return;
      }
      dispatch(setData(key, job));
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
