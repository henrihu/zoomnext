import { combineReducers } from 'redux';

import auth from './auth/reducer';
import common from './common/reducer';
import c_jobs from './c_jobs/reducer';
import h_jobs from './h_jobs/reducer';
import payment from './payment/reducer';

export default combineReducers({ auth, common, c_jobs, h_jobs, payment });
