import { Modal, Input, Divider, Form } from 'antd';

export default ({ open, onOk, onCancel, pending }) => {
  const [form] = Form.useForm();
  const modal_props = {
    title: 'Contact Us',
    open,
    okText: 'Send',
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
          console.error('Validate Failed:', info);
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
      <Form name="contactUs" layout="vertical" requiredMark={false} form={form}>
        <Form.Item
          label="Full Name"
          name="accountName"
          rules={[{ required: true, message: 'Please input name!' }]}
        >
          <Input autoFocus />
        </Form.Item>
        <Form.Item
          label="Email Address"
          name="email"
          rules={[
            { type: 'email', message: 'Please input correct email!' },
            { required: true, message: 'Please input email!' },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Message"
          name="message"
          rules={[{ required: true, message: 'Please input message!' }]}
        >
          <Input.TextArea
            placeholder="Write here..."
            autoSize={{ minRows: 3, maxRows: 5 }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
