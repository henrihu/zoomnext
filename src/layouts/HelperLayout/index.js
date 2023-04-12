import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import { Layout } from 'antd';
import Header from './Header';
import Footer from '../Footer';
import Notification from '../Notification';

export default ({ children }) => {
  const router = useRouter();
  const { authenticated } = useSelector(({ auth }) => auth);

  useEffect(() => {
    if (!authenticated) {
      router.push('/auth/login/');
    }
  }, [router]);

  return (
    <Layout>
      <Header />
      <Layout.Content
        style={{
          padding: 32,
          minHeight: 'calc(100vh - 105px - 64px)',
        }}
      >
        {children}
      </Layout.Content>
      <Footer />
      <Notification />
    </Layout>
  );
};
