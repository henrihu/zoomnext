import { useEffect, useState } from 'react';
import { Upload, message, theme, Button, Spin } from 'antd';
import { EditOutlined, IdcardOutlined } from '@ant-design/icons';

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};

export default ({ width = 200, height = 120, onUpload, url, ...props }) => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const { token } = theme.useToken();

  useEffect(() => {
    setImageUrl(url);
  }, [url]);

  const beforeUpload = async (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
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
          width,
          height,
          borderColor: token.colorPrimary,
        }}
        className="identification-container"
      >
        <div className="identification-img">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="identification"
              style={{ width: '100%', height: '100%' }}
            />
          ) : (
            <IdcardOutlined style={{ fontSize: 90 }} />
          )}
        </div>

        <div
          style={{ position: 'absolute', bottom: -12 }}
          className="flex justify-center w-full"
        >
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
            />
          </Upload>
        </div>
      </div>
    </Spin>
  );
};
