import { useState } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

// Components
import Meta from '@/components/Meta/index';
import { AuthLayout } from '@/layouts/index';
import { Button, Radio, Input, Form, Row, Col } from 'antd';
// Constants
import {
  COLOR_CUSTOMER,
  COLOR_HELPER,
  TYPE_CUSTOMER,
  TYPE_HELPER,
} from 'src/utils/constants';
// Actions
import { setType, signUp } from 'src/store/auth/actions';

export default () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { type } = useSelector(({ auth }) => auth);
  const [pending, setPending] = useState(false);

  const handleSignUp = async (values) => {
    setPending(true);
    await dispatch(signUp({ ...values, type }));
    setPending(false);
  };

  return (
    <AuthLayout color={type === TYPE_CUSTOMER ? COLOR_CUSTOMER : COLOR_HELPER}>
      <Meta title="Sign Up | Zoom Errands" description="Zoom Errands Sign Up" />
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
          <h2 className="text-gray-600">Sign Up</h2>
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
          <Form className="w-full" onFinish={handleSignUp}>
            <Form.Item
              name="name"
              rules={[{ required: true, message: 'Please input your name!' }]}
            >
              <Input placeholder="Full Name" size="large" />
            </Form.Item>
            <Form.Item
              name="email"
              rules={[
                { type: 'email', message: 'Please input correct email!' },
                { required: true, message: 'Please input your email!' },
              ]}
            >
              <Input placeholder="Email" size="large" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: 'Please input your password!' },
              ]}
            >
              <Input.Password placeholder="Password" size="large" />
            </Form.Item>
            <Form.Item
              name="mobile"
              rules={[
                { required: true, message: 'Please input your mobile number!' },
              ]}
            >
              <Input placeholder="Mobile Number" size="large" />
            </Form.Item>
            <Form.Item
              name="location"
              rules={[
                { required: true, message: 'Please input your location!' },
              ]}
            >
              <Input placeholder="Location" size="large" />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                loading={pending}
                shape="round"
                size="large"
                className="w-full"
                htmlType="submit"
              >
                Sign Up
              </Button>
            </Form.Item>
          </Form>
        </Col>
        <Col span={24} className="flex justify-center items-center">
          <span className="text-center cursor-default">
            Already have an account?
          </span>{' '}
          <Button
            type="link"
            size="small"
            className="flex flex-col justify-center"
            onClick={() => router.replace('/auth/login/')}
          >
            Login
          </Button>
        </Col>
      </Row>
    </AuthLayout>
  );
};
