import { useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getStorageItem } from 'src/utils/common';

import { setType, setData } from 'src/store/auth/actions';
import { setAuthorization } from '@/api/base';

const isVaildToken = (token) => {
  return token ? true : false;
};

export default ({ children }) => {
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    dispatch(setType(getStorageItem('user_type')));
    dispatch(setData({ authenticated: getStorageItem('authenticated') }));
    const token = getStorageItem('access_token');
    if (isVaildToken(token)) {
      setAuthorization(getStorageItem('access_token'));
    }
  }, []);

  return children;
};
