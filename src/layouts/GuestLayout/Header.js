import Link from 'next/link';
import { useRouter } from 'next/router';
import { Layout, Space, Button } from 'antd';
import { LoginOutlined, UserAddOutlined } from '@ant-design/icons';

export default () => {
  const router = useRouter();
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
