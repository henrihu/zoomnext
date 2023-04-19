import { useEffect, useState } from 'react';
import { Upload, theme, Button, Spin } from 'antd';
import { EditOutlined, UserOutlined } from '@ant-design/icons';
import { showError } from 'src/utils/messages';

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};

export default ({ size = 100, onUpload, url, ...props }) => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const { token } = theme.useToken();

  useEffect(() => {
    setImageUrl(url);
  }, [url]);

  const beforeUpload = async (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      showError('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      showError('Image must smaller than 2MB!');
    }
    setLoading(true);
    await onUpload(file);
    setLoading(false);
    return false;
  };
  return (
    <Spin spinning={loading}>
      <div
        style={{
          width: size,
          height: size,
          borderColor: token.colorPrimary,
        }}
        className="avatar-container"
      >
        <div className="avatar-img">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="avatar"
              style={{ width: '100%', height: '100%' }}
            />
          ) : (
            <UserOutlined style={{ fontSize: 40 }} />
          )}
        </div>

        <Upload
          {...props}
          accept="image/jpeg"
          showUploadList={false}
          beforeUpload={beforeUpload}
        >
          <Button
            type="primary"
            shape="circle"
            size="small"
            icon={<EditOutlined />}
            style={{ position: 'absolute', bottom: 4, right: 0 }}
          />
        </Upload>
      </div>
    </Spin>
  );
};
