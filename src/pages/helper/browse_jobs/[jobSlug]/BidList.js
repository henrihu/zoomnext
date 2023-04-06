import { Avatar, List, Button, Row, Col, Space, Tag } from 'antd';
import { StarFilled, MessageOutlined } from '@ant-design/icons';
import { COLOR_CUSTOMER } from 'src/utils/constants';

const data = [
  {
    avatar: '/images/service.png',
    name: 'Robert Range',
    rating: 4.8,
    job_count: 9,
    amount: 2023.22323,
  },
  {
    avatar: '/images/service.png',
    name: 'Robert Range',
    rating: 4.8,
    job_count: 9,
    amount: 2023.02323,
  },
  {
    avatar: '/images/service.png',
    name: 'Robert Range',
    rating: 4.8,
    job_count: 9,
    amount: 2023.23,
  },
  {
    avatar: '/images/service.png',
    name: 'Robert Range',
    rating: 4.8,
    job_count: 9,
    amount: 2023.22323,
  },
];

export default () => (
  <Row gutter={[16, 16]}>
    <Col span={24}>
      <Row>
        <Col span={24}>
          <Space>
            <h1>Total Bids</h1>
            <Tag color={COLOR_CUSTOMER}>
              <h2>{data.length}</h2>
            </Tag>
          </Space>
        </Col>
        <Col span={24} className="text-gray">
          Bids includes 5% processing fee
        </Col>
      </Row>
    </Col>
    <Col span={24}>
      <List
        itemLayout="vertical"
        dataSource={data}
        renderItem={(item, index) => (
          <List.Item
            extra={
              <h2 style={{ color: '#87CD9B', width: 150 }}>${item.amount}</h2>
            }
          >
            <List.Item.Meta
              avatar={<Avatar src={item.avatar} />}
              title={
                <Row>
                  <Col span={24}>
                    <h3>{item.name}</h3>
                  </Col>
                  <Col span={24}>
                    <Space>
                      <StarFilled style={{ color: '#FADB14' }} />
                      <span className="text-bold">
                        <b>{item.rating}</b> ({item.job_count})
                      </span>
                    </Space>
                  </Col>
                </Row>
              }
              description="Ant Design, a design language for background applications, is refined by Ant UED Team"
            />
            <Space justify className="w-full justify-end">
              <Button shape="round" type="primary" size="small">
                Accept
              </Button>
              <Button type="text" size="small" danger>
                Reject
              </Button>
              <Button size="small" icon={<MessageOutlined />} />
            </Space>
          </List.Item>
        )}
      />
    </Col>
  </Row>
);
