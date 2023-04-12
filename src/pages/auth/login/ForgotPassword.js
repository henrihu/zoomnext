import { useState } from 'react';
import { Modal, Input, Button, Space } from 'antd';

export default ({ open, onOk, onCancel }) => {
  const [email, setEmail] = useState('');
  const modal_props = {
    open,
    onCancel,
    centered: true,
    footer: null,
    width: 300,
    centered: true,
    bodyStyle: { padding: '32px 0px' },
  };
  return (
    <Modal {...modal_props}>
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
        />
        <Button type="primary" shape="round" onClick={() => onOk()}>
          Send
        </Button>
      </Space>
    </Modal>
  );
};
