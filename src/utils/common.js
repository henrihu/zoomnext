import { Grid, theme } from 'antd';
import moment from 'moment';
import { useMemo } from 'react';

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

export const divideNumber = (num, den = 1, decimalScale = 1) => {
  return den === 0 ? 0 : formatNumber(num / den, decimalScale);
};

export const formatDate = (
  date,
  option = { day: 'numeric', month: 'short', year: 'numeric' }
) => {
  return new Intl.DateTimeFormat('en', option).format(date);
};

export const MergeDateTime = (date, time) => {
  return date.format('YYYY-MM-DD') + ' ' + time.format('HH:mm:ss');
};

export const findStrInObj = (obj, str) =>
  JSON.stringify(obj).toLowerCase().includes(str.toLowerCase());

export const useScreen = () => {
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  const isXsSm = useMemo(() => screens.xs || (screens.sm && !screens.md), [
    screens,
  ]);
  return isXsSm;
};

export const getTimeZone = () => {
  const offset = moment().utcOffset();
  return `${offset < 0 ? '-' : ''}${parseInt(Math.abs(offset) / 60)}:${
    Math.abs(offset) % 60
  }`;
};

export const useThemeToken = () => {
  const { token } = theme.useToken();
  return token;
};
