import { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Button,
  Row,
  Col,
  Card,
  Input,
  Divider,
  Space,
  Avatar,
  Upload,
} from 'antd';
import { SendOutlined, PlusOutlined } from '@ant-design/icons';
import {
  MEDIA_TYPE_IMAGE,
  MESSAGE_TYPE_IMAGE,
  MESSAGE_TYPE_MESSAGE,
} from 'src/utils/constants';

import Message from './Message';
import { sendMessage, uploadImage } from 'src/store/common/actions';
import { useScreen, useThemeToken } from 'src/utils/common';

export default ({ data, loading, selected }) => {
  const dispatch = useDispatch();
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState('');
  const isXsSm = useScreen();

  useEffect(() => {
    setMessage('');
  }, [selected]);

  useEffect(() => {
    if (!loading) {
      const chatBoard = window.document.getElementById('chat-board');
      chatBoard.scrollTo(0, chatBoard.scrollHeight);
    }
  }, [loading]);

  const handleSendMessage = async () => {
    setPending(true);
    const isSuccess = await dispatch(
      sendMessage({
        message,
        receiverId: selected.userId,
        jobId: selected.jobId,
        messageType: MESSAGE_TYPE_MESSAGE,
      })
    );
    if (isSuccess) {
      setMessage('');
      const chatBoard = window.document.getElementById('chat-board');
      chatBoard.scrollTo(0, chatBoard.scrollHeight);
    }
    setPending(false);
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
    // setLoading(true);
    const image = await dispatch(
      uploadImage({
        mediaType: MEDIA_TYPE_IMAGE,
        module: 'chat',
        media: file,
      })
    );
    await dispatch(
      sendMessage({
        message: image.fileName,
        receiverId: selected.userId,
        jobId: selected.jobId,
        messageType: MESSAGE_TYPE_IMAGE,
      })
    );
    // setLoading(false);
    return false;
  };
  return (
    <Card
      title={
        !isXsSm && selected ? (
          <div className="flex items-center gap-2">
            <Avatar src={selected.profileImage} />
            <h2>
              {selected.fullName
                ? selected.fullName
                : `${selected.firstName} ${selected.lastName}`}
            </h2>
          </div>
        ) : null
      }
      headStyle={{
        backgroundColor: useThemeToken().colorPrimary,
        color: 'white',
        fontWeight: 'bold',
      }}
      bodyStyle={{ padding: 0 }}
    >
      <Row>
        <Col
          span={24}
          style={{
            maxHeight: 'calc(100vh - 276px)',
            height: 'calc(100vh - 276px)',
            overflow: 'auto',
            padding: 16,
          }}
          id="chat-board"
        >
          <Space direction="vertical" className="w-full">
            {data.map((item, index) => (
              <Message data={item} key={index} selected={selected} />
            ))}
          </Space>
        </Col>
        <Col span={24}>
          <Divider className="my-2" />
        </Col>
        <Col span={24}>
          <Space.Compact block>
            <Input
              size="large"
              placeholder="Write your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              addonAfter={
                <Upload
                  accept="image/jpeg"
                  showUploadList={false}
                  beforeUpload={beforeUpload}
                  disabled={!selected}
                >
                  <Button size="small" type="text" icon={<PlusOutlined />} />
                </Upload>
              }
              disabled={!selected}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && message.length > 0 && !pending) {
                  handleSendMessage();
                }
              }}
            />
            <Button
              size="large"
              type="primary"
              icon={<SendOutlined size="large" />}
              onClick={handleSendMessage}
              disabled={!message || message.length === 0}
              loading={pending}
            />
          </Space.Compact>
        </Col>
      </Row>
    </Card>
  );
};
