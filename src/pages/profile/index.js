import { useDispatch, useSelector } from 'react-redux';

// Components
import Meta from '@/components/Meta/index';
import {
  Button,
  Input,
  Form,
  Row,
  Col,
  Card,
  Select,
  Checkbox,
  Space,
} from 'antd';
import { ProfileOutlined, KeyOutlined } from '@ant-design/icons';
import AvatarUpload from 'src/components/AvatarUpload/index';

// Actions
import {
  updateProfile,
  uploadProfileImage,
  changePassword,
  uploadImage,
} from 'src/store/common/actions';
import { providerUpdateProfile, useAuth } from 'src/store/auth/actions';
import { LENGTH, MEDIA_TYPE_IMAGE, TYPE_HELPER } from 'src/utils/constants';
import IdentificationUpload from '@/components/IdentificationUpload';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

export default () => {
  const dispatch = useDispatch();
  const { pending } = useSelector(({ common }) => common);
  const { type, userDetail } = useAuth();

  const hadleUpdateProfile = (values) => {
    dispatch(updateProfile({ ...values, type }));
  };

  const handleChangePassword = (values) => {
    dispatch(changePassword(values));
  };

  const handleUploadIdentification = async (file) => {
    const data = await dispatch(
      uploadImage({
        mediaType: MEDIA_TYPE_IMAGE,
        module: 'legal-information',
        media: file,
      })
    );
    await dispatch(providerUpdateProfile({ legalInformation: data.imageName }));
  };

  const SelectCountryCode = (
    <Form.Item name="countryCode" noStyle>
      <Select style={{ width: 80 }} size="large">
        <Select.Option value="+1">+1</Select.Option>
      </Select>
    </Form.Item>
  );

  return (
    <>
      <Meta
        title="Profile | Zoom Errands"
        description="Zoom Errands"
        label="Profile"
      />
      <Row align="center" justify="center" gutter={[16, 16]}>
        <Col xs={24} sm={24} md={16}>
          <Card
            title={
              <h3>
                <ProfileOutlined className="mr-2" />
                Edit Profile
              </h3>
            }
          >
            <Row justify="center" gutter={[16, 16]}>
              <Col span={24} className="flex justify-center">
                <AvatarUpload
                  onUpload={(profileImage) =>
                    dispatch(uploadProfileImage({ profileImage }))
                  }
                  url={userDetail && userDetail.avatarImage}
                />
              </Col>
              <Col span={24}>
                <Form
                  className="w-full"
                  onFinish={hadleUpdateProfile}
                  {...layout}
                  labelAlign="left"
                  initialValues={userDetail}
                  requiredMark={false}
                >
                  <Form.Item
                    label="First Name"
                    name="firstName"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your first name!',
                      },
                    ]}
                  >
                    <Input size="large" />
                  </Form.Item>
                  <Form.Item
                    label="Last Name"
                    name="lastName"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your last name!',
                      },
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
                    name="mobileNumber"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your mobile number!',
                      },
                    ]}
                  >
                    <Input size="large" addonBefore={SelectCountryCode} />
                  </Form.Item>
                  <Form.Item
                    label="Location"
                    name="location"
                    rules={
                      [
                        // {
                        //   required: true,
                        //   message: 'Please input your location!',
                        // },
                      ]
                    }
                  >
                    <Input size="large" />
                  </Form.Item>
                  {type === TYPE_HELPER && (
                    <Space
                      direction="vertical"
                      className="flex flex-col items-center mb-4"
                    >
                      <span className="font-bold">Legal Identification</span>
                      <span className="text-gray">
                        Acceptable: Driver's License, Passport or Government ID
                      </span>
                      <IdentificationUpload
                        onUpload={handleUploadIdentification}
                        url={userDetail && userDetail.legalInformation}
                      />
                    </Space>
                  )}
                  <Form.Item className="flex justify-center">
                    <Button
                      type="primary"
                      loading={pending && pending.update_profile}
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
              <h3>
                <KeyOutlined className="mr-2" />
                Change Password
              </h3>
            }
          >
            <Form
              className="w-full"
              onFinish={handleChangePassword}
              requiredMark={false}
            >
              <Form.Item
                name="oldPassword"
                rules={[
                  {
                    required: true,
                    message: 'Please input your old password!',
                  },
                  {
                    min: LENGTH.password.min,
                    message: `Min Length ${LENGTH.password.min}`,
                  },
                  {
                    max: LENGTH.password.max,
                    message: `Max Length ${LENGTH.password.max}`,
                  },
                ]}
              >
                <Input.Password placeholder="Old Password" />
              </Form.Item>
              <Form.Item
                name="newPassword"
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
                <Input.Password placeholder="New Password" />
              </Form.Item>
              <Form.Item
                name="confirmPassword"
                dependencies={['newPassword']}
                hasFeedback
                rules={[
                  { required: true, message: 'Please confirm your password!' },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('newPassword') === value) {
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
                  loading={pending && pending.change_password}
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
