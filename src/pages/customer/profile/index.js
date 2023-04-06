import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

// Components
import Meta from '@/components/Meta/index';
import { Button, Input, Form, Row, Col, Card } from 'antd';
import {
  ProfileOutlined,
  KeyOutlined,
  PlusOutlined,
  LoadingOutlined,
} from '@ant-design/icons';
import AvatarUpload from 'src/components/AvatarUpload';
// Actions
import { updateProfile, uploadProfileImage } from 'src/store/common/actions';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

export default () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { type } = useSelector(({ auth }) => auth);
  const [pending, setPending] = useState(false);

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();

  const hadleUpdateProfile = async (values) => {
    setPending(true);
    await dispatch(updateProfile({ ...values, type }));
    setPending(false);
  };

  return (
    <>
      <Meta title="Profile | Zoom Errands" description="Zoom Errands" />
      <Row align="center" justify="center" gutter={[16, 16]}>
        <Col xs={24} sm={24} md={16}>
          <Card
            title={
              <h2>
                <ProfileOutlined className="mr-2" />
                Edit Profile
              </h2>
            }
          >
            <Row justify="center" gutter={[16, 16]}>
              <Col span={24} className="flex justify-center">
                <AvatarUpload
                  name="profileImage"
                  action="http://www.mocky.io/v2/5cc8019d300000980a055e76"
                />
              </Col>
              <Col span={24}>
                <Form
                  className="w-full"
                  onFinish={hadleUpdateProfile}
                  {...layout}
                  labelAlign="left"
                  requiredMark={false}
                >
                  <Form.Item
                    label="Full Name"
                    name="name"
                    rules={[
                      { required: true, message: 'Please input your name!' },
                    ]}
                  >
                    <Input size="large" />
                  </Form.Item>
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                      { type: 'email', message: 'Please input correct email!' },
                      { required: true, message: 'Please input your email!' },
                    ]}
                  >
                    <Input size="large" />
                  </Form.Item>
                  <Form.Item
                    label="Mobile Number"
                    name="mobile"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your mobile number!',
                      },
                    ]}
                  >
                    <Input size="large" />
                  </Form.Item>
                  <Form.Item
                    label="Location"
                    name="location"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your location!',
                      },
                    ]}
                  >
                    <Input size="large" />
                  </Form.Item>
                  <Form.Item className="flex justify-center">
                    <Button
                      type="primary"
                      loading={pending}
                      shape="round"
                      htmlType="submit"
                    >
                      Update Profile
                    </Button>
                  </Form.Item>
                </Form>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col xs={24} sm={24} md={8}>
          <Card
            title={
              <h2>
                <KeyOutlined className="mr-2" />
                Change Password
              </h2>
            }
          >
            <Form className="w-full" onFinish={null} requiredMark={false}>
              <Form.Item
                name="old"
                rules={[
                  {
                    required: true,
                    message: 'Please input your old password!',
                  },
                ]}
              >
                <Input.Password placeholder="Old Password" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: 'Please input your password!' },
                ]}
                hasFeedback
              >
                <Input.Password placeholder="New Password" />
              </Form.Item>
              <Form.Item
                name="confirm"
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
                <Input.Password placeholder="Confirm Password" />
              </Form.Item>
              <Form.Item className="flex justify-center">
                <Button
                  type="primary"
                  loading={pending}
                  shape="round"
                  htmlType="submit"
                >
                  Change Password
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </>
  );
};
