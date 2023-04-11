import { useState } from 'react';
import { Row, Col, Modal, Input, Divider, InputNumber, Button } from 'antd';

export default ({ open, onOk, onCancel }) => {
  const [confirm, setConfirm] = useState(false);
  const [amount, setAmount] = useState();
  const modal_props = {
    title: 'Create Bid',
    open,
    okText: 'Send Bid',
    onOk: () => {
      onCancel();
      setConfirm(true);
    },
    onCancel,
    centered: true,
  };
  return (
    <>
      <Modal {...modal_props} width={300}>
        <Divider />
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <InputNumber
              prefix="$"
              className="w-full"
              size="large"
              placeholder="Enter Bid Amount"
              value={amount}
              onChange={(value) => setAmount(value)}
              min={0}
            />
          </Col>
          <Col span={24}>
            <Input.TextArea
              autoSize={{ minRows: 3, maxRows: 5 }}
              placeholder="Comment"
            />
          </Col>
        </Row>
        <Divider />
      </Modal>
      <Modal
        open={confirm}
        closable={false}
        footer={null}
        width={300}
        centered={true}
      >
        <div className="flex flex-col items-center gap-2">
          <h2>${amount}</h2>
          <span>Your bit has been sent</span>
          <Button
            type="primary"
            shape="round"
            onClick={() => setConfirm(false)}
          >
            Okay
          </Button>
        </div>
      </Modal>
    </>
  );
};
