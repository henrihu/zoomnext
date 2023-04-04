import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';

import { Layout } from 'antd';
import CustomerHeader from './Header';
const { Content, Footer } = Layout;

const CustomerLayout = ({ children }) => {
  const router = useRouter();
  const { setTheme } = useTheme();
  const { authenticated } = useSelector(({ auth }) => auth);

  useEffect(() => {
    setTheme('light');
    // if (!authenticated) {
    //   router.push('/auth/login/');
    // }
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
        <div lassName="p-3 h-full">{children}</div>
      </Content>
      <Footer className="bg-white text-center min-h-64 max-h-64">
        Zoom Errands ©2023 Created by Zoom Errands
      </Footer>
    </Layout>
  );
};

export default CustomerLayout;
