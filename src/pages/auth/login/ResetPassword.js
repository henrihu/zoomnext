import { useState } from 'react';
import { Modal, Input, Button, Space, Form } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { setOtpModal } from 'src/store/setting/actions';
import { resetPassword } from 'src/store/auth/actions';
import { LENGTH, OTP_TYPE_PASSWORD_RESET } from 'src/utils/constants';

export default ({ open, onCancel, data }) => {
  const dispatch = useDispatch();
  const { pending } = useSelector(({ auth }) => auth);
  const modal_props = {
    open,
    onCancel,
    centered: true,
    footer: null,
    width: 300,
    centered: true,
    bodyStyle: { padding: '32px 0px' },
  };

  const handleReset = async (values) => {
    const isSuccess = await dispatch(
      resetPassword({ ...values, email: data.email })
    );
    if (isSuccess) {
      onCancel();
    }
  };

  return (
    <Modal {...modal_props}>
      <Space
        direction="vertical"
        size="large"
        className="flex flex-col items-center"
      >
        <h2>Reset Passwod</h2>
        <Form className="w-full" onFinish={handleReset} requiredMark={false}>
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
            <Input.Password placeholder="New Password" />
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
            <Input.Password placeholder="Confirm Password" />
          </Form.Item>
          <Form.Item className="flex justify-center">
            <Button
              type="primary"
              loading={pending.resetPassword}
              shape="round"
              htmlType="submit"
            >
              Save
            </Button>
          </Form.Item>
        </Form>
      </Space>
    </Modal>
  );
};
