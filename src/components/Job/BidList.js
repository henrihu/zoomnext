import { Avatar, List, Button, Row, Col, Space, Tag, Card } from 'antd';
import { StarFilled, MessageOutlined } from '@ant-design/icons';
import {
  APPROVE_MODE_ACCEPT,
  APPROVE_MODE_REJECT,
  COLOR_CUSTOMER,
} from 'src/utils/constants';
import { setMessenger } from 'src/store/common/actions';
import { useDispatch } from 'react-redux';

export default ({ data, approveBid, router }) => {
  const dispatch = useDispatch();
  return (
    <Card
      hoverable
      className="pl-5 pt-3 bg-gray"
      style={{ backgroundColor: 'snow' }}
      title={
        <Space>
          <span className="text-xl font-bold">Total Bids</span>
          <Tag color={COLOR_CUSTOMER}>
            <span className="text-lg">{data && data.length}</span>
          </Tag>
        </Space>
      }
    >
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <List
            itemLayout="vertical"
            dataSource={data}
            renderItem={(item, index) => (
              <List.Item
                extra={
                  <h2 style={{ color: '#87CD9B', width: 100 }}>
                    ${item.price}
                  </h2>
                }
              >
                <List.Item.Meta
                  className="mb-0"
                  avatar={<Avatar src={item.usersImage} />}
                  title={
                    <Row>
                      <Col span={24}>
                        <h3>{item.firstName}</h3>
                      </Col>
                      <Col span={24}>
                        <Space>
                          <StarFilled style={{ color: '#FADB14' }} />
                          <span className="text-bold">
                            <b>{item.avgRating}</b>
                          </span>
                        </Space>
                      </Col>
                    </Row>
                  }
                  description={item.comment}
                />
                <Space className="w-full justify-end">
                  <Button
                    shape="round"
                    type="primary"
                    size="small"
                    onClick={() => {
                      approveBid({
                        jobBidId: item.id,
                        type: APPROVE_MODE_ACCEPT,
                      });
                    }}
                  >
                    Accept
                  </Button>
                  <Button
                    type="text"
                    size="small"
                    danger
                    onClick={() => {
                      approveBid({
                        jobBidId: item.id,
                        type: APPROVE_MODE_REJECT,
                      });
                    }}
                  >
                    Reject
                  </Button>
                  <Button
                    size="small"
                    type="icon"
                    icon={<MessageOutlined />}
                    onClick={() => {
                      dispatch(
                        setMessenger({
                          fullName: item.bidpvfullName,
                          jobId: item.jobId,
                          userId: item.providerId,
                        })
                      );
                      router.push('/message');
                    }}
                  />
                </Space>
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </Card>
  );
};
