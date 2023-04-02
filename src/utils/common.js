export const setStorageItem = (key, value) => {
  window.localStorage.setItem(key, value);
};

export const getStorageItem = (key) => {
  window.localStorage.getItem(key);
};

export const formatNumber = (num, decimalScale = 2) => {
  return Number(num).toFixed(decimalScale);
};
