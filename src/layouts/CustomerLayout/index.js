import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { COLOR_CUSTOMER } from 'src/utils/constants';

import { Breadcrumb, Layout, Menu, theme } from 'antd';
const { Header, Content, Footer } = Layout;

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
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout>
      <Header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
          backgroundColor: 'white',
          height: 120,
        }}
        className="flex justify-between"
      >
        <div
          style={{
            float: 'left',
            minWidth: 200,
            height: 120,
            background: 'white',
          }}
          className="flex justify-center items-center ml-16 mr-16"
        >
          <Link href="/customer/dashboard" className="text-3xl font-bold">
            Zoom Errands
          </Link>
        </div>

        <div className="w-full flex items-center ">
          <Menu
            mode="horizontal"
            defaultSelectedKeys={['2']}
            items={new Array(3).fill(null).map((_, index) => ({
              key: String(index + 1),
              label: `nav ${index + 1}`,
            }))}
            className="w-full"
          />
        </div>
      </Header>
      <Content
        className="site-layout"
        style={{
          padding: '0 50px',
        }}
      >
        <Breadcrumb
          style={{
            margin: '16px 0',
          }}
        >
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <div
          style={{
            padding: 24,
            minHeight: 380,
            background: colorBgContainer,
          }}
        >
          {children}
        </div>
      </Content>
      <Footer
        style={{
          textAlign: 'center',
        }}
      >
        Zoom Errands ©2023 Created by Zoom Errands
      </Footer>
    </Layout>
  );
};

export default CustomerLayout;
