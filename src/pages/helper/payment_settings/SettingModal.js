import { useState, useEffect } from 'react';
import { Modal, Input, Divider, Form } from 'antd';

const helper = {
  avatar: '/images/service.png',
  name: 'Robert Range',
  rating: 4.8,
  job_count: 9,
};

export default ({ open, data = {}, onOk, onCancel }) => {
  const [form] = Form.useForm();
  const [pending, setPending] = useState(false);

  // useEffect(()=>{form.resetFields()},[open]);

  const modal_props = {
    title: 'Payment Setting',
    open,
    okText: 'Post',
    cancelButtonProps: {
      style: { display: 'none' },
    },
    onOk: () => {
      form
        .validateFields()
        .then(async (values) => {
          setPending(true);
          const isSuccess = await onOk(values);
          console.log('isSuccess', isSuccess);
          if (isSuccess) {
            onCancel();
          }
          setPending(false);
        })
        .catch((info) => {
          console.log('Validate Failed:', info);
        });
    },
    onCancel: () => {
      onCancel();
    },
  };
  return (
    <Modal {...modal_props} confirmLoading={pending} zIndex={999}>
      <Divider />
      <Form
        name="bank"
        layout="vertical"
        requiredMark={false}
        form={form}
        initialValues={data}
      >
        <Form.Item
          label="Account Holder Name"
          name="accountHolderName"
          rules={[{ required: true, message: 'Please input name!' }]}
        >
          <Input placeholder="Account Holder Name" autoFocus />
        </Form.Item>
        <Form.Item
          label="Account Number"
          name="accountNumber"
          rules={[{ required: true, message: 'Please input account number!' }]}
        >
          <Input placeholder="Enter Account Number" />
        </Form.Item>
        <Form.Item
          label="Routing Number"
          name="routingNumber"
          rules={[{ required: true, message: 'Please input routing number!' }]}
        >
          <Input placeholder="Enter Routing Number" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
