import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Router, { useRouter } from 'next/router';
import { ThemeProvider } from 'next-themes';
import ReactGA from 'react-ga';
import TopBarProgress from 'react-topbar-progress-indicator';
import progressBarConfig from '@/config/progress-bar/index';

import wrapper from 'src/store';

import '@/styles/globals.css';
import {
  CUSTOMER,
  HELPER,
  TYPE_CUSTOMER,
  TYPE_HELPER,
} from 'src/utils/constants';

import { CustomerLayout, HelperLayout } from '../layouts';

import { setProgress, setType, setData } from 'src/store/auth/actions';
import { getStorageItem } from 'src/utils/common';
import { ConfigProvider } from 'antd';

const App = ({ Component, pageProps }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { authenticated, type, progress } = useSelector(({ auth }) => auth);

  Router.events.on('routeChangeStart', () => dispatch(setProgress(true)));
  Router.events.on('routeChangeComplete', () => dispatch(setProgress(false)));
  TopBarProgress.config(progressBarConfig());

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      ReactGA.initialize(process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID);
    }
    dispatch(setType(getStorageItem('user_type')));
    dispatch(setData({ authenticated: getStorageItem('authenticated') }));
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
    <ThemeProvider attribute="class">
      <ConfigProvider
        theme={{
          token: {
            colorPrimary:
              type === TYPE_CUSTOMER ? CUSTOMER.color : HELPER.color,
          },
        }}
      >
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
      </ConfigProvider>
    </ThemeProvider>
  );
};

export default wrapper.withRedux(App);
