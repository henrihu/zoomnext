import { useState } from 'react';
import { Upload, message, theme, Button } from 'antd';
import { EditOutlined, IdcardOutlined } from '@ant-design/icons';

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};

export default ({ width = 200, height = 120, ...props }) => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const { token } = theme.useToken();

  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };
  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };
  return (
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
          onChange={handleChange}
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
  );
};
