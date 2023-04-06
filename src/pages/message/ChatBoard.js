import { Button, Row, Col, Card, Input, Divider, Space, Avatar } from 'antd';
import { SendOutlined, PlusOutlined } from '@ant-design/icons';
import Message from './Message';

export default ({ data, loading }) => (
  <Card size="small" loading={loading} bodyStyle={{ padding: 0 }}>
    <Row>
      <Col
        span={24}
        style={{ maxHeight: '50vh', overflow: 'auto', padding: 16 }}
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
            addonAfter={
              <Button size="small" type="text" icon={<PlusOutlined />} />
            }
          />
          <Button
            size="large"
            type="primary"
            icon={<SendOutlined size="large" />}
          />
        </Space.Compact>
      </Col>
    </Row>
  </Card>
);
