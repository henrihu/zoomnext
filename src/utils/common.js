export const setStorageItem = (key, value) => {
  window.localStorage.setItem(key, value);
};

export const getStorageItem = (key) => {
  return window.localStorage.getItem(key);
};

export const removeStorageItem = (key) => {
  window.localStorage.removeItem(key);
};

export const formatNumber = (num, decimalScale = 2) => {
  return Number(num).toFixed(decimalScale);
};

export const formatDate = (
  date,
  option = { day: 'numeric', month: 'short', year: 'numeric' }
) => {
  return new Intl.DateTimeFormat('en', option).format(date);
};

export const findStrInObj = (obj, str) =>
  JSON.stringify(obj).toLowerCase().includes(str.toLowerCase());
