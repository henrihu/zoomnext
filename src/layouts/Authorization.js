import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

import { signInWithToken, useAuth } from 'src/store/auth/actions';

import Loading from 'src/layouts/Loading';

export default ({ children }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { pageLoading } = useAuth();

  const signIn = async () => {
    await dispatch(signInWithToken(router));
  };

  useEffect(() => {
    signIn();
  }, []);

  return !pageLoading ? children : <Loading />;
};
