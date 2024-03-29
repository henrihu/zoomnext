import { Grid, theme } from 'antd';
import moment from 'moment';
import { useMemo } from 'react';
import { BUDGET_OPTION_TOTAL_JOB, FEE_RATE } from './constants';

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
  const x = Number(num).toFixed(decimalScale);
  var parts = x.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  return parts.join('.');
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

export const calcBudget = (option, price, hour) => {
  if (option === BUDGET_OPTION_TOTAL_JOB)
    return price ? price * (1 + FEE_RATE / 100) : 0;
  return price && hour ? price * hour * (1 + FEE_RATE / 100) : 0;
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
  return `${offset > 0 ? '+' : '-'}${parseInt(Math.abs(offset) / 60)}:${
    Math.abs(offset) % 60
  }`;
};

export const useThemeToken = () => {
  const { token } = theme.useToken();
  return token;
};
