import API from 'src/api/jobs';
import moment from 'moment';
import { showError, showSuccess } from 'src/utils/messages';
import { TYPE_HELPER } from 'src/utils/constants';
import { useSelector } from 'react-redux';

export const SET_DATA = '[HELPER JOBS] SET DATA';
export const SET_LOADING = '[HELPER JOBS] SET LOADING';
export const SET_FILTER = '[HELPER JOBS] SET FILTER';

export const getJobList = () => {
  return async (dispatch, getState) => {
    const key = 'job_list';
    try {
      dispatch(setLoading(key, true));
      const filter = getState().h_jobs.job_list_filter;
      const {
        data: {
          message,
          result: { getMyJob, hasMore },
          status,
        },
      } = await API.getHelperJoblist(filter);
      if (status !== 1) {
        showError(message);
        dispatch(setLoading(key, false));
        return;
      }
      dispatch(setData(key, { hasMore: hasMore, data: getMyJob }));
    } catch (err) {
      console.error(err);
    }
    dispatch(setLoading(key, false));
  };
};

export const getBrowseJobList = () => {
  return async (dispatch, getState) => {
    const key = 'browse_job_list';
    try {
      dispatch(setLoading(key, true));
      const filter = getState().h_jobs.browse_job_list_filter;
      const {
        data: {
          message,
          result: { getMyJob },
          status,
        },
      } = await API.getHelperBrowseJoblist(filter);
      if (status !== 1) {
        showError(message);
        dispatch(setLoading(key, false));
        return;
      }
      dispatch(setData(key, { total: getMyJob.length, data: getMyJob }));
    } catch (err) {
      console.error(err);
    }
    dispatch(setLoading(key, false));
  };
};

export const getHelperCategories = () => {
  return async (dispatch) => {
    try {
      const key = 'provider_categories';
      dispatch(setLoading(key, true));
      const { data } = await API.getHelperCategories();
      dispatch(setLoading(key, false));
      if (data.status !== 1) {
        showError(data.message);
        return;
      }
      dispatch(setData(key, data.result.categories));
    } catch (err) {
      console.error(err);
    }
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

export const jobBid = (param) => {
  return async (dispatch) => {
    const key = 'send_bid';
    try {
      dispatch(setLoading(key, true));
      const {
        data: { status, message },
      } = await API.jobBid(param);
      dispatch(setLoading(key, false));
      if (status !== 1) {
        showError(message);
        return false;
      }
      showSuccess(message);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };
};

export const cancelJob = (param) => {
  return async (dispatch) => {
    const key = 'cancel_job';
    try {
      dispatch(setLoading(key, true));
      const {
        data: { status, message },
      } = await API.cancelJob({ ...param, type: TYPE_HELPER });
      dispatch(setLoading(key, false));
      if (status !== 1) {
        showError(message);
        return false;
      }
      showSuccess(message);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };
};

export const getReviewList = () => {
  return async (dispatch, getState) => {
    const key = 'review_list';
    try {
      dispatch(setLoading(key, true));
      const { page } = getState().h_jobs.review_filter;
      const { userDetail } = getState().auth;
      const {
        data: {
          status,
          message,
          result: { hasMore, reviewList, providerInfo },
        },
      } = await API.getHelperUserReview({ providerId: userDetail.id, page });
      if (status !== 1) {
        showError(message);
        dispatch(setLoading(key, false));
        return;
      }
      dispatch(
        setData(key, { hasMore, data: reviewList, provider: providerInfo })
      );
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

export const useHelperJobs = () => {
  return useSelector(({ h_jobs }) => h_jobs);
};
