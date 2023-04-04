import { Card, Button, Row, Col, Space, Switch, Divider } from 'antd';
import Image from 'next/image';
import { DeleteOutlined } from '@ant-design/icons';
import moment from 'moment';

export default ({ data }) => {
  return (
    <Card hoverable size="small" bodyStyle={{ padding: 0 }}>
      <Row align="center">
        <Col
          span={3}
          className="flex flex-col justify-center items-center border-r-2 border-r-gray"
        >
          <div className="font-bold mb-1 text-3xl">
            {moment(data.date).day()}
          </div>
          <span className="text-gray">
            {new Intl.DateTimeFormat('en', { month: 'short' })
              .format(data.date)
              .toUpperCase()}
          </span>
          <span className="text-gray">{moment(data.date).year()}</span>
        </Col>
        <Col span={15} className="flex items-center px-8">
          <Space direction="vertical">
            <h3>{data.title}</h3>
            <span>{data.description}</span>
          </Space>
        </Col>
        <Col span={6} className="flex items-center justify-end pr-3">
          <div style={{ fontSize: 24, color: '#89CE9D' }}>
            ${data.price.toFixed(2)}
          </div>
        </Col>
      </Row>
    </Card>
  );
};
