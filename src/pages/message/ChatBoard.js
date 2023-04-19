import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Row, Col, Card, Input, Divider, Space, Avatar } from 'antd';
import { SendOutlined, PlusOutlined } from '@ant-design/icons';
import { sendMessage } from 'src/store/common/actions';
import { MESSAGE_TYPE_MESSAGE } from 'src/utils/constants';

import Message from './Message';

export default ({ data, loading, selected }) => {
  const dispatch = useDispatch();
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState('');
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
    setPending(false);
  };
  return (
    <Card size="small" loading={loading} bodyStyle={{ padding: 0 }}>
      <Row>
        <Col
          span={24}
          style={{
            maxHeight: 'calc(100vh - 105px - 64px - 64px - 50px)',
            overflow: 'auto',
            padding: 16,
          }}
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
                <Button size="small" type="text" icon={<PlusOutlined />} />
              }
            />
            <Button
              size="large"
              type="primary"
              icon={<SendOutlined size="large" />}
              onClick={handleSendMessage}
            />
          </Space.Compact>
        </Col>
      </Row>
    </Card>
  );
};
