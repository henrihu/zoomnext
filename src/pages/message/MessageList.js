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
import { MESSAGE_TYPE_MESSAGE } from 'src/utils/constants';

import Message from './Message';
import { sendMessage } from 'src/store/common/actions';

export default ({ data, loading, selected }) => {
  const dispatch = useDispatch();
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState('');

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
    // await onUpload(file);
    // setLoading(false);
    return false;
  };
  return (
    <Card
      title={<h2>{selected && selected.firstName}</h2>}
      // loading={loading}
      bodyStyle={{ padding: 0 }}
    >
      <Row>
        <Col
          span={24}
          style={{
            maxHeight: 'calc(100vh - 105px - 64px - 64px - 110px)',
            overflow: 'auto',
            padding: 16,
          }}
          id="chat-board"
        >
          <Space direction="vertical" className="w-full">
            {data.map((item, index) => (
              <Message data={item} key={index} />
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
                if (e.key === 'Enter' && message.length > 0) {
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

/* <Col span={24} className="p-4">
    <MessageList
      lockable={true}
      dataSource={messages}
      toBottomHeight={'100%'}
    />
  </Col> */

// const messages = useMemo(
//   () =>
//     data.map((item) => ({
//       ...item,
//       position: item.senderId === userDetail.id ? 'left' : 'right',
//       type: item.messageType === MESSAGE_TYPE_MESSAGE ? 'text' : 'photo',
//       text: item.messageType === MESSAGE_TYPE_MESSAGE && item.message,
//       photo: item.messageType === MESSAGE_TYPE_IMAGE && item.messageUrl,
//       date: item.createdAt,
//       unread: item.isRead,
//     })),
//   [data]
// );
