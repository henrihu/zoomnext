import API from 'src/api/jobs';
import moment from 'moment';

export const SET_DATA = '[HELPER JOBS] SET DATA]';
export const SET_LOADING = '[HELPER JOBS] SET LOADING';
export const SET_FILTER = '[HELPER JOBS] SET FILTER';

export const getJobList = () => {
  return async (dispatch, getState) => {
    const key = 'job_list';
    try {
      dispatch(setLoading(key, true));
      const filter = getState().h_jobs.job_list_filter;
      console.log('Job Filter', filter);
      // await API.getHelperJobList(filter);
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
      // await API.getHelperUserReview(filter);
      const total_data = [
        {
          title: 'Cleaning',
          rating: 4.8,
          review:
            'Nice Job, Lorem ipsum dolor sit amet, consectetur adipiscing',
          date: moment(),
        },
        {
          title: 'Cleaning',
          rating: 4.8,
          review:
            'Nice Job, Lorem ipsum dolor sit amet, consectetur adipiscing',
          date: moment(),
        },
        {
          title: 'Cleaning',
          rating: 4.8,
          review:
            'Nice Job, Lorem ipsum dolor sit amet, consectetur adipiscing',
          date: moment(),
        },
        {
          title: 'Cleaning',
          rating: 4.8,
          review:
            'Nice Job, Lorem ipsum dolor sit amet, consectetur adipiscing',
          date: moment(),
        },
        {
          title: 'Cleaning',
          rating: 4.8,
          review:
            'Nice Job, Lorem ipsum dolor sit amet, consectetur adipiscing',
          date: moment(),
        },
        {
          title: 'Cleaning',
          rating: 4.8,
          review:
            'Nice Job, Lorem ipsum dolor sit amet, consectetur adipiscing',
          date: moment(),
        },
        {
          title: 'Cleaning',
          rating: 4.8,
          review:
            'Nice Job, Lorem ipsum dolor sit amet, consectetur adipiscing',
          date: moment(),
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