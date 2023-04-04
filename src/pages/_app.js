import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Router, { useRouter } from 'next/router';
import { ThemeProvider } from 'next-themes';
import ReactGA from 'react-ga';
import TopBarProgress from 'react-topbar-progress-indicator';
import progressBarConfig from '@/config/progress-bar/index';

import wrapper from 'src/store';

import '@/styles/globals.css';
import { TYPE_CUSTOMER, TYPE_HELPER } from 'src/utils/constants';

import { CustomerLayout, HelperLayout } from '../layouts';

const App = ({ Component, pageProps }) => {
  const [progress, setProgress] = useState(false);
  const { authenticated, type } = useSelector(({ auth }) => auth);
  const router = useRouter();

  Router.events.on('routeChangeStart', () => setProgress(true));
  Router.events.on('routeChangeComplete', () => setProgress(false));
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
    <ThemeProvider attribute="class">
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
    </ThemeProvider>
  );
};

export default wrapper.withRedux(App);
