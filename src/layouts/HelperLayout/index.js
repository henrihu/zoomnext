import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';

import Meta from '@/components/Meta/index';
import { Breadcrumb, Layout } from 'antd';
import CustomerHeader from './Header';
const { Content, Footer } = Layout;

const CustomerLayout = ({
  children,
  title = 'Zoom Errands',
  description = 'Zoom Errands',
}) => {
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
      <Meta title={title} description={description} />
      <CustomerHeader />
      <Content
        className="site-layout p-5"
        style={{
          // padding: '0 50px',
          minHeight: 'calc(100vh - 120px - 64px)',
        }}
      >
        {/* <Breadcrumb
          style={{
            margin: '16px 0',
          }}
        >
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb> */}
        <div style={{ height: '100%' }} className="p-3">
          {children}
        </div>
      </Content>
      <Footer
        style={{
          textAlign: 'center',
          minHeight: 64,
          maxHeight: 64,
        }}
      >
        Zoom Errands ©2023 Created by Zoom Errands
      </Footer>
    </Layout>
  );
};

export default CustomerLayout;
