import { Button, Row, Col, Card, Input, Divider, Space, Avatar } from 'antd';
import { SendOutlined, PlusOutlined } from '@ant-design/icons';
import { MESSAGE_TYPE_MESSAGE } from 'src/utils/constants';

const renderMessageBox = (message, messageType) => {
  return (
    <Card
      bodyStyle={{
        padding: messageType === MESSAGE_TYPE_MESSAGE ? 4 : 0,
        boxShadow: '2px 2px 3px grey',
        borderRadius: 4,
        cursor: 'default',
      }}
      hoverable
    >
      {messageType === MESSAGE_TYPE_MESSAGE ? (
        message
      ) : (
        <img src={message} width={100} height={100} className="rounded" />
      )}
    </Card>
  );
};

export default ({ data }) => {
  return (
    <Row justify={data.state ? 'start' : 'end'}>
      <Col span={16}>
        {data.state ? (
          <div className="flex">
            <Avatar
              src="/images/service.png"
              className="mr-2"
              style={{ minWidth: 32, minHeight: 32 }}
            />
            <div className="flex flex-col gap-1">
              {renderMessageBox(data.message, data.messageType)}
              <span className="text-gray">Today 11:50</span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-end gap-1">
            {renderMessageBox(data.message, data.messageType)}
            <span className="text-gray">Today 11:50</span>
          </div>
        )}
      </Col>
    </Row>
  );
};
