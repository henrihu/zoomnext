import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Router, { useRouter } from 'next/router';
import ReactGA from 'react-ga';
import TopBarProgress from 'react-topbar-progress-indicator';
import progressBarConfig from '@/config/progress-bar/index';
import { ConfigProvider } from 'antd';

import wrapper from 'src/store';

import '@/styles/globals.css';
import {
  CUSTOMER,
  HELPER,
  TYPE_CUSTOMER,
  TYPE_HELPER,
} from 'src/utils/constants';
import { getStorageItem } from 'src/utils/common';

import { CustomerLayout, HelperLayout, Authorization } from '../layouts';

import { setType, setData } from 'src/store/auth/actions';
import { setProgress } from 'src/store/setting/actions';
import { setAuthorization } from '@/api/base';

export default wrapper.withRedux(({ Component, pageProps }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { authenticated, type } = useSelector(({ auth }) => auth);
  const { progress } = useSelector(({ setting }) => setting);

  Router.events.on('routeChangeStart', () => dispatch(setProgress(true)));
  Router.events.on('routeChangeComplete', () => dispatch(setProgress(false)));
  TopBarProgress.config(progressBarConfig());

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      ReactGA.initialize(process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID);
    }
  }, []);

  useEffect(() => {
    const handleRouteChange = (url) => {
      ReactGA.pageview(url);
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: type === TYPE_CUSTOMER ? CUSTOMER.color : HELPER.color,
          colorLink: type === TYPE_CUSTOMER ? CUSTOMER.color : HELPER.color,
        },
      }}
    >
      <Authorization>
        {progress && <TopBarProgress />}
        {authenticated && type === TYPE_CUSTOMER && (
          <CustomerLayout>
            <Component {...pageProps} />
          </CustomerLayout>
        )}
        {authenticated && type === TYPE_HELPER && (
          <HelperLayout>
            <Component {...pageProps} />
          </HelperLayout>
        )}
        {!authenticated && <Component {...pageProps} />}
      </Authorization>
    </ConfigProvider>
  );
});
