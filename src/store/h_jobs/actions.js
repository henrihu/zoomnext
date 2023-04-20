import API from 'src/api/jobs';
import moment from 'moment';
import { showError } from 'src/utils/messages';

export const SET_DATA = '[HELPER JOBS] SET DATA]';
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
        return;
      }
      dispatch(setData(key, { hasMore: hasMore, data: getMyJob }));
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
        status: 'pending',
        location: '#12, Ahmedabad, GJ, Ahmedabad, India, 380006',
        baths: { checked: true, count: 3 },
        beds: { checked: true, count: 3 },
        budget: 'hourly',
        date: moment(),
        description: 'Job Details',
        hour: 21,
        post: 'first',
        supply: 'have',
        time: moment(),
        title: 'Cleaning',
        amount: 500,
        hour: 2,
      };
      console.log('action', data);
      dispatch(setData(key, data));
    } catch (err) {
      console.error(err);
    }
    dispatch(setLoading(key, false));
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
