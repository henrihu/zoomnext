import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import { useSelector, useDispatch } from 'react-redux';

import { Layout } from 'antd';
import CustomerHeader from './Header';
import Notification from './Notification';
const { Content, Footer, Drawer } = Layout;

import { setNotificationDrawer } from 'src/store/auth/actions';

const CustomerLayout = ({ children }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { setTheme } = useTheme();
  const { authenticated, notification_drawer } = useSelector(
    ({ auth }) => auth
  );

  useEffect(() => {
    setTheme('light');
    if (!authenticated) {
      router.push('/auth/login/');
    }
  }, [setTheme, router]);

  return (
    <Layout>
      <CustomerHeader />
      <Content
        className="site-layout p-5"
        style={{
          minHeight: 'calc(100vh - 100px - 64px)',
        }}
      >
        <div className="p-3 h-full">{children}</div>
      </Content>
      <Footer className="bg-white text-center min-h-64 max-h-64">
        Zoom Errands ©2023 Created by Zoom Errands
      </Footer>
      <Notification
        open={notification_drawer}
        onClose={() => dispatch(setNotificationDrawer(false))}
      />
    </Layout>
  );
};

export default CustomerLayout;
