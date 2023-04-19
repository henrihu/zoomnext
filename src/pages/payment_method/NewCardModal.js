import { useState, useMemo } from 'react';
import { Modal, Input, Divider, Space, Form } from 'antd';
import { StarFilled } from '@ant-design/icons';

const helper = {
  avatar: '/images/service.png',
  name: 'Robert Range',
  rating: 4.8,
  job_count: 9,
};

export default ({ open, onOk, onCancel }) => {
  const [form] = Form.useForm();
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
          const isSuccess = await onOk(values);
          if (isSuccess) {
            onCancel();
            form.resetFields();
          }
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
    <Modal {...modal_props}>
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
              <Input placeholder="Month" />
            </Form.Item>
            <Form.Item name="year" rules={[{ required: true }]}>
              <Input placeholder="Year" />
            </Form.Item>
            <Form.Item name="cvc" rules={[{ required: true }]}>
              <Input placeholder="CVC" />
            </Form.Item>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
};
