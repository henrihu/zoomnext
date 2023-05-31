import moment from 'moment';
import { DATE_FORMAT } from 'src/utils/constants';
import { SET_DATA, SET_LOADING, SET_FILTER } from './actions';

const initialState = {
  job_list: { data: { hasMore: 0, data: [] }, loading: false },
  job_list_filter: {
    page: 1,
    orderKey: 'jobDateAndTime',
    orderValue: 'asc',
    jobStatus: 'open',
  },
  browse_job_list: { data: { total: 0, data: [] }, loading: false },
  browse_job_list_filter: {
    orderKey: 'jobDateAndTime',
    orderValue: 'asc',
    latitude: 0,
    longitude: 100,
    categoryId: [],
    startDate: moment(),
    endDate: moment().add(7, 'days'),
    isNewestFirst: true,
    isHighestPay: false,
  },
  review_list: { data: { hasMore: 0, data: [] }, loading: false },
  review_filter: { page: 1 },
  job_detail: { data: {}, loading: false },
  provider_categories: { data: [], loading: false },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_DATA:
      return {
        ...state,
        [action.key]: {
          ...state[action.key],
          data: action.data,
        },
      };
    case SET_LOADING:
      return {
        ...state,
        [action.key]: {
          ...state[action.key],
          loading: action.loading,
        },
      };
    case SET_FILTER:
      return {
        ...state,
        [action.key]: {
          ...state[action.key],
          ...action.filter,
        },
      };
    default:
      return { ...state };
  }
};
