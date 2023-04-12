import { useState } from 'react';
import { Modal, Input, Button, Space } from 'antd';
import InputPin from 'src/components/InputPin';

export default ({ open, onOk, onCancel }) => {
  const [code, setCode] = useState();
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
          <h2>Account Vertification</h2>
          <div className="text-gray text-center">
            Please check your email and enter the 4 Digit Code.
          </div>
        </Space>
        <InputPin value={code} onChange={(code) => setCode(code)} />
        <Space direction="vertical" className="flex flex-col items-center">
          <span>Resend Code in 01:49</span>
          <Button type="link" size="small">
            Resend Now
          </Button>
        </Space>
        <Button type="primary" shape="round" onClick={() => onOk()}>
          Verify
        </Button>
      </Space>
    </Modal>
  );
};
