import { useState } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

// Components
import Meta from '@/components/Meta/index';
import { AuthLayout } from '@/layouts/index';
import { Button, Radio, Input, Form } from 'antd';
import { GoogleOutlined, FacebookOutlined } from '@ant-design/icons';
// Constants
import {
  COLOR_CUSTOMER,
  COLOR_PROVIDER,
  TYPE_CUSTOMER,
  TYPE_PRODIVER,
} from 'src/utils/constants';
// Actions
import { setType, signInWithEmail } from 'src/store/auth/actions';

const socialProviders = [
  {
    id: '1',
    name: 'Facebook',
    color: '#3B5998',
    icon: 'facebook',
    icon: <FacebookOutlined />,
  },
  {
    id: '2',
    name: 'Google',
    color: '#D94634',
    icon: <GoogleOutlined />,
  },
];

const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { type } = useSelector(({ auth }) => auth);
  const [pending, setPending] = useState(false);

  const handleSignInWithEmail = async (values) => {
    setPending(true);
    await dispatch(signInWithEmail({ ...values, type }));
    router.push(`/${type}/services/`);
    setPending(false);
  };

  return (
    <AuthLayout
      color={type === TYPE_CUSTOMER ? COLOR_CUSTOMER : COLOR_PROVIDER}
    >
      <Meta title="Zoom Errands | Login" description="Zoom Errands Login" />
      <div className="flex flex-col items-center justify-center p-5 m-auto space-y-5 rounded shadow-lg md:p-10 md:w-1/3 bg-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Welcome</h1>
        </div>
        <div>
          <Link href="/" className="text-4xl font-bold">
            Zoom Errands
          </Link>
        </div>
        <div className="text-center">
          <h2 className="text-gray-600">Login and continue</h2>
        </div>
        <Radio.Group
          optionType="button"
          value={type}
          onChange={(e) => dispatch(setType(e.target.value))}
        >
          <Radio.Button value={TYPE_CUSTOMER} key="customer">
            Customer
          </Radio.Button>
          <Radio.Button value={TYPE_PRODIVER} key="provider">
            Provider
          </Radio.Button>
        </Radio.Group>
        <Form className="w-full" onFinish={handleSignInWithEmail}>
          <Form.Item
            name="email"
            rules={[
              { type: 'email', message: 'Please input correct email!' },
              { required: true, message: 'Please input your email!' },
            ]}
          >
            <Input placeholder="Enter Username" size="large" />
          </Form.Item>
          <Form.Item
            name="password"
            className="mb-0"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password placeholder="Enter Password" size="large" />
          </Form.Item>
          <div className="flex justify-end mb-2">
            <Button type="link" size="small">
              Forgot Password?
            </Button>
          </div>
          <Form.Item>
            <Button
              type="primary"
              loading={pending}
              shape="round"
              size="large"
              className="w-full"
              htmlType="submit"
            >
              Login
            </Button>
          </Form.Item>
        </Form>

        {socialProviders.length > 0 && (
          <div className="flex flex-col justify-center">
            <div className="text-sm text-gray-400 mb-2 text-center">
              Or Login With
            </div>
            <div className="flex justify-center w-full space-x-2">
              {socialProviders.map((provider, index) => (
                <Button
                  key={index}
                  shape="round"
                  disabled={pending}
                  style={{
                    backgroundColor: provider.color,
                    color: 'white',
                    fontWeight: 900,
                  }}
                  icon={provider.icon}
                >
                  {provider.name}
                </Button>
              ))}
            </div>
          </div>
        )}

        <Button
          type="link"
          size="small"
          className="flex flex-col justify-center"
          onClick={() => router.replace('/auth/register/')}
        >
          <span className="text-center w-full">Don't have an account?</span>
          <span className="text-center w-full">
            Let's sign up as {type} with Zoom Errands
          </span>
        </Button>
      </div>
    </AuthLayout>
  );
};

export default Login;
