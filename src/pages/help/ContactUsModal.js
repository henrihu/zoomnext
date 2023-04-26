import { Modal, Input, Divider, Form, Upload, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useAuth } from 'src/store/auth/actions';
import { contactUs, uploadImage } from 'src/store/common/actions';
import { useDispatch } from 'react-redux';
import { MEDIA_TYPE_IMAGE } from 'src/utils/constants';

export default ({ open, onOk, onCancel, pending }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { userDetail } = useAuth();
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

  const beforeUpload = async (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      showError('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      showError('Image must smaller than 2MB!');
    }
    console.log('uploadimage');
    const image = await dispatch(
      uploadImage({
        mediaType: MEDIA_TYPE_IMAGE,
        module: 'contact-us',
        media: file,
      })
    );
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
    return false;
  };
  return (
    <Modal {...modal_props}>
      <Divider />
      <Form
        name="contactUs"
        layout="vertical"
        requiredMark={false}
        form={form}
        initialValues={{
          accountName: userDetail && userDetail.firstName,
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
        </Form.Item>
      </Form>
      <Upload
        accept="image/jpeg"
        showUploadList={false}
        beforeUpload={beforeUpload}
      >
        <Button icon={<PlusOutlined />} />
      </Upload>
    </Modal>
  );
};
