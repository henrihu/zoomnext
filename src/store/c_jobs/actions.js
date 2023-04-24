import API from 'src/api/jobs';
import moment from 'moment';
import { JOB_STATUS_ASSIGNED } from 'src/utils/constants';
import { showError, showSuccess } from 'src/utils/messages';

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
        dispatch(setLoading(key, false));
        return;
      }
      const data = {
        hasMore: hasMore,
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
        dispatch(setLoading(key, false));
        return;
      }
      dispatch(setData(key, job));
    } catch (err) {
      console.error(err);
    }
    dispatch(setLoading(key, false));
  };
};

export const createJob = (params) => {
  return async (dispatch) => {
    const key = 'create_job';
    try {
      dispatch(setLoading(key, true));
      const { data } = await API.createJob(params);
      dispatch(setLoading(key, false));
      if (data.status !== 1) {
        showError(data.message);
        return false;
      }
      showSuccess(data.message);
      return data.result;
    } catch (err) {
      console.error(err);
      dispatch(setLoading(key, false));
      return false;
    }
  };
};

export const approveBid = (params) => {
  return async (dispatch) => {
    const key = 'approve_bid';
    try {
      dispatch(setLoading(key, true));
      const { data } = await API.approveBid(params);
      dispatch(setLoading(key, false));
      if (data.status !== 1) {
        showError(data.message);
        return false;
      }
      showSuccess(data.message);
      return data.result;
    } catch (err) {
      console.error(err);
      dispatch(setLoading(key, false));
      return false;
    }
  };
};

export const customerCompleteJob = (params) => {
  return async (dispatch) => {
    const key = 'customer_complete_job';
    try {
      dispatch(setLoading(key, true));
      const { data } = await API.customerCompleteJob(params);
      dispatch(setLoading(key, false));
      if (data.status !== 1) {
        showError(data.message);
        return false;
      }
      showSuccess(data.message);
      return data.result;
    } catch (err) {
      console.error(err);
      dispatch(setLoading(key, false));
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
export const setFilter = (key, filter) => ({
  type: SET_FILTER,
  key,
  filter,
});
