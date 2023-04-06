import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import { useSelector } from 'react-redux';

import { Layout } from 'antd';
import Header from './Header';
import Notification from '../Notification';

export default ({ children }) => {
  const router = useRouter();
  const { setTheme } = useTheme();
  const { authenticated } = useSelector(({ auth }) => auth);

  useEffect(() => {
    setTheme('light');
    if (!authenticated) {
      router.push('/auth/login/');
    }
  }, [setTheme, router]);

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
      <Layout.Footer className="bg-white text-center min-h-64 max-h-64">
        Zoom Errands ©2023 Created by Zoom Errands
      </Layout.Footer>
      <Notification />
    </Layout>
  );
};
