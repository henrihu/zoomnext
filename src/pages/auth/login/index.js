import { useState } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

// Components
import Meta from '@/components/Meta/index';
import { AuthLayout } from '@/layouts/index';
import { Button, Radio, Input, Form, Row, Col } from 'antd';
import { GoogleOutlined, FacebookOutlined } from '@ant-design/icons';
import ForgotPassword from './ForgotPassword';
import Verification from './Verification';
import Terms from './Terms';
// Constants
import { TYPE_CUSTOMER, TYPE_HELPER } from 'src/utils/constants';
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
  const [forgotModal, setForgotModal] = useState({ open: false });
  const [vertificationModal, setVerificationModal] = useState({ open: false });
  const [termModal, setTermModal] = useState({ open: false });

  const handleSignInWithEmail = async (values) => {
    setPending(true);
    await dispatch(signInWithEmail({ ...values, type }, router));
    setPending(false);
  };

  return (
    <AuthLayout>
      <Meta title="Login | Zoom Errands" description="Zoom Errands Login" />
      <Row
        align="center"
        justify="center"
        className="p-5 m-auto space-y-5 rounded shadow-lg md:p-10 md:w-1/3 bg-white"
      >
        <Col span={24} className="text-center">
          <h1 className="text-2xl font-bold">Welcome</h1>
        </Col>
        <Col span={24} className="flex justify-center">
          <Link href="/" className="text-4xl font-bold">
            Zoom Errands
          </Link>
        </Col>
        <Col span={24} className="text-center">
          <h2 className="text-gray-600">Log In</h2>
        </Col>
        <Col span={24} className="flex justify-center">
          <Radio.Group
            optionType="button"
            value={type}
            onChange={(e) => dispatch(setType(e.target.value))}
          >
            <Radio.Button value={TYPE_CUSTOMER} key="customer">
              As Customer
            </Radio.Button>
            <Radio.Button value={TYPE_HELPER} key="helper">
              As Helper
            </Radio.Button>
          </Radio.Group>
        </Col>
        <Col span={24}>
          <Form className="w-full" onFinish={handleSignInWithEmail}>
            <Form.Item
              name="email"
              rules={[
                { type: 'email', message: 'Please input correct email!' },
                { required: true, message: 'Please input your email!' },
              ]}
            >
              <Input placeholder="Enter Email" size="large" />
            </Form.Item>
            <Form.Item
              name="password"
              className="mb-0"
              rules={[
                { required: true, message: 'Please input your password!' },
              ]}
            >
              <Input.Password placeholder="Enter Password" size="large" />
            </Form.Item>
            <div className="flex justify-end mb-2">
              <Button
                type="link"
                size="small"
                onClick={() => setForgotModal({ open: true })}
              >
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
                Log In
              </Button>
            </Form.Item>
          </Form>
        </Col>
        <Col span={24} className="flex justify-center items-center">
          <span className="text-center cursor-default">
            Don't have an account?
          </span>
          <Button
            type="link"
            size="small"
            onClick={() => router.replace('/auth/signup/')}
          >
            Create Account
          </Button>
        </Col>
        <Col span={24} className="flex flex-col items-center">
          <span className="cursor-default">
            By using this app you agree to our
          </span>
          <div>
            <Button
              type="link"
              size="small"
              onClick={() => setTermModal({ open: true })}
            >
              terms
            </Button>
            and
            <Button type="link" size="small">
              privacy policy
            </Button>
          </div>
        </Col>
      </Row>
      <ForgotPassword
        {...forgotModal}
        onOk={() => setForgotModal({ open: false })}
        onCancel={() => setForgotModal({ open: false })}
      />
      <Verification
        {...vertificationModal}
        onOk={() => setVerificationModal({ open: false })}
        onCancel={() => setVerificationModal({ open: false })}
      />
      <Terms
        {...termModal}
        onOk={() => setTermModal({ open: false })}
        onCancel={() => setTermModal({ open: false })}
      />
      {/* {socialProviders.length > 0 && (
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
        )} */}
    </AuthLayout>
  );
};

export default Login;
