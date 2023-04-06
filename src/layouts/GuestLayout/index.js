import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import { useSelector } from 'react-redux';

import Meta from '@/components/Meta/index';
import { Layout } from 'antd';
import GuestHeader from './Header';
const { Content, Footer } = Layout;

export default ({
  children,
  title = 'Zoom Errands',
  description = 'Zoom Errands',
}) => {
  const router = useRouter();
  const { setTheme } = useTheme();

  useEffect(() => {
    setTheme('light');
  }, [setTheme, router]);

  return (
    <Layout>
      <Meta title={title} description={description} />
      <GuestHeader />
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
    </Layout>
  );
};
