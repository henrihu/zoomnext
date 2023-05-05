import { useState, useMemo } from 'react';
import { Modal, Input, Divider, Space, Form, Button, Tooltip } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import Image from 'next/image';

export default ({ open, onOk, onCancel }) => {
  const [form] = Form.useForm();
  const [pending, setPending] = useState(false);
  const modal_props = {
    title: 'Payment Detail',
    open,
    okText: 'Add Card',
    cancelButtonProps: {
      style: { display: 'none' },
    },
    onOk: () => {
      form
        .validateFields()
        .then(async (values) => {
          setPending(true);
          const isSuccess = await onOk(values);
          if (isSuccess) {
            onCancel();
            form.resetFields();
          }
          setPending(false);
        })
        .catch((info) => {
          console.log('Validate Failed:', info);
        });
    },
    onCancel: () => {
      onCancel();
      form.resetFields();
    },
  };
  return (
    <Modal {...modal_props} confirmLoading={pending} zIndex={999}>
      <Divider />
      <Form name="newCard" layout="vertical" requiredMark={false} form={form}>
        <Form.Item
          label="Full Name"
          name="cardholderName"
          rules={[{ required: true, message: 'Please input name!' }]}
        >
          <Input placeholder="Card Holder Name" autoFocus />
        </Form.Item>
        <Form.Item
          label="Card Number"
          name="cardNumber"
          rules={[{ required: true, message: 'Please input card number!' }]}
        >
          <Input placeholder="Enter Card Number" />
        </Form.Item>
        <Form.Item label="Expiration Date">
          <Space>
            <Form.Item name="month" rules={[{ required: true }]}>
              <Input placeholder="Month(MM)" />
            </Form.Item>
            <Form.Item name="year" rules={[{ required: true }]}>
              <Input placeholder="Year(YYYY)" />
            </Form.Item>
            <Form.Item name="cvc" rules={[{ required: true }]}>
              <Input
                placeholder="CVV"
                suffix={
                  <Tooltip
                    title={
                      <Image
                        src="/images/cards/visa_sample.png"
                        width={200}
                        height={100}
                        alt="card"
                      />
                    }
                    arrow={false}
                    className="bg-white"
                  >
                    <Button
                      icon={<InfoCircleOutlined />}
                      className="text-gray"
                      type="text"
                      size="small"
                    />
                  </Tooltip>
                }
              />
            </Form.Item>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
};
