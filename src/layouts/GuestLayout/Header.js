import Link from 'next/link';
import { useRouter } from 'next/router';
import { Layout, Space, Button } from 'antd';
import { LoginOutlined, UserAddOutlined } from '@ant-design/icons';
import { useScreen } from 'src/utils/common';

export default () => {
  const router = useRouter();
  const isXsSm = useScreen();
  return (
    <Layout.Header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1,
        backgroundColor: 'white',
        height: 100,
      }}
      className="flex items-center justify-between"
    >
      {!isXsSm && (
        <Link
          href="/services"
          className="text-4xl font-bold"
          style={{
            minWidth: 250,
            background: 'white',
            marginLeft: 24,
          }}
        >
          Zoom Errands
        </Link>
      )}

      <Space>
        <Button
          type="primary"
          icon={<LoginOutlined />}
          onClick={() => router.push('/auth/login')}
        >
          Log In
        </Button>
        <Button
          icon={<UserAddOutlined />}
          onClick={() => router.push('/auth/signup')}
        >
          Sign Up
        </Button>
      </Space>
    </Layout.Header>
  );
};
