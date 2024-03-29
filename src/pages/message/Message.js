import {
  Button,
  Row,
  Col,
  Card,
  Input,
  Divider,
  Space,
  Avatar,
  Image,
} from 'antd';
import { SendOutlined, PlusOutlined } from '@ant-design/icons';
import { MESSAGE_TYPE_MESSAGE } from 'src/utils/constants';
import { useAuth } from 'src/store/auth/actions';
import { format } from 'timeago.js';

const renderMessageBox = (data) => {
  return (
    <Card
      bodyStyle={{
        padding: 4,
        boxShadow: '2px 2px 3px grey',
        borderRadius: 4,
        cursor: 'default',
        backgroundColor: !data.isRead ? 'lightblue' : 'white',
      }}
      style={{ width: 'fit-content' }}
      hoverable
    >
      {data.messageType === MESSAGE_TYPE_MESSAGE ? (
        data.message
      ) : (
        <Image
          src={data.message}
          width={100}
          height={100}
          className="rounded"
        />
      )}
    </Card>
  );
};

export default ({ data, selected }) => {
  const { userDetail } = useAuth();
  return (
    <Row
      justify={userDetail && data.senderId !== userDetail.id ? 'start' : 'end'}
    >
      <Col span={16}>
        {userDetail && data.senderId !== userDetail.id ? (
          <div className="flex">
            <Avatar
              src={selected && selected.profileImage}
              className="mr-2"
              style={{ minWidth: 32, minHeight: 32 }}
            />
            <div className="flex flex-col gap-1">
              {renderMessageBox(data)}
              <span className="text-gray">{format(data.createdAt)}</span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-end gap-1">
            {renderMessageBox(data)}
            <span className="text-gray">{format(data.createdAt)}</span>
          </div>
        )}
      </Col>
    </Row>
  );
};
