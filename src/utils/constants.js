export const PLATFORM = 'web';

export const TYPE_CUSTOMER = 'customer';
export const TYPE_HELPER = 'provider';
export const COLOR_CUSTOMER = '#4EBDD9';
export const COLOR_HELPER = '#F77B25';

export const CUSTOMER = {
  label: 'Customer',
  value: TYPE_CUSTOMER,
  color: '#4ABDDA',
  backgroundColor: '#C9F2FF',
  logoUrl: '/images/logos/logo_blue.png',
};

export const HELPER = {
  label: 'Helper',
  value: TYPE_HELPER,
  color: '#F77B25',
  backgroundColor: '#C9F2FF',
  logoUrl: '/images/logos/logo_orange.png',
};

// Job Status List
export const JOB_STATUS_ASSIGNED = 'assigned';
export const JOB_STATUS_PENDING = 'pending';
export const JOB_STATUS_ONGOING = 'ongoing';
export const JOB_STATUS_COMPLETE = 'complete';
export const JOB_STATUS_CANCEL = 'cancel';
export const JOB_STATUS = {
  [JOB_STATUS_ASSIGNED]: { label: 'Assigned', color: '#00A110' },
  [JOB_STATUS_PENDING]: { label: 'Pending', color: '#FFC53D' },
  [JOB_STATUS_ONGOING]: { label: 'Ongoing', color: '#b134c7' },
  [JOB_STATUS_COMPLETE]: { label: 'Complete', color: '#4282db' },
  [JOB_STATUS_CANCEL]: { label: 'Cancel', color: '#ff4d4f' },
};
export const JOB_STATUS_HISTORY_LABEL = {
  [JOB_STATUS_PENDING]: 'Job posted at',
  [JOB_STATUS_ASSIGNED]: 'Job accepted at',
  [JOB_STATUS_ONGOING]: 'Job started at',
  [JOB_STATUS_COMPLETE]: 'Job completed at',
  [JOB_STATUS_CANCEL]: 'Job cancelled at',
};

// Budget Option List
export const BUDGET_OPTION_TOTAL_JOB = 'total';
export const BUDGET_OPTION_HOURLY = 'hourly';
export const BUDGET_OPTION_LIST = {
  [BUDGET_OPTION_TOTAL_JOB]: { label: 'Total Job' },
  [BUDGET_OPTION_HOURLY]: { label: 'Hourly' },
};

// Address Option List
export const ADDRESS_OPTION_PICKUP = 'pickUp';
export const ADDRESS_OPTION_DROPOFF = 'dropOff';
export const ADDRESS_OPTION_NORMAL = 'normal';
export const ADDRESS_OPTION_LIST = {
  [ADDRESS_OPTION_PICKUP]: 'Pick Up',
  [ADDRESS_OPTION_DROPOFF]: 'Drop Off',
  [ADDRESS_OPTION_NORMAL]: '',
};

// Post Option List
export const POST_OPTION_FIRST_HELPER = 'first';
export const POST_OPTION_BID = 'bid';
export const POST_OPTION_LIST = {
  [POST_OPTION_FIRST_HELPER]: {
    label: 'Award job to first helper who accepts my budget',
  },
  [POST_OPTION_BID]: { label: 'Send me bids to review' },
};

// Clean Supplies Option List
export const CLEANING_OPTION_HAVE = 'have';
export const CLEANING_OPTION_BRING = 'bring';
export const CLEANING_OPTION_LIST = {
  [CLEANING_OPTION_HAVE]: {
    label: 'I have cleaning supplies',
  },
  [CLEANING_OPTION_BRING]: { label: 'Bring cleaning supplies' },
};

// Message Type
export const MESSAGE_TYPE_MESSAGE = 'MESSAGE';
export const MESSAGE_TYPE_IMAGE = 'IMAGE';

// Date & Time Format
export const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';
export const DATE_FORMAT = 'YYYY-MM-DD';
export const TIME_FORMAT = 'h:mm A';

// Fee
export const FEE_RATE = 5;

// Category Type
export const CATEGORY_TYPE_CLEANING = 'Cleaning';
export const CATEGORY_TYPE_DELIVERY = 'Delivery';
export const CATEGORY_TYPE_NORMAL = 'Normal';

// Approve Mode
export const APPROVE_MODE_ACCEPT = 'Approve';
export const APPROVE_MODE_REJECT = 'Reject';

export const TEMP_ADDRESS_DATE = {
  latitude: '123',
  longitude: '123',
  address: 'sss',
  state: 'sss',
  city: 'sss',
  country: 'sss',
  zipcode: '385943',
};

// LENGTH
export const LENGTH = {
  password: {
    min: 8,
    max: 16,
  },
};

// Media Type
export const MEDIA_TYPE_IMAGE = 'Image';
export const MEDIA_TYPE_VIDEO = 'Video';

// Otp Type
export const OTP_TYPE_PASSWORD_RESET = 'OTP_PASSWORD_REST';
