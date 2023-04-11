export const TYPE_CUSTOMER = 'customer';
export const TYPE_HELPER = 'helper';
export const COLOR_CUSTOMER = '#4EBDD9';
export const COLOR_HELPER = '#F77B25';

export const CUSTOMER = {
  label: 'Customer',
  value: 'customer',
  color: '#4591A9',
  backgroundColor: '#C9F2FF',
};

export const HELPER = {
  label: 'Helper',
  value: 'helper',
  color: '#F77B25',
  backgroundColor: '#C9F2FF',
};

// Job Status List
export const JOB_STATUS_ASSIGNED = 'assigned';
export const JOB_STATUS_PENDING = 'pending';
export const JOB_STATUS = {
  [JOB_STATUS_ASSIGNED]: { label: 'Assigned', color: '#00A110' },
  [JOB_STATUS_PENDING]: { label: 'Pending', color: '#FFC53D' },
};

// Budget Option List
export const BUDGET_OPTION_TOTAL_JOB = 'total';
export const BUDGET_OPTION_HOURLY = 'hourly';
export const BUDGET_OPTION_LIST = {
  [BUDGET_OPTION_TOTAL_JOB]: { label: 'Total Job' },
  [BUDGET_OPTION_HOURLY]: { label: 'Hourly' },
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
export const DATE_FORMAT = 'YYYY-MM-DD';
export const TIME_FORMAT = 'h:mm A';

// Fee
export const FEE_RATE = 5;
