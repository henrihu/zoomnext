import { useState } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

// Components
import Meta from '@/components/Meta/index';
import { AuthLayout } from '@/layouts/index';
import { Button, Radio, Input, Form, Row, Col, Select } from 'antd';
// Constants
import {
  COLOR_CUSTOMER,
  COLOR_HELPER,
  LENGTH,
  PLATFORM,
  TYPE_CUSTOMER,
  TYPE_HELPER,
} from 'src/utils/constants';
// Actions
import { setType, signUp } from 'src/store/auth/actions';
import SearchLocation from '@/components/SearchLocation';

export default () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { type } = useSelector(({ auth }) => auth);
  const [pending, setPending] = useState(false);

  const handleSignUp = async (values) => {
    setPending(true);
    let info = { ...values, type, platform: PLATFORM };
    if (type === TYPE_HELPER && info.location) {
      info = {
        ...info,
        ...Object.keys(info.location).reduce(
          (res, key) => ({
            ...res,
            [`work${key[0].toUpperCase()}${key.slice(1)}`]: info.location[key],
          }),
          {}
        ),
      };
    }
    const isSuccess = await dispatch(signUp(info));
    if (isSuccess) {
      router.push('/auth/login');
    }
    setPending(false);
  };

  const SelectCountryCode = (
    <Form.Item name="countryCode" noStyle>
      <Select style={{ width: 60 }} size="large">
        <Select.Option value="+91">+1</Select.Option>
      </Select>
    </Form.Item>
  );

  return (
    <AuthLayout>
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
            <Radio.Button value={TYPE_CUSTOMER} key={TYPE_CUSTOMER}>
              As Customer
            </Radio.Button>
            <Radio.Button value={TYPE_HELPER} key={TYPE_HELPER}>
              As Helper
            </Radio.Button>
          </Radio.Group>
        </Col>
        <Col span={24}>
          <Form
            className="w-full"
            onFinish={handleSignUp}
            initialValues={{ countryCode: '+1' }}
          >
            <Form.Item
              name="firstName"
              rules={[
                { required: true, message: 'Please input your first name!' },
              ]}
            >
              <Input placeholder="First Name" size="large" />
            </Form.Item>
            <Form.Item
              name="lastName"
              rules={[
                { required: true, message: 'Please input your last name!' },
              ]}
            >
              <Input placeholder="Last Name" size="large" />
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
              dependencies={['confirmPassword']}
              rules={[
                { required: true, message: 'Please input your password!' },
                {
                  min: LENGTH.password.min,
                  message: `Min Length ${LENGTH.password.min}`,
                },
                {
                  max: LENGTH.password.max,
                  message: `Max Length ${LENGTH.password.max}`,
                },
              ]}
              hasFeedback
            >
              <Input.Password size="large" placeholder="Password" />
            </Form.Item>
            <Form.Item
              name="confirmPassword"
              dependencies={['password']}
              hasFeedback
              rules={[
                { required: true, message: 'Please confirm your password!' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        'The two passwords that you entered do not match!'
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password size="large" placeholder="Confirm Password" />
            </Form.Item>
            <Form.Item
              name="mobileNumber"
              rules={[
                { required: true, message: 'Please input your mobile number!' },
              ]}
            >
              <Input
                size="large"
                placeholder="Mobile Number"
                addonBefore={SelectCountryCode}
              />
            </Form.Item>
            {type === TYPE_HELPER && (
              <Form.Item
                name="location"
                rules={[
                  { required: true, message: 'Please select your location!' },
                ]}
              >
                <SearchLocation placeholder="Location" size="large" />
              </Form.Item>
            )}
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
