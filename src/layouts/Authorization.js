import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

import { signInWithToken } from 'src/store/auth/actions';

import Loading from 'src/layouts/Loading';

export default ({ children }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const signIn = async () => {
    setLoading(true);
    await dispatch(signInWithToken(router));
    setLoading(false);
  };

  useEffect(() => {
    signIn();
  }, []);

  return !loading ? children : <Loading />;
};
