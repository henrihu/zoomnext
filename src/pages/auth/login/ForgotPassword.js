import { useState } from 'react';
import { Modal, Input, Button, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { setOtpModal } from 'src/store/setting/actions';
import { forgotPassword } from 'src/store/auth/actions';
import { OTP_TYPE_PASSWORD_RESET } from 'src/utils/constants';

export default ({ open, onCancel, onOpenResetModal }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
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

  const handleSend = async () => {
    const isSuccess = await dispatch(forgotPassword({ email }));
    if (isSuccess) {
      onCancel();
      dispatch(
        setOtpModal({
          open: true,
          data: { email },
          type: OTP_TYPE_PASSWORD_RESET,
          onOk: () => {
            onOpenResetModal({ open: true, data: { email } });
          },
        })
      );
    }
  };

  return (
    <Modal {...modal_props} destroyOnClose={true}>
      <Space
        direction="vertical"
        size="large"
        className="flex flex-col items-center"
      >
        <Space direction="vertical" className="flex flex-col items-center">
          <h2>Forgot Password</h2>
          <div className="text-gray text-center">
            We will send a 4 digit code to your email to create a new password
          </div>
        </Space>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your registed email"
          autoFocus
        />
        <Button
          type="primary"
          shape="round"
          onClick={handleSend}
          loading={pending.forgotPassword}
        >
          Send
        </Button>
      </Space>
    </Modal>
  );
};
