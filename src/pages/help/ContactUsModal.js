import { Modal, Input, Divider, Form, Upload, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useAuth } from 'src/store/auth/actions';
import { contactUs, uploadImage } from 'src/store/common/actions';
import { useDispatch } from 'react-redux';
import { MEDIA_TYPE_IMAGE } from 'src/utils/constants';
import { useState } from 'react';

export default ({ open, onOk, onCancel }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { userDetail } = useAuth();
  const [pending, setPending] = useState(false);
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
          setPending(true);
          const isSuccess = await onOk(values);
          if (isSuccess) {
            onCancel();
            form.resetFields();
          }
          setPending(false);
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

  const beforeUpload = async (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      showError('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      showError('Image must smaller than 2MB!');
    }
    const image = await dispatch(
      uploadImage({
        mediaType: MEDIA_TYPE_IMAGE,
        module: 'contact-us',
        media: file,
      })
    );
    setPending(true);
    const isSuccess = await dispatch(
      contactUs({
        accountName: form.getFieldValue('accountName'),
        email: form.getFieldValue('email'),
        message: image.fileName,
      })
    );
    if (isSuccess) {
      onCancel();
      form.resetFields();
    }
    setPending(false);
    return false;
  };
  return (
    <Modal {...modal_props} confirmLoading={pending}>
      <Divider />
      <Form
        name="contactUs"
        layout="vertical"
        requiredMark={false}
        form={form}
        initialValues={{
          accountName:
            userDetail && `${userDetail.firstName} ${userDetail.lastName}`,
          email: userDetail && userDetail.email,
        }}
      >
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
          <Upload
            accept="image/jpeg"
            showUploadList={false}
            beforeUpload={beforeUpload}
          >
            <Button
              icon={<PlusOutlined />}
              size="small"
              type="text"
              className="absolute bottom-1 right-1"
            />
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};
