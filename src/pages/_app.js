import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Router, { useRouter } from 'next/router';
import ReactGA from 'react-ga';
import TopBarProgress from 'react-topbar-progress-indicator';
import progressBarConfig from '@/config/progress-bar/index';
import { ConfigProvider } from 'antd';
import wrapper from 'src/store';
import '@/styles/globals.css';
import { CUSTOMER, HELPER, TYPE_CUSTOMER } from 'src/utils/constants';
import { Layout, Authorization } from '../layouts';
import { setProgress } from 'src/store/setting/actions';

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
        {authenticated && (
          <Layout>
            <Component {...pageProps} />
          </Layout>
        )}
        {!authenticated && <Component {...pageProps} />}
      </Authorization>
    </ConfigProvider>
  );
});
