import { useState } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

// Components
import Meta from '@/components/Meta/index';
import { AuthLayout } from '@/layouts/index';
import { Button, Radio, Input, Form, Select } from 'antd';
// Constants
import {
  COLOR_CUSTOMER,
  COLOR_PROVIDER,
  TYPE_CUSTOMER,
  TYPE_PRODIVER,
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

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 80 }} defaultValue="91" size="large">
        <Select.Option value="91">+91</Select.Option>
        <Select.Option value="86">+86</Select.Option>
        <Select.Option value="87">+87</Select.Option>
      </Select>
    </Form.Item>
  );

  return (
    <AuthLayout
      color={type === TYPE_CUSTOMER ? COLOR_CUSTOMER : COLOR_PROVIDER}
    >
      <Meta
        title="Zoom Errands | Register"
        description="Zoom Errands Register"
      />
      <div className="flex flex-col items-center justify-center p-5 m-auto space-y-5 rounded shadow-lg md:p-10 md:w-1/3 bg-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Register as {type} with</h1>
        </div>
        <div>
          <Link href="/" className="text-4xl font-bold">
            Zoom Errands
          </Link>
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
        <Form className="w-full" onFinish={handleSignUp}>
          <Form.Item
            name="name"
            rules={[{ required: true, message: 'Please input your name!' }]}
          >
            <Input placeholder="Your Name" size="large" />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              { type: 'email', message: 'Please input correct email!' },
              { required: true, message: 'Please input your email!' },
            ]}
          >
            <Input placeholder="Your Email" size="large" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password placeholder="Your Password" size="large" />
          </Form.Item>
          <Form.Item
            name="mobile"
            rules={[
              { required: true, message: 'Please input your mobile number!' },
            ]}
          >
            <Input
              addonBefore={prefixSelector}
              placeholder="Mobile Number"
              size="large"
            />
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
              Register
            </Button>
          </Form.Item>
        </Form>
        <Button
          type="link"
          size="small"
          onClick={() => router.replace('/auth/login/')}
        >
          Already have an account? click here for Login
        </Button>
      </div>
    </AuthLayout>
  );
};
